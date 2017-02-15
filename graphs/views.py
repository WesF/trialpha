from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.core import serializers
from django.views.generic import ListView

from .models import C2

def index(request):
    #TODO: process C2 data into some better data structure depending on
    #      what the 3 libraries want :-)
    data = C2.objects.all()
    json_data = [ob.as_json() for ob in data]
    template = loader.get_template('graphs/index.html')
    context = {
        'data': json_data,
    }
    return HttpResponse(template.render(context, request))


def data(request):
    data = C2.objects.all()
    json_data = [ob.as_json() for ob in data]
    return json_data

class C2ListView(ListView):
    model = C2
    