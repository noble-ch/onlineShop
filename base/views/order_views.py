import json
import http.client
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import JsonResponse
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer, OrderItemSerializer

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
            is_backorder = i.get('is_backorder', False)
            is_preorder = i.get('is_preorder', False)

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
                is_backorder=is_backorder,
                is_preorder=is_preorder,
            )

            if not is_backorder and not is_preorder:
                product.countInStock -= item.qty
                product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listBackorders(request):
    backorders = OrderItem.objects.filter(is_backorder=True)
    serializer = OrderItemSerializer(backorders, many=True)
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
def listPreorders(request):
    preorders = OrderItem.objects.filter(is_preorder=True)
    serializer = OrderItemSerializer(preorders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fulfillBackorder(request, pk):
    preorders = OrderItem.objects.filter(is_preorder=True)
    serializer = OrderItemSerializer(preorders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBackorderById(request, pk):
    preorders = OrderItem.objects.filter(is_preorder=True)
    serializer = OrderItemSerializer(preorders, many=True)
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


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def initialize_payment(request, pk):
    user = request.user

    try:
        CHAPA_API_KEY = os.environ.get('CHAPA_API_KEY')
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            chapa_api_url = "api.chapa.co"
            payment_data = {
                "amount": str(order.totalPrice),
                "currency": "ETB",
                "email": user.email,
                "first_name": user.first_name,
                "phone_number": "0912345678",
                "tx_ref": str(order._id),
                "callback_url": f"https://41f2-197-156-80-74.ngrok-free.app/api/orders/{pk}/pay",
                "return_url": f"http://192.168.43.51:5175/order/{pk}/",
            }
            payload = json.dumps(payment_data)
            print('parsed')
            headers = {
                'Authorization': f'Bearer {CHAPA_API_KEY}',
                'Content-Type': 'application/json'
            }
            try:
                conn = http.client.HTTPSConnection(chapa_api_url)
                conn.request("POST", "/v1/transaction/initialize",
                             payload, headers)
                res = conn.getresponse()
                data = res.read()
                conn.close()

                response_data = json.loads(data.decode("utf-8"))
                print('initiated')
                print(response_data)
                return JsonResponse(response_data)

            except Exception as e:
                print('failed to initiate')
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return Response({'detail': 'Not authorized to view this order'},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def updateOrderToPaid(request, pk):

    try:
        order = Order.objects.get(_id=pk)
        CHAPA_API_KEY = os.environ.get('CHAPA_API_KEY')
        chapa_api_url = "api.chapa.co"
        headers = {
            'Authorization': f'Bearer {CHAPA_API_KEY}',
        }

        # Verify the transaction
        conn = http.client.HTTPSConnection(chapa_api_url)
        conn.request("GET", f"/v1/transaction/verify/{pk}", headers=headers)
        res = conn.getresponse()
        data = res.read()
        conn.close()

        # Process the response from Chapa API
        response_data = json.loads(data.decode("utf-8"))
        amount = str(response_data.get('data', {}).get('amount', 0))
        price = str(order.totalPrice)

        if 'success' in response_data.get('status', ''):
            if amount == price:
                order.isPaid = True
                order.paidAt = datetime.now()
                order.save()
                return Response({'message': 'Order was paid and verified'})
            else:
                return Response({'message': 'Order was paid, but verification amount does not match'})
        else:
            return Response({'message': 'Order was paid, but verification failed'})

    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToRecieved(request, pk):
    order = Order.objects.get(_id=pk)

    order.isRecieved = True
    order.recievedAt = datetime.now()
    order.save()

    return Response('Order was Recieved')
