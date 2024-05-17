from django.urls import path
from .views import Login, CreateRoom, list_rooms

urlpatterns = [
    path('login/', Login, name='login'),
    path('createroom/',CreateRoom,name='createroom'),
    path('rooms/', list_rooms, name ='list_rooms')
]