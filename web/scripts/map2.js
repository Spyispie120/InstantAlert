//(() => {
    // window.onload = function(){
    //     initMap();
    // };

    var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });


        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You location.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        var iconBase = 'D:/Programming/Repository/InstantAlert/web/image/';
        //D:/Programming/Repository/InstantAlert/web/image/
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
        var obj1 = {
          user_id: 10,
          msg_id : 98,
          long:"-122.303290",
          lat:"47.655548",
          color: 1,
          msg: "boiiiii fire runnn"
        }
        var obj2 = {
          user_id: 10,
          msg_id: 322,
          long:"-122.30312",
          lat:"47.655548",
          color: 1,
          msg: "boiiiii fire runnn"
        }
        var obj3 = {
          user_id: 10,
          msg_id: 23,
          long:"-122.30200",
          lat:"47.655548",
          color: 1,
          msg: "boiiiii fire runnn"
        }
        var arrOfUsers = [obj1, obj2, obj3];



        var features = [
          {
            position: new google.maps.LatLng(47.655548, -122.303200),
            type: 'level3'
          }, {
            position: new google.maps.LatLng(47.655348, -122.303720),
            type: 'level2'
          }, {
            position: new google.maps.LatLng(47.655078, -122.304950),
            type: 'level1'
          }
        ];

        for (var i = 0; i < arrOfUsers.length; i++) {
            var obj =
              {
                position: new google.maps.LatLng(parseFloat(arrOfUsers[i].lat),
                                                parseFloat(arrOfUsers[i].long)),
                type: "level" + parseInt(arrOfUsers[i].color)
              };
              features.push(obj);
            //Do something
        }

        // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });

        // var marker = new google.maps.Marker({
        //   position: pos,
        //   map: map,
        //   title: 'Hello word'
        // });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
//})();
