/*window.google = window.google || {};
google.maps = google.maps || {};
(function () {

function getScript(src) {
document.write('<' + 'script src="' + src + '"' +
' type="text/javascript"><' + '/script>');
}

var modules = google.maps.modules = {};
google.maps.__gjsload__ = function (name, text) {
modules[name] = text;
};

google.maps.Load = function (apiLoad) {
delete google.maps.Load;
apiLoad([0.009999999776482582, [[["https://mts0.googleapis.com/vt?lyrs=m@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.googleapis.com/vt?lyrs=m@264000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "m@264000000", ["https://mts0.google.com/vt?lyrs=m@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=m@264000000\u0026src=api\u0026hl=en-US\u0026"]], [["https://khms0.googleapis.com/kh?v=150\u0026hl=en-US\u0026", "https://khms1.googleapis.com/kh?v=150\u0026hl=en-US\u0026"], null, null, null, 1, "150", ["https://khms0.google.com/kh?v=150\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=150\u0026hl=en-US\u0026"]], [["https://mts0.googleapis.com/vt?lyrs=h@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.googleapis.com/vt?lyrs=h@264000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "h@264000000", ["https://mts0.google.com/vt?lyrs=h@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=h@264000000\u0026src=api\u0026hl=en-US\u0026"]], [["https://mts0.googleapis.com/vt?lyrs=t@132,r@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.googleapis.com/vt?lyrs=t@132,r@264000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "t@132,r@264000000", ["https://mts0.google.com/vt?lyrs=t@132,r@264000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=t@132,r@264000000\u0026src=api\u0026hl=en-US\u0026"]], null, null, [["https://cbks0.googleapis.com/cbk?", "https://cbks1.googleapis.com/cbk?"]], [["https://khms0.googleapis.com/kh?v=84\u0026hl=en-US\u0026", "https://khms1.googleapis.com/kh?v=84\u0026hl=en-US\u0026"], null, null, null, null, "84", ["https://khms0.google.com/kh?v=84\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=84\u0026hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["https://mts0.googleapis.com/vt?hl=en-US\u0026", "https://mts1.googleapis.com/vt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]]], ["en-US", "US", null, 0, null, null, "https://maps.gstatic.com/mapfiles/", "https://csi.gstatic.com", "https://maps.googleapis.com", "https://maps.googleapis.com"], ["https://maps.gstatic.com/intl/en_us/mapfiles/api-3/17/2", "3.17.2"], [1924552813], 1, null, null, null, null, null, "", null, null, 1, "https://khms.googleapis.com/mz?v=150\u0026", null, "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null, "https://mts.googleapis.com/vt/icon", [["https://mts0.googleapis.com/vt", "https://mts1.googleapis.com/vt"], ["https://mts0.googleapis.com/vt", "https://mts1.googleapis.com/vt"], [null, [[0, "m", 264000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[47], [37, [["smartmaps"]]]]], 0], [null, [[0, "m", 264000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[47], [37, [["smartmaps"]]]]], 3], [null, [[0, "m", 264000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[50], [37, [["smartmaps"]]]]], 0], [null, [[0, "m", 264000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[50], [37, [["smartmaps"]]]]], 3], [null, [[4, "t", 132], [0, "r", 132000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[5], [37, [["smartmaps"]]]]], 0], [null, [[4, "t", 132], [0, "r", 132000000]], [null, "en-US", "US", null, 18, null, null, null, null, null, null, [[5], [37, [["smartmaps"]]]]], 3], [null, null, [null, "en-US", "US", null, 18], 0], [null, null, [null, "en-US", "US", null, 18], 3], [null, null, [null, "en-US", "US", null, 18], 6], [null, null, [null, "en-US", "US", null, 18], 0], ["https://mts0.google.com/vt", "https://mts1.google.com/vt"], "/maps/vt"], 2, 500, ["https://geo0.ggpht.com/cbk?cb_client=maps_sv.uv_api_demo", "https://www.gstatic.com/landmark/tour", "https://www.gstatic.com/landmark/config", "/maps/preview/reveal?authuser=0", "/maps/preview/log204", "/gen204?tbm=map", "https://static.panoramio.com.storage.googleapis.com/photos/"]], loadScriptTime);
};
var loadScriptTime = (new Date).getTime();
getScript("https://maps.gstatic.com/intl/en_us/mapfiles/api-3/17/2/main.js");
})();*/


var googleMap = null;              
         
function mapInit() {
    if (googleMap != null)
        return;
    $("#map-with-markers").height($("#map-tabstrip .km-content").first().height());
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 6
    };
    //  console.log(document.getElementById('map-with-markers'))
    googleMap = new google.maps.Map(
        document.getElementById('map-with-markers'),
        mapOptions
        );
    setTimeout(function() {
        $("#map-with-markers").height($("#map-tabstrip .km-content").first().height());
        googleMap.setZoom(googleMap.getZoom());
    }, 200);
}

var Type = '';
var me, spot, currentPos, endPos;
var map;
var meMarker, spotMarker;
var markers = [];
var mapIcon;
var locationIcon;
var blaakorsIcon;
var churchIcon;
var foodwasteIcon;
var garagesaleIcon;
var recyclingIcon;
var redcrossIcon;
var SecondHandShop;
var RecycleCompany;

var windowOptions = {
    shadowStyle: 1,
    maxWidth: 230,
    minWidth: 230,
    padding: 0,
    backgroundColor: '#046daf',
    borderRadius: 4,
    arrowSize: 10,
    borderWidth: 1,
    borderColor: '#046daf',
    disableAutoPan: false,
    hideCloseButton: false,
    arrowPosition: 50,
    backgroundClassName: 'phoney',
    arrowStyle: 0
};

function findOnMapInit() {    
    $('#prodmap').click(function () {
        Type = 'Product';
        initMap();
    });
                    
    $('#salemap').click(function () {
        Type = 'sale';
        initMap();
    });
                    
    $('#recmap').click(function () {
        Type = 'Recycling';
        initMap();
    });
                    
    $('#Foodmap').click(function () {
        Type = 'Food';
        gpsEnabledSuccessCallback(true);
    });
                
    $('#menu').click(function () {
        app.application.navigate("settings.html");
    });
                    
    $('#ecomap').click(function () {
        Type = 'eco';
        gpsEnabledSuccessCallback(true);
    });   
           
    var ib = new InfoBubble(windowOptions);         
    gpsEnabledSuccessCallback(true);             
}

/*  function locationEnabledSuccessCallback(result) {
if (result)
window.plugins.diagnostic.isGpsEnabled(gpsEnabledSuccessCallback, gpsEnabledErrorCallback);
else {
switch (localStorage.Language) {
case "1":
alert(Language.Danish.Location);
break;
case "2":
alert(Language.German.Location);
break;
case "3":
alert(Language.English.Location);
break;
case "4":
alert(Language.Spanish.Location);
break;
}
window.plugins.diagnostic.switchToLocationSettings();
}
}*/
            
/*      function locationEnabledErrorCallback(error) {
alert("error" + error);
}*/
                    
function gpsEnabledSuccessCallback(result) {
    if (result) {
        navigator.geolocation.getCurrentPosition(function (position) {
            me = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            drawMaps(me);
                
            GetSpot();
        }, onGPSError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    } else {
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.Location);
                break;
            case "2":
                alert(Language.German.Location);
                break;
            case "3":
                alert(Language.English.Location);
                break;
            case "4":
                alert(Language.Spanish.Location);
                break;
        }
        window.plugins.diagnostic.switchToLocationSettings();
    }
}
            
/*   function gpsEnabledErrorCallback(error) {
alert("error" + error);
}*/
                
function drawMaps(latlng) {
    mapIcon = new google.maps.MarkerImage("images/spots.png");
    locationIcon = new google.maps.MarkerImage("images/Man.png");
    blaakorsIcon = new google.maps.MarkerImage("images/mapicons/blaakors.png");
    churchIcon = new google.maps.MarkerImage("images/mapicons/church.png");
    foodwasteIcon = new google.maps.MarkerImage("images/mapicons/foodwaste_small.png");
    garagesaleIcon = new google.maps.MarkerImage("images/mapicons/garagesale_small.png");
    recyclingIcon = new google.maps.MarkerImage("images/mapicons/recycling_small.png");
    redcrossIcon = new google.maps.MarkerImage("images/mapicons/redcross.png");
    SecondHandShop = new google.maps.MarkerImage("images/mapicons/shop_small.png");
    RecycleCompany = new google.maps.MarkerImage("images/mapicons/business_smal.png");
                    
    var options = {
        center: latlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: false,
        panControl: false,
        mapTypeControl: false
    }
            
    $("#map_canvas").height($(document).height() - ($("#footer").height() + 85));
    map = new google.maps.Map(document.getElementById('map_canvas'), options);
                                                      
    meMarker = new google.maps.Marker({
                                          position: latlng,
                                          map: map,
                                          icon: locationIcon,
                                          information: '<div style=\"height:30px\">You are here</div>'
                                      });
            
    var fn = markerClick(map, meMarker, ib);
    google.maps.event.addListener(meMarker, 'click', fn);
}
                    
function markerClick(map, m, ib) {
    return function () {
        if (localStorage.User == null || localStorage.User == undefined) {
            app.application.navigate('signup_login.html');
        } else {
            User = $.parseJSON(localStorage.User);
        }
        if (User.UserRole == "3") {
            var message = '';
            switch (localStorage.Language) {
                case "1":
                    message = Language.Danish.Register;
                    break;
                case "2":
                    message = Language.German.Register;
                    break;
                case "3":
                    message = Language.English.Register;
                    break;
                case "4":
                    message = Language.Spanish.Register;
                    break;
            }
                            
            if (confirm(message)) {
               // localStorage.User = null;
                app.application.navigate("signup_login.html");
                return;
            } else {
                return;
            }
        }
                  
        ib.close(map);
        var infoHtml;
                    
        infoHtml = '<div style=\"background-color:#046daf\" class="infowindow">';
        infoHtml += '<b>' + m.information + '</b>';
        infoHtml += '</div>';
                    
        ib.setContent(infoHtml);
        ib.open(map, m);
        $('.infowindow').parent().parent().removeAttr('height').css({ 'background-color': '#046DAF', 'border-color': '#046DAF' });
    };
}
            
var MatchArray = [];
                    
function GetSpot() {
    /* if (localStorage.User == null || localStorage.User == undefined) {
    app.application.navigate('signup_login.html');
    } else {
    User = $.parseJSON(localStorage.User);
    }
    MatchArray = [];
    var Data = '{ "FriendID":' + User.UserID + ',"Type":"' + Type + '"}';
    var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._GetMapProductSpot;
    $("#LoadingDiv").css({
    "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
    'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
    'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () {
    $('#LoadingDiv,#Load').show();
    });
    $('#LoadingDiv,#Load').ajaxComplete(function () {
    $('#LoadingDiv,#Load').hide();
    });
    $.support.cors = true;
    $.ajax({
    type: "POST",
    url: URLFormed,
    dataType: 'json',
    data: Data,
    cache: false,
    contentType: "application/json;charset=utf-8",
    success: function (Result) {
    if (Result != null) {
    var Products = Result.Products;
    var Spots = Result.Spots;
    var SpotList = '';
    var icon = '';
    var iconspot = '';
    if (Products != null) {
    $.each(Products, function (outer) {
    if ((Products[outer].Latitude == '' && Products[outer].Longitude == '') || (Products[outer].Latitude == '0' && Products[outer].Longitude == '0')) {
    return;
    }
    var actLat = Products[outer].Latitude.substr(0, 5);
    var actLong = Products[outer].Longitude.substr(0, 5);
    var flag = true;
    $.each(MatchArray, function (index) {
    var array = MatchArray[index].split('|');
    var compLat = array[2].substr(0, 5);
    var compLong = array[3].substr(0, 5);
    if (compLat == actLat && compLong == actLong && array[4] == 'PROD') {
    flag = false;
    return;
    }
    });
    if (flag) {
    var value = '';
    var count = 0;
    $.each(Products, function (inner) {
    var compLat = Products[inner].Latitude.substr(0, 5);
    var compLong = Products[inner].Longitude.substr(0, 5);
    if (compLat == actLat && compLong == actLong) {
    value = Products[inner].Latitude + '|' +
    Products[inner].Longitude + '|' +
    'PROD' + '|' +
    Products[inner].ImagePath + '|' +
    Products[inner].Name + '|' +
    Products[inner].Description + '|' +
    Products[inner].UserCity + '|' +
    Products[inner].Type + '|' +
    Products[inner].UserState + '|' +
    Products[inner].Price + '|' +
    Products[inner].ProductID + '|' +
    Products[inner].PostImagePath;
    count += 1;
    }
    });
    if (count > 1) {
    MatchArray.push('R|' + count + '|' + value);
    } else {
    MatchArray.push('S|' + count + '|' + value);
    }
    }
    });
    }
    if (Spots != null) {
    $.each(Spots, function (outer) {
    if ((Spots[outer].Latitude == '' && Spots[outer].Longitude == '') || (Spots[outer].Latitude == '0' && Spots[outer].Longitude == '0')) {
    return;
    }
    var actLat = Spots[outer].Latitude.substr(0, 5);
    var actLong = Spots[outer].Longitude.substr(0, 5);
    var flag = true;
    $.each(MatchArray, function (index) {
    var array = MatchArray[index].split('|');
    var compLat = array[2].substr(0, 5);
    var compLong = array[3].substr(0, 5);
    if (compLat == actLat && compLong == actLong && array[4] == 'SPOT') {
    flag = false;
    return;
    } else if (compLat == actLat && compLong == actLong && array[4] == 'PROD') {
    if (array[0] == 'S') {
    var New = 'R' + MatchArray[index].substr(1, MatchArray[index].length);
    MatchArray[index] = New;
    flag = false;
    } else {
    flag = false;
    return;
    }
    }
    });
    if (flag) {
    var value = '';
    var count = 0;
    $.each(Spots, function (inner) {
    var compLat = Spots[inner].Latitude.substr(0, 5);
    var compLong = Spots[inner].Longitude.substr(0, 5);
    if (compLat == actLat && compLong == actLong) {
    value = Spots[inner].Latitude + '|' +
    Spots[inner].Longitude + '|' +
    'SPOT' + '|' +
    Spots[inner].SpotType + '|' +
    Spots[inner].ImagePath + '|' +
    Spots[inner].Name + '|' +
    Spots[inner].Phone + '|' +
    Spots[inner].Address + '|' +
    Spots[inner].City + '|' +
    Spots[inner].State + '|' +
    Spots[inner].OpeningHoursWeekdaysFrom + '|' +
    Spots[inner].OpeningHoursWeekdaysTo + '|' +
    Spots[inner].EventDate + '|' +
    Spots[inner].Description + '|' +
    Spots[inner].OpeningHoursSaturdayFrom + '|' +
    Spots[inner].OpeningHoursSaturdayTo + '|' +
    Spots[inner].OpeningHoursSundayFrom + '|' +
    Spots[inner].OpeningHoursSundayTo;
    count += 1;
    }
    });
    if (count > 1) {
    MatchArray.push('R|' + count + '|' + value);
    } else {
    MatchArray.push('S|' + count + '|' + value);
    }
    }
    });
    }
    $.each(MatchArray, function (i) {
    var array = MatchArray[i].split('|');
    var actLat = array[2].substr(0, 5);
    var actLong = array[3].substr(0, 5);
    var flag = true;
    var innerhtml = '';
    $.each(MatchArray, function (index) {
    var array = MatchArray[index].split('|');
    var compLat = array[2].substr(0, 5);
    var compLong = array[3].substr(0, 5);
    if (compLat == actLat && compLong == actLong) {
    if (array[0] == 'R') {
    innerhtml = "<div onclick=\"GetAll('" + array[2] + '_' + array[3] + "');\" style=\"float:left\"><img src=\"images/multiplestuff.png\" /></div>";
    //                                        for (count = 0; count < parseInt(array[1]); count++) {
    //                                            if (array[4] == 'PROD') {
    //                                                innerhtml = innerhtml + "<div style=\"float:left\"><img src=\"images/product.png\" /></div>";
    //                                            }
    //                                            else {
    //                                                innerhtml = innerhtml + "<div style=\"float:left\"><img src=\"images/mapicons/blaakors.png\" /></div>";
    //                                            }
    //                                        }
    flag = false;
    } else {
    if (array[4] == 'PROD') {
    createProductSpot(array[2], array[3], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13]);
    } else {
    createSpots(array[2], array[3], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15], array[16], array[17], array[18], array[19]);
    }
    flag = true;
    }
    }
    });
    if (flag == false) {
    icon = 'images/product.png';
    spot = new google.maps.LatLng(array[2], array[3]);
    var html = "<div><div style=\"height:10px\"></div>" +
    "<div style=\"float:left;width:60%\">" + innerhtml + "</div>";
    // "<div class=\"me\" style=\"float:left\" onclick=\"GetAll('" + array[2] + '_' + array[3] + "');\"><img style=\"height: 35px;left: 75%;" +
    //            "position: absolute;top: 45%;width: 35px;\" src=\"images/Arrow_Details.PNG\" /></div><div style=\"height:10px\"></div></div>";
    spotMarker = new google.maps.Marker({
    position: spot,
    map: map,
    icon: icon,
    information: html
    });
    var fn = markerClick(map, spotMarker, ib);
    google.maps.event.addListener(spotMarker, 'click', fn);
    }
    });
    }
    },
    error: function (xhr) {
    // alert("Some error occured: " + xhr.responseText);
    }
    });
    GetCover();*/
}
            
function createSpots(Latitude, Longitude, SpotType, ImagePath, Name, Phone, Address, City, State, OpeningHoursWeekdaysFrom, OpeningHoursWeekdaysTo, EventDate, Description, OpeningHoursSaturdayFrom, OpeningHoursSaturdayTo, OpeningHoursSundayFrom, OpeningHoursSundayTo) {
    var data = SpotType;
                        
    switch (data) {
        case 'Recycling spot':
            iconspot = recyclingIcon;
            break;
        case 'Garage sale/Market/Event':
            iconspot = garagesaleIcon;
            break;
        case 'Eco/Green shop':
            iconspot = SecondHandShop;
            break;
        case 'Food donation':
            iconspot = foodwasteIcon;
            break;
        case 'Recycling company':
            iconspot = RecycleCompany;
            break;
    }
    spot = new google.maps.LatLng(Latitude, Longitude);
                
    var html = '<div style="height:35px"></div><div style=\"background-color:#046daf;width:205px;overflow-y:scroll;height:280px;word-wrap:break-word;\" class=\"information\">';
                
    if (SpotType == "Garage sale/Market/Event") {
        html += "<div class=\"address\" style='font-size:9pt;'>" + EventDate + "</div>";
    }
                
    html += "<div class=\"name\" style='font-size:12pt;margin-bottom:5px;'>" + Name + "</div>";
                
    if (ImagePath == '' || ImagePath == null) {
        html += "<div><img src='images/NoImage.jpg' width='80px' height='80px' /></div>";
    } else {
        html += "<div><img src='data:image/jpeg;base64," + ImagePath + "' width='80px' height='80px' /></div>";
    }
                
    html += "<div class=\"address\" style='font-size:9pt'>" + Description + "</div><br/>";
    html += "<div class=\"mainhours\" ><span name=\"spn\" data-localize=\"spotopening\">Opening hours:</span></div>";
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"spotmonfri\">Mon-Fri:</span><span style=\"margin:8px\">";
    if (OpeningHoursWeekdaysFrom == 'Close') {
        html += "Close</span></div>";
    } else
        html += OpeningHoursWeekdaysFrom + "-" + OpeningHoursWeekdaysTo + "</span></div>";
                    
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"saturday\">Sat:</span><span style=\"margin:21px\"></span>";
    if (OpeningHoursSaturdayFrom == 'Close') {
        html += "Close</span></div>";
    } else
        html += OpeningHoursSaturdayFrom + "-" + OpeningHoursSaturdayTo + "</span></div>";
                    
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"sunday\">Sun:</span><span style=\"margin:20px\"></span>";
    if (OpeningHoursSundayFrom == 'Close') {
        html += "Close</span></div>";
    } else
        html += OpeningHoursSundayFrom + "-" + OpeningHoursSundayTo + "</span></div><br/><br/>";
                        
    html += "<div class=\"hours\" >" + Address +
            "</div><div class=\"hours\" >" + City +
            "</div><div class=\"hours\" style='margin-bottom:15px' >" + Phone +
            "</div>";
    html += "</div>";
                                                        
    spotMarker = new google.maps.Marker({
                                            position: spot,
                                            map: map,
                                            icon: iconspot,
                                            information: html
                                        });
    var fn = markerClick(map, spotMarker, ib);
    google.maps.event.addListener(spotMarker, 'click', fn);
}
                
function createProductSpot(Latitude, Longitude, ImagePath, Name, UserPhoneNumber, UserCity, Type, UserState, Price, ProductID, PostImagePath) {
    icon = PostImagePath;
    spot = new google.maps.LatLng(Latitude, Longitude);
    var html = '<div style="height:35px"></div><div style=\"background-color:#046daf;width:205px;overflow-y:scroll;height:280px;word-wrap: break-word;\" class=\"information\">';
    if (Type == 'Swap') {
        html += "<div style='float:left;margin-top:5px'><img src='images/swap_1.png' width='50' height='17' /></div>" +
                "<div style='font-size:9pt;float:left;margin-left:10px;margin-top:5px'>" + Price + " </div>";
    } else if (Type == 'priced') {
        html += "<div style='float:left'><img src='images/swap_1.png' width='50' height='17' /></div>" +
                "<div style='margin-left:5px;float:left'><img src='images/ptag_1.png' width='50' height='17' /></div>" +
                "<div style='font-size:9pt;float:left;margin-left:10px;margin-top:5px'>" + Price + " </div>";
    } else {
        html += "<div><img src='images/free_green_1.png' width='50' height='17' /></div>";
    }
                
    if (ImagePath == '' || ImagePath == null) {
        html += "<div style='clear:both;margin:5px 5px 5px 5px'><img src='images/NoImage.jpg' width='100px' height='100px' /></div>";
    } else {
        html += "<div style='clear:both;margin:5px 5px 5px 5px;'><img src='data:image/jpeg;base64," + ImagePath + "' width='100px' height='100px' style='border:2px solid #ffffff'  /></div>";
    }
    html += "<div class=\"name\" style='font-size:9pt'>Title : " + Name +
            "</div><div class=\"phone\" style='font-size:9pt'>Description : " + UserPhoneNumber + "</div>";
    //   "</div><div class=\"city\" style='font-size:9pt'>City : " + UserCity +
    //   "</div><div class=\"address\" style='font-size:9pt'>State : " + UserState + "</div>";
            
    html += "<div style=\"height:15px\"></div><div onclick='GetProduct(" + ProductID + ");' style=\"width:100%\" >" +
            "<img src='images/iwant.png' height='30' width='150' /></div></div>";
                                                        
    spotMarker = new google.maps.Marker({
                                            position: spot,
                                            map: map,
                                            icon: icon,
                                            information: html
                                        });
    var fn = markerClick(map, spotMarker, ib);
    google.maps.event.addListener(spotMarker, 'click', fn);
}
                    
function onGPSError(error) {
    switch (localStorage.Language) {
        case "1":
            alert(Language.Danish.FailLoc);
            break;
        case "2":
            alert(Language.German.FailLoc);
            break;
        case "3":
            alert(Language.English.FailLoc);
            break;
        case "4":
            alert(Language.Spanish.FailLoc);
            break;
    }
}
                    
function GetCover() {
    if (localStorage.User == null || localStorage.User == undefined) {
        app.application.navigate('signup_login.html');
    } else {
        User = $.parseJSON(localStorage.User);
    }
                                         
    if (User.UserRole == "3") {
        $("#dvBlur").css({
                             /*"opacity": "0.2",*/ "z-index": "999999",
                             'filter': 'alpha(opacity=20)', "width": "100%", "height": "100%",
                             'background-color': 'gray', 'text-shadow': '0px 10px 10px #FF33FF'
                         });
    }
}
                                         
function GetProduct(ID) {
    $("#LoadingDiv").css({
                             "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                             'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                             'background-color': 'white'
                         });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').show();
            
    if (localStorage.SelectedProduct != undefined && localStorage.SelectedProduct != null)
        window.localStorage.removeItem("SelectedProduct");
                
    localStorage.SelectedProduct = ID;
                    
    User = $.parseJSON(localStorage.User);
    if (User.UserRole == "3") {
        var message = '';
        switch (localStorage.Language) {
            case "1":
                message = Language.Danish.Register;
                break;
            case "2":
                message = Language.German.Register;
                break;
            case "3":
                message = Language.English.Register;
                break;
            case "4":
                message = Language.Spanish.Register;
                break;
        }
                        
        if (confirm(message)) {
           // localStorage.User = null;
            app.application.navigate("signup_login.html");
            return;
        } else {
            return;
        }
    } else {
        if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
            var message = '';
            switch (localStorage.Language) {
                case "1":
                    message = Language.Danish.PleaseUpdate;
                    break;
                case "2":
                    message = Language.German.PleaseUpdate;
                    break;
                case "3":
                    message = Language.English.PleaseUpdate;
                    break;
                case "4":
                    message = Language.Spanish.PleaseUpdate;
                    break;
            }
                            
            if (confirm(message)) {
                app.application.navigate("basic_setup.html");
                return;
            } else {
                return;
            }
        }
        app.application.navigate("contact.html");
    }
}
                
function GetAll(ID) {
    localStorage.OverLapLatLong = ID;
    $("#LoadingDiv").css({
                             "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                             'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                             'background-color': 'white'
                         });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').show();
    app.application.navigate("ListAddress.html");
}

function drawMaps2(latlng) {
    locationIcon = new google.maps.MarkerImage("images/Man.png");
                    
    var options = {
        center: latlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: false,
        panControl: false,
        mapTypeControl: false
    }
                
    var info = getData2();
            
    $("#map_canvas").height($(document).height() - ($("#footer").height() + 85));
    map = new google.maps.Map(document.getElementById('map_canvas'), options);
                                                      
    meMarker = new google.maps.Marker({
                                          position: latlng,
                                          map: map,
                                          icon: locationIcon,
                                          information: info
                                      });
            
    var fn = markerClick2(map, meMarker, ib);
    google.maps.event.addListener(meMarker, 'click', fn);
}
                    
function markerClick2(map, m, ib) {
    return function () {  
        ib.close(map);
        var infoHtml;
                    
        infoHtml = '<div style=\"background-color:#046daf;\" class="infowindow">';
        infoHtml += '<b>' + m.information + '</b>';
        infoHtml += '</div>';
                    
        ib.setContent(infoHtml);
        ib.open(map, m);
        $('.infowindow').parent().parent().removeAttr('height').css({ 'background-color': '#046DAF', 'border-color': '#046DAF' });
    };
}                           
                
function getData2() {
    var html = '<div style="height:40px"></div><div style=\"background-color:#046daf;width:210px;overflow-y:scroll;height:280px\" class=\"information\">';
    html += "<div class=\"address\" style='font-size:9pt;'>sseffeef</div>";
    html += "<div class=\"name\" style='font-size:12pt;margin-bottom:5px;'>sefseffse sdkj fbsd fbsdj sdjb jdfbcsd bb bsd b ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd s hbhs hb  hbs hbh hsb sb hb hbsb hbhsbhbhbh bh hbshbhb hbsh bd bshbhbbjb                 ssssssssssssssssssssssssssssfsefsesefe</div>";
    html += "<div class=\"address\" style='font-size:9pt'>sefsefse fse fse fe efe sefse </div><br/>";
    html += "<div class=\"mainhours\" ><span name=\"spn\" data-localize=\"spotopening\">Opening hours:</span></div>";
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"spotmonfri\">Mon-Fri:</span><span style=\"margin:8px\"></span>eeeeeeeeeeeeeeeeee</div>";
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"saturday\">Sat:</span><span style=\"margin:21px\"></span>eeeeeeeeeeeeeeee</div>";
    html += "<div class=\"hours\" ><span name=\"spn\" data-localize=\"sunday\">Sun:</span><span style=\"margin:20px\"></span>eeeeeeeeeeeeeeee</div><br/><br/>";
    html += "<div class=\"hours\" >awdwadwadwawawadwawdwd</div><div class=\"hours\" >awdwadwdwadwawadwadwadwa</div><div class=\"hours\" style='margin-bottom:15px' >awdwadwadwadwadwadwadawdwdwadwadwad</div>";
    html += "</div>";

    return html;
}
