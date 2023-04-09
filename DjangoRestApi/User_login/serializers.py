from rest_framework import serializers
from User_login.models import user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['user_id','Username','email','password']

