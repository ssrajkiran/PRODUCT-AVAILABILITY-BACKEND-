from rest_framework import serializers
from Shop_db.models import product, shop , user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['product_name','product_description','Brand_name','product_avail']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = shop
        fields = [ 'shop_name', 'shop_address','product']
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['Username','email','password']
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
