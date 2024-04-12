from django.db import models

# Create your models here.

class LatLng(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    date_time = models.DateField()

    def __str__(self):
         return f'LatLng - Lat: {self.lat}, Lng: {self.lng}, Date_time: {self.date_time}'
  