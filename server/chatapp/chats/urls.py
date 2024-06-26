from django.urls import path
from .views import Login, CreateRoom, list_rooms, get_room_messages

urlpatterns = [
    path('login/', Login, name='login'),
    path('createroom/',CreateRoom,name='createroom'),
    path('rooms/', list_rooms, name ='list_rooms'),
    path('getroommessages/<str:room_name>/', get_room_messages, name='get_room_messages'),
]