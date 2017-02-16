from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.core import serializers
from django.views.generic import ListView
import json

from .models import C2

def index(request):
    #TODO: process C2 data into some better data structure depending on
    #      what the 3 libraries want :-)
    data = C2.objects.all()
    transformed_data = transform_C2_data(data)
    template = loader.get_template('graphs/index.html')
    context = {
        'data': json.dumps(transformed_data),
    }
    return HttpResponse(template.render(context, request))

def transform_C2_data(json_data):
    to_return = {}
    for entry in json_data:
        if entry.experiment_id not in to_return.keys():
            to_return[entry.experiment_id] = [{'x':entry.milliseconds , 'y': entry.radius}]
        else:
            to_return[entry.experiment_id].append({'x':entry.milliseconds , 'y': entry.radius})
    return to_return
    

def data(request):
    data = C2.objects.all()
    json_data = [ob.as_json() for ob in data]
    return json_data

class C2ListView(ListView):
    model = C2
    