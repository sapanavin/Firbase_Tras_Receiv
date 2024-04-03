// Initialize and add the map
function greet(var1){
  console.log(var1);
}
var message =123;
const greet_scaler = greet("Scaler");

console.log(greet_scaler); // Hello, Scaler
console.log(message); // How you doing?


var map;
let name= 'moze to Concord'
var temp;
var my_route;
var directionsRenderer ;
var directionsService ;
var  lineSymbol;
var prev_lat1;
var prev_lng1;
var busMarker; 
var customIcon;
var bearing;
var count=1;
var prev_heading = 180;
         
var svg_image =`M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
 M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336
h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z`;
var lat1 = 18.58223783009838//{{ lat }}18.58223783009838, 73.77118808267363
var lng1 = 73.77118808267363// {{ lng }}18.608704944299117, 73.74783522639814
var center =  {lat: lat1, lng: lng1};
//Falgrove 41.203089948599526, -96.08819894332197

async function initMap() {
  
 
  const { Map } = await google.maps.importLibrary("maps");
  
  
  // The map, centered at Concord Portia, Balewadi
    map = new Map(document.getElementById("map"), {
          zoom: 16,
          center: center,
          mapTypeId: google.maps.MapTypeId.HYBRID,
          mapId: "DEMO_MAP_ID",
    });

    map.setTilt(0);//To enable 45° perspective view at a later point, call setTilt(45).
    customIcon = {
     
      // path:"M-10.605,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z",
       path: svg_image,
       fillColor: '#FFD700',
       fillOpacity: 1,
       scale: 1,
       //anchor: new google.maps.Point(50, 40), // Adjust anchor point as needed
       strokeWeight: 2,
       strokeColor: '#000',
       rotation: bearing
     };
  
   // Initialize DirectionsService
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
       map: map,
       markerOptions:{
        visible:false,
    },
       
   });
   directionsRenderer.setMap(map);

     // The marker, positioned at Uluru
  busMarker = new google.maps.Marker({
    map: map,
    position: temp,  // Initial position
    title: 'Bus',
    icon: customIcon,
    
   
});
console.log('directionsService 123 new', directionsService);
console.log('center', center);

  
}
initMap();

my_route = function calculateAndDisplayRoute(lat2,lng2) {
      // Calculate bearing between previous and current position


 // bearing = calculateBearing(prev_lat1, prev_lng1, lat2, lng2);
   
    directionsService.route({
        origin: {lat:lat1, lng:lng1},
        destination: {lat:lat2,lng:lng2},
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
      console.log('heading :-->>', heading);
      if(prev_heading !== heading){
      
        console.log(' check heading count :-->>', count++);
      // Update the rotation of the bus marker icon
      busMarker.setIcon({
        path: svg_image,
        fillColor: '#FF0000',
        fillOpacity: 1,
        strokeColor: '#FF0000',
        strokeWeight: 1,
        scale: 2,
        rotation: heading  // Set the rotation angle
    });

  }
  prev_heading = heading;
          
         
         // console.log('bearing is ', bearing);
          
      
        //  busMarker.setIcon(null);
       
       // busMarker.setIcon(customIcon);
      


          const line = new google.maps.Polyline({
                path: [
                { lat: prev_lat1, lng: prev_lng1 },
                { lat: lat2, lng: lng2 },
                ],
                icons: [
                {
                    icon: lineSymbol,
                    offset: "100%",
                },
                ],
                map: map,
            });
            prev_lat1 =lat2;
            prev_lng1 = lng2;
            
            //call directionRender 
           directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
        
    });
}



// adding SSe Event Script:--------=========>>>>>>>>>>
   

let eventSource;
const sseData = document.getElementById('sse-data');

function startSSE() {
    eventSource = new EventSource('/sse_gps/stream/');
    eventSource.onmessage = function(event) {

     // console.log("From Event Emitter");
            sseData.innerHTML += event.data + '<br>';
                    
         const arr = event.data.split(" ");
          //console.log("From Event Emitter");
         if(Number(arr[1]) === 0){
            //console.log(`arr[1] is zero`);
            prev_lat1 =lat1;
            prev_lng1 = lng1;
         }
        my_route(Number(arr[2]),Number(arr[3]));

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

