// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 4
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
// actuall data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// small data
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";


d3.json(queryUrl, function(data) {
  console.log(data.features);
  createFeatures(data.features);
}); 

function createFeatures(earthquakedata){

for (var i = 0; i < earthquakedata.length; i++) {

  var color = "";
  if (earthquakedata[i].properties["mag"] <=1 ) {
    color = "#C2E9A0";
  }
  else if (earthquakedata[i].properties["mag"] <=2) {
    color = "#97D85E";
  }
  else if (earthquakedata[i].properties["mag"] <=3) {
    color = "yellow";
  }
  else if (earthquakedata[i].properties["mag"] <=4) {
    color = "orange";
  }
  else if (earthquakedata[i].properties["mag"] <=5) {
    color = "darkorange";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle([earthquakedata[i].geometry.coordinates[1],earthquakedata[i].geometry.coordinates[0]], {
    fillOpacity: 0.75,
    color: "none",
    fillColor: color,
    // Adjust radius
    radius: earthquakedata[i].properties["mag"] * 15000
  }).bindPopup("<h1>Title: " + earthquakedata[i].properties["title"] + "</h1> <hr> <h3>Magnitude: " + earthquakedata[i].properties["mag"] + "</h3>").addTo(myMap);
};


// var overlayMaps = {
//   Cities: cityLayer
// };
// L.control.layers(overlayMaps).addTo(myMap);
function getColor(d) {
  return d <=1 ? '#C2E9A0' :
         d <=2  ? '#97D85E' :
         d <= 3 ? 'yellow' :
         d <= 4 ? 'orange' :
         d <= 5  ? 'darkorange' :
                    '#darkorange';
}


var legend = L.control({position: 'bottomright'});
legend.onAdd = function (myMap) {

  var div = L.DomUtil.create('div', 'legend'),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(myMap);


};
