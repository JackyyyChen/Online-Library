from django.db import models

# Create your models here.
from django.db import models

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    isbn = models.CharField(max_length=100, default='unknown')
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    publication_date = models.CharField(max_length=50)
    publisher = models.CharField(max_length=50)
    url = models.CharField(max_length=1000, default='unknown')
    category = models.CharField(max_length=50)
    price = models.FloatField()


    def __str__(self):
        return self.title