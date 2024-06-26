from django.db import models
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    username = models.CharField(max_length=150,unique=True,null=True)
    google_id = models.CharField(max_length=255,blank=True,null=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD ='email'
    REQUIRED_FIELDS = []
    
class ChatMessage(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.user.username}:{self.content}'
    
class Chatroom(models.Model):
    name = models.CharField(max_length=100,unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    messages = models.ManyToManyField(ChatMessage)
    def __str__(self):
        return self.name