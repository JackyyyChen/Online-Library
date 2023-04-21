from django.contrib import admin

# Register your models here.
from .models import count_score,game_questions
admin.site.register(count_score)
admin.site.register(game_questions)
