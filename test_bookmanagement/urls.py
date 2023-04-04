"""test_bookmanagement URL Configuration

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

import bookapp
import shopping.views
from api import LoginView,LogoutView
# from Userapp.views import double_number,home_view,my_view,html_view,App,test
from Userapp import views
from bookapp.views import book_quary
# urlpatterns = [
#     # path('register/', LogoutView.get, name='logout'),
#     path('http://localhost:8000/login', double_number, name='login'),
#     path('admin/', admin.site.urls),
# ]
urlpatterns = [
    path('getThisUser/', shopping.views.user_transfer, name='getThisUser'),
    path('addToCart/', shopping.views.add_to_cart, name='addToCart'),
    path('book_quary/', book_quary, name='my_view'),
    path('searchResult/', bookapp.views.book_search, name='searchResult'),
    path('getThisBook/', bookapp.views.book_detail, name='book_detail'),
    path('uploadimage/', views.upload_image, name='upload_image'),
    path('profile/', views. user_profile, name='profile'),
    path('profile/edit/', views. user_profile_change, name='profile_edit'),
    path('user_upgrade/', views. user_upgrade, name='user_upgrade'),
    path('resetPW/', views. user_forgot, name='resetPW'),
    path('logout/', views. user_logout, name='logout'),
    path('login/', views. user_login, name='login'),
    path('register/', views. register, name='register'),
    path('admin/', admin.site.urls),
    path('getCode/', views.send_verification_code, name='getCode'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)