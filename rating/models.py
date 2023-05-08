from django.db import models

# Create your models here.
from django.db import models
from userapp.models import User
from bookapp.models import Book


class Rating(models.Model):
    user_id = models.IntegerField()
    isbn = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f"Rating {self.rating} by user {self.user_id} for book {self.isbn}"

class Reviews(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reviews = models.CharField(max_length=1000)