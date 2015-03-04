window.utility = {};
(function ($, doc) {

    function scrollToTop() {
        // UNDONE: 
        //$("#friendsApp").data("kendoMobileScroller").scrollTo(-30, -30);
    }

    function resetScroller(e) {
        e.view.scroller.reset();
    }

    window.utility.scrollToTop = scrollToTop;
    window.utility.resetScroller = resetScroller;
}(jQuery, document));

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.round(d * 100) / 100;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function Round2Digit(value) {
    return Math.round(value * 100) / 100;
}