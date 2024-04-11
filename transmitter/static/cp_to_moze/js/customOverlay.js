// Define the custom overlay class
function CustomOverlay(position, content, map) {
    this.position = position;
    this.content = content;
    this.map = map;

    this.div = document.createElement('div');   
    this.div.innerHTML = content;
    this.div.className = 'custom-overlay';

    // this.div.style.position = 'absolute';
    // this.div.style.backgroundColor = 'red';
    // this.div.style.border = '1px solid black';
    // this.div.style.zIndex =999999999;
    // Add more styling properties as needed

    // Add the overlay to the map
    this.setMap(map);
}

// Inherit from OverlayView
CustomOverlay.prototype = new google.maps.OverlayView();

// Implement the required onAdd method
CustomOverlay.prototype.onAdd = function() {
    var panes = this.getPanes();
    panes.floatPane.appendChild(this.div);
};

// Implement the required draw method
CustomOverlay.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.position);
    this.div.style.left = position.x + 'px';
    this.div.style.top = position.y + 'px';
};

// Usage example


var position = new google.maps.LatLng( first_stop_wonderwall);
var content = '<div>Custom Overlay Content</div>';
var customOverlay = new CustomOverlay(position, content, map);
