from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from bookapp.models import Book
from userapp.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from rest_framework.utils import json
from django.db.models import Q
from shopping.models import Cart
from shopping.models import Order


@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        book_id = data['book_id']
        user_id = data['user_id']
        book_in_Book = get_object_or_404(Book, id=book_id)
        book_in_Cart = Cart.objects.filter(Q(book=book_in_Book), Q(user_id=user_id))
        if book_in_Cart:
            this_user_cart = get_object_or_404(Cart, book=book_in_Book, user_id=user_id)
            this_user_cart.quantity += 1
            this_user_cart.save()
        else:
            Cart(user_id=user_id, book=book_in_Book, quantity=1).save()
        return JsonResponse({'message': 'success!'})


@csrf_exempt
def plusone_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        cart_id = data['cart_id']
        cart_item = get_object_or_404(Cart, id=cart_id)

        if cart_item:
            cart_item.quantity += 1
            cart_item.save()
            return JsonResponse({'message': 'success!'})
        else:
            return JsonResponse({'error': 'Without this book!'})

@csrf_exempt
def minusone_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        cart_id = data['cart_id']
        cart_item = get_object_or_404(Cart, id=cart_id)

        if cart_item:
            cart_item.quantity -= 1
            if cart_item.quantity < 1:
                cart_item.delete()
                return JsonResponse({'message': 'success!'})
            else:
                cart_item.save()
                return JsonResponse({'message': 'success!'})

        else:
            return JsonResponse({'message': 'Without this book!'})


@csrf_exempt
def view_cart(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['userName']
        get_user = User.objects.get(username=username)
        user_cart = Cart.objects.filter(Q(user_id=get_user.id))

        total = 0
        book_list = {}
        if user_cart:
            for item in user_cart:
                total += item.book.price * item.quantity
                book_list[item.id] = {'title': item.book.title, 'url': item.book.url, 'author': item.book.author,
                                      'price': round(item.book.price, 1), 'quantity': item.quantity}
            return JsonResponse({'book_list': book_list, 'total_price': round(total, 1)})

        else:
            return JsonResponse({'message': 'The shopping cart is empty, go shopping!'})

@csrf_exempt
def delete_item(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        cart_id = data['cart_id']
        Cart(id=cart_id).delete()

        return JsonResponse({'message': 'delete success!'})

@csrf_exempt
def text_bar(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        cart_id = data['cart_id']
        new_quantity = data['new_quantity']

        user = get_object_or_404(User, username=username)
        this_cart = Cart.objects.get(id=cart_id)
        this_cart.quantity = new_quantity
        this_cart.save()

        return JsonResponse({'message': 'quantity change success!'})

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

@csrf_exempt
def add_order_record(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['userName']
        total_price = data['total_price']
        shipping_address = data['address']
        payment = data['paymentMethod']
        delivery = data['shippingMethod']
        book_list = data['book_list']

        get_user = User.objects.get(username=username)

        all_str = str()
        for index in book_list:
            this_cart = Cart.objects.get(id=index)
            this_book = Book.objects.get(id=this_cart.book_id)
            info_str = str(this_book.title) + '**' + str(this_book.author) + '**' + str(this_cart.quantity) + '**' + str(round(float(this_book.price), 1)) + '**' + str(this_book.url)
            all_str += info_str + '##'

        Order(user_id=get_user.id, list_book=all_str, total_price=total_price, shipping_address=shipping_address, payment=payment, refund='unrefunded', delivery=delivery, status='confirmed').save()
        # 清除购物车
        for index in book_list:
            Cart(id=index).delete()
        return JsonResponse({'message': 'Pay Success!'})
@csrf_exempt
def view_order_record(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']

        user = get_object_or_404(User, username=username)
        user_order_exist = Order.objects.filter(user_id=user.id, refund='unrefunded', status='confirmed').exists()
        if user_order_exist:
            user_order = Order.objects.filter(user_id=user.id, refund='unrefunded', status='confirmed')
            order_list = {}
            for order in user_order:
                books_in_order = [x.split('**') for x in order.list_book.split('##')]
                order_list[order.id] = {'id': order.id, 'user_id': username,
                                        'books_in_order': books_in_order[:-1],
                                        'total_price': round(float(order.total_price), 1),
                                        'shipping_address': order.shipping_address,
                                        'payment': order.payment, 'refund': order.refund,
                                        'delivery': order.delivery, 'created_at': order.created_at,
                                        'updated_at': order.updated_at, 'status': order.status
                                        }
            return JsonResponse({'order_list': order_list})
        else:
            return JsonResponse({'error': 'Order record does not exist!'})

@csrf_exempt
def order_delete(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        order_id = data['order_id']

        user = get_object_or_404(User, username=username)
        this_order = Order.objects.get(id=order_id)
        this_order.status = 'cancelled'
        this_order.refund = 'refunded'
        this_order.save()

        return JsonResponse({'message': 'delete success!'})