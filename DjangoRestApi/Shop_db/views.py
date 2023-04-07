from django.shortcuts import render
from Shop_db.response import create_response
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Shop_db.models import product, shop
from Shop_db.serializers import ProductSerializer, ShopSerializer
from django.http import JsonResponse
class ProductList(APIView):
    def get(self, request):
        products = product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetail(APIView):
    def get_object(self, pk):
        try:
            return product.objects.get(pk=pk)
        except product.DoesNotExist:
            raise Http404

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
    def get(self, request):
       try:
         products = list(shop.objects.values())
         return create_response(message = 'List of All Shops', data = products,status_code=status.HTTP_200_OK,status=True,error ="")
       except  Exception as e:
        errors = {'message': str(e)}
        return create_response(message = 'Fetching shops Failed', data ="",status_code=status.HTTP_404_NOT_FOUND,status=False,error =errors)

    def post(self, request):
        try:
         serializer = ShopSerializer(data=request.data)
         print(serializer,"data_string")
         if serializer.is_valid():
            serializer.save()
            return create_response(message = 'shop created', data = request.data,status_code=status.HTTP_201_CREATED,status=True,error ="")
        except Exception as e:
            errors = {'message': str(e)}
            return create_response(message = 'Internal server error', data ="",status_code="",status=False,error=errors)
       


class ShopDetail(APIView):
    def get_object(self, pk):
        try:
            return shop.objects.get(pk=pk)
        except shop.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        shop_obj = self.get_object(pk)
        serializer = ShopSerializer(shop_obj)
        return Response(serializer.data)

    def put(self, request, pk):
        shop_obj = self.get_object(pk)
        serializer = ShopSerializer(shop_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        shop_obj = self.get_object(pk)
        shop_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
