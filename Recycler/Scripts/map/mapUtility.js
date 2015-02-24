(function ($, doc) {
    var _app,
         _mapElem,
         _mapObj,
         _private,

         //Private methods
         _private = {
             getLocation: function (options) {
                 var dfd = new $.Deferred();

                 //Default value for options
                 if (options === undefined) {
                     options = { enableHighAccuracy: true };
                 }

                 navigator.geolocation.getCurrentPosition(
                     function (position) {
                         dfd.resolve(position);
                     },
                     function (error) {
                         dfd.reject(error);
                     },
                     options);

                 return dfd.promise();
             },

             markMapWithGeo: function (title, geo) {
                 if (!geo) return;

                 _mapElem = document.getElementById("map_of_where_item_is_placed");
                 if (!_mapElem) return;

                 var myOptions,
                      mapObj = _mapObj,
                      mapElem = _mapElem,
                      pin,
                      latlng;

                 if (navigator.onLine === true) {
                     //Testing: make sure google map working
                     // var mapoptions = {
                     //      zoom: 8,
                     //      center: new google.maps.latlng(-34.397, 150.644)
                     // };
                     // var map = new google.maps.map(mapelem,
                     //      mapoptions);


                     //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                     _mapElem = mapElem; //Cache DOM element

                     // Use Google API to get the location data for the current coordinates
                     latlng = new google.maps.LatLng(geo.lat, geo.lng);

                     myOptions = {
                         zoom: 11,
                         mapTypeControl: false,
                         center: latlng,
                         navigationControlOptions: {
                             style: google.maps.NavigationControlStyle.SMALL
                         },
                         mapTypeId: google.maps.MapTypeId.ROADMAP
                     };

                     mapObj = new google.maps.Map(mapElem, myOptions);
                     var marker = new google.maps.Marker({
                         map: mapObj,
                         position: latlng,
                         title: title
                     });

                     //_mapObj.setCenter(marker.position);
                     //google.maps.event.trigger(mapObj, "resize");

                     _mapObj = mapObj; //Cache at app level                 
                 } else {
                     alert("Can't get map location");
                 }
             },

             getLocationByAddress: function (address) {
                 //Delcare function variables
                 var myOptions,
                      mapObj = _mapObj,
                      mapElem = _mapElem,
                      pin,
                      latlng;

                 if (navigator.onLine === true) {
                     // Testing: make sure google map working
                     //// var mapOptions = {
                     ////     zoom: 8,
                     ////     center: new google.maps.LatLng(-34.397, 150.644)
                     //// };
                     ////var map = new google.maps.Map(mapElem,
                     ////     mapOptions);
                     if (address !== undefined && address !== null && address != "null null null") {
                         var geocoder = new google.maps.Geocoder();
                         geocoder.geocode({
                             'address': address
                         }, function (results, status) {
                             debugger;
                             if (status == google.maps.GeocoderStatus.OK) {
                                 var retailerResult = results[0];
                                 //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                                 _mapElem = mapElem; //Cache DOM element

                                 // Use Google API to get the location data for the current coordinates
                                 latlng = new google.maps.LatLng(retailerResult.geometry.location.lat(), retailerResult.geometry.location.lng());

                                 myOptions = {
                                     zoom: 11,
                                     mapTypeControl: false,
                                     center: latlng,
                                     navigationControlOptions: {
                                         style: google.maps.NavigationControlStyle.SMALL
                                     },
                                     mapTypeId: google.maps.MapTypeId.ROADMAP
                                 };

                                 mapObj = new google.maps.Map(mapElem, myOptions);
                                 _mapObj = mapObj; //Cache at app level

                                 var marker = new google.maps.Marker({
                                     map: _mapObj,
                                     position: retailerResult.geometry.location,
                                     title: address
                                 });


                                 _mapObj.setCenter(marker.position);
                                 google.maps.event.trigger(mapObj, "resize");

                                 $("#retailerLocationContent").show();
                                 $("#offline").hide();
                             } else {
                                 alert("Geocode was not successful for the following reason: " + status);
                             }
                         });
                     } else {
                         $("#retailerLocationContent").hide();
                         $("#offline").text('Can not get location for empty Address');
                         $("#offline").show();
                     }
                 } else {
                     $("#retailerLocationContent").hide();
                     $("#offline").text('Please reconnect to Internet.');
                     $("#offline").show();
                 }
             },
             addMarkers: function (locations, mapObj) {
                 var marker,
                      currentMarkerIndex = 0;


                 function createMarker(index) {
                     if (index < locations.length) {
                         var tmpLocation = locations[index];

                         marker = new google.maps.Marker({
                             position: tmpLocation.position,
                             map: mapObj,
                             title: tmpLocation.title,
                             icon: tmpLocation.icon,
                             shadow: tmpLocation.shadow,
                             animation: tmpLocation.animation
                         });
                         oneMarkerAtTime();
                     }
                 }

                 function oneMarkerAtTime() {
                     google.maps.event.addListener(marker, "animation_changed", function () {
                         if (marker.getAnimation() === null) {
                             createMarker(currentMarkerIndex += 1);
                         }
                     });
                 }

                 createMarker(0);
             },
         };

    _app = {
        mapInit: function () {
            _mapElem = document.getElementById("map");
        },

        mapShow: function (title, geo) {
            if (navigator.onLine === false) {
                alert("Please reconnect to the Internet to load locations.");
                return;
            }
            _private.markMapWithGeo(title, geo);
        }
    };

    $.extend(window, {
        mapUtilityInit: _app.mapInit,
        mapUtitityShow: _app.mapShow,
        getLocation: _private.getLocation
    });
}(jQuery, document));