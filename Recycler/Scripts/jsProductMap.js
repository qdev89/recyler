var googleMap = null;   
var markersArray=[];  
var allSpots = [];
var spotContent= "";


function fillContent(e){
     goToTop(e);
     $(".spot-info-content").html(spotContent);
}


function showSpotInfo(content){
   spotContent = content;
    app.application.navigate('spotInfo.html');
    $(".spot-info-content").html(content);
   
}


function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

function iconMapInit() {
    showLoading();
    if (googleMap != null){
        hideLoading();
         return;
        
    }
    
    navigator.geolocation.getCurrentPosition(function(x){
        
       
    $("#map-with-icons").height($("#findonmap .km-content").first().height()-60); 
    
    var mapOptions = {
        center: { lat: x.coords.latitude, lng: x.coords.longitude},       
        zoom: 8,
        streetViewControl: false
    };
     googleMap = new google.maps.Map(
        document.getElementById('map-with-icons'),
        mapOptions
        );
    setTimeout(function() {
        $("#map-with-icons").height($("#findonmap .km-content").first().height()-60);   
         $("#map-with-icons").width(500);
         $("#map-with-icons").height(500);
         console.log("here");
    }, 200);
        
    
    var data = app.everlive.data('Spot'); 
                          
    data.get().then(function(data) {
      
        hideLoading();
        allSpots=  data.result;
        
        var today = new Date();
        today.setHours(0);
		today.setMinutes(1);
        
        var twoDaysAfter = new Date();
        twoDaysAfter.setTime(twoDaysAfter.getTime() + (48*60*60*1000)); 
        
         var oneDayAter = new Date();
         oneDayAter.setTime(oneDayAter.getTime() + (24*60*60*1000));
        
        if(allSpots.length>0){            
             $.each(allSpots, function (i) {   
                
                 var grey =true;
                                  
                if( allSpots[i].SpotType==="Garage sale/Market/Event" ||  allSpots[i].SpotType ==="Help"){
                     var date  = new Date(allSpots[i].EventDate);                     
                    if(!isValidDate(date) || date > twoDaysAfter || date < today){ 
                        console.log(allSpots[i].SpotType, date, " too early or old");                        
                        return true;                    
                    }else console.log(date," this is ok");  
                    console.log(date,oneDayAter);
                    if(date<oneDayAter){
                        grey = false;
                    }                     
                }
                
                var content = 
                    "<div class='table-container' ><table>" + 
                 
                    "<tr><td></td><td class='spotName'>" + allSpots[i].Name + "</td></tr>" + 
                   "<tr><td></td><td class='spotDate'>" + allSpots[i].EventDate + "</td></tr>" + 
                 
                    "<tr class='img'><td></td><td> <img class='popupImg' src='" + allSpots[i].Image + "' /></td></tr>" + 
                 
                    "<tr> <td><img class='td-icon' src='images/mapicons/info_blue.png' /></td><td> " + allSpots[i].Description + "</td></tr>" + 
                 
                    "<tr><td><img class='td-icon' src='images/mapicons/phone_blue.png' /></td><td> " + allSpots[i].Phone + "</div>" +
                 
                    "<tr> <td><img class='td-icon' src='images/mapicons/opening_blue.png' /></td><td> Weekdays: " + allSpots[i].OpeningHoursWeekdaysFrom + " " + allSpots[i].OpeningTimeWeekdays + " - "+
                     allSpots[i].OpeningHoursWeekdaysTo + " " + allSpots[i].ClosingTimeWeekdays + "</td></tr>" + 
                 
                    "<tr><td></td><td> Saturday: " + allSpots[i].OpeningHoursSaturdayFrom + " " + allSpots[i].OpeningTimeSat + " - "+
                     allSpots[i].OpeningHoursSaturdayTo + " " + allSpots[i].ClosingTimeSat + "</td></tr>" + 
                 
                    "<tr><td></td><td> Sunday: " + allSpots[i].OpeningHoursSundayFrom + " " + allSpots[i].OpeningTimeSun + " - "+
                     allSpots[i].OpeningHoursSundayTo + " " + allSpots[i].ClosingTimeSun + "</td></tr>" + 
                 
                    "<tr><td><img class='td-icon' src='images/mapicons/adress_blue.png' /></td><td>  " + allSpots[i].Address + "</td></tr>" + 
               				
                    "<tr><td></td><td>  " + allSpots[i].City + "</td></tr>" + 
                                
                    "<tr><td></td><td>" + allSpots[i].Zip + "</td></tr>" + 
                 
                    "<tr><td><img class='td-icon' src='images/mapicons/www_icon_blue.png' /></td><td> <a href='" + allSpots[i].Web + "'>" + allSpots[i].Web + "</a></td></tr>" +
                 
                    "</table></div>";
                
                
                setPlace(allSpots[i].Latitude, allSpots[i].Longitude, false, allSpots[i].SpotType, googleMap,content,grey);                                             
       	 });
        }        
    },
     function(error) {
         hideLoading();
        err(error);
     });    
        
   });
       
}         
         
function mapInit() {
    if (googleMap != null)
        return;
    
     navigator.geolocation.getCurrentPosition(function(x){
            $("#map-with-markers").height($("#map-tabstrip .km-content").first().height()-60);
            var mapOptions = {
                center: { lat: x.coords.latitude, lng: x.coords.longitude},       
                zoom: 8,
                streetViewControl: false
            };
             googleMap = new google.maps.Map(
                document.getElementById('map-with-markers'),
                mapOptions
                );
            setTimeout(function() {
                $("#map-with-markers").height($("#map-tabstrip .km-content").first().height()-60);
               
            }, 200);
     });
}



function mapShow(e){    
     TranslateApp();
    console.log(e);
    if(e.sender.params.spot!="true" && e.sender.params.editSpot!="true") return;   
    
     if( markersArray!=undefined &&  markersArray.length>0){
                           for (var i = 0; i < markersArray.length; i++) {
                                markersArray[i].setMap(null);
                              }
                      }
     markersArray=[];
    if(e.sender.params.editSpot=="true"){
        console.log(parseFloat(editableSpot.Latitude));
        console.log(parseFloat(editableSpot.Longitude));
        console.log(editableSpot.Id);
          setTimeout(function() {
                 
                    setPlace(parseFloat(editableSpot.Latitude), parseFloat(editableSpot.Longitude),true,"");   
                }, 200);
        return;
    }
    
    
    var options = {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0
                };    
 
    function success(pos) {
      var crd = pos.coords;    
      setPlace(crd.latitude, crd.longitude,true);    
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
         setPlace(0, 0,true);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);  
}


function setPlace(lat, long,draggable, type, map,content,isGrey){
   
  //  log(content);
  //  log(isGrey);
  //  debugger;
    if(map==undefined) map=googleMap;    
    if(draggable!=true) draggable =false;     
    var icon="";
    console.log(type);
    switch(type){
        case "Eco/Green shop": 
        icon = "images/mapicons/eco_spot.png";
        break;
        
        case "FREE Food": 
        icon = "images/mapicons/food_small.png";
        break;
        
        case "Recycling company": 
        icon = "images/mapicons/business_smal.png";
        break;
        
        case "Garage sale/Market/Event": 
        if(!isGrey)
        icon = "images/mapicons/garagesale_small.png";
        else  icon = "images/mapicons/garagesale_grey.png";
        break;
        
        case "Food donation": 
        icon = "images/mapicons/foodwaste_small.png";
        break;
        
         case "Help": 
         if(!isGrey)
        icon = "images/mapicons/help-small.png";
        else  icon = "images/mapicons/help-grey.png";
        break;
        
        case "Recycling spot": 
        icon = "images/mapicons/recycling_small.png";
        break;
        
        case "upcycling": 
        icon = "images/mapicons/upcycling_small.png";
        break;   
        
        case "Terracycle spot": 
        icon = "images/mapicons/terracycle_small.png";
        break;
        
        default: icon = "";
        break;
    }   
        
    var LatLng = new google.maps.LatLng(lat, long);
     var image = undefined;
    if(icon != "")
        image = {
          url: icon,
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 0)
    	};  
   
           
      var marker1 = new google.maps.Marker({
          position: LatLng,
          map: map,
          icon: image,
          draggable:draggable
      });    
    
    if(image==undefined) map.setCenter(LatLng);
    
    marker1.type= type;    
   // map.setCenter(LatLng);    
    markersArray.push(marker1); 
  
     if(content!=undefined){
       
         google.maps.event.addListener(marker1, 'click', function() {            
                showSpotInfo(content);
             
         });
    }    
   
}


function filterIcons() {
    closeModal();
    var types = [];    
    $("#IconFilters input").each(function() {
        if ($(this).is(":checked")) {
            types.push($(this).attr("iconType"));
        }
    });    
    showMarkerTypes(types);
}


function showMarkerTypes(types){    
    markersArray.forEach(function(el,index){        
        var hide = true;        
        types.forEach(function(el2,index2){
            console.log(el2,el.type);
            if(el.type == el2) hide = false;           
        });        
        if(hide) el.setVisible(false);
        else el.setVisible(true);
    });
}






