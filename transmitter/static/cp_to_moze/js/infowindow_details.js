
var markersAndInfowindows = [];

  
  var polyline = new google.maps.Polyline({
    path:myTrip,
    strokeColor:"#0000FF",
    strokeOpacity:0.8,//
    strokeWeight:1,
    map:map
  });
    //---------------------------------------------------------------
      // Function to create a marker with an info window
    function createMarkerWithInfoWindow( location ) {
      var marker = new google.maps.Marker({
          position: location.position,
          map: map,  
          zIndex: 9999,
          icon: {
            url: "	https://cdn-icons-png.flaticon.com/512/2684/2684188.png",
            scaledSize: new google.maps.Size(40, 40), // Adjust the size of the icon
            //anchor: new google.maps.Point(20, 20), // Adjust the anchor point if needed
            
        },
         
      });

      var infowindow = new google.maps.InfoWindow({
          content: '<div class="infostyle">' + location.content + '</div>',
          zIndex: 11111,
          pixelOffset: location.pixel_offset,
          //anchor: null
        });
        // infoWindow.setOptions({anchor: null}).
      
      infowindow.open(map, marker);

      // Return marker and infowindow for later use
      return { marker: marker, infowindow: infowindow };
    }



    // Create an array to store references to marker and infowindow objects
    

    // Create markers with info windows for each location
    locations.forEach(function(location) {
        var markerAndInfowindow = createMarkerWithInfoWindow(location);
        markersAndInfowindows.push(markerAndInfowindow);
    }) ;

    //----------------------------------------------------------


var businfowindow = new google.maps.InfoWindow({
  content: '<div class="infostyle">' + "I am bus" + set_customicon(180) + '</div>',
  zIndex: google.maps.Marker.MAX_ZINDEX + 10000
  //pixelOffset: new google.maps.Size(90, 0),
  //anchor: null
});
busMarker = new google.maps.Marker({
  map: map,
  position: center,  // Initial position
  title: 'Bus',
  icon: set_customicon(180), 
  zIndex: google.maps.Marker.MAX_ZINDEX + 10000
 
});
//businfowindow.open(map, busMarker);


updateInfoWindowContent = function (new_pos, newContent) {
  // Loop through markers to find the one with the matching position
    for (var i = 0; i < markersAndInfowindows.length; i++) {
    //console.log("i : ==>>"  ,i);
    var markerAndInfowindow = markersAndInfowindows[i];

      var markerPosition = markerAndInfowindow.marker.getPosition();

      if (markerPosition.lat() === new_pos.lat && markerPosition.lng() === new_pos.lng) {
          // Found the marker with matching position, update its infowindow content
           // update_windows(i);
           console.log("called from updateInfoWindowContent:==>", i);
                   if(i === 0) {
                     update_windows_from_origin();
                     // Break out of the loop since we found the marker
                  break;
                }
                 else if(i === 1 ){
                     update_windows_from_first_stop();
                     break;
                 }
                 else if(i === 2 ){
                   update_windows_from_second_stop();
                  break;
               }
               else if(i === 3 ){
                 update_windows_from_third_stop();
                 break;
             }
             else if(i === 4 ){
               update_windows_from_destination();
               break;
          }
     }
    
    }
}



update_windows = function(location_number){
      console.log("called from update_windows:==>", location_number);
  for (var i = location_number; i < markersAndInfowindows.length; i++) {
    //console.log("i : ==>>"  ,i);
    var markerAndInfowindow = markersAndInfowindows[i];

          var infowindow = markerAndInfowindow.infowindow;

                // Close the previous info window
            infowindow.close();
            
            newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[location_number];
                // Update the content
            infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
            infowindow.setZIndex(1);

                // Open the updated info window
            infowindow.open(map, markerAndInfowindow.marker);
                //update_all_info_windows()
          }         
      
}


update_windows_from_origin = function() {

  for (var i = 0; i < markersAndInfowindows.length; i++) {
    //console.log("i : ==>>"  ,i);
    var markerAndInfowindow = markersAndInfowindows[i];

          var infowindow = markerAndInfowindow.infowindow;

                // Close the previous info window
            infowindow.close();
            
            newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[0];
                // Update the content
            infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
            infowindow.setZIndex(1);

                // Open the updated info window
            infowindow.open(map, markerAndInfowindow.marker);
                //update_all_info_windows()
          }         
      
  }   

update_windows_from_first_stop = function(){
    for (var i = 1; i < markersAndInfowindows.length; i++) {
      //console.log("i : ==>>"  ,i);
      var markerAndInfowindow = markersAndInfowindows[i];
  
            var infowindow = markerAndInfowindow.infowindow;
  
                  // Close the previous info window
              infowindow.close();
              
              newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[1];
                  // Update the content
              infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
  
                  // Open the updated info window
              infowindow.open(map, markerAndInfowindow.marker);
                  //update_all_info_windows()
            }   
  }

update_windows_from_second_stop = function(){

    for (var i = 2; i < markersAndInfowindows.length; i++) {
      //console.log("i : ==>>"  ,i);
      var markerAndInfowindow = markersAndInfowindows[i];
  
            var infowindow = markerAndInfowindow.infowindow;
  
                  // Close the previous info window
              infowindow.close();
              
              newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[2];
                  // Update the content
              infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
  
                  // Open the updated info window
              infowindow.open(map, markerAndInfowindow.marker);
                  //update_all_info_windows()
            }  
  };

update_windows_from_third_stop = function(){

    for (var i = 3; i < markersAndInfowindows.length; i++) {
      //console.log("i : ==>>"  ,i);
      var markerAndInfowindow = markersAndInfowindows[i];
  
            var infowindow = markerAndInfowindow.infowindow;
  
                  // Close the previous info window
              infowindow.close();
              
              newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[3];
                  // Update the content
              infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
  
                  // Open the updated info window
              infowindow.open(map, markerAndInfowindow.marker);
                  //update_all_info_windows()
            }  
  };
  update_windows_from_destination = function(){

    for (var i = 4; i < markersAndInfowindows.length; i++) {
      //console.log("i : ==>>"  ,i);
      var markerAndInfowindow = markersAndInfowindows[i];
  
            var infowindow = markerAndInfowindow.infowindow;
  
                  // Close the previous info window
              infowindow.close();
              
              newContent =  `${formatAMPM(new Date)}` + '<br>' + messages_when_bus_is_arrived[4];
                  // Update the content
              infowindow.setContent('<div class="infostyle">' + newContent + '</div>');
  
                  // Open the updated info window
              infowindow.open(map, markerAndInfowindow.marker);
                  //update_all_info_windows()
            }  
  };


function formatAMPM(date) {
  var date1 = date.toDateString()
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = date1 +',' + hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


//  var destination_moze_clg = {lat:18.574843208216823, lng:73.76797181992866}
// Example usage to update the content of the first info window
// updateInfoWindowContent(second_stop_pallazo, 'New content for the first info window');
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















//info_window_details();