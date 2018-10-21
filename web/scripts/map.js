/* global AjaxPostPromise */

//(() => {
var $ = (id)=> {return document.getElementById(id);};
const apiLink = "http://10.18.198.148:4567";
window.onload = function(){
    $("send").onclick = buttonPost;
};
var arr_msg = [];
var longlat;

function buttonPost() {
    console.log("hi");
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
      mode: 'no-cors',
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
                /*var obj = {
                    user_id : Math.floor(Math.random() * 1000),
                    msg_id : response,
                    long: longlat["long"],
                    lat: longlat["lat"],
                    color: value,
                    msg : text
                }
                arr_msg.push(obj);*/
    }).catch(function(err){
        console.log(err);
    });

    // var ajaxPromise = new AjaxPostPromise(apiLink+"/message/", postPara);
    // ajaxPromise
    //     .then((response)=>{
    //         console.log("stufff posttted, let goo dudde");
    //         var obj = {
    //             user_id : Math.floor(Math.random() * 1000),
    //             msg_id : response,
    //             long: longlat["long"],
    //             lat: longlat["lat"],
    //             color: value,
    //             msg : text
    //         }
    //         arr_msg.push(obj);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     });
}

var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 16
    });
    infoWindow = new google.maps.InfoWindow;
    getCurrentLocation();
    trackLocation();

    // Try HTML5 geolocation.

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

//})();
