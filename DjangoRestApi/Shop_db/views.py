from bson import ObjectId
from Shop_db.response import create_response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Shop_db.models import Product, Shop
from Shop_db.serializers import ProductSerializer, ShopSerializer


class ProductList(APIView):
    @staticmethod
    def get(request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    @staticmethod
    def post(request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetail(APIView):
    @staticmethod
    def get_object(pk):
        try:
            return Product.objects.get(_id=pk)
        except Product.DoesNotExist:
            raise Product

    def get(self, request, pk):
        product_obj = self.get_object(pk)
        serializer = ProductSerializer(product_obj)
        return Response(serializer.data)

    def put(self, request, pk):
        product_obj = self.get_object(pk)
        serializer = ProductSerializer(product_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product_obj = self.get_object(pk)
        product_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ShopList(APIView):
    @staticmethod
    def get(request):
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
    
    @staticmethod
    def get_object(pk):
            return Shop.objects.get(pk=pk)

    def get(self, request, pk):
        try:
            shop_obj = self.get_object(pk)
            serializer = ShopSerializer(shop_obj)
            return create_response(message = 'available', data = serializer.data ,status_code=status.HTTP_200_OK,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Not available', data ="",status_code="",status=False,error=errors)
            
    @staticmethod
    def put(request, pk):
        try:
            obj_id = ObjectId(pk)
            user = Shop.objects.filter(_id=obj_id).first()
            if user is None:
                return create_response(message = 'Not available in db', data ="",status_code=status.HTTP_404_NOT_FOUND,status=False,error ="")
            else:
                user_serializer=ShopSerializer(user,data=request.data)
                if user_serializer.is_valid():
                    user_serializer.save()
                    return create_response(message = 'Data Updated', data ="",status_code=status.HTTP_200_OK,status=True,error = "")
        except  Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_404_NOT_FOUND,status=False,error =errors)


    def delete(self, request, pk):
        try:
            obj_id = ObjectId(pk)
            shop_obj = self.get_object(obj_id)
            shop_obj.delete()
            return create_response(message = 'Data deleted', data ="",status_code=status.HTTP_200_OK,status=True,error = "")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Not available in the record', data ="",status_code="",status=False,error=errors)


