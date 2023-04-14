
from django.http import JsonResponse
def create_response(data, status_code,error,status,message):
    response_data = {'message' : message,'data' : data ,'status_code': status_code, 'status' : status,'error': error }
    response_json = JsonResponse(response_data,safe=False)
    return response_json

def response_details(data, status_code,error,status,message,response):
    response_data = {'message' : message,'data': data,'status_code': status_code, 'status' : status,'error': error ,'token' :response}
    response_json = JsonResponse(response_data,safe=False)
    return response_json

def payload_details(data, status_code,error,status,message):
    response_data = {'message' : message,'data': data,'status_code': status_code, 'status' : status,'error': error}
    response_json = JsonResponse(response_data,safe=False)
    return response_json
