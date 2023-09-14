import json
import http.client
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
def api_request_view(request):
    try:
        conn = http.client.HTTPSConnection("api.chapa.co")
        payload = ''
        headers = {
            'Authorization': 'Bearer CHASECK_TEST-JggM5YwHhuYFkLLh6ga4tGHwzzOvfuT3'
        }
        conn.request("GET", "/v1/transaction/verify/108", payload, headers)
        res = conn.getresponse()
        data = res.read().decode("utf-8")

        # Convert the JSON response to a Python dictionary
        response_data = json.loads(data)

        if 'success' in response_data.get('status', ''):
            print("Nice")

        return Response({"response": response_data})
    except Exception as e:
        # Handle any exceptions that may occur during the request
        print(f"Error: {str(e)}")
        return Response({"error": "An error occurred during the request"}, status=500)


#########################################################################

@csrf_exempt
def generate_chapa_payment_link(request):
    try:
        chapa_secret = settings.CHAPA_SECRET
        conn = http.client.HTTPSConnection(settings.CHAPA_API_URL)
        url = f"/{settings.CHAPA_API_VERSION}/payment/create"

        payload = {
            "amount": 1000,  # Replace with the actual payment amount
            "currency": "ETB",  # Replace with your currency
            "redirect_url": settings.CHAPA_WEBHOOK_URL,
        }

        # Send a POST request to Chapa API to create a payment link
        headers = {
            'Authorization': f'Bearer {chapa_secret}',
            'Content-Type': 'application/json'
        }
        conn.request("POST", url, json.dumps(payload), headers)
        res = conn.getresponse()
        data = res.read().decode("utf-8")

        # Convert the JSON response to a Python dictionary
        response_data = json.loads(data)

        if 'status' in response_data and response_data['status'] == 'success':
            return JsonResponse({"payment_link": response_data['data']['payment_link']})
        else:
            return JsonResponse({"error": "Failed to create payment link"}, status=400)

    except Exception as e:
        # Handle any exceptions that may occur during the request
        return JsonResponse({"error": str(e)}, status=500)
