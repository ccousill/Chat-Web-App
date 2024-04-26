from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import authenticate, login
import json
import requests
from datetime import datetime, timedelta

@api_view(['POST'])
def login(request):
    # try:
        data = json.loads(request.body)
        user_id = data.get('id')
        email = data.get('email')
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