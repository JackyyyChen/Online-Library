# Generated by Django 4.1 on 2023-03-26 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Userapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, max_length=500),
        ),
    ]
