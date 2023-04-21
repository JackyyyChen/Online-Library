from django.db import models
from Userapp.models import User
from bookapp.models import Book

# Create your models here.
class Collection(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'book', 'name')


class Finished(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100,default='ALREADY READ')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")

class Goalnumber(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal = models.CharField(max_length=100)

