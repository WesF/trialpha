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
    transformed_d3 = transform_d3(data)
    transformed_highcarts = transform_highcharts(transformed_d3)
    template = loader.get_template('graphs/index.html')
    context = {
        'd3_data': json.dumps(transformed_d3),
        'highcharts_data':json.dumps(transformed_highcarts),
    }
    return HttpResponse(template.render(context, request))

def transform_d3(json_data):
    to_return = {}
    for entry in json_data:
        if entry.experiment_id not in to_return.keys():
            to_return[entry.experiment_id] = [{'x':entry.milliseconds , 'y': entry.radius}]
        else:
            to_return[entry.experiment_id].append({'x':entry.milliseconds , 'y': entry.radius})
    return to_return
    
def transform_highcharts(d3_data):
    series = []
    for entry in d3_data:
        series.append({'name': entry, 'data':[ [n['x'], n['y']]for n in d3_data[entry] ]})
    return series
    
def data(request):
    data = C2.objects.all()
    json_data = [ob.as_json() for ob in data]
    return json_data

class C2ListView(ListView):
    model = C2
    