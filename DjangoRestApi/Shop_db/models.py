from djongo import models


class product(models.Model):

    product_name = models.CharField(max_length=255)
    product_description = models.TextField(null=True, blank=True)
    Brand_name = models.CharField(max_length=255)
    product_avail = models.BooleanField()
    

    class Meta:
        abstract = True
        

class shop(models.Model):
    shop_id = models.IntegerField(primary_key=True)
    shop_name = models.CharField(max_length=255)
    shop_address = models.TextField(null=True, blank=True)
    product = models.ArrayField(
        model_container=product,
    )
   
class user(models.Model):
    user_id  = models.IntegerField(primary_key=True)
    Username = models.CharField(max_length=255)
    email = models.TextField(null=True, blank=True)
    password = models.CharField(max_length=255)
    
    class Meta:
        abstract = True
    

    def __str__(self):
        return self.headline
    





