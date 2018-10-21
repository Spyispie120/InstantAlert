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

        var iconBase = '/Users/haileewang/Desktop/alart/InstantAlert/web/image/';
        var icons = {
          emergence: {
            icon: iconBase + 'emergence.png'
          },
          incidence: {
            icon: iconBase + 'incidence.png'
          },
          case: {
            icon: iconBase + 'case.png'
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(47.655548, -122.303200),
            type: 'emergence'
          }, {
            position: new google.maps.LatLng(47.655348, -122.303720),
            type: 'incidence'
          }, {
            position: new google.maps.LatLng(47.655078, -122.304950),
            type: 'case'
          }
        ];

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
