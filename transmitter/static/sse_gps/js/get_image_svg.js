// Create an image element
var img = new Image();

// Set the source URL of the image
img.src = 'YOUR_SVG_IMAGE_URL';

// When the image is loaded
img.onload = function() {
  // Create a canvas element
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Set the canvas size to match the image size
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the image onto the canvas
  ctx.drawImage(img, 0, 0);

  // Get the SVG path data from the canvas
  var svgPath = extractSvgPathFromCanvas(canvas);

  // Use the SVG path as the path attribute in your Google Maps API symbol
  const busSymbol = {
    path: svgPath,
    fillColor: '#FFD700',
    fillOpacity: 1,
    scale: 1,
    anchor: new google.maps.Point(50, 40), // Adjust anchor point as needed
    strokeWeight: 2,
    strokeColor: '#000',
    rotation: 0
  };

  // Use the busSymbol in your marker creation
};

function extractSvgPathFromCanvas(canvas) {
  // Extract SVG path data from the canvas (implementation depends on the structure of your SVG image)
  // This function should return a string representing the SVG path data
}
