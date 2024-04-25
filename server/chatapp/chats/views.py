from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.conf import settings
import requests
from datetime import datetime, timedelta

@api_view(['GET'])
def login(request):
    number_param = request.GET.get('number')
    print("hello!")
    return JsonResponse(number_param, safe=False)