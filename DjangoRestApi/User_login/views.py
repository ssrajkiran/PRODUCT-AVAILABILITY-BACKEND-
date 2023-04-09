from bson import ObjectId
from django.http import JsonResponse
from pymongo import collection
from django.views.decorators.csrf import csrf_exempt
from User_login.response import create_response
# Create your views here.
from pymongo import MongoClient
from rest_framework.views import APIView
from rest_framework import status
from User_login.models import user
from User_login.serializers import UserSerializer
import json

class UserList(APIView):
    def get(self, request):
        try:
            products = list(user.objects.values())
            if not products:
                return create_response(message = 'Not available', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="Not available")
            
            return create_response(message = 'List of All Shops', data = products,status_code=status.HTTP_201_CREATED,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
    
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            return create_response(message = 'shop created', data = request.data,status_code=status.HTTP_201_CREATED,status=True,error ="")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Internal server error', data ="",status_code="",status=False,error=errors)

class UserDetail(APIView):
    
    def get_object(self, pk):
            return user.objects.get(pk=pk)

    def get(self, request, pk):
        try:
            shop_obj = self.get_object(pk)
            serializer = UserSerializer(shop_obj)
            return create_response(message = 'available', data = serializer.data ,status_code=status.HTTP_200_OK,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Not available', data ="",status_code="",status=False,error=errors)
            
    def put(self,request,pk):
        try:
            user_details = user.objects.filter(user_id=pk).first()
            if user_details is None:
                return create_response(message = 'Not available in db', data ="",status_code=status.HTTP_404_NOT_FOUND,status=False,error ="")
            else:
                user_serializer=UserSerializer(user_details,data=request.data)
                if user_serializer.is_valid():
                    user_serializer.save()
                    return create_response(message = 'Data Updated', data ="",status_code=status.HTTP_200_OK,status=True,error = "")
        except  Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_404_NOT_FOUND,status=False,error =errors)


    def delete(self, request, pk):
        try:
            shop_obj = self.get_object(pk)
            shop_obj.delete()
            return create_response(message = 'Data delected', data ="",status_code=status.HTTP_200_OK,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Not available in the record', data ="",status_code="",status=False,error=errors)


