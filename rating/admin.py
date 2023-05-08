from django.contrib import admin

# Register your models here.
from .models import Rating, Reviews
admin.site.register(Rating)
admin.site.register(Reviews)