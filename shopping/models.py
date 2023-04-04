from django.db import models

# Create your models here.
from django.db import models
from bookapp.models import Book


class Cart(models.Model):
    user_id = models.IntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
