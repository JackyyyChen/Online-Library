import datetime

from django.db.models import Q
from django.shortcuts import render, get_object_or_404

# Create your views here.
from Userapp.models import User
from bookapp.models import Book
from Collection.models import Collection, Goalnumber, Finished
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from rest_framework.utils import json

@csrf_exempt
def select_which_collection(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']

        user = get_object_or_404(User, username=username)
        user_id = user.id

        have_this_user_exist = Collection.objects.filter(user_id=user_id).exists()
        if have_this_user_exist:
            user_collection = Collection.objects.filter(user_id=user_id)
            result = []
            for c in user_collection:
                if c.name not in result:
                    result.append(c.name)
            return JsonResponse({'collections': result})
        else:
            return JsonResponse({'error': 'user does not exist!'})




@csrf_exempt
def add_to_collection(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        book_id = data['book_id']
        username = data['username']
        name = data['name']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        this_book = get_object_or_404(Book, id=book_id)
        if name == 'finished':
            try:
                Finished(user_id=user_id, book_id=book_id, name=name).save()
                return JsonResponse({'message': 'create success'})
            except:
                return JsonResponse({'error': 'cannot create'})
        collection_exist = Collection.objects.filter(user_id=user_id, name=name).exists()
        if collection_exist:
            book_exist = Collection.objects.filter(user_id=user_id, name=name, book_id=book_id).exists()
            if book_exist:
                return JsonResponse({'error': 'Book already exist!'})
            else:
                Collection(user_id=user_id, book_id=book_id, name=name).save()
                return JsonResponse({'id': book_id, 'title': this_book.title, 'author': this_book.author,
                                     'publisher': this_book.publisher, 'publication_date': this_book.publication_date,
                                     'category': this_book.category})
        else:
            return JsonResponse({'message': 'Collection does not exist!'})

@csrf_exempt
def add_new_collection(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        name = data['name']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        Collection(user_id=user_id, name=name).save()

        return JsonResponse({'message': 'create success!'})

@csrf_exempt
def view_Fav(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        user_collection = Collection.objects.filter(user_id=user_id)
        result = []
        for i in user_collection:
            if i.name not in result:
                result.append(i.name)

        return JsonResponse({'collection_names': result})

@csrf_exempt
def view_other_Fav(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        user_collection = Collection.objects.filter(user_id=user_id).exclude(Q(name='finished'))
        result = []
        for i in user_collection:
            if i.name not in result:
                result.append(i.name)
        return JsonResponse({'collection_names': result})

@csrf_exempt
def view_collection(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        name = data['name']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        if name == 'finished':
            user_collection = Finished.objects.filter(user_id=user_id, name=name)
            book_list = {}
            for book in user_collection:
                if book.book_id is not None:
                    this_book = Book.objects.get(id=book.book_id)
                    book_list[book.id] = {'id': book.book_id, 'title': this_book.title, 'author': this_book.author,
                                          'publisher': this_book.publisher,
                                          'publication_date': this_book.publication_date,
                                          'category': this_book.category}
            return JsonResponse({'book_list': book_list})
        user_collection_exist = Collection.objects.filter(user_id=user_id, name=name).exists()
        if user_collection_exist:
            user_collection = Collection.objects.filter(user_id=user_id, name=name).exclude(Q(name='finished'))
            book_list = {}
            for book in user_collection:
                if book.book_id is not None:
                    this_book = Book.objects.get(id=book.book_id)
                    book_list[book.id] = {'id': book.book_id, 'title': this_book.title, 'author': this_book.author,
                                        'publisher': this_book.publisher, 'publication_date': this_book.publication_date,
                                        'category': this_book.category}
            return JsonResponse({'book_list': book_list})
        else:
            return JsonResponse({'error': 'Collection does not exist!'})

@csrf_exempt
def view_other_collection(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        name = data['name']

        user = get_object_or_404(User, username=username)
        user_id = user.id
        user_collection_exist = Collection.objects.filter(user_id=user_id, name=name).exists()
        if user_collection_exist:
            user_collection = Collection.objects.filter(user_id=user_id, name=name).exclude(Q(name='finished'))
            book_list = {}
            for book in user_collection:
                if book.book_id is not None:
                    this_book = Book.objects.get(id=book.book_id)
                    book_list[book.id] = {'id': book.book_id, 'title': this_book.title, 'author': this_book.author,
                                        'publisher': this_book.publisher, 'publication_date': this_book.publication_date,
                                        'category': this_book.category}
            return JsonResponse({'book_list': book_list})
        else:
            return JsonResponse({'error': 'Collection does not exist!'})

@csrf_exempt
def delete_collection_book(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        book_id = data['book_id']
        name = data['name']

        user = User.objects.get(username=username)
        user_id = user.id
        this_collection = Collection.objects.get(user_id=user_id, book_id=book_id, name=name)
        this_collection.delete()

        user_collection_exist = Collection.objects.filter(user_id=user_id, name=name).exists()
        if user_collection_exist:
            user_collection = Collection.objects.filter(user_id=user_id, name=name)
            book_list = {}
            for book in user_collection:
                if book.book_id is not None:
                    this_book = Book.objects.get(id=book.book_id)
                    book_list[book.id] = {'id': book.book_id, 'title': this_book.title, 'author': this_book.author,
                                          'publisher': this_book.publisher,
                                          'publication_date': this_book.publication_date,
                                          'category': this_book.category}
            return JsonResponse({'message': 'delete success!', 'book_list': book_list})
        else:
            return JsonResponse({'error': 'Collection does not exist!'})


@csrf_exempt
def show_top(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        name = data['name']

        user = User.objects.get(username=username)
        user_id = user.id
        collections = Collection.objects.filter(user_id=user_id, name=name).order_by('-id')
        top_10_collections = collections[:10]
        book_list = {}
        for book in top_10_collections:
            if book.book_id is not None:
                this_book = Book.objects.get(id=book.book_id)
                book_list[book.id] = {'id': book.book_id, 'title': this_book.title, 'author': this_book.author,
                                      'publisher': this_book.publisher,
                                      'publication_date': this_book.publication_date,
                                      'category': this_book.category}
        return JsonResponse({'book_list': book_list})

@csrf_exempt
def add_goal(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        goal = data['bookNumber']

        user = User.objects.get(username=username)
        user_id = user.id
        user_goal_exist = Goalnumber.objects.filter(user_id=user_id).exists()
        if user_goal_exist:
            user_goal = Goalnumber.objects.get(user_id=user_id)
            user_goal.goal = goal
            user_goal.save()
            return JsonResponse({'message': 'update success!'})
        else:
            user_goal = Goalnumber(user_id=user_id, goal=goal)
            user_goal.save()
            return JsonResponse({'message': 'add success!'})


def count_remain_days(user_id):
    today = datetime.datetime.now()
    plantoread_books_count = Goalnumber.objects.get(user_id=user_id).goal
    day_per_book = 30 / int(plantoread_books_count)

    start_date = Finished.objects.filter(user_id=user_id).order_by('created_at').first().created_at
    start_date = start_date.date()
    thirty_days_later = start_date + datetime.timedelta(days=30)
    already_go_days = (today.date() - start_date).days
    remain_days = (thirty_days_later - today.date()).days
    remain_unread_books_count = int(plantoread_books_count) - Finished.objects.filter(user_id=user_id).count()
    planned_finish_date = start_date + datetime.timedelta(days=remain_unread_books_count * day_per_book)
    return {'already_go_days': already_go_days, 'remain_days': remain_days,
            'planned_finish_date': planned_finish_date}

@csrf_exempt
def see_remain_days(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)

        try:
            username = data['username']
            print(username)
        except:
            return JsonResponse({'error': 'not approprate informations'})
        user = User.objects.get(username=username)
        user_id = user.id
        # try:
        remain_days = count_remain_days(user_id)
        try:
            return JsonResponse({'success': remain_days})
        except:
            return JsonResponse({'error': 'cannot create'})

