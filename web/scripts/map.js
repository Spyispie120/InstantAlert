/* global AjaxPostPromise */

//(() => {
var $ = (id)=> {return document.getElementById(id);};
const apiLink = "http://10.18.198.148:4567";
window.onload = function(){
    $("send").onclick = buttonPost;

    var arrOfUsers = [];
    createMarkerArr(arrOfUsers);
};
var arr_msg = [];
var longlat;

var features = [];

var map, infoWindow;
function buttonPost() {
    console.log("butn click");
    var text = $("text").value;
    var radios = document.getElementsByName("level");
    var value;
    for (var i = 0, length = radios.length; i < length; i++)
    {
         if (radios[i].checked)
         {
             value = radios[i].value;
             break;
         }
    }
    console.log(longlat);
    var postPara = {
        user_id : Math.floor(Math.random() * 1000),
        lon: longlat["lng"],
        lat: longlat["lat"],
        color: value,
        msg : text
    };

    fetch(apiLink+"/message/", {
      //mode: 'no-cors',
      method: 'POST', // or 'PUT'
      body: JSON.stringify(postPara), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("stufff posttted, let goo dudde");
        console.log(response);
        var obj = {
            user_id : Math.floor(Math.random() * 1000),
            msg_id : response,
            long: longlat["lng"],
            lat: longlat["lat"],
            color: value,
            msg : text
        }
        console.log(obj);
        arr_msg.push(obj);
        createMarker(obj);
    }).catch(function(err){
        console.log(err);
    });
}
function createMarkerArr(arrOfUsers){
    for (var i = 0; i < arrOfUsers.length; i++) {
        var obj =
          {
            position: new google.maps.LatLng(parseFloat(arrOfUsers[i].lat),
                                            parseFloat(arrOfUsers[i].long)),
            type: "level" + parseInt(arrOfUsers[i].color)
          };
          features.push(obj);
    }
    features.forEach(function(feature) {
    console.log("new marker created");
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });

}
function createMarker(marker){
    console.log("new marker created");
    console.log(marker);
    console.log(parseFloat(marker.lat));
    console.log(parseFloat(marker.lon));

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(marker.lat),
                                        parseFloat(marker.lon)),
        icon: 'level'+marker.color,
        map: map
    });
}
function createMarkerIncident(incident){
    var obj =
      {
        position: new google.maps.LatLng(parseFloat(incident.lat),
                                        parseFloat(incident.long)),
        type: "level" + parseInt(incident.color)
      };
      features.push(obj);
      createMarker(obj);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 16
    });
    infoWindow = new google.maps.InfoWindow;
    getCurrentLocation();
    trackLocation();
    getAllIncident();
    // Try HTML5 geolocation.

}

function getAllIncident(){
    fetch(apiLink+"/allincidents/", {
      //mode: 'no-cors',
      method: 'GET', // or 'PUT'

      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("stufff posttted, let goo dudde");
        console.log(response);
        response.forEach(function(item){
            console.log(item);
            arr_msg.push(item);
            createMarker(item);
        });

    }).catch(function(err){
        console.log(err);
    });
}

function getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(centerMap, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function centerMap(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    longlat = pos;
    console.log(pos);
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

var id;

function success(pos) {
  var crd = pos.coords;

  // if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
  //   console.log('Congratulations, you reached the target');
  //   //navigator.geolocation.clearWatch(id);
  // }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

function trackLocation(){
    id = navigator.geolocation.watchPosition(success, error);
}

var iconBase = "http://10.18.198.148:4567/images/";
var icons = {
  level3: {
    icon: iconBase + 'level3.png'
  },
  level2: {
    icon: iconBase + 'level2.png'
  },
  level1: {
    icon: iconBase + 'level1.png'
  }
};




//})();
