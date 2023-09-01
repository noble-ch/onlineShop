import json
import http.client
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_request_view(request):
    try:
        conn = http.client.HTTPSConnection("api.chapa.co")
        payload = ''
        headers = {
            'Authorization': 'Bearer CHASECK_TEST-JggM5YwHhuYFkLLh6ga4tGHwzzOvfuT3'
        }
        conn.request("GET", "/v1/transaction/verify/69", payload, headers)
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
