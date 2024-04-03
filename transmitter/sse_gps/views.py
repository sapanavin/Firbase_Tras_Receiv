import asyncio
import random
from math import cos, radians
import pandas as pd
from django.http import StreamingHttpResponse
from django.shortcuts import render
import googlemaps
import  templates
from transmitter.settings import GOOGLE_API_KEY
import geopy.distance
import numpy as np
from geopy.distance import geodesic
import datetime



async def sse_stream(request):
    """
    Sends server-sent events to the client.
    """
    async def event_stream():
        emojis = ["🚀", "🐎", "🌅", "🦾", "🍇"]
        lat_lng_points = cp_to_moze_semiauto()
        
        # Speed in km/h
        speed = 50
        i = 0
        
        while True:
# [lat, lng] = data_Append()
            lat, lng = lat_lng_points[i]  
            print("from sse :  ", lat, lng)
            yield f'data: {random.choice(emojis)} {i} {lat} {lng}\n\n'
            i += 1
            await asyncio.sleep(0.5)

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


# async def sse_stream(request):
#     """
#     Sends server-sent events to the .
#     """
#     async def event_stream():
#         emojis = ["🚀", "🐎", "🌅", "🦾", "🍇"]
#         # Initial position
#         # Starting point
#         start_lat = 41.2032029586709
#         start_lng = -96.08816675717786

#         # Destination point
#         dest_lat = 41.20047451107608 
#         dest_lng = -96.08758174125217

#         # Calculate the increments for latitude and longitude
#         lat_incclientrement = (dest_lat - start_lat) / 120
#         lng_increment = (dest_lng - start_lng) / 120

#         # Generate the points along the route
#         latitudes = []
#         longitudes = []
#         for i in range(120):
#             lat = start_lat + i * lat_increment
#             lng = start_lng + i * lng_increment
#             latitudes.append(lat)
#             longitudes.append(lng)

#         # Add the destination point
        
#         # Speed in km/h
#         speed = 50
#         i = 0
        
#         while True:
#             [lat, lng] = data_Append()
#             yield f'data: {random.choice(emojis)} {i} { latitudes[i]} { longitudes[i] }\n\n'
#             i += 1
#             await asyncio.sleep(1)

#     return StreamingHttpResponse(event_stream(), content_type='text/event-stream')

########################################################################################
 
#########################################################################################
# here I got all lat lng pairs manually from Gogle Map and prepare Excel sheet
# async def sse_stream(request):
#     """
#     Sends server-sent events to the client.
#     """
#     async def event_stream():
#         emojis = ["🚀", "🐎", "🌅", "🦾", "🍇"]
        
       
#         # Add the destination point
#         #datapath = "G:/Sapana_Spring_Cert_Eclipse_Workspace/NKNHardTech/Firbase_Tras_Receiv/transmitter/templates/semiclick_Falgrove_to_Disney.xlsx"
#         datapath = "G:/Sapana_Spring_Cert_Eclipse_Workspace/NKNHardTech/Firbase_Tras_Receiv/transmitter/templates/Manual_MozeToConcordPortia.xlsx"
#         #datapath = "G:/Sapana_Spring_Cert_Eclipse_Workspace/NKNHardTech/Firbase_Tras_Receiv/transmitter/templates/data_auto.xlsx"
       
        
#         df = pd.read_excel(datapath)

#         latitudes = df['Lat'].tolist()
#         longitudes = df['Lng'].tolist()

#         # Construct an array of tuples (Lat, Lng)
#         latlng = list(zip(latitudes, longitudes))
#         # print(lat_lng_pairs)
         
#         i = 0
        
#         while True:
#             [lat, lng] = data_Append()
#             yield f'data: {random.choice(emojis)} {i} { latlng[i][0]} { latlng[i][1] }\n\n'
#             i += 1
#             await asyncio.sleep(0.2)

#     return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


##############################################################################################
# Here giving only Origin and Destinatin. then Extract waypoint and then bwtween each waypoint at each interval find lat and lang
# async def sse_stream(request):
#     """
#     Sends server-sent events to the client.
#     """
#     async def event_stream():
#         emojis = ["🚀", "🐎", "🌅", "🦾", "🍇"]
        
        

#         api_key = GOOGLE_API_KEY
#         gmaps = googlemaps.Client(key=api_key)

#         # Origin and destination coordinates
#         origin = (18.58218522621898, 73.77106587320546)
#         destination = (18.560941885897638, 73.76422291182432)
#        # origin="Indira National School, S.No. 111, 1/2, Mumbai Highway, opp. Indira Institute, off New, Wakad, Pune, Pimpri-Chinchwad, Maharashtra 411057, India"
#         #destination="Balewadi Stadium, SHREE SHIV CHHATRAPATI SPORTS COMPLEX, National Games Park, Mahalunge, Pune, Maharashtra 411045, India"
        
#         # Get directions from Google Maps Directions API
#         directions = gmaps.directions(origin, destination, mode="driving")

#         # Extract all the steps from the route
#         steps = []
#         for leg in directions[0]['legs']:
#             for step in leg['steps']:
#                 steps.append(step)
#         # Calculate average driving speed (e.g., in meters per second)
#         average_speed_mps = 5  # Example: 10 meters per second
        
#     # Interpolate coordinates at regular intervals along each step
#         latitudes = []
#         longitudes = []
#         for step in steps:
#             start_lat = step['start_location']['lat']
#             start_lng = step['start_location']['lng']
#             end_lat = step['end_location']['lat']
#             end_lng = step['end_location']['lng']
#             step_distance = geodesic((start_lat, start_lng), (end_lat, end_lng)).meters  # Calculate distance between step
#             travel_time_seconds = step_distance / average_speed_mps  # Estimate travel time between steps
#             num_points = int(travel_time_seconds)  # Adapt num_points based on estimated travel time
#             num_points = max(num_points, 1)  # Ensure at least 1 point per step
#             for i in range(num_points + 1):
#                 lat = start_lat + (end_lat - start_lat) * (i / num_points)
#                 lng = start_lng + (end_lng - start_lng) * (i / num_points)
#                 latitudes.append(lat)
#                 longitudes.append(lng)

#         # print(latitudes)
#         # print(longitudes)
#        # print(len(latitudes), len(longitudes))
     
#         i = 0
        
#         while True:
            
#             yield f'data: {random.choice(emojis)} {i} { latitudes[i]} { longitudes[i] }\n\n'
#             i += 1
#             await asyncio.sleep(0.1)

#     return StreamingHttpResponse(event_stream(), content_type='text/event-stream')

##################################################################################################
def get_car_route_points():
 
#     datapath = "G:/Sapana_Spring_Cert_Eclipse_Workspace/NKNHardTech/Firbase_Tras_Receiv/transmitter/templates/temp.xlsx"
#     df = pd.read_excel(datapath)
#     print(df)
#    # Split the values in the single column into two separate columns
#     df[['Lat', 'Lng']] = df['Latlng'].str.split(',', expand=True)
#     # Save the updated DataFrame to the same Excel file
#     df.to_excel(datapath, index=False)
    # Drop the original combined column if needed
    # df.drop('combined_column', axis=1, inplace=True)

    # Print the DataFrame with the separated columns
    # Extract Lat and Lng columns from the DataFrame
    # latitudes = df['Lat'].tolist()
    # longitudes = df['Lng'].tolist()

# Construct an array of tuples (Lat, Lng)
    # lat_lng_pairs = list(zip(latitudes, longitudes))
    # print(lat_lng_pairs)
    # Convert the list of waypoints to the desired format
    # route_points = waypoints

      # Set up Google Maps API client
    api_key = GOOGLE_API_KEY
    gmaps = googlemaps.Client(key=api_key)

    # Origin and destination coordinates
    origin = (41.20301887434294, -96.0882217583561)
    destination = (41.20030097108713, -96.0876924450256)

    # Get directions from Google Maps Directions API
    directions = gmaps.directions(origin, destination, mode="driving")

    # Extract all the steps from the route
    steps = []
    for leg in directions[0]['legs']:
        for step in leg['steps']:
            steps.append(step)
    # Calculate average driving speed (e.g., in meters per second)
    average_speed_mps = 10  # Example: 10 meters per second
    # Extract all the latitude and longitude coordinates from the steps
    #coordinates = [(step['start_location']['lat'], step['start_location']['lng']) for step in steps]
    #coordinates.append((steps[-1]['end_location']['lat'], steps[-1]['end_location']['lng']))

 # Interpolate coordinates at regular intervals along each step
    coordinates = []
    for step in steps:
        start_lat = step['start_location']['lat']
        start_lng = step['start_location']['lng']
        end_lat = step['end_location']['lat']
        end_lng = step['end_location']['lng']
        step_distance = geodesic((start_lat, start_lng), (end_lat, end_lng)).meters  # Calculate distance between step
        travel_time_seconds = step_distance / average_speed_mps  # Estimate travel time between steps
        num_points = int(travel_time_seconds)  # Adapt num_points based on estimated travel time
        num_points = max(num_points, 1)  # Ensure at least 1 point per step
        for i in range(num_points + 1):
            lat = start_lat + (end_lat - start_lat) * (i / num_points)
            lng = start_lng + (end_lng - start_lng) * (i / num_points)
            coordinates.append((lat, lng))

    # Print the coordinates
    # for coord in coordinates:
        # print(coord)
    # This code will interpolate
    print(len(coordinates))

# get_car_route_points()
###############################################################################



# def data_Append():
   
#     # Initial position
#     initial_latitude = 18.757574205947943
#     initial_longitude = 73.41131875561207

#     # Speed in km/h
#     speed = 50

#     # Approximate distance per degree for latitude and longitude
#     distance_per_degree_latitude = 69
#     distance_per_degree_longitude = float(69 * cos(radians(initial_latitude)))

#     # Calculate change in latitude and longitude per second
#     change_in_latitude_per_second = float(speed / ( 3600 * distance_per_degree_latitude))
#     change_in_longitude_per_second = float(speed / (3600 * distance_per_degree_longitude))

#     latitude = initial_latitude + change_in_latitude_per_second
#     longitude = initial_longitude + change_in_longitude_per_second
#     return [change_in_latitude_per_second,  change_in_longitude_per_second ]

#     # print("Change in Latitude per Second:", change_in_latitude_per_second)
#     # print("Change in Longitude per Second:", change_in_longitude_per_second)




def index(request):
    return render(request, 'sse_gps/index.html',{"name":"sapana123"})

# Create your views here.


def cp_to_moze_semiauto():
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
        ]
    
        # Calculate distances between consecutive points
    distances = [geopy.distance.distance(polyline_coordinates[i], polyline_coordinates[i+1]).meters for i in range(len(polyline_coordinates) - 1)]

    # Calculate total distance
    total_distance = sum(distances)
    #print("distances : ",distances)
    #print("total_distance : ",total_distance)
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
cp_to_moze_semiauto()
