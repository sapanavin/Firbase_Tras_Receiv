
  
  



  //Falgrove 41.203089948599526, -96.08819894332197 
  
  async function initMap() {
    
   const zoomLevel=18;
    const { Map } = await google.maps.importLibrary("maps");
    
    // The map, centered at Concord Portia, Balewadi
      map = new Map(document.getElementById("map"), {
            zoom: 18,
            center: center,
            
      });
  
     // Initialize DirectionsService
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
         map: map,
         markerOptions:{
          visible:false,
      },
    });
     directionsRenderer.setMap(map);
  
     set_customicon = function (rotation){
      return customIcon = {
         path: svg_image,
         fillColor: '#FFD700',
         fillOpacity: 1,
         scale: 1,
         strokeWeight: 1,
         strokeColor: '#000',
         rotation: rotation,
         zIndex: google.maps.Marker.MAX_ZINDEX + 10000
       };

     }
  }
  initMap();
  

var set_polyline = function(lat2 ,lng2){
  //console.log("from set_polyline");
  
  return  new google.maps.Polyline({
    path: [
    { lat: prev_lat1, lng: prev_lng1 },
    { lat: lat2, lng: lng2 },
    
    ],
    strokeColor:"#0000FF",
    strokeOpacity:1,//
    strokeWeight:1,
    map:map
});

}

  
  my_route = function calculateAndDisplayRoute(lat2,lng2, speed) {
      
    updateInfoWindowContent({lat:lat2, lng:lng2}, 'New content for the first info window');
    updateInfoPanelSpeed(speed);
    directionsService.route({
          origin:center ,//{lat:lat1, lng:lng1},
          //destination: {lat:41.200096036723245,lng:-96.08776312552372},
          destination: destination_moze_clg,
          travelMode: 'DRIVING'

      }, function(response, status) {
          if (status === 'OK') {
             
            var newLocation = new google.maps.LatLng(lat2,lng2);
            // Calculate the angle of rotation
            var heading = google.maps.geometry.spherical.computeHeading(
            new google.maps.LatLng(prev_lat1, prev_lng1),
            new google.maps.LatLng(lat2, lng2)
        );
            busMarker.setPosition(newLocation);
            busMarker.setZIndex(google.maps.Marker.MAX_ZINDEX + 10000);
            
            if(prev_heading !== heading){
            busMarker.setIcon(set_customicon(heading));
            }
            
           set_polyline(lat2, lng2);
            prev_heading = heading;
            prev_lat1 =lat2;
            prev_lng1 = lng2;
            //call directionRender 
             directionsRenderer.setDirections(response);
            // map.fitBounds(bounds)
          } else {
              window.alert('Directions request failed due to ' + status);
          }
          
      });
  }
  
   // adding SSe Event Script:--------=========>>>>>>>>>>
     
  
  let eventSource;
  const sseData = document.getElementById('sse-data');
  
  function startSSE() {
      eventSource = new EventSource('/cp/stream/');
     
      eventSource.onmessage = function(event) {
  
       // console.log("From Event Emitter");
              sseData.innerHTML += event.data + '<br>';
                      
           const arr = event.data.split(" ");
            //console.log("From Event Emitter");
           if(Number(arr[1]) === 0){
              //console.log(`arr[1] is zero`);
              prev_lat1 = lat1;
              prev_lng1 = lng1;
           }
           speed = Number(arr[2]);
          my_route(Number(arr[2]),Number(arr[3]), Number(arr[4]));
  
        }
      document.querySelector('button[onclick="startSSE()"]').disabled = true;
      document.querySelector('button[onclick="stopSSE()"]').disabled = false;
  }
  
  function stopSSE() {
      if (eventSource) {
        eventSource.close();
      }
      document.querySelector('button[onclick="startSSE()"]').disabled = false;
      document.querySelector('button[onclick="stopSSE()"]').disabled = true;
  }
  
  