from djongo import models

class user(models.Model):
    user_id  = models.IntegerField(primary_key=True)
    Username = models.CharField(max_length=255)
    email = models.TextField(null=True, blank=True)
    password = models.CharField(max_length=255)
    
    def __str__(self):
        return self.headline
    





