// Function to update the information panel with route details
function updateInfoPanelSpeed(routeDetails) {
    // Populate the information panel HTML with route details
    //console.log("from updateInfoPanel ");
    document.getElementById("infospeed").innerHTML = routeDetails + " km/hr ";
}

// Example usage:
//const routeDetails = "Distance: 10 km, Duration: 20 minutes";
//updateInfoPanelSpeed(routeDetails);


function updateInfoPanelUpdates(recent_update) {
    // Populate the information panel HTML with route details
    console.log("from updateInfoPanel ");
    document.getElementById("infoupdates").innerHTML = recent_update ;
}


