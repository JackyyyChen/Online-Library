import json
import random

from django.core.serializers import serialize


# Create your views here.
from django.views.decorators.csrf import csrf_exempt


from Userapp.models import User
from game.models import count_score, game_questions
from django.http import JsonResponse

@csrf_exempt
def add_score(request):
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')
        data = json.loads(json_data)
        username = data['username']
        score = int(data['score'])
        try:
            user = count_score.objects.get(username=username)
            old_score = user.score
            new_score = old_score + score
            user.score = new_score
            return JsonResponse({'status': 'success', 'message': 'score updated successfully', 'new_score': user.score, 'username': username})
        except:
            user = count_score.objects.create(username=username, score=score)
            return JsonResponse({'status': 'success', 'message': 'score added successfully', 'new_score': score, 'username': username})




@csrf_exempt
def leaderboard_score(request):
    if request.method == 'POST':
        ranked_score = count_score.objects.all().order_by('-score')

        # Serialize the queryset to JSON format
        json_data = serialize('json', ranked_score, fields=('username', 'score'))

        # Convert the JSON string to a list of dictionaries
        score_list = json.loads(json_data)

        # Customize the dictionary keys to match the original format
        for item in score_list:
            fields = item.pop('fields')
            item['name'] = fields['username']
            item['score'] = fields['score']
            del item['model']
            del item['pk']

        return JsonResponse({"score_list":score_list}, safe=False)

@csrf_exempt
def game_question(request):
    if request.method == 'POST':
        print("hello")
        question = game_questions.objects.all()

        jsondata= serialize('json', question, fields=('title', 'question', 'opt1', 'opt2', 'opt3', 'opt4', 'answer'))

        question_list = json.loads(jsondata)
        # question_list = random.sample(question_list, 3)
        question_list=question_list[:4]
        print(question_list)
        print([item['fields']['answer'] for item in question_list])
        # question_list = random.sample(question_list['field'], 3)
        for item in question_list:
            fields = item.pop('fields')
            item['question'] = fields['title'] + '  ' + fields['question']
            item['options'] = [fields['opt1'], fields['opt2'], fields['opt3'], fields['opt4']]
            item['answer'] = fields['answer']
            del item['model']
            del item['pk']
        return JsonResponse({'question_list':question_list}, safe=False)





