from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.utils import json
from django.db.models import Q
from bookapp.models import Book
from Rating.views import book_average_rating
# from .models import Book
from django.db.models import Avg


def books_paginator(books, page):
    paginator = Paginator(books, 10)
    if page is None:
        page = 1
    books = paginator.page(page)
    return books
@csrf_exempt
def book_quary(request):
    if request.method == 'GET':
        # json_data = request.body.decode('utf-8')
        # data = json.loads(json_data)
        # if data['message']=='book_quary':
        books = Book.objects.values('category', 'title', 'author', 'url', 'id')[:10]
        temp_dict ={}
        send_list=[]
        for book in books:
            temp_dict['title']=book['title']
            temp_dict['category']=book['category']
            temp_dict['author']=book['author']
            temp_dict['url']=book['url']
            temp_dict['id'] = book['id']
            send_list.append(temp_dict)
            temp_dict={}
        return JsonResponse({"book": send_list})

# @csrf_exempt
# def book_search(request):
#     if request.method == 'POST':
#         json_data = request.body.decode('utf-8')
#         data = json.loads(json_data)
#         author = data['author']
#         title = data['title']
#         isbn = data['isbn']
#         # avg_rating = data['avg_rating']
#         # if avg_rating:
#         if isbn:
#             books = Book.objects.filter(Q(isbn=isbn))
#         elif author and title is None and isbn is None:
#             books = Book.objects.filter(Q(author=author))
#         elif title and isbn is None and author is None:
#             books = Book.objects.filter(Q(title=title))
#         elif author and title and isbn is None:
#             books = Book.objects.filter(Q(author=author) or Q(title=title))
#         else:
#             return JsonResponse({"error": 'Please enter in the correct format!'})
#         book_list = []
#
#         for book in books:
#             book_list.append({'title': book.title, 'author': book.author,
#                               'publication_date': book.publication_date, 'image': book.url})
#         return JsonResponse({'book_list': book_list})

@csrf_exempt
def book_detail(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        book_id = data['id']
        get_book = Book.objects.get(id=book_id)
        if get_book:
            return JsonResponse({'title': get_book.title, 'author': get_book.author,
                                 'publication_date': get_book.publication_date,
                                 'publisher': get_book.publisher, 'url': get_book.url,
                                 'category': get_book.category, 'price': get_book.price})
        else:
            return JsonResponse({'error': 'This book does not exist!'})



@csrf_exempt
def book_search(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)

        if 'avg_rating' in data:
            avg_rating = data['avg_rating']
            if 'isbn' in data and 'title' not in data and 'author' not in data:
                isbn = data['isbn']
                books = Book.objects.filter(Q(isbn=isbn))
            elif 'author' in data and 'title' not in data and 'isbn' not in data:
                author = data['author']
                books = Book.objects.filter(Q(author=author))
            elif 'title' in data and 'isbn' not in data and 'author' not in data:
                title = data['title']
                books = Book.objects.filter(Q(title=title))
            elif 'isbn' in data and 'title' in data and 'author' not in data:
                isbn = data['isbn']
                title = data['title']
                books = Book.objects.filter(Q(isbn=isbn), Q(title=title))
            elif 'isbn' in data and 'author' in data and 'title' not in data:
                isbn = data['isbn']
                author = data['author']
                books = Book.objects.filter(Q(isbn=isbn), Q(author=author))
            elif 'author' in data and 'title' in data and 'isbn' not in data:
                author = data['author']
                title = data['title']
                books = Book.objects.filter(Q(author=author), Q(title=title))
            elif 'isbn' in data and 'author' in data and 'title' in data:
                author = data['author']
                title = data['title']
                isbn = data['isbn']
                books = Book.objects.filter(Q(isbn=isbn), Q(author=author), Q(title=title))
            else:
                return JsonResponse({"error": 'Please enter in the correct format!'})

            if books == []:
                return JsonResponse({"error": 'No books!'})
            else:
                book_list = {}
                for book in books:
                    rating_point = book_average_rating(book)
                    if str(rating_point) >= str(avg_rating):
                        book_list[book.id] = {'title': book.title, 'author': book.author,
                                          'publication_date': book.publication_date, 'image': book.url}

            if book_list == {}:
                return JsonResponse({"error": 'No books above the given score!'})
            else:
                return JsonResponse({'book_list': book_list})

        elif 'avg_rating' not in data:
            if 'isbn' in data and 'title' not in data and 'author' not in data:
                isbn = data['isbn']
                books = Book.objects.filter(Q(isbn=isbn))
            elif 'author' in data and 'title' not in data and 'isbn' not in data:
                author = data['author']
                books = Book.objects.filter(Q(author=author))
            elif 'title' in data and 'isbn' not in data and 'author' not in data:
                title = data['title']
                books = Book.objects.filter(Q(title=title))
            elif 'isbn' in data and 'title' in data and 'author' not in data:
                isbn = data['isbn']
                title = data['title']
                books = Book.objects.filter(Q(isbn=isbn), Q(title=title))
            elif 'isbn' in data and 'author' in data and 'title' not in data:
                isbn = data['isbn']
                author = data['author']
                books = Book.objects.filter(Q(isbn=isbn), Q(author=author))
            elif 'author' in data and 'title' in data and 'isbn' not in data:
                author = data['author']
                title = data['title']
                books = Book.objects.filter(Q(author=author), Q(title=title))
            elif 'isbn' in data and 'author' in data and 'title' in data:
                author = data['author']
                title = data['title']
                isbn = data['isbn']
                books = Book.objects.filter(Q(isbn=isbn), Q(author=author), Q(title=title))
            else:
                return JsonResponse({"error": 'Please enter in the correct format!'})

            if books == []:
                return JsonResponse({"error": 'No books!'})
            else:
                book_list = {}
                for book in books:
                    book_list[book.id] = {'title': book.title, 'author': book.author,
                                      'publication_date': book.publication_date, 'image': book.url}
                return JsonResponse({'book_list': book_list})








