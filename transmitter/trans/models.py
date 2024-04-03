from django.db import models

from django.db import models

class Place(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()

    def __str__(self):
         return f'Place - Lat: {self.lat}, Lng: {self.lng}'
     
class Place2(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    title = models.CharField(max_length=20,blank=True, null=True)

    def __str__(self):
         return f'Place - Lat: {self.lat}, Lng: {self.lng}, Title: {self.title}'
     
