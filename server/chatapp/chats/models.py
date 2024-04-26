from django.db import models

class User(models.Model):
    REQUIRED_FIELDS = ('google_id','email')
    username = None
    USERNAME_FIELD = 'email'
    google_id = models.CharField(max_length=255,blank=True,null=True)
    email = models.EmailField(unique=True)