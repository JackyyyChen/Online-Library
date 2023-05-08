from django.contrib import admin

# Register your models here.
from Userapp.models import User,ImageModel,Questions,UserFeedback

admin.site.register(User)
admin.site.register(ImageModel)
admin.site.register(Questions)
admin.site.register(UserFeedback)