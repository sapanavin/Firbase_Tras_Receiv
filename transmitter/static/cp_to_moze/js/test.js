set_bluecustomicon = function (rotation){
    return customIcon = {
       path: svg_image,
       fillColor: '#0000FF',
       fillOpacity: 1,
       scale: 1,
       strokeWeight: 1,
       strokeColor: '#000',
       rotation: rotation
     };

   }
//<img src="   https://cdn-icons-png.flaticon.com/512/1042/1042263.png " width="256" height="256" alt="" title="" class="img-small">

// Create Marker m1
var m1 = new google.maps.Marker({
    position: first_stop_wonderwall,// m1 position,
    map: map,
    // icon: {
    //     url: "	https://cdn-icons-png.flaticon.com/512/2684/2684188.png",
    //     scaledSize: new google.maps.Size(50, 50), // Adjust the size of the icon
    //     anchor: new google.maps.Point(20, 20), // Adjust the anchor point if needed
        
    // }, 
    icon:set_bluecustomicon(180),
    zIndex: 9999 // Set a high zIndex for m1
});

// Create InfoWindow i1 associated with m1
var i1 = new google.maps.InfoWindow({
    content: "I1....................",// i1 content,
    zIndex: 9998 // Set zIndex just below m1
});
i1.open(map, m1);
// Create Marker m2
var m2 = new google.maps.Marker({
    position: first_stop_wonderwall,// m2 position,
    map: map,
    icon: set_customicon(180), 
    zIndex: 9997 // Set a zIndex lower than m1
});

// Create InfoWindow i2 associated with m2
var i2 = new google.maps.InfoWindow({
    content: "I2....................",// i2 content,
    pixelOffset: new google.maps.Size(10, 30) ,
    zIndex: 9996, // Set zIndex just below m2
});
i2.open(map, m2);