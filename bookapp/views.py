from collections import defaultdict
import datetime

import numpy as np
import pandas as pd
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.utils import json
from django.db.models import Q

from Rating.models import Rating, Reviews
from bookapp.models import Book
from Rating.views import book_average_rating, get_recommandation_list
# from .models import Book
# from django.db.models import Avg
from surprise import SVD, KNNBasic, accuracy
from surprise.model_selection import cross_validate, train_test_split
# from surprise import dump
import pymysql
from surprise import Dataset
from surprise import Reader

def books_paginator(books, page):
    paginator = Paginator(books, 10)
    if page is None:
        page = 1
    books = paginator.page(page)
    return books
@csrf_exempt
# get all books
def book_quary(request):
    if request.method == 'GET':
        connection = connect_to_mysql()
        data = get_data_from_mysql(connection)
        connection.close()
        user_id = 15
        # recommend books
        quary_data = user_based_recommendation(data, user_id)
        for item in quary_data:
            print(item)
        print(f"for user {user_id} recommended ID：",quary_data)
        temp_dict={}
        send_list=[]
        # get book info
        for book_id in quary_data:
            book = Book.objects.get(id=int(book_id))
            temp_dict['title'] = book.title
            temp_dict['category'] = book.category
            temp_dict['author'] = book.author
            temp_dict['url'] = book.url
            temp_dict['id'] = book.id
            send_list.append(temp_dict)
            temp_dict = {}
        return JsonResponse({"book": send_list})
# get top n books
def get_top_n(predictions, n=500):
    top_n = {}
    for uid, iid, true_r, est, _ in predictions:
        if uid not in top_n:
            top_n[uid] = []
        top_n[uid].append((iid, est))

    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    return top_n
# get all books from top n users
def get_top_n_books(top_n, n=50):
    all_books = []
    for uid, user_ratings in top_n.items():
        all_books.extend(user_ratings)
    all_books.sort(key=lambda x: x[1], reverse=True)
    top_n_books = list(set(all_books))[:n]

    return top_n_books
# load data
def load_data(data):
    df = pd.DataFrame(data)
    reader = Reader(rating_scale=(1, 10))
    dataset = Dataset.load_from_df(df, reader)
    trainset, testset = train_test_split(dataset, test_size=0.2)
    algo = SVD()
    algo.fit(trainset)
    predictions = algo.test(testset)
    accuracy.rmse(predictions)
    top_n = get_top_n(predictions, n=50)
    print(top_n)
    top_10_books = get_top_n_books(top_n, n=20)
    result = [iid for (iid, _) in top_10_books]
    return result

# connect to mysql
def connect_to_mysql():
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="mysql",
        database="9900database"
    )
    return connection
# get data from mysql
def get_data_from_mysql(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT user_id, isbn_id, rating FROM rating_rating")
    result = cursor.fetchall()
    user_item_ratings = defaultdict(lambda: defaultdict(int))
    max_user_id = 0
    max_item_id = 0
    for row in result:
        userid, itemid, rating = row
        user_item_ratings[userid][itemid] = rating
        max_user_id = max(max_user_id, userid)
        max_item_id = max(max_item_id, itemid)
    matrix = np.zeros((max_user_id + 1, max_item_id + 1))
    for user_id in user_item_ratings:
        for item_id in user_item_ratings[user_id]:
            matrix[user_id, item_id] = user_item_ratings[user_id][item_id]

    return matrix

# compute similarity
def user_similarity(matrix):
    similarity_matrix = np.zeros((matrix.shape[0], matrix.shape[0]))
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[0]):
            if i == j:
                similarity_matrix[i, j] = 1
            else:
                uu = np.dot(matrix[i], matrix[i])
                vv = np.dot(matrix[j], matrix[j])
                if uu != 0 and vv != 0:
                    similarity_matrix[i, j] = 1 - (np.dot(matrix[i], matrix[j]) / np.sqrt(uu * vv))
                else:
                    similarity_matrix[i, j] = 0

    return similarity_matrix

# recommend books
def user_based_recommendation(matrix, user_id, top_n=15):
    similarity_matrix = user_similarity(matrix)
    user_ratings = matrix[user_id]
    weighted_ratings = np.dot(similarity_matrix[user_id], matrix)
    normalization_factor = np.abs(similarity_matrix[user_id]).sum()
    predicted_ratings = weighted_ratings / normalization_factor
    item_indices = np.argsort(predicted_ratings)[::-1][:top_n]
    return item_indices


@csrf_exempt
# get book detail
def book_detail(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        book_id = data['id']
        get_book = Book.objects.get(id=book_id)

        review_list = []
        # check if the book has reviews
        get_book_reviews_exist = Reviews.objects.filter(book_id=book_id).exists()
        if get_book_reviews_exist:
            get_book_reviews = Reviews.objects.filter(book_id=book_id)
            for review in get_book_reviews:
                review_list.append(review.reviews)

            return JsonResponse({'id': book_id, 'title': get_book.title, 'author': get_book.author,
                                 'avg_rating': "{:.2f}".format(book_average_rating(get_book.id)),
                                 'reviews': review_list, 'description': get_book.description,
                                'publication_date': get_book.publication_date,
                                'publisher': get_book.publisher, 'url': get_book.url,
                                'category': get_book.category, 'price': round(get_book.price, 1),
                                })
        else:
            return JsonResponse({'error': 'This book does not exist!'})


@csrf_exempt
# search book
def book_search(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        books = []
        # check if the book exists
        if 'avg_rating' in data:
            avg_rating = data['avg_rating']
            if 'category' in data and 'title' not in data and 'author' not in data:
                category = data['category']
                books = Book.objects.filter(Q(category=category))
            elif 'author' in data and 'title' not in data and 'category' not in data:
                author = data['author']
                books = Book.objects.filter(Q(author=author))
            elif 'title' in data and 'category' not in data and 'author' not in data:
                title = data['title']
                books = Book.objects.filter(Q(title=title))
            elif 'category' in data and 'title' in data and 'author' not in data:
                category = data['category']
                title = data['title']
                books = Book.objects.filter(Q(category=category), Q(title=title))
            elif 'category' in data and 'author' in data and 'title' not in data:
                category = data['category']
                author = data['author']
                books = Book.objects.filter(Q(category=category), Q(author=author))
            elif 'author' in data and 'title' in data and 'category' not in data:
                author = data['author']
                title = data['title']
                books = Book.objects.filter(Q(author=author), Q(title=title))
            elif 'category' in data and 'author' in data and 'title' in data:
                author = data['author']
                title = data['title']
                category = data['category']
                books = Book.objects.filter(Q(category=category), Q(author=author), Q(title=title))
            elif 'category' not in data and 'author' not in data and 'title' not in data:
                book_list = {}
                books = Book.objects.all()
                for book in books:
                    rating_point = book_average_rating(book.id)
                    if str(rating_point) >= str(avg_rating):
                        book_list[book.id] = {'id': book.id, 'title': book.title, 'author': book.author,
                                              'publication_date': book.publication_date, 'image': book.url,
                                              'price': round(book.price, 1), 'category': book.category,
                                              'avg_rating': rating_point}
                if book_list == {}:
                    return JsonResponse({"error": 'No books'})
                else:
                    return JsonResponse({'book_list': book_list})

            book_list = {}
            for book in books:
                rating_point = book_average_rating(book.id)
                if str(rating_point) >= str(avg_rating):
                    book_list[book.id] = {'id': book.id, 'title': book.title, 'author': book.author,
                                        'publication_date': book.publication_date, 'image': book.url,
                                          'price': round(book.price, 1), 'category': book.category,
                                          'avg_rating': rating_point}

            if book_list == {}:
                return JsonResponse({"error": 'No books'})
            else:
                return JsonResponse({'book_list': book_list})
        # check if the book exists
        elif 'avg_rating' not in data:
            if 'category' in data and 'title' not in data and 'author' not in data:
                category = data['category']
                books = Book.objects.filter(Q(category=category))
            elif 'author' in data and 'title' not in data and 'category' not in data:
                author = data['author']
                books = Book.objects.filter(Q(author=author))
            elif 'title' in data and 'category' not in data and 'author' not in data:
                title = data['title']
                books = Book.objects.filter(Q(title=title))
            elif 'category' in data and 'title' in data and 'author' not in data:
                category = data['category']
                title = data['title']
                books = Book.objects.filter(Q(category=category), Q(title=title))
            elif 'category' in data and 'author' in data and 'title' not in data:
                category = data['category']
                author = data['author']
                books = Book.objects.filter(Q(category=category), Q(author=author))
            elif 'author' in data and 'title' in data and 'category' not in data:
                author = data['author']
                title = data['title']
                books = Book.objects.filter(Q(author=author), Q(title=title))
            elif 'category' in data and 'author' in data and 'title' in data:
                author = data['author']
                title = data['title']
                category = data['category']
                books = Book.objects.filter(Q(category=category), Q(author=author), Q(title=title))
            else:
                return JsonResponse({"error": 'Please enter in the correct format!'})


            if books == []:
                return JsonResponse({'error': 'No books!'})
            else:
                book_list = {}
                for book in books:
                    book_list[book.id] = {'id': book.id, 'title': book.title, 'author': book.author,
                                      'publication_date': book.publication_date, 'image': book.url,
                                          'price': round(book.price,1), 'category': book.category,
                                          'avg_rating': book_average_rating(book.id)}
                return JsonResponse({'book_list': book_list})





