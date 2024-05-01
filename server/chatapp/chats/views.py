from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import authenticate, login
import json
import requests
from datetime import datetime, timedelta
from .models import User
from django.core.exceptions import ObjectDoesNotExist


@api_view(['POST'])
def login(request):
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