import json

from django.db.models import Avg
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from bookapp.models import Book
from rating.models import Rating, Reviews

import pandas as pd



from userapp.models import User

def get_recommandation_list():
    # get all ratings
    ratings = Rating.objects.all()
    # convert to dataframe
    ratings_df = pd.DataFrame(ratings.values())
    print(ratings_df)
    recommendations = mfresult(ratings_df)
    return recommendations


from django.db.models import Avg
from django.shortcuts import render, get_object_or_404

# Create your views here.
from bookapp.models import Book
from userapp.models import User
from rating.models import Rating
from rating.models import Reviews
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.utils import json
from django.http import JsonResponse



def book_average_rating(id):
    rating = Rating.objects.filter(isbn_id=id)
    total = 0
    num = 0
    for i in rating:
        total += i.rating
        num += 1
    average_rating = total/num
    return average_rating

@csrf_exempt
def add_review_and_rating(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        book_id = data['book_id']
        review = data['Review']
        rating = data['rating']

        user = get_object_or_404(User, username=username)
        Reviews(user_id=user.id, book_id=book_id, reviews=review).save()

        this_rating_exist = Rating.objects.filter(user_id=user.id, isbn_id=book_id).exists()
        if this_rating_exist:
            this_rating = Rating.objects.get(user_id=user.id, isbn_id=book_id)
            this_rating.rating = rating
            this_rating.save()
        else:
            Rating(user_id=user.id, isbn_id=book_id, rating=rating).save()

        return JsonResponse({'message': 'success!'})

