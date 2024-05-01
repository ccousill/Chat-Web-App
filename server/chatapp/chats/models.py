from django.db import models
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    username = models.CharField(max_length=150,unique=True,null=True)
    google_id = models.CharField(max_length=255,blank=True,null=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = []