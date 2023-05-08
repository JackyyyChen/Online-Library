from django.contrib import admin

# Register your models here.
from .models import Collection, Finished, Goalnumber
admin.site.register(Collection)
admin.site.register(Finished)
admin.site.register(Goalnumber)