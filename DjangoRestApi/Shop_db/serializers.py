from rest_framework import serializers
from Shop_db.models import Product, Shop
from Shop_db.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name','product_description','Brand_name','product_avail']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['_id','shop_name', 'shop_address','product']
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['_id','Username','email','password','last_login','is_superuser','first_name','last_name','is_staff','is_active','date_joined']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
