import json

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class LoginView(APIView):
    # @method_decorator(csrf_exempt)
    # def post(self, request):
    #
    #     username = request.data.get('username')
    #     print(username)
    #     password = request.data.get('password')
    #     # user = authenticate(request, username=username, password=password)
    #     if username is not None:
    #         # login(request, user)
    #         return JsonResponse({'message': 'success'}, status=status.HTTP_200_OK)
    #     else:
    #         return JsonResponse({'message': 'invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @csrf_exempt
    def my_view(self,request):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
        return HttpResponse('OK')
    # @csrf_exempt
    # def register(request):
    #     if request.method == 'POST':
    #         username = request.POST.get('username')
    #         password = request.POST.get('password')
    #         if User.objects.filter(username=username).exists():
    #             return JsonResponse({'message': 'Username already exists'}, status=400)
    #         else:
    #             user = User.objects.create_user(username=username, password=password)
    #             user.save()
    #             return JsonResponse({'message': 'Registration successful'}, status=201)
    # def new_page(request):
    #     return render(request, '/BookDetail/:book')
class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({'message': 'success'}, status=status.HTTP_200_OK)