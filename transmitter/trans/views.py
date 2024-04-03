import json
import random
import time
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.contrib import messages
import pyrebase

from trans.models import Place


config = {
  "apiKey": "AIzaSyCCtALSwigdhhbVuH-fArEX1uVOYjGMAd0",
  "authDomain": "gpstransreceiver.firebaseapp.com",
  "projectId": "gpstransreceiver",
  "storageBucket": "gpstransreceiver.appspot.com",
  "messagingSenderId": "901501314116",
  "appId": "1:901501314116:web:83c0d835adea066ef44811",
  "databaseURL": "https://gpstransreceiver-default-rtdb.firebaseio.com"
}
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()
# Get a reference to the Firebase Realtime Database


#  18.531846371904194, 73.8638430533957
def home(request):
    
    
    lat =  database.child('Data').child('lat').get().val()
    lng =   database.child('Data').child('lng').get().val()
    print('lat' ,lat)
    print('lng' ,lng)
    return render(request,"home.html",{"lat":lat,"lng":lng})
    # return render(request, 'home.html')

def data_Append(num_points=1):
    data_list= []
    # Generate random latitude and longitude coordinates
    latitude = round(random.uniform(19, 20 ), 6)
    longitude = round(random.uniform(73, 74), 6)
    data = {"lat": latitude, "lng": longitude}
         
    data_list.append(data)
    database.child('Data').set(data)
                   
    # database.child('Data').set(data_list)
    # database.child('Data').set(data_list)


def fetch_lat_lng_from_firebase():
    whole = database.child('Data').get().val()
    lat = database.child('Data').child('lat').get().val()
    lng = database.child('Data').child('lng').get().val()
    
    
    
    print('lat and lng of whole ' , lat , lng)
    # print("Data type:", type(whole))
    
   
def run_every_second():
    while True:
        data_Append()  # Call your function
        time.sleep(2)  # Pause execution for 1 second
        # fetch_lat_lng_from_firebase()

        
# Call the function to run it
# run_every_second()
 
   


# Call the method to fetch and process the data
# fetch_lat_lng_from_firebase()    
    
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def test1(request):
    return render(request, 'test1.html', {})