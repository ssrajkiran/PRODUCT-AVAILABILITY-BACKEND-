from djongo import models
from django.contrib.auth.models import AbstractUser

class product(models.Model):

    product_name = models.CharField(max_length=255)
    product_description = models.TextField(null=True, blank=True)
    Brand_name = models.CharField(max_length=255)
    product_avail = models.BooleanField()
    

    class Meta:
        abstract = True
        

class shop(models.Model):

    shop_name = models.CharField(max_length=255)
    shop_address = models.TextField(null=True, blank=True)
    product = models.ArrayField(
        model_container=product,
    )
   
class user(AbstractUser):
    Username = models.CharField(max_length=255)
    email = models.TextField(null=True, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []




