from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import C2

def index(request):
    #TODO: process C2 data into some better data structure depending on
    #      what the 3 libraries want :-)
    data = C2.objects.all()
    template = loader.get_template('polls/index.html')
    context = {
        'data': data,
    }
    return HttpResponse("Hello, world.")