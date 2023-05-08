from django.contrib import admin

# Register your models here.
from django.contrib import admin
from bookapp.models import Book


class BookAdmin(admin.ModelAdmin):
    search_fields = ['isbn','title', 'author', 'publisher', 'price', 'description']
    list_filter = ['author']
admin.site.register(Book, BookAdmin)