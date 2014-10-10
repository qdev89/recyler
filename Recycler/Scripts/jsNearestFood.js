var CurrentLocation = new Object();
CurrentLocation.Location = {
    Latitude: '',
    Longitude: ''
}
var ProductData = '';
var User;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

//=================================================== Calculate Material CO2 =========================================================

function FindNearestPlaces(_CurrentLocation) {

    jQuery.support.cors = true;
    var Data = '{"Latitude":"' + _CurrentLocation.Latitude + '","Longitude":"' + _CurrentLocation.Longitude + '"}';



    var URLFormed = Service.dataServiceURL
                    + Service.ServiceName._ProductService + '/'
                    + Service.ServiceMethods._GetNearestPlaces;

  
    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                $('#NearestSpots').html('');
                $.each(data, function (i) {


               var Message = '';
               switch (localStorage.Language) {
                    case "1":
                        Message = 'Disse f�devare donations steder er inden for 50 km';
                        break;
                    case "2":
                      Message = 'Diese Lebensmittel Spende sind im Umkreis von 50 km';
                        break;
                    case "3":
                     Message = 'These food donation sites are within 50 km';
                        break;
                    case "4":
                      Message = 'Estos sitios de donaci�n de alimentos est�n a 50 km';
                        break;
                }

                    $('#NearestPlaces').append(Message + '<br /><div class="clsdv" style="border:1px solid #cacaca;padding-top:10px;height:30px;background-color:#dfdfdf;width:100%;text-align:center" id="' + data[i].PhoneNumber + '" >' + data[i].Name + '</div>');

                });

            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        $('#NearestPlaces').html('Der er ingen f�devare donations inden for 50 km � Kig p� kort for andre.');
                        break;
                    case "2":
                        $('#NearestPlaces').html('Es gibt keine Lebensmittel Spende innerhalb von 50 km - Schauen Sie sich die Karte f�r andere.');
                        break;
                    case "3":
                        $('#NearestPlaces').html('There is no food donation within 50 km - Look at the map for other.');
                        break;
                    case "4":
                        $('#NearestPlaces').html('No hay donaci�n de alimentos a 50 km - Mira el mapa de otra.');
                        break;
                }
              
            }
        },
        error: function (xhr) {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.Ptry);
                    break;
                case "2":
                    alert(Language.German.Ptry);
                    break;
                case "3":
                    alert(Language.English.Ptry);
                    break;
                case "4":
                    alert(Language.Spanish.Ptry);
                    break;
            }


        }
    });
}



function PostNow(Action) {
    jQuery.support.cors = true;

    if (localStorage.User == null || localStorage.User == undefined) {
       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
    }

    var IsActive = false;
    if (Action == 'SCHEDULED')
        IsActive = false;
    else
        IsActive = true;

    ProductData = localStorage.PostProductData +
               '"IsActive":"' + IsActive + '",' +
               '"Status":"' + Action + '"}';


    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._CreateProduct;




    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

    $.ajax({

        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: ProductData,
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: function (Result) {
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                if (data.ProductCreated == true || data.ProductCreated == 'true') {
                    if (Action != 'SCHEDULED') {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.ItemPosted);
                                break;
                            case "2":
                                alert(Language.German.ItemPosted);
                                break;
                            case "3":
                                alert(Language.English.ItemPosted);
                                break;
                            case "4":
                                alert(Language.Spanish.ItemPosted);
                                break;
                        }

                        window.localStorage.removeItem("PostProductData");
                        localStorage.PostedProduct = data.ProductID;

                        if (User.RoleID == "1") {
                           app.application.navigate("Terra.html");
                        }
                        else if (User.RoleID == "2") {
                           app.application.navigate("thanks.html");
                        }
                       
                    }
                    else {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Item1houur);
                                break;
                            case "2":
                                alert(Language.German.Item1houur);
                                break;
                            case "3":
                                alert(Language.English.Item1houur);
                                break;
                            case "4":
                                alert(Language.Spanish.Item1houur);
                                break;
                        }
                        window.localStorage.removeItem("PostProductData");
                        ProductData = '';
                        localStorage.PostedProduct = data.ProductID;

                        if (User.RoleID == "1") {
                           app.application.navigate("Terra.html");
                        }
                        else if (User.RoleID == "2") {
                            app.application.navigate("thanks.html");
                        }
                       
                    }
                }
                else {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.Ptry);
                            break;
                        case "2":
                            alert(Language.German.Ptry);
                            break;
                        case "3":
                            alert(Language.English.Ptry);
                            break;
                        case "4":
                            alert(Language.Spanish.Ptry);
                            break;
                    }

                }
            }
        },
        error: function (xhr) {
            Result = null;
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.Ptry);
                    break;
                case "2":
                    alert(Language.German.Ptry);
                    break;
                case "3":
                    alert(Language.English.Ptry);
                    break;
                case "4":
                    alert(Language.Spanish.Ptry);
                    break;
            }

        }
    });

}


function nearestFoodInit(){
    
      navigator.geolocation.getCurrentPosition(function (position) {
                    CurrentLocation.Location.Latitude = position.coords.latitude;
                    CurrentLocation.Location.Longitude = position.coords.longitude;
                    FindNearestPlaces(CurrentLocation.Location);
                }, onGPSError, { maximumAge: 3000, timeout: 6000, enableHighAccuracy: true });
    
        $('#SendMessage').click(function () {
                    var count = 0;

                    var Numbers = new Array();
                    $('#NearestPlaces div').each(function () {
                        Numbers[count] = $(this).attr('id');
                        count += 1;
                    });
            
                    if (count <= 0) {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.noFood);
                                break;
                            case "2":
                                alert(Language.German.noFood);
                                break;
                            case "3":
                                alert(Language.English.noFood);
                                break;
                            case "4":
                                alert(Language.Spanish.noFood);
                                break;
                        }
                        return;
                    }
                    if ($('#textinput').val() == '') {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.ProvideText);
                                break;
                            case "2":
                                alert(Language.German.ProvideText);
                                break;
                            case "3":
                                alert(Language.English.ProvideText);
                                break;
                            case "4":
                                alert(Language.Spanish.ProvideText);
                                break;
                        }
                        return;
                    }
            
                    MessageCount = 1;
                    $.each(Numbers, function (i) {
                        window.plugins.Sms.sendSMS(function () {
                            if (MessageCount == Numbers.length) {
                                switch (localStorage.Language) {
                                    case "1":
                                        alert(Language.Danish.MessageSent);
                                        break;
                                    case "2":
                                        alert(Language.German.MessageSent);
                                        break;
                                    case "3":
                                        alert(Language.English.MessageSent);
                                        break;
                                    case "4":
                                        alert(Language.Spanish.MessageSent);
                                        break;
                                }
                                PostNow("SCHEDULED");
                                return;
                            } else {
                                MessageCount += 1;
                            }
                        },
                                                   function (e) {
                                                       alert('Message Failed:' + e);
                                                   },
                                                   Numbers[i],
                                                   $('#textinput').val());
                    });
                });

                $('#PostNow').click(function () {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.PostingNow);
                            break;
                        case "2":
                            alert(Language.German.PostingNow);
                            break;
                        case "3":
                            alert(Language.English.PostingNow);
                            break;
                        case "4":
                            alert(Language.Spanish.PostingNow);
                            break;
                    }
                    PostNow("POSTED");
                });
}


  		
            
            function locationEnabledSuccessCallbackNearest(result) {
                if (result)
                    window.plugins.diagnostic.isGpsEnabled(gpsEnabledSuccessCallbackNearest, gpsEnabledErrorCallback);
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
            }
            
            function locationEnabledErrorCallback(error) {
                alert("error" + error);
            }
            
            
            function gpsEnabledSuccessCallbackNearest(result) {
                if (result) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        CurrentLocation.Location.Latitude = position.coords.latitude;
                        CurrentLocation.Location.Longitude = position.coords.longitude;
                        FindNearestPlaces(CurrentLocation.Location);
                    }, onGPSError, { maximumAge: 3000, timeout: 6000, enableHighAccuracy: true });
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
            
            function gpsEnabledErrorCallback(error) {
                alert("error" + error);
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