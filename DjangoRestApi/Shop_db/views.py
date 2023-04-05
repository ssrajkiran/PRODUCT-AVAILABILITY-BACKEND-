from django.shortcuts import render
from Shop_db.response import create_response
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Shop_db.models import product, shop
from Shop_db.serializers import ProductSerializer, ShopSerializer

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
        shops = shop.objects.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = ShopSerializer(data=request.data)
        print(request.data,"data_string")
        if serializer.is_valid():
            serializer.save()
            return create_response(message = 'shop created', data = request.data,status_code=status.HTTP_201_CREATED,status=True,error = "")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
