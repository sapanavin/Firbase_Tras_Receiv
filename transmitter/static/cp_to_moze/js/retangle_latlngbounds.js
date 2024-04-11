// Assuming you have initialized the map and created the bounds object (bounds)

// Create a LatLngBounds object to encompass all markers and polylines
var bounds = new google.maps.LatLngBounds();
//Define the bounds for the rectangle
//Calculate the bounds for the desired view
var north = google.maps.geometry.spherical.computeOffset(center, 10, 0); // 1km to the west
var south = google.maps.geometry.spherical.computeOffset(center, 800, 180); // 5km to the south
var east = google.maps.geometry.spherical.computeOffset(center, 50, 90); // 1km to the east
var west = google.maps.geometry.spherical.computeOffset(center, 350, -90); // 1km to the west


// Create a bounds object
var bounds = new google.maps.LatLngBounds(); console.log("bounds: ",bounds);
bounds.extend(south);
bounds.extend(east);
bounds.extend(west);
bounds.extend(north);
//console.log("South  ",south)
//Set the map to the calculated bounds
// Set the center and restrictions after initializing the map
map.setOptions({
     // Center the map within the specified bounds
    restriction: {
      latLngBounds: bounds, // Set the boundaries for the map view
      //strictBounds: true // Set to true if you want to strictly enforce the boundaries
    }
  });

// Create a rectangle object
var rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: false, // Set to true if you want users to be able to edit the rectangle
    draggable: false, // Set to true if you want users to be able to drag the rectangle
    strokeColor: '#FF0000', // Color of the rectangle border
    strokeOpacity: 0.5, // Opacity of the rectangle border
    strokeWeight: 2, // Width of the rectangle border
    fillColor: '#0000FF', // Fill color of the rectangle
    fillOpacity: 0.2, // Opacity of the rectangle fill
    map: map // The map object where you want to display the rectangle
  });
  
  // Optionally, you can listen for events on the rectangle, such as click or drag events
  google.maps.event.addListener(rectangle, 'click', function() {
    // Handle click event
  });
  
  // Adjust the map viewport to fit the bounds
  map.fitBounds(bounds);
  