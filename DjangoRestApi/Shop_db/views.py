from bson import ObjectId
from Shop_db.response import create_response,response_details
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Shop_db.models import Product, Shop
from Shop_db.serializers import ProductSerializer, ShopSerializer


class ShopList(APIView):

    def get(self, request):
        try:
            details_all_user = Shop.objects.all()
            serializer = ShopSerializer(details_all_user,many=True)
            if serializer is not None:
                 return create_response(message = 'List of All Shops', data = serializer.data ,status_code=status.HTTP_201_CREATED,status=True,error = "")
            else:
                return create_response(message = 'Data not available', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error="Not available")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_400_BAD_REQUEST,status=False,error=errors)
    
   
    def post(self,request):
        try:
            serializer = ShopSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                user_id = serializer.data['_id']
                return create_response(message = 'shop created', data = ShopList.view_details(user_id), status_code=status.HTTP_201_CREATED, status=True, error ="")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Internal server error',data ="", status_code=status.HTTP_400_BAD_REQUEST ,status=False,error=errors)
        
    
   
    def view_details(user_id):
        print(user_id)
        obj_id = ObjectId(user_id)
        shop_obj = Shop.objects.get(_id=obj_id)
        serializer = ShopSerializer(shop_obj)
        return serializer.data



class ShopDetail(APIView):
    
    def get_object(self, pk):
        try:
            return Shop.objects.get(_id=pk)
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message='Not available', data="", status_code="", status=False, error=errors)

    def get(self, request, pk):
        try:
            obj_id = ObjectId(pk)
            shop_obj = self.get_object(obj_id)
            serializer = ShopSerializer(shop_obj)
            return create_response(message='available', data=serializer.data, status_code=status.HTTP_200_OK, status=True, error='')
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message='Not available', data="", status_code="", status=False, error=errors)

    def put(self, request, pk):
        try:
            shop_obj = self.get_object(ObjectId(pk))
            serializer = ShopSerializer(shop_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return create_response(message='Shop updated successfully', data=serializer.data, status_code=status.HTTP_200_OK, status=True, error='')
            else:
                return create_response(message='Invalid input data', data=serializer.errors, status_code=status.HTTP_400_BAD_REQUEST, status=False, error='')
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message='Internal server error', data="", status_code=status.HTTP_400_BAD_REQUEST, status=False, error=errors)

    def delete(self, request, pk):
        try:
            obj_id = ObjectId(pk)
            shop_obj = self.get_object(obj_id)
            shop_obj.delete()
            return create_response(message='Data deleted', data="", status_code=status.HTTP_200_OK, status=True, error="")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message='Not available in the record', data="", status_code="", status=False, error=errors)

