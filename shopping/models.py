from django.db import models

# Create your models here.
from django.db import models
from bookapp.models import Book


class Cart(models.Model):
    user_id = models.IntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    total_price = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated Date")