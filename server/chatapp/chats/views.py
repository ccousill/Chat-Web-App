from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import authenticate, login
import json
import requests
from datetime import datetime, timedelta
from .models import User, Chatroom, ChatMessage
from django.core.exceptions import ObjectDoesNotExist


@api_view(['POST'])
def Login(request):
    # try:

        print("post")
        data = json.loads(request.body)
        google_id = str(data.get('id'))
        email = str(data.get('email'))
        username = email.split('@')[0]
        print(google_id)
        print(email)
        try:
            user = User.objects.get(google_id=google_id)
        except ObjectDoesNotExist:
            print("user created")
            user = User.objects.create(google_id=google_id,email=email,username=username)
        user.email = email
        user.username = username
        user.save()
        return JsonResponse({'login':'login successful'})
    #     user = authenticate(request,id=user_id,email=email)
    #     print(user)
    #     if user is None:
    #         login(request,user)
    #         return JsonResponse({'message':'auth successful'})
    #     else:
    #         return JsonResponse({'error':'Invalid credentials'}, status=401)
    # except Exception as e:
    #     return JsonResponse({'error':str(e)},status=500)

@api_view(['POST'])
def CreateRoom(request):
     data = json.loads(request.body)
     room_name = data.get('roomName')
     user = data.get('user')
     email = user['user']['email']
     user = User.objects.get(email=email)

     chatroom = Chatroom.objects.create(name=room_name,created_by=user)
     return JsonResponse({'room_name': chatroom.name, 'created_by': chatroom.created_by.email})

@api_view(['GET'])
def list_rooms(request):
     rooms = Chatroom.objects.all()
     room_data = [{'name':room.name,'created_by':room.created_by.email} for room in rooms]
     return JsonResponse(room_data, safe=False)

@api_view(['POST'])
def send_message(request):
     print("sending")
     data= request.data
     email = data.get('email')
     content = data.get('content')
     chatroom_name = data.get('roomName')
     print(email)
     print(content)
     print(chatroom_name)
     if email and content:
          user = User.objects.get(email=email)
          chatroom = Chatroom.objects.get(name=chatroom_name)
          message = ChatMessage.objects.create(user=user,content=content)
          chatroom.messages.add(message)
          chatroom.save()
          return Response({'message': 'Message sent successfully'}, status=201)
     else:
        return Response({'error': 'Missing required data'}, status=400)