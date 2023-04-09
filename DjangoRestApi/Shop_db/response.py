import json

from django.http import JsonResponse
from rest_framework.response import Response

def create_response(data, status_code,error,status,message):
    response_data = {'message' : message,'data': data,'status_code': status_code, 'status' : status,'error': error }
    response_json = JsonResponse(response_data,safe=False)
    return response_json
