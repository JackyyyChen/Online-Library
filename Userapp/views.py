import base64
import json
import os
import random
import subprocess
import sys
import uuid

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.db.models import Q

from Userapp.models import User, ImageModel
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import UserManager
from django.core.checks import Tags
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from Userapp.models import User
from test_bookmanagement import settings
from io import BytesIO
from PIL import Image
import base64
# def test(request):
#     return render(request, 'TestButton.html')
# def App(request):
#
#     return render(request, 'App.html')
# def home_view(request):
#     return render(request, 'index.html')
# def double_number(request):
#
#     if request.method == 'POST':
#         # 从POST请求中获取数字
#         username = request.POST.get('username')
#         print(username)
#         # 将数字加倍
#         result = 'aaa'
#
#         # 返回JSON响应
#         return JsonResponse({'result': result})
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
#
# # @csrf_exempt
from Userapp.forms import RegisterForm, Login
from Userapp.models import User


def my_view(request):

    if request:
        # 返回 JSON 格式的响应消息
        return JsonResponse({'message': 'Hello world!'})
    else:
        # 返回错误消息
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
#
#
# @csrf_exempt
# def html_view(request):
#     # 如果请求方法不是POST，则返回一个空响应
#     if request.method != 'POST':
#         return HttpResponse()
#
#     # 处理POST请求
#     # 在这里添加你想要执行的代码，比如从数据库获取数据或进行某些计算
#
#     # 生成响应HTML内容
#     response_html = '<h2>Hello, world!</h2>'
#     # 返回响应
#     return HttpResponse(response_html)
#
#
# def data(request):
#     return JsonResponse({
#         'title': 'Hello, world!',
#         'description': 'This is a Django + React project.',
#     })

# def login(request):
User = get_user_model()
@csrf_exempt
def register(request):
    error = 'register not allowed'

    if request.method == "POST":
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        password = data['password']
        email = data['email']
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
        except:
            return JsonResponse({'error': 'already exist'})
        # if user != None:
        return JsonResponse({'success': 'create accout succeed'})
        # else:
        #     return JsonResponse({'error':'already exist'})
    return JsonResponse({"error": error})
    # return JsonResponse({"error": error})
        # render(request, "register.html", {"form": form})
# def index(request):
#     return render(request, '')
#
# def hello_world(request):
#     data = {'message': 'Hello World!'}
#     return JsonResponse(data)
@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        password = data['password']

        # 检查用户名和密码是否正确
        user = authenticate(username=username, password=password)

        if user is not None:
            # 检查用户是否激活
            if user.is_active:
                if user.is_superuser:
                    login(request, user)
                    return JsonResponse({"message": 'admin'})
                else:
                    # 登录用户
                    login(request, user)
                    return JsonResponse({"message": 'Welcome!'})

            else:
                return JsonResponse({"error": 'inactivate'})
        else:
            return JsonResponse({"error": 'password incorrect'})

    return JsonResponse({"error": 'not required message'})


@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({"massage": 'success'})




# @csrf_exempt
# def user_forgot(request):
#     if request.method == 'POST':
#         json_data = request.body.decode('utf-8')
#         data = json.loads(json_data)
#         username = data['username']
#         password = data['password']
#         # 检查用户是否存在
#         cur_user = get_object_or_404(User, username=username)
#         # if cur_user is not None:
#         #     cur_user.password = password
#         #     cur_user.save()
#         #     return JsonResponse({"success": 'Password has been changed!'})
#         # else:
#         #     return JsonResponse({"error": 'This user does not exist!'})
#
#         if cur_user is not None:
#             check = check_password(password, cur_user.password)
#             cur_user.set_password(password)
#             cur_user.save()
#             return JsonResponse({"success": 'Password has been changed!'})
#         else:
#             return JsonResponse({"error": 'This user does not exist!'})

@csrf_exempt
def user_profile_change(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        email = data['email']
        # old_name = data['oldname']
        cur_user = get_object_or_404(User, username=username)
        if cur_user is not None:
            cur_user.email = email
            cur_user.save()
            return JsonResponse({"success": 'Profile has been changed!'})
        else:
            return JsonResponse({"error": 'This user does not exist!'})

@csrf_exempt
def user_upgrade(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        # email = data['email']
        user=User.objects.get(username=username)
        if user is not None:
            user.is_staff = True
            user.is_superuser = True
            user.save()
            return JsonResponse({"success": 'User has been changed to SUP!'})
        else:
            return JsonResponse({"error": 'ERROR'})

@csrf_exempt
def user_profile(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        try:
            user = User.objects.get(username=username)
            email = user.email
            bio = user.bio
            image = user.images.order_by('-id').first()  # 获取最新上传的图像
            # print(image)
            # print(image.image.url)
            image_path = image.image.path
            # image_url = image.image.url if image else None  # 如果有图像，则获取其 URL，否则设为 None
            with open(image_path, 'rb') as image_file:
                bytesio = BytesIO(image_file.read())

            # Open the image from the BytesIO object
            image = Image.open(bytesio)

            # Convert the image to a base64-encoded string
            image_data = base64.b64encode(bytesio.getvalue()).decode('utf-8')
            mime_type = image_path.split('.')[-1]
            # Combine the data URI prefix with the image data
            data_uri = f"data:{mime_type};base64,{image_data}"
            return JsonResponse({"name":username,"email": email,"image":data_uri,"bio":bio})
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"})


@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        # try:
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['name']  # 获取当前用户
        user = User.objects.get(username=username)
        image_data = data['thumbnail']  # 获取上传的图像数据
        # 将数据按逗号分割，得到文件类型和编码后的数据
        file_type, file_data = image_data.split(',', 1)
        # 解码数据，得到二进制格式的文件内容
        image_content = base64.b64decode(file_data)
        # 构造保存文件的路径和文件名
        file_path = os.path.join(settings.MEDIA_ROOT, 'images', user.username)
        # 如果目录不存在，则创建目录
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_name = f'{uuid.uuid4().hex}.jpg'
        file_full_path = os.path.join(file_path, file_name)
        # 将文件内容写入磁盘
        with open(file_full_path, 'wb') as f:
            f.write(image_content)
        # 创建 ImageModel 对象，并将文件路径保存到数据库中
        new_record = ImageModel.objects.create(user=user, image=file_full_path)
        return JsonResponse({'status': 'success'})
        # except Exception as e:
        #     print(str(e))
        #     return JsonResponse({'error': 'error'})


# @csrf_exempt
# def send_verification_code(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return JsonResponse({'status': 'error', 'message': '该电子邮件地址没有注册。'})
#
#         # 生成 6 位随机数字作为验证码
#         verification_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
#
#         # 发送验证码电子邮件
#         subject = '验证码'
#         message = f'你的验证码是：{verification_code}'
#         from_email = 'luojuehao@gmail.com'
#         recipient_list = [email]
#         send_mail(subject, message, from_email, recipient_list)
#
#         # 将验证码保存到数据库或 Redis 等缓存中，以便在后续的请求中进行验证
#         request.session['verification_code'] = verification_code
#         request.session['email'] = email
#
#         return JsonResponse({'status': 'ok', 'message': '验证码已发送到您的电子邮件。'})
#     else:
#         return JsonResponse({'status': 'error', 'message': '仅支持 POST 请求。'})
# @csrf_exempt
# def verify_code(request):
#     # 获取用户提交的验证码和邮箱
#     code = request.POST.get('code')
#     email = request.POST.get('email')
#
#     # 获取验证码对应的 Session 值
#     session_code = request.session.get('code')
#
#     # 判断验证码是否正确
#     if code == session_code:
#         # 验证码正确，执行登录操作
#         user = authenticate(email=email)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'success': True, 'message': '登录成功'})
#         else:
#             return JsonResponse({'success': False, 'message': '登录失败'})
#     else:
#         # 验证码错误，返回错误信息
#         return JsonResponse({'success': False, 'message': '验证码错误'})
temp_code=''
@csrf_exempt
def user_forgot(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        password = data['password']
        # email = data['email']
        code = data['token']
        global temp_code
        if code == temp_code:
            user = User.objects.get(username=username)
            if user is not None:
                check = check_password(password, user.password)
                user.set_password(password)
                user.save()
                return JsonResponse({"success": 'Password has been changed!'})
            else:
                return JsonResponse({"error": 'This user does not exist!'})
        else:
            return JsonResponse({"error": 'invalid verification code'})
    else:
        return JsonResponse({"error": 'Only POST requests are supported.'})

@csrf_exempt
def send_verification_code(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        email = data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'This email address is not registered.'})

        # 生成 6 位随机数字作为验证码
        verification_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])

        # 发送验证码电子邮件
        subject = '验证码'
        message = f'你的验证码是：{verification_code}'
        from_email = 'luojuehao@gmail.com'
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        global temp_code
        temp_code=verification_code
        # 将验证码保存到数据库或 Redis 等缓存中，以便在后续的请求中进行验证
        # request.session['code'] = verification_code
        # request.session['email'] = email

        return JsonResponse({'status': 'ok', 'message': 'The verification code has been sent to your email.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are supported.'})