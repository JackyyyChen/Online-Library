from django.db.models import Avg
from django.shortcuts import render, get_object_or_404

# Create your views here.
from bookapp.models import Book
from Rating.models import Rating


def book_average_rating(book):
    average_rating = Rating.objects.filter(isbn=book).aggregate(Avg('rating'))['rating__avg']
    return average_rating

# def get_books_above_user_rating(user_rating):
#     # 使用 join 操作将 Book 和 Rating 表连接起来，并筛选出高于用户给定分数的图书
#     books_above_user_rating = Book.objects.filter(rating__rating__gte=user_rating).join(Rating)
#
#     return books_above_user_rating


# def book_average_rating(book_isbn):
#
#     average_rating = Rating.objects.filter(isbn_id=book_isbn).aggregate(Avg('rating'))['rating__avg']
#     if average_rating is not None:
#         return round(average_rating, 2)
#     else:
#         return 0.0

# def book_average_rating(book_isbn):
#     try:
#         book = Book.objects.get(isbn=book_isbn)
#     except Book.DoesNotExist:
#         return None
#     average_rating = Rating.objects.filter(isbn_id=book.isbn).aggregate(Avg('rating'))['rating__avg']
#     if average_rating is None:
#         return 0.0
#     return round(float(average_rating), 2)

# def book_average_rating(isbn):
#     # 使用 ISBN 编号来筛选评分信息
#     average_rating = Rating.objects.filter(isbn_id=isbn).aggregate(Avg('rating'))['rating__avg']
#     if average_rating is not None:
#         return round(average_rating, 2)
#     else:
#         return 0.0

# def get_books_above_avg_rating(avg_rating):
#     # 计算所有图书的平均评分
#     all_books_avg_rating = Book.objects.aggregate(Avg('rating'))['rating__avg']
#
#     # 筛选高于给定平均分的图书
#     books_above_avg_rating = Book.objects.filter(rating__gt=avg_rating)
#
#     return books_above_avg_rating
