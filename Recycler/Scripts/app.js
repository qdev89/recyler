function validateEmail(txtEmail) {

    var a = $.trim(txtEmail);
    // var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
    var filter = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function resetPassword(email) {
    var object = {
        "Email": email
    };

    if (email != undefined && email != "" && validateEmail(email))
        $.ajax({
            type: "POST",
            url: 'http://api.everlive.com/v1/' + appSettings.everlive.apiKey + '/Users/resetpassword',
            contentType: "application/json",
            data: JSON.stringify(object),
            success: function (data) {
                alert("Password reset email send successfully. Check your email box.");
            },
            error: function (error) {
                console.log(error);
                if (error.responseText != undefined)
                    var err = JSON.parse(error.responseText);
                if (err.message != undefined)
                    alert(err.message);
            }
        });

    else
        alert("Please enter a valid email!");

}

function sendMail(name, recipients, context) {
    var attributes = {
        "Recipients": recipients,
        "Context": context
    };

    $.ajax({
        type: "POST",
        url: 'http://api.everlive.com/v1/Metadata/Applications/' + appSettings.everlive.apiKey + '/EmailTemplates/' + name + '/send',
        contentType: "application/json",
        headers: {
            "Authorization": "Masterkey " + appSettings.msKey
        },
        data: JSON.stringify(attributes),
        success: function (data) {
            // alert("Email successfully sent.");
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
}

function goToTop(e) {
    // console.log(e);
    e.sender.scroller.reset();
    TranslateApp();
}

function ShowAds() {
    app.addBanner(20);
}

function TranslateCategory(category) {
    var value;
    switch (localStorage.Language) {
        case "1":
            //localStorage.LanguageType = "dk";
            $.each(Tags.Danish, function (i) {
                if (Tags.Danish[i].id == category) {
                    value = "kategorier " + Tags.Danish[i].Value;
                }
            });
            break;
        case "2":
            //localStorage.LanguageType = "de";
            $.each(Tags.German, function (i) {
                if (Tags.German[i].id == category) {
                    value = "Category " + Tags.German[i].Value;
                }
            });
            break;
        case "3":
            //localStorage.LanguageType = "en";

            $.each(Tags.English, function (i) {
                if (Tags.English[i].id == category) {
                    value = "Category " + Tags.English[i].Value;
                }
            });
            break;
        case "4":
            //localStorage.LanguageType = "es";

            $.each(Tags.Spanish, function (i) {
                if (Tags.Spanish[i].id == category) {
                    value = "Category " + Tags.Spanish[i].Value;
                }
            });
            break;
    }

     
    return value;
}

function TranslateGpsError() {
    //Por favor, active GPS de usar-esta aplicación.
    //Venligst start din GPS for at bruge denne app.
    //Bitte starten Sie Ihr GPS um diese App nutzen.
    switch (localStorage.Language) {
        case "1":
            return "Please turn on GPS to use this app.";

        case "2":
            return "Bitte starten Sie Ihr GPS um diese App nutzen.";
        case "3":
            return "Venligst start din GPS for at bruge denne app.";

        case "4":
            return "Por favor, active GPS de usar-esta aplicación.";

    }
}

function TranslateApp() {
    //getCurrentLanguage();
    //if (localStorage.LanguageType == undefined) {
    //    localStorage.Language = 3;
    //    localStorage.LanguageType = "en";
    //}

    // log(localStorage.LanguageType);
    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    $("[data-localize]").localize("Recycle", opts);
}

function NavigateToBecomeSupporterPage() {
    alert('a');
    app.application.navigate("membership.html");
}

function log() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

function err(err) {
    alert(JSON.stringify(err));
}

var userData = null;

(function (global) {
    var app = global.app = global.app || {};
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);

        localStorage.removeItem("User");
        getCurrentLanguage();
        //if (localStorage.Language == undefined || localStorage.Language == "undefined") {
        //    localStorage.Language = 3;
        //    localStorage.LanguageType = "en";
        //}
        TranslateApp();
    }, false);

    app.application = new kendo.mobile.Application(document.body, { skin: "flat", layout: "tabstrip-layout", initial: "signup_login.html", hashBang: true, loading: false });

})(window);




$(document).ready(function () {

    $('#createspot').click(function () {
        app.application.navigate("createspot.html");
    });

});

document.addEventListener("backbutton", BackButton, true);

function navigateFromDrawer(view, checkIfSupporter) {

    if (localStorage.User == undefined || localStorage.User == null) {
        alert("You should login first, in order to browse the application!");
        app.application.navigate('signup_login.html');
        return false;
    }

    if (checkIfSupporter) {
        // console.log(userData); 
        var created = new Date(userData.CreatedAt);
        created.setTime(created.getTime() + (14 * 24 * 60 * 60 * 1000));
        var today = new Date();

        if (userData.UserRole != "2" && created < today)
            app.application.navigate("non_supporter_look_at_map.html");
        else
            app.application.navigate(view);
    }
    else
        app.application.navigate(view);
}

function BackButton() {
    if (app.application.view().id == "index.html")//check if index
    {
        if ((localStorage.accessToken != null && localStorage.accessToken != 'null' && localStorage.accessToken != '' && localStorage.accessToken != undefined)) {
            var fb = FBConnect.install();
            fb.Logout(localStorage.accessToken);
        }
        window.localStorage.removeItem("User");
        window.localStorage.removeItem("PostProductData");
        window.localStorage.removeItem("OwnerID");
        window.localStorage.removeItem("OwnerPhoneNumber");
        window.localStorage.removeItem("ProductCO2");
        window.localStorage.removeItem("RecipientID");
        window.localStorage.removeItem("ProductData");
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem('spotID');
        window.localStorage.removeItem('CacheItem');
        window.localStorage.removeItem('Filters');
        window.localStorage.removeItem('SubscriptionPaid');
        window.localStorage.removeItem('SubscriptionInstallPaid');
        window.localStorage.removeItem('RecipientEmailID');
        app.application.navigate("signup_login.html");
    } else if (app.application.view().id == "signup_login.html" || app.application.view().id == "signup_login_org.html") {
        setTimeout(function () {
            if (confirm("Do you want to exit?")) {
                navigator.app.exitApp()
            }
        }, 500);
    } else {
        navigator.app.backHistory();
    }
}

function SendMail(Name, Subject, Comments, MailTo) {
    var Data = '{"Name":"' + Name + '","Subject":"' + Subject + '","Comments":"' + Comments + '","To":"' + MailTo + '"}';

}

function getLanguageResources() {
    var dk = new Array();
    var de = new Array();
    var en = new Array();
    var es = new Array();

    dk['Username'] = "Brugernavn";
    dk['password'] = "Password";
    dk['Email'] = "Email adresse";
    dk['name'] = "Navn";
    dk['Phone No'] = "Tlf. nummer";
    dk['company name'] = "Firma navn";
    dk['Address'] = "Adresse";
    dk['city'] = "By";
    dk['zip'] = "Postnummer";
    dk['State'] = "Stat";

    de['Username'] = "Benutzername";
    de['password'] = "Passwort";
    de['Email'] = "Email adresse";
    de['name'] = "Name";
    de['Phone No'] = "Telephon no";
    de['company name'] = "Firma name";
    de['Address'] = "Adresse";
    de['city'] = "Stadt";
    de['zip'] = "Plz";
    de['State'] = "Stat";

    en['Username'] = "Username";
    en['password'] = "Password";
    en['Email'] = "Email";
    en['name'] = "Name";
    en['Phone No'] = "Phone No";
    en['company name'] = "Company name";
    en['Address'] = "Address";
    en['city'] = "City";
    en['zip'] = "Zip";
    en['State'] = "State";

    es['Username'] = "Navn";
    es['password'] = "Beskrivelse";
    es['Email'] = "Adresse";
    es['name'] = "By";
    es['Phone No'] = "Postnummer";
    es['company name'] = "Stat";
    es['Address'] = "Tlf";
    es['city'] = "Web";
    es['zip'] = "CVR no.";
    es['State'] = "CVR no.";

    dk['name'] = "Navn";
    dk['description'] = "Beskrivelse";
    dk['Address'] = "Adresse";
    dk['city'] = "By";
    dk['zip'] = "Postnummer";
    dk['State'] = "Stat";
    dk['phone'] = "Tlf";
    dk['www'] = "Web";
    dk['VAT'] = "CVR no.";

    de['name'] = "Name";
    de['description'] = "Beschreibung";
    de['Address'] = "Addresse";
    de['city'] = "Stadt";
    de['zip'] = "Plz";
    de['State'] = "State";
    de['phone'] = "Phone";
    de['www'] = "Web";
    de['VAT'] = "MwSt. no.";

    en['name'] = "Name";
    en['description'] = "description";
    en['Address'] = "Address";
    en['city'] = "city";
    en['zip'] = "zip";
    en['State'] = "State";
    en['phone'] = "phone";
    en['www'] = "www";
    en['VAT'] = "VAT";

    es['name'] = "Nombre";
    es['description'] = "Descripcion";
    es['Address'] = "Direccion";
    es['city'] = "Ciudad";
    es['zip'] = "Codigo Postal";
    es['State'] = "Estado";
    es['phone'] = "Telefono";
    es['www'] = "Web";
    es['VAT'] = "Registro Fiscal no.";

    var resources = new Array();
    resources['dk'] = dk;
    resources['de'] = de;
    resources['en'] = en;
    resources['es'] = es;
    return resources;
}

function changeLanguage(lang) {
    var langResources = getLanguageResources()[lang];

    $("input").each(function (i, elt) {
        $(elt).attr('placeholder', langResources[$.trim($(elt).attr('placeholder'))]);
    });
}

function SetNumariaclOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
        return true;
}
function StopSpecialchrOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 60 || charCode == 62 || charCode == 63 || charCode == 58 || charCode == 59 || charCode == 92 || charCode == 46 || charCode == 44 || charCode == 39 || charCode == 34 || charCode == 47 || charCode == 124)
        return false;
    else
        return true;
}

function takeAvatarPicture() {
    var destinationType = navigator.camera.DestinationType;
    if ($('#avatarImage').attr('src') == "images/imageplaceholder.png") {
        navigator.camera.getPicture(onAvatarPhotoDataSuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
    } else {
        navigator.notification.confirm('Do you want to take a new photo? This will replace the current photo.',
                                       function () {
                                           navigator.camera.getPicture(onAvatarPhotoDataSuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
                                       }, 'New photo', 'No,Yes');
    }

}

function onAvatarPhotoDataSuccess(imageData) {
    log(imageData);
    // localStorage.SpotImage = imageData;

    //user.image = imageData;
    //var damagephoto = document.getElementById('image');
    //damagephoto.src = "data:image/jpeg;base64," + imageData;
     
    var canvas = document.getElementById("cc");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.crossOrigin = "Anonymous"; //cors support
    img.onload = function () {
        var W = img.width;
        var H = img.height;
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(img, 0, 0); //draw image

        //resize manually with 350 x 350 px
        //https://github.com/viliusle/Hermite-resize/
        resample_hermite(canvas, W, H, 350, 350);

        var resizedImageData = canvas.toDataURL("image/jpeg");

        var damagephoto = document.getElementById('avatarImage');
        damagephoto.src = resizedImageData;
    }
    img.src = "data:image/jpeg;base64," + imageData;
}

function takePictureActivity() {
    var destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onPhotoDataActivitySuccess, onFail, { quality: 70, targetWidth: 600, targetHeight: 400, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
}

function onPhotoDataActivitySuccess(imageData) {
    //app.AddActivity.Photo = imageData;

    var canvas = document.getElementById("cc");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.crossOrigin = "Anonymous"; //cors support
    img.onload = function () {
        var W = img.width;
        var H = img.height;
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(img, 0, 0); //draw image

        //resize manually with 350 x 350 px
        //https://github.com/viliusle/Hermite-resize/
        resample_hermite(canvas, W, H, 350, 350);

        var resizedImageData = canvas.toDataURL("image/jpeg");
        var activityPhoto = document.getElementById('imageActivity');
        activityPhoto.src = resizedImageData;
    }
    img.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    console.log(message);
}

// process the confirmation dialog result
function onTakePictureConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 46) {
        return true;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function CreateSpot() {
    if ($('#CreateSpot').attr('disabled') == 'disabled')
        return;
    else
        $('#CreateSpot').attr('disabled', 'disabled');

    if (localStorage.Spotdata != undefined || localStorage.Spotdata != null) {

    } else
        app.application.navigate("createspot.html");
}

function NotCreate() {
    window.localStorage.removeItem('Spotdata');
    app.application.navigate("myspots.html");
}

function RecordTransaction(ID) {

}

//===================================================================== OWNER =============================================================

function GetProductOwner(ID) {

}



function handleStatusChange(session) {
    if (session.authResponse) {
        //Fetch user's id, name, and picture
        FB.api('/me', {
            fields: 'id, name, picture,email'
        },
               function (response) {
                   if (!response.error) {
                       user = response;

                       Login.LoginDetails.Username = user.email;
                       Login.LoginDetails.Password = null;
                       Login.LoginDetails.FacebookId = user.id;
                       GetLoginDetails(Login.LoginDetails);
                   }
               });
    } else {
        document.body.className = 'not_connected';
    }
}

function getLoginStatus() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            alert('logged in');
            getSession();
        } else {
            //  alert('not logged in');
        }
    });
}

function signupLogin() {

    TranslateApp();

    //513813615309399   
    FB.init({ appId: "313796158728708", nativeInterface: CDV.FB, useCachedDialogs: false });

    // PhoneGap.exec(null, null, "App", "clearCache", []);

    /*  PhoneGap.addConstructor(function () {
    PhoneGap.addPlugin("Sms", new SmsPlugin());
    });*/

    var networkState = "unknown";
    if (navigator.connection != undefined)
        networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';
    // alert(networkState);
    if (networkState == null) {
        switch (localStorage.Language) {
            case "1":
                navigator.notification.alert(Language.Danish.noNetwork, '', 'Recycle World', 'OK');
                break;
            case "2":
                navigator.notification.alert(Language.German.noNetwork, '', 'Recycle World', 'OK');
                break;
            case "3":
                navigator.notification.alert(Language.English.noNetwork, '', 'Recycle World', 'OK');
                break;
            case "4":
                navigator.notification.alert(Language.Spanish.noNetwork, '', 'Recycle World', 'OK');
                break;
        }

        setTimeout(function () {
            navigator.app.exitApp()
        }, 2000);
        return;
    }

    if (localStorage.User != null && localStorage.User != "null" && localStorage.User != undefined && localStorage.User != "") {
        var User = $.parseJSON(localStorage.User);

        if (User.UserRole == "3") {
            return false;
        }

        switch (localStorage.Language) {
            case "1":
                navigator.notification.alert(Language.Danish.WelcomeMessage, '', 'Recycle World', 'OK');
                break;
            case "2":
                navigator.notification.alert(Language.German.WelcomeMessage, '', 'Recycle World', 'OK');
                break;
            case "3":
                navigator.notification.alert(Language.English.WelcomeMessage, '', 'Recycle World', 'OK');
                break;
            case "4":
                navigator.notification.alert(Language.Spanish.WelcomeMessage, '', 'Recycle World', 'OK');
                break;
        }

        if (User.PhoneNumber != '' && User.EmailID != '') {
            app.application.navigate("index.html");
        } else {
            app.application.navigate("basic_setup.html");
        }
    }

    if ((typeof PhoneGap == 'undefined') && (typeof PhoneGap == 'undefined'))
        alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
    if (typeof CDV == 'undefined')
        alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
    if (typeof FB == 'undefined')
        alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

    FB.Event.subscribe('auth.login', function (response) {
    });

    FB.Event.subscribe('auth.logout', function (response) {
    });

    FB.Event.subscribe('auth.sessionChange', function (response) {
    });

    FB.Event.subscribe('auth.statusChange', handleStatusChange);

    $('#email').focus();

    if (localStorage.Language == undefined || localStorage.Language == null || localStorage.Language == 0) {
        localStorage.Language = "3";
        localStorage.LanguageType = "en";
        GetAllLanguages();
    } else {
        // GetAllLanguages();
        switch (localStorage.Language) {
            case "1":
                localStorage.LanguageType = "dk";
                break;
            case "2":
                localStorage.LanguageType = "de";
                break;
            case "3":
                localStorage.LanguageType = "en";
                break;
            case "4":
                localStorage.LanguageType = "es";
                break;
        }

        TranslateApp();
    }

    $('#ddlCountry').change(function () {
        if (CheckConnection()) {
            if ($(this).val() == '0' || $(this).val() == 0) {
                return false;
            }

            localStorage.Language = $(this).val();
            console.log($(this));

            $('#ddlCountry').html('');

            switch (localStorage.Language) {
                case "1":
                    localStorage.LanguageType = "dk";
                    $.each(Languages.Danish, function (i) {
                        $('#ddlCountry').append('<option value="' + Languages.Danish[i].id + '">' + Languages.Danish[i].Value + '</option>');
                    });
                    break;
                case "2":
                    localStorage.LanguageType = "de";
                    $.each(Languages.German, function (i) {
                        $('#ddlCountry').append('<option value="' + Languages.German[i].id + '">' + Languages.German[i].Value + '</option>');
                    });
                    break;
                case "3":

                    localStorage.LanguageType = "en";
                    $.each(Languages.English, function (i) {
                        $('#ddlCountry').append('<option value="' + Languages.English[i].id + '">' + Languages.English[i].Value + '</option>');
                    });
                    break;
                case "4":
                    localStorage.LanguageType = "es";
                    $.each(Languages.Spanish, function (i) {
                        $('#ddlCountry').append('<option value="' + Languages.Spanish[i].id + '">' + Languages.Spanish[i].Value + '</option>');
                    });
                    break;
            }

            $('#ddlCountry>option').each(function (i) {
                if ($(this).val() == localStorage.Language) {
                    $('#ddlCountry').val($(this).val());
                    $('#ddlCountry').parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });

            TranslateApp();
        } else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.noNetwork);
                    break;
                case "2":
                    alert(Language.German.noNetwork);
                    break;
                case "3":
                    alert(Language.English.noNetwork);
                    break;
                case "4":
                    alert(Language.Spanish.noNetwork);
                    break;
            }
            navigator.app.exitApp();
        }
    });

    $('#FacebookLogin').click(function () {
        if ($(this).is(':checked')) {
            //alert('Please click on login button to enter recycle world', '', 'Recycle World', 'OK');
            //navigator.notification.alert('Please click on login button to enter recycle world', '', 'Recycle World', 'OK');
            $('#email').val('').css({ "background-color": "#dfdfdf" }).attr('disabled', 'disabled');
            $('#Password').val('').css({ "background-color": "#dfdfdf" }).attr('disabled', 'disabled');
            $('#dvForgotPassword').css({ 'display': 'none' });
            // login();
        }
    });

    $('#RecycleLogin').click(function () {
        if ($(this).is(':checked')) {
            $('#email').css({ "background-color": "#fff" }).attr('disabled', false);
            $('#Password').css({ "background-color": "#fff" }).attr('disabled', false);
            $('#dvForgotPassword').css({ 'display': 'block' });
        }
    });

    $('#Login').click(function () {
        if (CheckConnection()) {
            if ($('#FacebookLogin').is(':checked')) {
                Login.LoginDetails.Password = null;
                Login.LoginDetails.LangaugeID = localStorage.Language;
                Login.LoginDetails.UserRole = 1;
                //localStorage.FaceBookObject = FB;
                login();
            } else if ($('#RecycleLogin').is(':checked')) {
                Login.LoginDetails.FacebookId = null;
                // localStorage.FaceBookObject = null;
                Login.LoginDetails.LangaugeID = localStorage.Language;
                Login.LoginDetails.UserRole = 1;
                CreateUserWithRecycleWorld();
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.noNetwork);
                    break;
                case "2":
                    alert(Language.German.noNetwork);
                    break;
                case "3":
                    alert(Language.English.noNetwork);
                    break;
                case "4":
                    alert(Language.Spanish.noNetwork);
                    break;
            }
            navigator.app.exitApp();
        }
    });

    $('#TakeTour').click(function () {
        if (CheckConnection()) {
            CreateGuestUser();
            window.localStorage.removeItem('CacheItem');
            //navigator.notification.alert('Logging in as guest', '', 'Recycle World', 'OK');
            app.application.navigate("index.html");
        } else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.noNetwork);
                    break;
                case "2":
                    alert(Language.German.noNetwork);
                    break;
                case "3":
                    alert(Language.English.noNetwork);
                    break;
                case "4":
                    alert(Language.Spanish.noNetwork);
                    break;
            }
            navigator.app.exitApp();
        }
    });

    $('#ForgetPassword').click(function () {
        if (CheckConnection()) {
            if ($('#RecycleLogin').is(':checked')) {
                $('#email').css({ "background-color": "#fff" }).attr('disabled', false);
                $('#Password').css({ "background-color": "#fff" }).attr('disabled', false);
            }
            recoverPassword();
        } else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.noNetwork);
                    break;
                case "2":
                    alert(Language.German.noNetwork);
                    break;
                case "3":
                    alert(Language.English.noNetwork);
                    break;
                case "4":
                    alert(Language.Spanish.noNetwork);
                    break;
            }
            navigator.app.exitApp();
        }
    });
}

function showMe() {
    if (localStorage.User == null || localStorage.User == undefined) {
        app.application.navigate('signup_login.html');
        return;
    } else
        app.application.navigate("me.html");
}

function appNavigate(view) {
    app.application.navigate(view);
}

function getFilters() {
    var Distance = $('#Distance').val();
    var Price = $('#Price').val();
    var Text = $('#Search').val();

    var str = "";
    $("select option:selected").each(function () {
        str += $(this).attr('id') + ",";
    });

    if ($.trim(str) != "" && $.trim(str) != null) {
        localStorage.Filters = Text + '&' + Distance + '&' + Price + '&' + str.substring(0, str.length - 1);
        localStorage.isFilterEnabled = true;
    } else {
        localStorage.Filters = Text + '&' + Distance + '&' + Price + '&' + 'null';
        localStorage.isFilterEnabled = true;
    }

    app.application.navigate("finditem.html");
}



function aboutThisAppInit() {
    $('#SendMail').click(function () {
        var Flag = true;
        var ErrorMessage = "";
        var MailTo = "feedback@recycleworld.dk";
        //var MailTo = "rbhardwaj@seasiainfotech.com";

        if ($('#Name').val() == "") {
            Flag = false;
            if (Error == '') {
                ErrorMessage = 'Please provide name.\n';
            } else {
                ErrorMessage = ErrorMessage + 'Please provide name.\n';
            }
        }

        if ($('#Subject').val() == "0") {
            Flag = false;
            if (Error == '') {
                ErrorMessage = 'Please provide Subject\n.';
            } else {
                ErrorMessage = ErrorMessage + 'Please provide Subject.\n';
            }
        }

        if ($('#Comments').val() == "") {
            Flag = false;
            if (Error == '') {
                ErrorMessage = 'Please provide some text.\n';
            } else {
                ErrorMessage = ErrorMessage + 'Please provide some text.\n';
            }
        }

        if (Flag) {
            SendMail($('#Name').val(), $('#Subject').val(), $('#Comments').val(), MailTo);
        } else {
            alert(ErrorMessage);
        }
    });
}

function contactInit() {
    if (localStorage.User == null || localStorage.User == undefined) {
        app.application.navigate('signup_login.html');
    } else {
        User = $.parseJSON(localStorage.User);
    }

    var ID = localStorage.SelectedProduct;
    GetProductOwner(ID);

    $('#SendMessage').click(function () {
        if (User.FirstName == "" || User.PhoneNumber == "" || User.EmailID == "") {
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
                return false;
            } else {
                return false;
            }
        }

        if ($('#textinput').val() == '') {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.TypeText);
                    break;
                case "2":
                    alert(Language.German.TypeText);
                    break;
                case "3":
                    alert(Language.English.TypeText);
                    break;
                case "4":
                    alert(Language.Spanish.TypeText);
                    break;
            }
            return;
        }

        if (localStorage.OwnerPhoneNumber == '' || localStorage.OwnerPhoneNumber == undefined) {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.Request);
                    break;
                case "2":
                    alert(Language.German.Request);
                    break;
                case "3":
                    alert(Language.English.Request);
                    break;
                case "4":
                    alert(Language.Spanish.Request);
                    break;
            }
            return;
        }

        var Message = $('#textinput').val() + " ,  Please contact (" + User.PhoneNumber + ") ";

        // alert("Transaction recorded successfully");
        window.plugins.Sms.sendSMS(function () {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.Rsent);
                    break;
                case "2":
                    alert(Language.German.Rsent);
                    break;
                case "3":
                    alert(Language.English.Rsent);
                    break;
                case "4":
                    alert(Language.Spanish.Rsent);
                    break;
            }

            RecordTransaction(ID);
        },
                                   function (e) {
                                       alert('Message Failed:' + e);
                                   },
                                   localStorage.OwnerPhoneNumber,
                                   Message);
    });

    $('#call').click(function () {
        window.location = "tel:" + localStorage.OwnerPhoneNumber;
    });
}

var isEdit = "";
function takePictureSpot(edit) {
    if (edit == undefined)
        isEdit = "";
    else
        isEdit = "E";

    var destinationType = navigator.camera.DestinationType;
    if ($('#image' + edit).attr('data-src') == "images/imageplaceholder.png") {
        navigator.camera.getPicture(onPhotoDataSuccessSpot, onFail, { quality: 50, targetWidth: 400, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL });
    } else if ($('#image' + edit).attr('data-src') != "images/imageplaceholder.png") {
        navigator.camera.getPicture(onPhotoDataSuccessSpot, onFail, { quality: 50, targetWidth: 400, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL });
    } else {

        navigator.notification.confirm('Do you want to take a new photo? This will replace the current photo.', onTakePictureConfirm, 'New photo', 'No,Yes');
    }
}

function onPhotoDataSuccessSpot(imageData) {
    var canvas = document.getElementById("cc");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.crossOrigin = "Anonymous"; //cors support
    img.onload = function () {
        var W = img.width;
        var H = img.height;
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(img, 0, 0); //draw image

        //resize manually with 350 x 350 px
        //https://github.com/viliusle/Hermite-resize/
        resample_hermite(canvas, W, H, 350, 350);

        // UNDONE: implement Cordova for this https://jbkflex.wordpress.com/2012/12/21/html5-canvas-todataurl-support-for-android-devices-working-phonegap-2-2-0-plugin/#comment-2803
        spot.Image = canvas.toDataURL("image/jpeg");
        //spot.Image = "data:image/jpeg;base64," + imageData;
        var damagephoto = document.getElementById('image' + isEdit);
        damagephoto.src = img.src;
    }

    img.src = "data:image/jpeg;base64," + imageData;

}




function findItemInit() {
    $("#LoadingDiv").css({
        "position": "absolute",
        "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
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

    if (localStorage.isFilterEnabled == undefined && localStorage.isFilterEnabled == null) {
        window.localStorage.removeItem('Filters');
        window.localStorage.removeItem('isFilterEnabled');
    } else {
        window.localStorage.removeItem('isFilterEnabled');
    }

    if (localStorage.Filters != undefined && localStorage.Filters != null) {
        var SearchFilter = localStorage.Filters.split('&');
        Product.Display.Page = 1;
        Product.Display.PageSize = 10;
        Product.SearchFilters.Text = SearchFilter[0];
        Product.SearchFilters.Distance = SearchFilter[1];
        Product.SearchFilters.Price = SearchFilter[2];
        Product.SearchFilters.Categories = SearchFilter[3];
    }

    $('#List').click(function () {
        $('#ulProducts').html('');
        Product.Display.Page = 1;
        Product.Display.PageSize = 10;
        Product.Display.Style = "List";
        GetAllProducts(Product.Display, Product.SearchFilters);
    });

    $('#Grid').click(function () {
        $('#ulProducts').html('');
        Product.Display.Page = 1;
        Product.Display.PageSize = 20;
        Product.Display.Style = "Grid";
        GetAllProducts(Product.Display, Product.SearchFilters);
    });

    $('.clsProduct').click(function () {
        //$.mobile.loadingMessageTextVisible = true;
        //$.mobile.showPageLoadingMsg("b", "please wait...");
        localStorage.SelectedProduct = $(this).attr('id');
        app.application.navigate("product.html");
    });

    $('#GetMore').click(function () {
        $('#ulProducts').find('#GetMore').remove();
        Product.Display.Page += 1;
        GetAllProducts(Product.Display, Product.SearchFilters);
    });

    $('#imgSearch').click(function () {
        $('#ulProducts').html('');
        Product.Display.Page = 1;
        Product.Display.PageSize = 10;
        Product.Display.Style = "List";
        Product.SearchFilters.Text = $('#Search').val();
        GetAllProducts(Product.Display, Product.SearchFilters);
    });

    gpsEnabledSuccessCallback(true);
}

function locationEnabledSuccessCallback(result) {
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
}

function locationEnabledErrorCallback(error) {
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

function gpsEnabledSuccessCallback(result) {
    if (result) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                Product.SearchFilters.Latitude = position.coords.latitude;
                Product.SearchFilters.Longitude = position.coords.longitude;

                GetAllProducts(Product.Display, Product.SearchFilters);
                //                        if (localStorage.Filters != undefined && localStorage.Filters != null) {
                //                            window.localStorage.removeItem('Filters');
                //                        }
            }, onGPSError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
        } else {
            //alert('W3C Geolocation API is not available');
            Product.SearchFilters.Latitude = 0;
            Product.SearchFilters.Longitude = 0;
            GetAllProducts(Product.Display, Product.SearchFilters);
            //                    if (localStorage.Filters != undefined && localStorage.Filters != null) {
            //                        window.localStorage.removeItem('Filters');
            //                    }
            //return;
        }
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
    //alert('W3C Geolocation API is not available');
    Product.SearchFilters.Latitude = 0;
    Product.SearchFilters.Longitude = 0;
    GetAllProducts(Product.Display, Product.SearchFilters);
    //                    if (localStorage.Filters != undefined && localStorage.Filters != null) {
    //                        window.localStorage.removeItem('Filters');
    //                    }
    //return;
    //       switch (localStorage.Language) {
    //           case "1":
    //                alert(Language.Danish.FailLoc);
    //                break;
    //            case "2":
    //                alert(Language.German.FailLoc);
    //                break;
    //            case "3":
    //                alert(Language.English.FailLoc);
    //                break;
    //            case "4":
    //                alert(Language.Spanish.FailLoc);
    //                break;
    //        }
}

function onGPSError(error) {
    //alert('W3C Geolocation API is not available');
    Product.SearchFilters.Latitude = 0;
    Product.SearchFilters.Longitude = 0;
    GetAllProducts(Product.Display, Product.SearchFilters);
}

function spotDifferenceInit() {
    $("#spot-difference-tabstrip #me").click(function () {
        window.localStorage.removeItem('CacheItem');
        app.application.navigate("me.html");
    });

    $("#spot-difference-tabstrip #give").click(function () {
        window.localStorage.removeItem('CacheItem');
        app.application.navigate("giveaway.html");
    });
    $("#spot-difference-tabstrip #find").click(function () {
        window.localStorage.removeItem('CacheItem');
        app.application.navigate("finditem.html");
    });
    $("#spot-difference-tabstrip #spots").click(function () {
        window.localStorage.removeItem('CacheItem');
        app.application.navigate("findonmap.html");
    });
    $("#spot-difference-tabstrip #more").click(function () {
        window.localStorage.removeItem('CacheItem');
        app.application.navigate("settings.html");
    });
    $("#spot-difference-tabstrip #back").click(function () {
        var Result = $.parseJSON(localStorage.CacheItem);
        if (Result.NavigateURL == 'editspot.html')
            app.application.navigate("editspot.html");
        else
            app.application.navigate("createspot.html");
    });
}

function terraShow() {
    TranslateApp();
    setTimeout(function () {
        localStorage.IsNavigated = true;
        app.application.navigate("donate.html");
    }, 2500);
}

function thanksInit() {
    $('#CO2_kg').click(function () {
        app.application.navigate("co2_kg_products.html");
    });

    $('#CO2_food').click(function () {
        app.application.navigate("co2_food_products.html");
    });
    $('#ProceedAhead').click(function () {
        app.application.navigate("mystuff.html");
    });
}


function resetScroller(e) {
    e.view.scroller.reset();
}


function showLoading() {
    $("#loaderDiv").show();
}

function hideLoading() {
    $("#loaderDiv").hide();
}


function setListStyle(el, style) {


    var ul = $(el).closest(".km-view").find("ul.styled-list").first();
    if ($(ul).length > 0) {
        if (style == "normal") {
            $(ul).addClass("one-by-row").removeClass("three-by-row");
        } else {
            $(ul).addClass("three-by-row").removeClass("one-by-row");
        }

        // $(ul).find("li").height($(ul).find(".img-holder").first().width());

        $(".li-image").each(function () {
            if ($(this).height() > $(this).width())
                $(this).css("width", "100%");
            else
                $(this).css("height", "100%");
        });

    }
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}


function closeImageFullModal() {
    $("#image-full-modal").kendoMobileModalView("close");
}

function openImageFullModal(imgSrc) {
    $("#imgFull").attr("src", imgSrc);
    $("#image-full-modal").kendoMobileModalView("open");
}

function getCurrentLanguage() {
    var l_lang;
    if (navigator.userLanguage) // Explorer
        l_lang = navigator.userLanguage;
    else if (navigator.language) // FF
        l_lang = navigator.language;
    else l_lang = "en";
    var language = l_lang.toLowerCase().replace('-', '_');
    if (!localStorage.LanguageType) {
        language = "dk";
        //alert(language);
        switch (language) {
            case "dn":
                localStorage.Language = "1";
                localStorage.LanguageType = "dn";
                break;
            case "dk":
                localStorage.Language = "2";
                localStorage.LanguageType = "dk";
                break;
            case "en_us":
                localStorage.Language = "3";
                localStorage.LanguageType = "en";
                break;
            case "es":
                localStorage.Language = "4";
                localStorage.LanguageType = "es";
                break;
        }
    }
}

getCurrentLanguage();

function convertKmToMiles(value) {
    return Round2Digit(value * 0.621);
}