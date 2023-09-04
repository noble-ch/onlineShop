import requests
import json
import http.client
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpResponseRedirect
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

from rest_framework import status
from datetime import datetime
import os



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def updateOrderToPaid(request, pk):

    try:
        order = Order.objects.get(_id=pk)
        chapa_response = sendChapaVerificationRequest(
            order._id)
        amount = str(chapa_response.get('data', {}).get('amount', 0))
        price = str(order.totalPrice)
        if 'success' in chapa_response.get('status', ''):
            if amount == price:
                order.isPaid = True
                order.paidAt = datetime.now()
                order.save()
                print('hello')
            return Response({'message': 'Order was paid and verified'})
        else:
            return Response({'message': 'Order was paid, but verification failed'})

    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


def sendChapaVerificationRequest(order_id):
    try:
        CHAPA_API_KEY = os.environ.get('CHAPA_API_KEY')
        conn = http.client.HTTPSConnection("api.chapa.co")
        url = f"/v1/transaction/verify/{order_id}"
        payload = ''
        headers = {
        'Authorization': f'Bearer {CHAPA_API_KEY}'
    }
        conn.request("GET", url, payload, headers)
        res = conn.getresponse()
        data = res.read().decode("utf-8")

        # Convert the JSON response to a Python dictionary
        response_data = json.loads(data)
        return response_data

    except Exception as e:
        print(f"Error: {str(e)}")
        return {'error': 'An error occurred during the request'}


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')

"""
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderback(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        item_price = data['orderItems'][0]['price']
        # order_id = data['_id']
        print(data)
        print(user)
        order_id = str(data['shippingAddress']['order'])
        print(order_id)
        url = "https://api.chapa.co/v1/transaction/initialize"
        headers = {
            "Authorization": f"Bearer CHASECK_TEST-JggM5YwHhuYFkLLh6ga4tGHwzzOvfuT3",
            "Content-Type": "application/json"}
        data = {
            "amount": item_price,
            "currency": 'ETB',
            "tx_ref": order_id,
            # "callback_url": 'http://127.0.0.1:8000/chapa-hook',
            "return_url": "http://localhost:5188/",
            "customization": {
                "title": "qq",
                "description": "I love online payments"}}

        response = requests.post(url, headers=headers, json=data)
        response_data = response.json()

        print(response_data.get('status'))

        if response_data.get('status') == 'success':
            checkout_url = response_data.get('data').get('checkout_url')
            return redirect(checkout_url)  #
        else:
            return Response({"message": "Payment failed!"})



# FILEPATH: /home/dododoyo/Documents/Noble/index.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['GET'])
def chapa_pay_callback(request):
  txRef = request.query_params.get('trx_ref')
  status = request.query_params.get('status')

  print(f"Transaction reference: {txRef}")
  print(f"Status: {status}")

  verify_url = f"https://api.chapa.co/v1/transaction/verify/{txRef}"
  headers = {
    "Authorization": f"Bearer {chapaTestSecretKey}"
  }

  response = requests.get(verify_url, headers=headers)
  print(response.text)

  # Handle the transaction status and update your database accordingly
  # ...

  return Response(status=200)

@api_view(['GET'])
def chapa_pay_return(request):
  # Handle the transaction status and update your database accordingly
  # ...

  return Response({"message": "Payment successful!"})

@api_view(['POST'])
def chapa_pay(request):
  theTxRef = str(uuid.uuid4().hex)[:13]

  print(f"txRef: {theTxRef}")

  url = "https://api.chapa.co/v1/transaction/initialize"
  headers = {
    "Authorization": f"Bearer CHASECK_TEST-JggM5YwHhuYFkLLh6ga4tGHwzzOvfuT3",
    "Content-Type": "application/json"
  }
  data = {
    "amount": request.data.get('itemPrice'),
    "currency": 'ETB',
    "tx_ref": request.data.get('order'),
    "callback_url": 'http://127.0.0.1:8000/chapa-hook',
    "return_url": 'http://localhost:5188/order/{request.data.get('order')}',
    "customization": {
      "title": "Payment for my favourite merchant",
      "description": "I love online payments"
    }
  }

  response = requests.post(url, headers=headers, json=data)
  response_data = response.json()

  print(response_data.get('status'))

  if response_data.get('status') == 'success':
    return Response({"checkout_url": response_data.get('data').get('checkout_url')})
  else:
    return Response({"message": "Payment failed!"})
"""