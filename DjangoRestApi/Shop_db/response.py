import json
from rest_framework.response import Response

def create_response(data, status_code,error,status,message):
    response_data = {'message' : message,'data': data,'status_code': status_code, 'status' : status,'error': error }
    response_json = Response(response_data)
    return response_json
