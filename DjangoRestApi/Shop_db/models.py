from djongo import models
from django.contrib.auth.models import AbstractUser
from bson.objectid import ObjectId

class Product(models.Model):

    product_name = models.CharField(max_length=255)
    product_description = models.TextField(null=True, blank=True)
    Brand_name = models.CharField(max_length=255)
    product_avail = models.BooleanField()
    
    class Meta:
        abstract = True
   
        
class Shop(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    shop_name = models.CharField(max_length=255)
    shop_address = models.TextField(null=True, blank=True)
    product = models.ArrayField(
        model_container=Product,
    )
    

class User(AbstractUser):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    Username = models.CharField(max_length=255)
    email = models.TextField(null=True, unique=True)
    password = models.CharField(max_length=255)
    username = None



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

   
   
    

    def __str__(self):
        return self.headline
    





