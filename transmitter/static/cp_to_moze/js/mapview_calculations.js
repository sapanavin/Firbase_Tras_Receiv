// Define the center point
//var center = new google.maps.LatLng(18.582193106477664, 73.77107035263678);

// Calculate the bounds for the desired view
// var south = google.maps.geometry.spherical.computeOffset(center, 500, 180); // 5km to the south
// var east = google.maps.geometry.spherical.computeOffset(center, 100, 90); // 1km to the east
// var west = google.maps.geometry.spherical.computeOffset(center, 100, -90); // 1km to the west

// // Create a bounds object
// var bounds = new google.maps.LatLngBounds(); console.log("bounds: ",bounds);
// bounds.extend(south);
// bounds.extend(east);
// bounds.extend(west);
// console.log("South  ",south)
// Set the map to the calculated bounds
//map.fitBounds(bounds);


/////////////////zoom level calculation///////////////////////
function calculateZoomLevel(radiusInMeters) {
    // This constant is based on the formula for converting meters to zoom level
    const zoomConstant = 156543.03392;
    
    // Calculate the zoom level
    const zoomLevel = Math.round(Math.log2(zoomConstant / radiusInMeters));
    
    return zoomLevel;
  }
  
// Define the radius in meters
//var radiusInMeters = south; // 5 kilometers

// Calculate the zoom level
//var zoomLevel = calculateZoomLevel(5000);
//console.log("zoomLevel  :====>  ",zoomLevel);

/*
var radiusInMeters = 500; // 5 kilometers
var bounds = new google.maps.Circle({
  center: center,
  radius: radiusInMeters,
}).getBounds();

// Set the map bounds
map.fitBounds(bounds);*/