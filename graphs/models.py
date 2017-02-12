from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class C2(models.Model):
    radius = models.FloatField(default=0.0)
    milliseconds = models.FloatField(default=0.0)
    experiment_id = models.IntegerField()
    
    def __str__(self):
        return str(self.experiment_id) + '_' + str(self.milliseconds)