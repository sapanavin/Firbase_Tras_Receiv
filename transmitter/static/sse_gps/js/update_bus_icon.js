function greet(name) {
    return `Hello, ${name}`;
  }
  
  const message = "How you doing?";
  const buspos=123;


  // Assuming 'map' is your Google Map object and 'busIcon' is your School Bus Icon marker

// Function to update bus icon position and rotation
function updateBusPositionAndRotation(newLat, newLng, prevLat, prevLng) {
    // Update bus icon position
    busIcon.setPosition(new google.maps.LatLng(newLat, newLng));

    // Calculate bearing between previous and current position
    var bearing = calculateBearing(prevLat, prevLng, newLat, newLng);

    // Rotate bus icon
    busIcon.setIcon({
        url: 'path/to/bus-icon.png',
        scaledSize: new google.maps.Size(50, 50), // Adjust size as needed
        rotation: bearing  // Set rotation angle
    });
}

// Function to calculate bearing between two points
function calculateBearing(lat1, lng1, lat2, lng2) {
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var lat1Rad = lat1 * Math.PI / 180;
    var lat2Rad = lat2 * Math.PI / 180;
    var y = Math.sin(dLng) * Math.cos(lat2Rad);
    var x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
    var bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
}

// Example usage: Call updateBusPositionAndRotation() with new latitude and longitude values

  
  
  
  
  
  
  /*
  
 
  Approach ====>>>>> 2

  <!-- HTML template -->
<!DOCTYPE html>
<html>
<head>
    <title>Real-time GPS Tracking</title>
    <style>
        #map {
            height: 400px;
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="map"></div>

    <script>
        function initMap() {
            // Initialize Google Maps
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 41.20301887434294, lng: -96.0882217583561},
                zoom: 12
            });

            // Define school bus icon
            const busIcon = {
                url: '{% static 'path/to/bus-icon.png' %}',
                scaledSize: new google.maps.Size(50, 50)
            };

            // Define waypoints (replace with your waypoints)
            const waypoints = [
                {lat: 41.20301887434294, lng: -96.0882217583561},
                {lat: 41.204057, lng: -96.086868},
                {lat: 41.205162, lng: -96.085929}
                // Add more waypoints as needed
            ];

            // Set up DirectionsService
            const directionsService = new google.maps.DirectionsService();

            // Set up DirectionsRenderer
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true // Suppress default markers
            });

            // Fetch route
            const request = {
                origin: waypoints[0],
                destination: waypoints[waypoints.length - 1],
                waypoints: waypoints.slice(1, -1), // Exclude origin and destination
                travelMode: 'DRIVING'
            };

            directionsService.route(request, function(response, status) {
                if (status === 'OK') {
                    // Render route on map
                    directionsRenderer.setDirections(response);

                    // Move school bus icon along the route
                    let step = 0;
                    setInterval(function() {
                        const nextStep = step % response.routes[0].legs[0].steps.length;
                        const location = response.routes[0].legs[0].steps[nextStep].end_location;
                        moveBusIcon(location);
                        step++;
                    }, 5000); // Update every 5 seconds (adjust as needed)
                } else {
                    console.error('Directions request failed:', status);
                }
            });

            // Function to move school bus icon
            function moveBusIcon(location) {
                if (busMarker) {
                    busMarker.setPosition(location);
                } else {
                    // Create bus marker if it doesn't exist
                    busMarker = new google.maps.Marker({
                        position: location,
                        map: map,
                        icon: busIcon
                    });
                }
            }
        }
    </script>

    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
</body>
</html>
*/