var Diagnostic = function () {
};


/**
* Checks device settings for location.
*
* @param successCallback The callback which will be called when diagnostic of location is successful.
* This callback function have a boolean param with the diagnostic result.
* @param errorCallback The callback which will be called when diagnostic of location encounters an error.
* This callback function have a string param with the error.
*/
Diagnostic.prototype.isLocationEnabled = function (successCallback, errorCallback) {
    return cordova.exec(successCallback,
errorCallback,
'Diagnostic',
'isLocationEnabled',
[]);
};

/**
* Requests that the user enable the location services in device settings.
*/
Diagnostic.prototype.switchToLocationSettings = function () {
    return cordova.exec(null,
null,
'Diagnostic',
'switchToLocationSettings',
[]);
};

/**
* Checks device settings for GPS.
*
* @param successCallback The callback which will be called when diagnostic of GPS is successful.
* This callback function have a boolean param with the diagnostic result.
* @param errorCallback The callback which will be called when diagnostic of GPS encounters an error.
* This callback function have a string param with the error.
*/
Diagnostic.prototype.isGpsEnabled = function (successCallback, errorCallback) {
    return cordova.exec(successCallback,
errorCallback,
'Diagnostic',
'isGpsEnabled',
[]);
};



/*PhoneGap.addConstructor(function () {  
    //debugger;
    PhoneGap.addPlugin("diagnostic", new Diagnostic());
    //window.plugins = window.plugins || [];
    
   //window.plugins.diagnostic = new Diagnostic();
});*/

/*cordova.addConstructor(function() {
	cordova.addPlugin("diagnostic", new Diagnostic());
});
*/

 cordova.addConstructor(function() {
 	if(!window.plugins)
 		window.plugins = {};
 	window.plugins.diagnostic = new Diagnostic();
 });



