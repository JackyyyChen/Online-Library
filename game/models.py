from django.db import models
from Userapp.models import User
# Create your models here.
class count_score(models.Model):
    game_user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, null=True, blank=True,default='')
    score = models.IntegerField(default=0)
    def __str__(self):
        return str(self.score)

class game_questions(models.Model):
    id= models.AutoField(primary_key=True)
    title = models.CharField(max_length=1000, null=True, default='')
    question = models.CharField(max_length=1000, null=True, default='')
    opt1 = models.CharField(max_length=1000, null=True, default='')
    opt2 = models.CharField(max_length=1000, null=True, default='')
    opt3 = models.CharField(max_length=1000, null=True, default='')
    opt4 = models.CharField(max_length=1000, null=True, default='')
    answer = models.CharField(max_length=1000,null=True, default='')
    def __str__(self):
        return self.question