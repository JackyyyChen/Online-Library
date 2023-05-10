import base64
import itertools
import json
import os
import random
import re
import string
import subprocess
import sys
import uuid

import numpy as np
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.db.models import Q

from userapp.models import User, ImageModel, Questions, UserFeedback
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import UserManager
from django.core.checks import Tags
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from userapp.models import User
from collection.models import Collection, Finished, Goalnumber
from shopping.models import Cart, Order
from bookmanagement import settings
from io import BytesIO
from PIL import Image
import base64


from userapp.models import User


def my_view(request):

    if request:
        # 返回 JSON 格式的响应消息
        return JsonResponse({'message': 'Hello world!'})
    else:
        # 返回错误消息
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

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
            Collection(user_id=user.id, name='finished').save()
            Collection(user_id=user.id, name='main').save()
        except:
            return JsonResponse({'error': 'already exist'})
        # if user != None:
        return JsonResponse({'success': 'create accout succeed'})
        # else:
        #     return JsonResponse({'error':'already exist'})
    return JsonResponse({"error": error})

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
                if user.isagent:
                    login(request, user)
                    return JsonResponse({"message": 'agent'})
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
            return JsonResponse({"error": 'password incorrect or user not exist'})

    return JsonResponse({"error": 'not required message'})


@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({"massage": 'success'})


@csrf_exempt
def user_profile_change(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        email = data['email']
        bio=data['bio']
        # old_name = data['oldname']
        cur_user = get_object_or_404(User, username=username)
        if cur_user is not None:
            cur_user.email = email
            cur_user.bio=bio
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
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"})

        email = user.email
        bio = user.bio
        image = user.images.order_by('-id').first()  # 获取最新上传的图像
            # print(image)
            # print(image.image.url)
        try:
            image_path = image.image.path
        except:
            return JsonResponse({"name": username, "email": email, "image": "NULL", "bio": bio})
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



@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        # try:
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['name']
        user = User.objects.get(username=username)
        image_data = data['thumbnail']
        file_type, file_data = image_data.split(',', 1)
        image_content = base64.b64decode(file_data)
        file_path = os.path.join(settings.MEDIA_ROOT, 'images', user.username)
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_name = f'{uuid.uuid4().hex}.jpg'
        file_full_path = os.path.join(file_path, file_name)
        with open(file_full_path, 'wb') as f:
            f.write(image_content)
        new_record = ImageModel.objects.create(user=user, image=file_full_path)
        return JsonResponse({'status': 'success'})



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
        username = data['username']
        try:
            user = User.objects.get(username=username, email=email)
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'This email address is not registered.'})


        verification_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        subject = '验证码'
        message = f'你的验证码是：{verification_code}'
        from_email = 'luojuehao@gmail.com'
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        global temp_code
        temp_code=verification_code


        return JsonResponse({'status': 'ok', 'message': 'The verification code has been sent to your email.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are supported.'})





# ===========================chatbot=================================


def create_vector_dict():
    vector_dict = {}

    for question in Questions.objects.all():
        question_doc = nlp(question.question)
        vector_dict[question.id] = question_doc.vector

    return vector_dict

if settings.RUNSERVER:
    import spacy
    nlp = spacy.load('en_core_web_md')
    print('Loading spaCy model...')
    vector_dict = create_vector_dict()
    print('spaCy model loaded.')
    print('\n')
    from ChatRWKV.v2.chat import on_message

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def find_similar_question(input_text, username):
    input_doc = nlp(input_text)
    max_similarity = 0
    most_similar_question = None
    try:
        user_id = User.objects.get(username=username).id
    except User.DoesNotExist:
        return on_message(input_text)
    for question in Questions.objects.all():
        if question.id not in vector_dict:
            continue

        similarity = cosine_similarity(input_doc.vector, vector_dict[question.id])

        if similarity > max_similarity:
            max_similarity = similarity
            most_similar_question = question
    keyword_dict = {'ORDER': 'order', 'DELIVERY': 'delivery', 'FEEDBACK': 'feedback', 'PAYMENT': 'payment',
                    'REFUND': 'refund',
                    'SHIPPING_ADDRESS': 'shipping_address', 'ACCOUNT': 'account', 'CONTACT': 'contact'}

    if max_similarity > 0.9:
        if most_similar_question.answer in keyword_dict.keys():
            agent_response = generate_response(most_similar_question.answer, user_id)
            return agent_response['message']


    else:
        return on_message(input_text)



def generate_response(keyword,user_id):
    keyword_dict = {'ORDER':'order','DELIVERY': 'delivery', 'FEEDBACK': 'feedback', 'PAYMENT': 'payment', 'REFUND': 'refund',
                    'SHIPPING_ADDRESS': 'shipping_address'}
    responses = {}

    if keyword == 'ACCOUNT':
        responses['message'] = ["You can manage your account and orders on our website or contact human agent."]
        return responses
    elif keyword == 'CONTACT':
        responses['message'] = ["You can contact us by email. Our contact information is below the homepage.\n"]
        return responses
    elif keyword == 'ORDER':
        condition = Q(user_id=user_id)
        orders = Order.objects.filter(condition)
        if orders.exists():
            response=''
            for order in orders:
                response += f"The {order.status} order with ID {order.id} was created on {order.created_at}.\n"
            response+=f" If you want to manage your orders, please visit our order website or contact human agent."
            responses['message'] = response
            return responses
        else:
            responses['message'] = "You don't have current order. If you want to manage your orders, please visit our order website or contact human agent."
            return responses
    elif keyword in keyword_dict:
        condition = Q(user_id=user_id)
        condition &= Q(**{keyword_dict[keyword]: True})
        orders = Order.objects.filter(condition)
        if orders.exists():
            number = 0
            response = ''
            for order in orders:
                number += 1
                response = f"The {order.status} order with ID {order.id} was created on {order.created_at}."
                if keyword == 'SHIPPING_ADDRESS':
                    response += f" The shipping address is {order.shipping_address}."
                elif keyword == 'CANCELLATION_FEE':
                    response += f"Please contact human agent to get The cancellation fee."
                elif keyword == 'PAYMENT':
                    response += f" The payment method is {order.payment}."
                elif keyword == 'REFUND':
                    response += f" The refund state is {order.refund}."
                elif keyword == 'FEEDBACK':
                    response += f" The customer feedback is {order.feedback}."
                elif keyword == 'DELIVERY':
                    response += f" The delivery information is {order.delivery}."
                response+=f"\n"
            responses['message'] = response
            if responses == []:
                responses['message'] = "I'm sorry, I couldn't find any orders matching your search."
            return responses
        else:
            responses['message'] = ["I'm sorry, I couldn't find any orders matching your search."]
            return responses


#
@csrf_exempt
def chat_bot(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        question = data['question']
        # insert data into table
        username = data['username']


        if question:
            if username is None:
                response = on_message(question)
                return JsonResponse({"message": response})
            else:
                response = find_similar_question(question, username)
                if response:
                    return JsonResponse({"message": response})
                else:
                    return JsonResponse({'status': 'error',"message": "No matching question found"})
        else:
            return JsonResponse({'status': 'error',"message": "Empty request"})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are supported.'})
#  ==============================================================
@csrf_exempt
def homepage_user_agent_func(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        content = data['content']
        isagent= data['isagent']
        if isagent=='agent':
            if username and content:
                try:
                    email_address = User.objects.get(username=username).email

                except User.DoesNotExist:
                    return JsonResponse({'status': 'error', 'message': 'User does not exist.'})
                subject = 'feedback'
                message = content
                from_email = 'luojuehao@gmail.com'
                recipient_list = [email_address]
                try:
                    send_mail(subject, message, from_email, recipient_list)
                    return JsonResponse({'status': 'ok', 'message': 'Agent sent email successfully.'})
                except:
                    return JsonResponse({'status': 'error', 'message': 'Agent sent email failed.'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Empty request'})
        else:
            if username and content:

                try:
                    user_id = User.objects.get(username=username).id
                except User.DoesNotExist:
                    return JsonResponse({'status': 'error', 'message': 'User does not exist.'})
                UserFeedback.objects.create(user_id=user_id, question=content)
                return JsonResponse({'status': 'ok', 'message': 'User sent feedback successfully.'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Empty request'})

