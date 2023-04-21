from django.db import models

# Create your models here.
from django.db import models
from bookapp.models import Book


class Cart(models.Model):
    user_id = models.IntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class Order(models.Model):
    ORDER_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    )
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    list_book = models.CharField(max_length=1000, default='')
    total_price = models.CharField(max_length=100)
    shipping_address = models.CharField(max_length=200, null=True, blank=True)
    payment = models.CharField(max_length=100, null=True, blank=True)
    refund = models.CharField(max_length=100, null=True, blank=True)
    feedback = models.CharField(max_length=200, null=True, blank=True)
    delivery = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated Date")
    status = models.CharField(max_length=20, choices=ORDER_CHOICES, default='pending')

