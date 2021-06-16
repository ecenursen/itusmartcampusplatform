let map;
let airquality_colors = ['lawngreen','darkgreen','gold','orange','red']
let x = 41.1078719;
let x_gap = 0.0009049;
let y = 29.017990;
let y_gap = 0.001211;

var rectangle_array = new Array(8);
for (var i = 0; i < 8; i++) {
  rectangle_array[i] = new Array(15);
}

function initMap() {
  console.log("map function working")

  var nodes_dict = JSON.parse(document.getElementById("pass_nodes").value);
  var nodes = nodes_dict['nodes'];

  var mapcolors_dict = JSON.parse(document.getElementById("pass_map_colors").value);
  var map_colors = mapcolors_dict['map_colors'];

  let icon1 = {
    url: "/static/sensor1.png",
    scaledSize: new google.maps.Size(30, 30)
  }
  let icon2 = {
    url: "/static/sensor2.png",
    scaledSize: new google.maps.Size(50, 50)
  } 

  map = new google.maps.Map(document.getElementById("map"), {
  zoom: 15.5,
  center: { lat: 41.104673239846306 , lng: 29.025202747128294 },
  mapTypeId: "terrain",
  });
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 15; j++) {
      rectangle_array[i][j] = [
        { lat: x-x_gap*i, lng: y+y_gap*(j+1)},
        { lat: x-x_gap*i, lng: y+y_gap*j },
        { lat: x-x_gap*(i+1), lng: y+y_gap*j },
        { lat: x-x_gap*(i+1), lng: y+y_gap*(j+1) },
      ];
      const airPoly = new google.maps.Polygon({
        paths: rectangle_array[i][j],
        strokeColor: "0x66000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: airquality_colors[map_colors[i][j]],
        fillOpacity: 0.5,
      });
      airPoly.setMap(map);
    }
  }

  for (var i = 0;i<nodes.length;i++){
    new google.maps.Marker({
      position: { lat: nodes[i][1], lng: nodes[i][2] },
      title: "N:"+nodes[i][0].toString(),
      map: map,
      icon: icon1,
    });
  }
}