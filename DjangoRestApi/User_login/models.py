from djongo import models
from django.contrib.auth.models import AbstractUser

class user(AbstractUser):
    user_id  = models.IntegerField(primary_key=True)
    Username = models.CharField(max_length=255)
    email = models.TextField(null=True, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []






