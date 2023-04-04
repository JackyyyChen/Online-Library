from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True, verbose_name="username")
    password = models.CharField(max_length=255, verbose_name="password")
    email = models.EmailField(verbose_name="Email")
    created_time = models.DateTimeField(auto_now_add=True)
    bio =models.TextField(max_length=500,blank=True)
    class Meta:
        verbose_name_plural = "User"
        verbose_name = "User"

    def __str__(self):
        return self.username
class ImageModel(models.Model):
    image = models.ImageField(upload_to='images/')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return self.image.name