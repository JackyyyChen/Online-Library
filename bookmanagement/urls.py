"""bookmanagement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.template.defaulttags import url
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

import collection.views
import bookapp
import shopping.views
import game.views
import rating.views
# from api import LoginView,LogoutView
# from userapp.views import double_number,home_view,my_view,html_view,App,test
import userapp.views
from bookapp.views import book_quary
# urlpatterns = [
#     # path('register/', LogoutView.get, name='logout'),
#     path('http://localhost:8000/login', double_number, name='login'),
#     path('admin/', admin.site.urls),
# ]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('addBookNumber/', shopping.views.plusone_cart, name='addBookNumber'),
    path('reduceBookNumber/', shopping.views.minusone_cart, name='reduceBookNumber'),
    # chatbot
    path('sentText/', userapp.views.chat_bot, name='sentText'),
    path('getShoppingBooks/', shopping.views.view_cart, name='getShoppingBooks'),
    path('getThisUser/', shopping.views.user_transfer, name='getThisUser'),
    path('addToCart/', shopping.views.add_to_cart, name='addToCart'),
    path('getThisUser/', shopping.views.user_transfer, name='getThisUser'),
    path('addToCart/', shopping.views.add_to_cart, name='addToCart'),
    path('book_quary/', book_quary, name='my_view'),
    path('searchResult/', bookapp.views.book_search, name='searchResult'),
    path('getThisBook/', bookapp.views.book_detail, name='book_detail'),
    path('uploadimage/', userapp.views.upload_image, name='upload_image'),
    path('profile/', userapp.views. user_profile, name='profile'),
    path('profile/edit/', userapp.views. user_profile_change, name='profile_edit'),
    path('user_upgrade/', userapp.views. user_upgrade, name='user_upgrade'),
    path('resetPW/', userapp.views. user_forgot, name='resetPW'),
    path('logout/', userapp.views. user_logout, name='logout'),
    path('login/', userapp.views. user_login, name='login'),
    path('register/', userapp.views. register, name='register'),
    path('getCode/', userapp.views.send_verification_code, name='getCode'),
    path('homepage_user_agent_func/', userapp.views.homepage_user_agent_func, name='homepage_user_agent_function'),
    path('questions/', game.views.game_question, name='questions'),
    path('leaderboard/', game.views.leaderboard_score, name='leaderboard'),
    path('updateleaderboard/', game.views.add_score, name='updateleaderboard'),
    path('writeReview/', rating.views.add_review_and_rating, name='writeReview'),
    path('deletOrder/', shopping.views.order_delete, name='deletOrder'),
    path('uploadPayForm/', shopping.views.add_order_record, name='uploadPayForm'),
    path('getOrder/', shopping.views.view_order_record, name='getOrder'),
    # shopping_cart
    path('deletFromCart/', shopping.views.delete_item, name='deletFromCart'),
    path('addBookNumber/', shopping.views.plusone_cart, name='addBookNumber'),
    path('reduceBookNumber/', shopping.views.minusone_cart, name='reduceBookNumber'),
    path('getShoppingBooks/', shopping.views.view_cart, name='getShoppingBooks'),
    path('getThisUser/', shopping.views.user_transfer, name='getThisUser'),
    path('addToCart/', shopping.views.add_to_cart, name='addToCart'),



    path('searchResult/', bookapp.views.book_search, name='searchResult'),
    path('getThisBook/', bookapp.views.book_detail, name='book_detail'),
    # collection
    path('getTop10List/', collection.views.show_top, name='getTop10List'),
    path('clickOtherUserFolder/', collection.views.view_other_collection, name='clickOtherUserFolder'),
    path('getOtherUserFolders/', collection.views.view_other_Fav, name='getOtherUserFlders'),
    path('deletebookcollection/', collection.views.delete_collection_book, name='deletebookcollection'),
    path('addNewFolder/', collection.views.add_new_collection, name='addNewFolder'),
    path('clickThisFolder/', collection.views.view_collection, name='clickThisFolder'),
    path('getAllFolders/', collection.views.view_Fav, name='getAllFolders'),
    path('getUserFolders/', collection.views.select_which_collection, name='getUserFolders'),
    path('addToFolder/', collection.views.add_to_collection, name='addToFolder'),
    path('numberOfBook/', collection.views.add_goal, name='numberOfBook'),
    path('getUserGoal/', collection.views.see_remain_days, name='getUserGoal'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)