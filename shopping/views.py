from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from bookapp.models import Book
from Userapp.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from rest_framework.utils import json
from django.db.models import Q
from shopping.models import Cart

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        book_id = data['book_id']
        user_id = data['user_id']
        # 判断Book数据库里有没有这本书
        book_in_Book = get_object_or_404(Book, id=book_id)
        # 判断Cart数据库里有没有这本书
        book_in_Cart = Cart.objects.filter(Q(book=book_in_Book), Q(user_id=user_id))
        if book_in_Cart:
            this_user_cart = get_object_or_404(Cart, book=book_in_Book, user_id=user_id)
            this_user_cart.quantity += 1
            this_user_cart.save()
        else:
            Cart(user_id=user_id, book=book_in_Book, quantity=1).save()
        return redirect('view_cart')

@csrf_exempt
def update_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        action = data['action']
        cart_id = data['cart_id']

        cart_item = get_object_or_404(Cart, id=cart_id)

        if action == 'add':
            cart_item.quantity += 1
        elif action == 'remove':
            cart_item.quantity -= 1

        if cart_item.quantity < 1:
            cart_item.delete()
        else:
            cart_item.save()
        return redirect('view_cart')

@csrf_exempt
def view_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        user_id = data['user_id']
        user_cart = Cart.objects.filter(Q(user_id=user_id))

        total = 0
        if user_cart:
            for item in user_cart:
                total += item.book.price * item.quantity
            return JsonResponse({"total": total})
        else:
            return JsonResponse({'message': 'The shopping cart is empty, go shopping!'})

@csrf_exempt
def user_transfer(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['userName']
        get_user = User.objects.get(username=username)
        if get_user:
            return JsonResponse({'ID': get_user.id})
        else:
            return JsonResponse({'error': 'This user does not exist!'})




