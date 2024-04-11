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
  var set_customicon;
  var updateInfoWindowContent;
  
           
  var svg_image =`M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
  c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
   M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
  v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336
  h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z`;
  var lat1 = 18.582193106477664//{{ lat }}18.58223783009838, 73.77118808267363  18.582193106477664, 73.77107035263678
  var lng1 = 73.77107035263678// {{ lng }}18.608704944299117, 73.74783522639814
  var center =  {lat: lat1, lng: lng1};
  
  ///Falgrove 41.203089948599526, -96.08819894332197 
  //Concord Portia  18.582193106477664  73.77107035263678


  var start_location_concordPortia= {lat:18.582193106477664, lng:73.77107035263678}
  var first_stop_wonderwall = { lat:18.580368668590793, lng:73.77126789723931}//wonderw
  var second_stop_pallazo ={lat:18.57952743169931, lng:73.77087309775438}
     
  var third_stop_opp_Bit_Ahead_fitness = {lat:18.577039339763772, lng:73.77067525148838}
  var destination_moze_clg = {lat:18.574843208216823, lng:73.76797181992866};
  var moze_college_parking = {lat:18.57469422327938, lng:73.7679466454322};
  


  //Info window details::::================>>>>>>>>>>>>
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

   var locations = [
    { position: start_location_concordPortia, content: 'Journey Starts at 7:AM, Bus will wait here 7 to 7:05 AM', pixel_offset: new google.maps.Size(0, 0) },
    { position: first_stop_wonderwall, content: 'First Stop at 7:10 to 7:12AM', pixel_offset: new google.maps.Size(-190, 50) },
    { position: second_stop_pallazo, content: 'Second Stop at 7:15 to 7:17AM',pixel_offset: new google.maps.Size(-190, 50) },
    { position: third_stop_opp_Bit_Ahead_fitness, content: 'Third Stop at 7:20 to 7:22AM', pixel_offset: new google.maps.Size(-190, 40) },
    { position: destination_moze_clg, content: 'Journey Completes at 7:25AM', pixel_offset: new google.maps.Size(0,-20) }
  ];
  var messages_when_bus_is_arrived =[
    "Bus is Arrived at Concord Portia",
    "Bus is arrrived at wondewall Apartments",
    "Bus is arrived at Pallazo Apatments",
    "Bus is arrived at Bit Ahead Fitness Apatments",
    "Bus reached at Moze College"
  ]