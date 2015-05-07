var googleMap = null;
var mapForMarker = null;
var markersArray = [];
var allSpots = [];
var spotContent = "";
var currentPosition;

function fillContent(e) {
    goToTop(e);
    $(".spot-info-content").html(spotContent);
    TranslateApp();

}


function showSpotInfo(content) {
    spotContent = content;
    app.application.navigate('spotInfo.html');
    $(".spot-info-content").html(content);

}


function isValidDate(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]")
        return false;
    return !isNaN(d.getTime());
}

function iconMapInit(e) {
    var dontReload = e.sender.params.canReload == "false";
    if (!dontReload) {
        window.utility.resetScroller(e);
        TranslateApp();
        showLoading();
        //if (googleMap != null) {
        //    hideLoading();
        //    return;

        //}

        window.getLocation()
            .done(function (x) {
                $("#map-with-icons").height($("#findonmap .km-content").first().height() - 60);

                var mapOptions = {
                    center: { lat: x.coords.latitude, lng: x.coords.longitude },
                    zoom: 8,
                    streetViewControl: false
                };
                googleMap = new google.maps.Map(
                    document.getElementById('map-with-icons'),
                    mapOptions
                );
                setTimeout(function () {
                    $("#map-with-icons").height($("#findonmap .km-content").first().height() - 60);
                }, 200);


                var data = app.everlive.data('Spot');

                data.get().then(function (data) {

                    hideLoading();
                    debugger;
                    allSpots = data.result;

                    var today = new Date();
                    today.setHours(0);
                    today.setMinutes(1);

                    var threeDaysBefore = new Date();
                    threeDaysBefore.setTime(threeDaysBefore.getTime() - (72 * 60 * 60 * 1000));

                    var oneDaysBefore = new Date();
                    oneDaysBefore.setTime(oneDaysBefore.getTime() - (24 * 60 * 60 * 1000));

                    if (allSpots.length > 0) {
                        $.each(allSpots, function (i) {
                            var eventDate;
                            var grey = true;
                            var canSetPlace = true;
                            if (allSpots[i].SpotType === "Garage sale" || allSpots[i].SpotType === "Help") {
                                debugger;
                                var date = new Date(allSpots[i].EventDate);
                                //var threeDaysAfterEventDate = date;
                                //threeDaysAfterEventDate.setTime(date + (72 * 60 * 60 * 1000));

                                if (date >= threeDaysBefore) {
                                    //if (!isValidDate(date) || date > threeDaysBefore || date < today) {
                                    if (!isValidDate(date) || date > threeDaysBefore || date > today) {
                                        console.log(allSpots[i].SpotType, date, " too early or old");
                                        grey = true;
                                    } else console.log(date, " this is ok");
                                    console.log(date, oneDaysBefore);
                                    if (date > oneDaysBefore) {
                                        grey = false;
                                    }

                                    var date1 = date.getDate();
                                    var month = date.getMonth();
                                    var year = date.getFullYear();
                                    eventDate = "<tr><td colspan='2'><table border='0' width='100%' cellspacing='0' cellpadding='4'> <tr> <td width='20%'><b><label class='eventDate' for='day' data-localize='day' >DATE</label></b></td><td width='20%'><label class='eventDate' for='month' data-localize='month'><b>MONTH</b></td><td><label class='eventDate' for='year' data-localize='year'><b>YEAR</b></td></tr><tr> <td width='20%'><span class='eventDate'>" + date1 + "</span></td><td width='20%'><span class='eventDate'>" + month + "</span></td><td><span class='eventDate'>" + year + "</span></td></tr><tr> <td colspan='3'><hr style='background: lightgray;height:1px'></td></tr></table></td></tr>";

                                } else {
                                    canSetPlace = false;
                                }
                            }
                            var weekdayTime, satTime, sunTime;
                            if ((allSpots[i].OpeningHoursWeekdaysFrom && (allSpots[i].OpeningHoursWeekdaysFrom == "00" || allSpots[i].OpeningHoursWeekdaysFrom == "-")) && (allSpots[i].OpeningHoursWeekdaysTo && (allSpots[i].OpeningHoursWeekdaysTo == "00" || allSpots[i].OpeningHoursWeekdaysTo == "-"))) {
                                weekdayTime = "Closed";
                            } else {
                                weekdayTime = allSpots[i].OpeningHoursWeekdaysFrom + " " + allSpots[i].OpeningTimeWeekdays + " - " + allSpots[i].OpeningHoursWeekdaysTo + " " + allSpots[i].ClosingTimeWeekdays;
                            }

                            if ((allSpots[i].OpeningHoursSaturdayFrom && (allSpots[i].OpeningHoursSaturdayFrom == "00" || allSpots[i].OpeningHoursSaturdayFrom == "-")) && (allSpots[i].OpeningHoursSaturdayTo && (allSpots[i].OpeningHoursSaturdayTo == "00" || allSpots[i].OpeningHoursSaturdayTo == "-"))) {
                                satTime = "Closed";
                            } else {
                                satTime = allSpots[i].OpeningHoursSaturdayFrom + " " + allSpots[i].OpeningTimeSat + " - " + allSpots[i].OpeningHoursSaturdayTo + " " + allSpots[i].ClosingTimeSat;
                            }

                            if ((allSpots[i].OpeningHoursSundayFrom && (allSpots[i].OpeningHoursSundayFrom == "00" || allSpots[i].OpeningHoursSundayFrom == "-")) && (allSpots[i].OpeningHoursSundayTo && (allSpots[i].OpeningHoursSundayTo == "00" || allSpots[i].OpeningHoursSundayTo == "-"))) {
                                sunTime = "Closed";
                            } else {
                                sunTime = allSpots[i].OpeningHoursSundayFrom + " " + allSpots[i].OpeningTimeSun + " - " + allSpots[i].OpeningHoursSundayTo + " " + allSpots[i].ClosingTimeSun;
                            }


                            var content =
                                "<div class='table-container' align='center'><table>" +
                                eventDate +
                                    "<tr><td colspan='2' class='spotName'>" + (allSpots[i].Name || "") + "</td></tr>" +
                                    //"<tr><td></td><td class='spotDate'>" + (allSpots[i].EventDate || "") + "</td></tr>" +
                                    "<tr class='img'><td colspan='2'> <img alt='' class='popupImg' src='" + (allSpots[i].Image || "") + "' /></td></tr>" +
                                    "<tr> <td><img class='td-icon' src='images/mapicons/info_blue.png' /></td><td> " + (allSpots[i].Description || "") + "</td></tr>" +
                                    "<tr><td><img class='td-icon' src='images/mapicons/phone_blue.png' /></td><td> " + (allSpots[i].Phone || "") + "</div>" +
                                    "<tr> <td><img class='td-icon' src='images/mapicons/opening_blue.png' /></td>" +
                                    "<td> Weekdays: " + weekdayTime + "</td></tr>" +
                                    "<tr><td></td><td> Saturday: " + satTime + "</td></tr>" +
                                    "<tr><td></td><td> Sunday: " + sunTime + "</td></tr>" +
                                    "<tr><td><img class='td-icon' src='images/mapicons/adress_blue.png' /></td><td>  " + (allSpots[i].Address || "") + "</td></tr>" +
                                    "<tr><td></td><td>  " + (allSpots[i].City || "") + "</td></tr>" +
                                    "<tr><td></td><td>" + (allSpots[i].Zip || "") + "</td></tr>" +
                                    "<tr><td><img class='td-icon' src='images/mapicons/www_icon_blue.png' /></td><td> <a href='" + (allSpots[i].Web || "") + "'>" + (allSpots[i].Web || "") + "</a></td></tr>" +
                                    "</table></div>";
                            debugger;
                            if (canSetPlace) {
                                setPlace(allSpots[i].Latitude, allSpots[i].Longitude, false, allSpots[i].SpotType, googleMap, content, grey);
                            }
                        });
                    }
                },
                    function (error) {
                        hideLoading();
                        err(error);
                    });

            }).fail(function (error) {
                alert(error.message); /*TODO: Better handling*/
            });
    }

}

function mapInit() {
    ////if (mapForMarker != null)
    ////    return;
    ////window.getLocation()
    ////        .done(function (position) {
    //debugger;
    //var position = app.currentPosition;
    ////alert(JSON.stringify(position));
    //$("#map-with-markers").height($("#map-tabstrip .km-content").first().height() - 60);
    //var mapOptions = {
    //    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    //    zoom: 8,
    //    streetViewControl: false
    //};
    //googleMap = new google.maps.Map(
    //   $("#map-with-markers"),
    //   mapOptions);
    ////setTimeout(function () {
    ////    $("#map-with-markers").height($("#map-tabstrip .km-content").first().height() - 60);

    ////}, 200);
    ////})
    ////.fail(function (error) {
    ////    alert("error from GPS: "+error.message); /*TODO: Better handling*/
    ////});
}



function mapShow(e) {
    TranslateApp();
    console.log(e);
    if (e.sender.params.spot != "true" && e.sender.params.editSpot != "true") return;

    window.getLocation()
            .done(function (position) {
                //alert(JSON.stringify(position));
                $("#map-with-markers").height($("#map-tabstrip .km-content").first().height() - 60);
                var mapOptions = {
                    center: { lat: position.coords.latitude, lng: position.coords.longitude },
                    zoom: 8,
                    streetViewControl: false
                };
                googleMap = new google.maps.Map(
                   document.getElementById('map-with-markers'),
                   mapOptions);
                //setTimeout(function () {
                //    $("#map-with-markers").height($("#map-tabstrip .km-content").first().height() - 60);

                //}, 200);

                if (markersArray != undefined && markersArray.length > 0) {
                    for (var i = 0; i < markersArray.length; i++) {
                        markersArray[i].setMap(null);
                    }
                }
                markersArray = [];
                if (e.sender.params.editSpot == "true") {
                    console.log(parseFloat(editableSpot.Latitude));
                    console.log(parseFloat(editableSpot.Longitude));
                    console.log(editableSpot.Id);
                    setTimeout(function () {

                        setPlace(parseFloat(editableSpot.Latitude), parseFloat(editableSpot.Longitude), true, "");
                    }, 200);
                    return;
                }
                setPlace(position.coords.latitude, position.coords.longitude, true);

            })
    .fail(function (error) {
        alert("error from GPS: " + error.message); /*TODO: Better handling*/
    });
}


function setPlace(lat, long, draggable, type, map, content, isGrey) {
    if (map == undefined) map = googleMap;
    if (draggable != true) draggable = false;
    var icon = "";
    switch (type) {
        case "Garage sale":
            //console.log(type);
            if (!isGrey)
                icon = "images/mapicons/garagesale_small_dot.png";
            else icon = "images/mapicons/garagesale_grey_small_dot.png";
            break;
        case "Terracycle":
            icon = "images/mapicons/terracycle_small_dot.png";
            break;


        case "Shop":
            icon = "images/mapicons/shop_small_dot.png";
            break;


        case "Upcycling":
            icon = "images/mapicons/upcycling_small_dot.png";
            break;

        case "Recycling company":
            icon = "images/mapicons/business_smal_dot.png";
            break;

        case "Food donation":
            icon = "images/mapicons/foodwaste_small_dot.png";
            break;


        case "FREE Food":
            icon = "images/mapicons/food_small_dot.png";
            break;

        case "Help":
            if (!isGrey)
                icon = "images/mapicons/help-small_dot.png";
            else icon = "images/mapicons/help-grey_dot.png";
            break;

        case "Recycling Place":
            icon = "images/mapicons/recycling_small_dot.png";
            break;


        case "Eco":
            icon = "images/mapicons/eco_spot_dot.png";
            break;



        default: icon = "";
            break;
    }

    var LatLng = new google.maps.LatLng(lat, long);
    var image = undefined;
    if (icon != "")
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
        draggable: draggable
    });

    if (image == undefined) map.setCenter(LatLng);

    marker1.type = type;
    // map.setCenter(LatLng);    
    markersArray.push(marker1);

    if (content != undefined) {

        google.maps.event.addListener(marker1, 'click', function () {
            showSpotInfo(content);
        });
    }

}


function filterIcons() {
    closeModal();
    var types = [];
    $("#IconFilters input").each(function () {
        if ($(this).is(":checked")) {
            types.push($(this).attr("iconType"));
        }
    });
    showMarkerTypes(types);
}


function showMarkerTypes(types) {
    markersArray.forEach(function (el, index) {
        if (types.indexOf(el.type) != -1) {
            el.setVisible(true);
        } else {
            el.setVisible(false);
        }
    });
}






