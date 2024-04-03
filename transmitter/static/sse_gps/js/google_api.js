// Initialize and add the map

let map;

async function initMap() {
  // The location of Uluru
  //const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");




  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center:  { lat: 18.58218522621898, lng: 73.77106587320546 },
    //center: new google.maps.LatLng(0, -180),
    mapId: "DEMO_MAP_ID",
    //mapTypeId: google.maps.MapTypeId.HYBRID
  });
  var start_location_concordPortia= {lat:18.582193106477664, lng:73.77107035263678}
   var first_stop_wonderwall = { lat:18.580368668590793, lng:73.77126789723931}//wonderw
   var second_stop_pallazo ={lat:18.57952743169931, lng:73.77087309775438}
      
   var third_stop_opp_Bit_Ahead_fitness = {lat:18.577039339763772, lng:73.77067525148838}
   var destination_moze_clg = {lat:18.574843208216823, lng:73.76797181992866}

    myTrip =  [
        start_location_concordPortia,//Concord Portia Building
        { lat:18.58218918958954, lng:73.77114382478845},//Concord Portia next road
        {lat:18.58171786851615, lng:73.77112198379483},//adjusted point to get route
        {lat:18.580368622397092, lng:73.77117888426264 },//wonderwall next road going inside
        first_stop_wonderwall,//wonderwall
        {lat:18.580337825664092, lng:73.7711768579312 },//wonderwall next road coming out
        {lat: 18.580304774376884, lng:73.77116009413095},//adjusted point_1
        {lat: 18.580274901093727, lng:73.77112656652194},//adjusted point_2
        {lat:18.58025138382607, lng:73.77105414687988},//adjusted point_3
        {lat:18.58026536706557, lng:73.77070143639273},//enter on Golden Strret
        {lat:18.579648832137032, lng:73.77073764621402},//towards Pallazzo Apartments
        second_stop_pallazo,
        {lat:18.579512177186125, lng:73.77074569283488}, //palazzo to Golden street
        {lat:18.578875515728512, lng:73.77078484733275},//adjusted_point_1
        {lat:18.578770936118207, lng:73.77074004873157},//adjusted_point_2
        {lat:18.578123737927523, lng:73.7706717708473},//Madhuban Socity Road
        {lat:18.57769867791879, lng:73.77068373111095},//continue on Madhuban Socity Road
        third_stop_opp_Bit_Ahead_fitness,//opposit of Bit Ahead Fitness
        {lat:18.576766909733344, lng:73.7706458175326},//adjusted_point_1
        {lat:18.576564857687995, lng:73.77065361369544},
        {lat:18.575237802049173, lng:73.77081666479961},//ike_zone opposite
        {lat:18.57484432749207, lng:73.77084687232596},//Intersection DP Road
        {lat:18.574712693631263, lng:73.77084784589032},
        {lat:18.574892540106564, lng:73.77026778644822},//opposite KAD cool center
        {lat:18.575078141600198, lng:73.76961936237156},//opposite oyoflagship hotel Ambience
        {lat:18.57516673869798, lng: 73.76922268423627},
        {lat:18.575170552423163, lng:73.7690979615308},//junction
        {lat:18.57516419621637, lng:73.76853067426858},
        {lat:18.575129872685356, lng:73.76815382394344},
        {lat:18.575108261569692, lng:73.76794058835021},//Entering Towards Moze College
        
        destination_moze_clg
    
    ];
  
  var polyline = new google.maps.Polyline({
    path:myTrip,
    strokeColor:"#0000FF",
    strokeOpacity:0.8,//
    strokeWeight:2,
    map:map
  });
//---------------------------------------------------------------
  var infowindow_start_location_concordPortia = new google.maps.InfoWindow({
    content:'<div class="infostyle">Journey Starts at 7:AM, Bus will wait here 7 to 7:05 AM </div>'
     //content: '<div class="infostyle">First Stop at 7:10 to 000000AM</div>'
  });
  var marker = new google.maps.Marker({
    position: start_location_concordPortia,
    map: map
  });
  
  infowindow_start_location_concordPortia.open(map,marker);
              //**************************************** */
   var infowindow_first_stop_wonderwall = new google.maps.InfoWindow({
     // content: '<div class="infowindow-content">First Stop at 7:10 to 000000AM</div>'
     content:'<div class="infostyle">First Stop at 7:10 to 7:12AM</div>'
    });
              
  var marker = new google.maps.Marker({
    position: first_stop_wonderwall,
    map: map
  });
  
  infowindow_first_stop_wonderwall.open(map,marker);
                //**************************************** */

    
  var infowindow_second_stop_pallazo = new google.maps.InfoWindow({
  content:'<div class="infostyle">Second Stop at 7:15 to 7:17AM</div>'
  });
    var marker = new google.maps.Marker({
       position: second_stop_pallazo,
        map: map
  });
  infowindow_second_stop_pallazo.open(map,marker);      
              //**************************************** */

    var infowindow_third_stop_opp_Bit_Ahead_fitness = new google.maps.InfoWindow({
    content:'<div class="infostyle">Third Stop at 7:20 to 7:22AM </div>'
  });
  var marker = new google.maps.Marker({
    position: third_stop_opp_Bit_Ahead_fitness,
    map: map
  });
  
  infowindow_third_stop_opp_Bit_Ahead_fitness.open(map,marker);

                             //**************************************** */

   var infowindow_destination_moze_clg = new google.maps.InfoWindow({
        content:'<div class="infostyle">Journey Completes at 7:25AM </div>'
    });
   var marker = new google.maps.Marker({
        position: destination_moze_clg,
        map: map
    });
                      
    infowindow_destination_moze_clg.open(map,marker);
                      
  //---------------------------------------------------------------------
  // Get the existing path of the polyline
var path = polyline.getPath();

// Define the coordinates of the new vertex
var concord_portia_nextRoad = new google.maps.LatLng(18.580376660504673, 73.77125833213161)//, newLng); // Replace newLat and newLng with the coordinates of your new vertex
//var wonderwall_nextRoad = new google.maps.LatLng(18.580368622397092, 73.77117888426264)//, newLng); // Replace newLat and newLng with the coordinates of your new vertex

// Add the new vertex to the path
 //path.push(newVertex_1);

// Set the updated path to the polyline
//polyline.setPath(path);
//console.log("polyline:  ===> ", polyline);














//-----------------------------------------------------------------
  // The marker, positioned at Uluru
  // const marker = new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "Uluru",
  // });
}

initMap();