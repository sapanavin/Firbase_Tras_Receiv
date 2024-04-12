import asyncio
import random
from math import cos, radians
import time
import pandas as pd
from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
import googlemaps
import  templates
from cp_to_moze.models import LatLng
from transmitter.settings import GOOGLE_API_KEY
import geopy.distance
import numpy as np
from geopy.distance import geodesic
from datetime import datetime



async def sse_stream(request):
    """
    Sends server-sent events to the client.
    """
    async def event_stream():
        emojis = ["🚀", "🐎", "🌅", "🦾", "🍇","iam"]
        lat_lng_points = cp_to_moze_semiauto()
        # lat_lng_points = Falgrove_to_Disney_fromExcel()
       
        i = 0
        prev_lat, prev_lng = lat_lng_points[0]
        
        while True:
            if(i==0):
                start_time = datetime.now()
                prev_lat, prev_lng = lat_lng_points[0]

            lat, lng = lat_lng_points[i] 
            distance = speed_calculate(prev_lat, prev_lng, lat, lng)
           
            end_time = datetime.now()
            prev_lat, prev_lng = lat_lng_points[i]
            time_elapsed = end_time - start_time
            seconds_elapsed = time_elapsed.total_seconds()
            if seconds_elapsed != 0:
                speed = distance / seconds_elapsed
                speed = speed * 3.6
                speed =  format(speed, '.2f')
                
            else:
                speed = None 
            distance =  format(distance, '.2f')
            yield f'data: {random.choice(emojis)} {i} { lat} { lng } { speed  }\n\n'
            
            start_time = datetime.now()
            i += 1
            await asyncio.sleep(0.1)
           

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


def update_sql_database():
     # Assume that GPS hardware sending real time latlng to mysql database
        lat_lng_points = cp_to_moze_semiauto()

        for data  in lat_lng_points:
                print("from for data loop", data)
            # Create and save the model instance
                time.sleep(1)
                [lat , lng] = data
                instance = LatLng(lat=lat, lng=lng, date_time=datetime.now())
                instance.save()
                
        return HttpResponse("Data saved successfully")





def speed_calculate(prev_lat, prev_lng, lat, lng):
    #print("from speed")
    distances = geopy.distance.distance((prev_lat,prev_lng), (lat, lng)).meters
    #print(" distances ", distances)
    formatted_number = format(distances, '.2f')
    return distances
 
def cp_to_moze_semiauto():
    print("from cp_to_moze_semiauto")
    start_location_concordPortia= (18.582193106477664, 73.77107035263678)
    first_stop_wonderwall = (18.580368668590793, 73.77126789723931)
    second_stop_pallazo =(18.57952743169931, 73.77087309775438)
        
    third_stop_opp_Bit_Ahead_fitness = (18.577039339763772, 73.77067525148838) 
    destination_moze_clg = (18.574843208216823, 73.76797181992866)
 
    polyline_coordinates = [
        start_location_concordPortia,
        (18.58218918958954, 73.77114382478845),#Concord Portia next road
        (18.58171786851615, 73.77112198379483), #adjusted point to get route
        (18.580368622397092, 73.77117888426264), #wonderwall next road going inside
        first_stop_wonderwall,#wonderwall
        (18.580337825664092, 73.7711768579312 ),#wonderwall next road coming out
        (18.580304774376884, 73.77116009413095),#adjusted point_1
        (18.580274901093727, 73.77112656652194),#adjusted point_2
        (18.58025138382607, 73.77105414687988),#adjusted point_3
        (18.58026536706557, 73.77070143639273),#enter on Golden Strret
        (18.579648832137032, 73.77073764621402),#towards Pallazzo Apartments
        second_stop_pallazo,
        (18.579512177186125, 73.77074569283488), #palazzo to Golden street
        (18.578875515728512, 73.77078484733275),#adjusted_point_1
        (18.578770936118207, 73.77074004873157),#adjusted_point_2
        (18.578123737927523, 73.7706717708473),#Madhuban Socity Road
        (18.57769867791879, 73.77068373111095),#continue on Madhuban Socity Road
        third_stop_opp_Bit_Ahead_fitness,#opposit of Bit Ahead Fitness
        (18.576766909733344, 73.7706458175326),#adjusted_point_1
        (18.576564857687995, 73.77065361369544),
        (18.575237802049173, 73.77081666479961),#ike_zone opposite
        (18.57484432749207, 73.77084687232596),#Intersection DP Road
        (18.574712693631263, 73.77084784589032),
        (18.574892540106564, 73.77026778644822),#opposite KAD cool center
        (18.575078141600198, 73.76961936237156),#opposite oyoflagship hotel Ambience
        (18.57516673869798,  73.76922268423627),
        (18.575170552423163, 73.7690979615308),#junction
        (18.57516419621637, 73.76853067426858),
        (18.575129872685356, 73.76815382394344),
        (18.575108261569692, 73.76794058835021),#Entering Towards Moze College
        destination_moze_clg,
         destination_moze_clg,
        ]
    
        # Calculate distances between consecutive points
    
    distances = [geopy.distance.distance(polyline_coordinates[i], polyline_coordinates[i+1]).meters for i in range(len(polyline_coordinates) - 1)]

    # Calculate total distance
    total_distance = sum(distances)
    #print("distances : ",distances)
    print("total_distance : ",total_distance)
    # Calculate total time to travel at 20 km/h
    total_time_seconds = total_distance / (20 / 3.6)  # Convert km/h to m/s

    # Calculate time intervals for each segment
    time_intervals = [distance / total_distance * total_time_seconds for distance in distances]

    # Interpolate points along the polyline based on time intervals
    lat_lng_points = []
    current_time = 0
    for i in range(len(polyline_coordinates) - 1):
        num_points = int(time_intervals[i]) + 1  # Number of points based on time interval
        for j in range(num_points):
            ratio = j / num_points
            lat = polyline_coordinates[i][0] + ratio * (polyline_coordinates[i+1][0] - polyline_coordinates[i][0])
            lng = polyline_coordinates[i][1] + ratio * (polyline_coordinates[i+1][1] - polyline_coordinates[i][1])
            lat_lng_points.append((lat, lng))
            current_time += 1
       
    # Output lat_lng_points
    #print(lat_lng_points)
        
    return lat_lng_points
# cp_to_moze_semiauto()




def Falgrove_to_Disney_fromExcel():
        
    # Load the Excel file
    datapath = "G:/Sapana_Spring_Cert_Eclipse_Workspace/NKNHardTech/Firbase_Tras_Receiv/transmitter/templates/data.xlsx"
    df = pd.read_excel(datapath)

    # Assuming the columns are named 'lat' and 'lng'
    latitudes = df['lat']
    longitudes = df['lng']
    polyline_coordinates =[[latitudes[i],longitudes[i]] for i in range(len(latitudes) - 1)]
    distances = [geopy.distance.distance(polyline_coordinates[i], polyline_coordinates[i+1]).meters for i in range(len(polyline_coordinates) - 1)]

    # Calculate total distance
    total_distance = sum(distances)
    #print("distances : ",distances)
    #print("total_distance : ",total_distance)
    # Calculate total time to travel at 20 km/h
    total_time_seconds = total_distance / (10 / 3.6)  # Convert km/h to m/s

    # Calculate time intervals for each segment
    time_intervals = [distance / total_distance * total_time_seconds for distance in distances]

    # Interpolate points along the polyline based on time intervals
    lat_lng_points = []
    current_time = 0
    for i in range(len(polyline_coordinates) - 1):
        num_points = int(time_intervals[i]) + 1  # Number of points based on time interval
        for j in range(num_points):
            ratio = j / num_points
            lat = polyline_coordinates[i][0] + ratio * (polyline_coordinates[i+1][0] - polyline_coordinates[i][0])
            lng = polyline_coordinates[i][1] + ratio * (polyline_coordinates[i+1][1] - polyline_coordinates[i][1])
            lat_lng_points.append((lat, lng))
            current_time += 1
       
    # Output lat_lng_points
    print(len(lat_lng_points))
        
    return lat_lng_points
# Falgrove_to_Disney_fromExcel()
def index(request):
    print("from Index ")
    return render(request, 'cp_to_moze/index.html',{"name":"sapana123"})

# update_sql_database()