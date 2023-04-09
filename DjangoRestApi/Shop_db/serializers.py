from rest_framework import serializers
from Shop_db.models import product, shop

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['product_name','product_description','Brand_name','product_avail']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = shop
        fields = ['shop_id', 'shop_name', 'shop_address','product']
