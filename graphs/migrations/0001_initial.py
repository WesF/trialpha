# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-12 21:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='C2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('radius', models.FloatField(default=0.0)),
                ('milliseconds', models.FloatField(default=0.0)),
                ('experiment_id', models.IntegerField()),
            ],
        ),
    ]
