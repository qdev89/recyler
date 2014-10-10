(function (global) {
    var app = global.app = global.app || {};
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();       
        $(document.body).height(window.innerHeight);      
       
        var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
        $("[data-localize]").localize("Recycle", opts);
    }, false);

    app.application = new kendo.mobile.Application(document.body, {layout: "tabstrip-layout", skin:"flat", initial: "index.html", hashBang:true, loading:false }); 
})(window);

$(document).ready(function () {
    $('#GiveAway').click(function () {                   
        app.application.navigate("giveaway.html");
    });
    $('#createspot').click(function () {                   
        app.application.navigate("createspot.html");
    });
    $('#finditem').click(function () {                 
        app.application.navigate("finditem.html");
    });
});

 var el = new Everlive({
                              apiKey: appSettings.everlive.apiKey,
                              scheme: appSettings.everlive.scheme
                          });

document.addEventListener("backbutton", BackButton, true);
            
function BackButton() {
    if (app.application.view().id=="index.html")//check if index
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
    } else if (app.application.view().id=="signup_login.html" || app.application.view().id=="signup_login_org.html") {
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
                
    jQuery.support.cors = true;
                
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._SendContactUsMail;
                
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
                
    $.ajax({
               type: "POST",
               url: URLFormed,
               dataType: 'json',
               data: Data,
               cache: false,
               contentType: "application/json;charset=utf-8",
               success: function (Result) {
                   if (Result) {
                       alert('Mail Sent successfully');
                   } else {
                       alert('Mail sending Failed');
                   }
               },
               error: function (xhr) {
                   alert('error');
               }
           });
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
    es['description'] = "Descripci�n";
    es['Address'] = "Direcci�n";
    es['city'] = "Ciudad";
    es['zip'] = "C�digo Postal";
    es['State'] = "Estado";
    es['phone'] = "Tel�fono";
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
function runScript(e) {
    if (e.keyCode == 13) {
        user.CreateClick();
        if (user.blnFlag) {
            if (user.UserID == null || user.UserID == "") {
                user.UserID = '0';
            }
            user.RoleID = $("#role option:selected").val();
            user.Username = $("#username_fb").val();
            user.Password = $("#password_fb").val();
            user.Email = $("#email").val();
            user.FirstName = $("#name").val();
            user.CompanyName = $("#companyname").val();
            user.Address = $("#homeadress").val();
            user.City = $("#homecity").val();
            user.Zip = $("#zip").val();
            user.Country = $("#country").val();
            if (user.Country == 'US') {
                user.State = $("#state").val();
            } else {
                user.State = $("#txtState").val();
            }
                        
            user.Phoneno = $("#phoneno").val();
                        
            if ($("#Languages option:selected").val() == null || $("#Languages option:selected").val() == "") {
                user.Language = localStorage.Language;
            } else {
                user.Language = $("#Languages option:selected").val();
                localStorage.Language = user.Language;
            }
            user.CreateUser();
        } else {
            alert(user.Error);
            user.Error = '';
        }
    }
}

function takePicture() {
    var destinationType = navigator.camera.DestinationType;              
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 70, targetWidth: 600, targetHeight: 400, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
}
            
function onPhotoDataSuccess(imageData) {
    // localStorage.SpotImage = imageData;
    user.image = imageData;
                
    var damagephoto = document.getElementById('image');
    damagephoto.src = "data:image/jpeg;base64," + imageData;
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
            
        var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._CreateSpot;
        $.support.cors = true;
        $.ajax({
                   type: "POST",
                   url: URLFormed,
                   dataType: 'json',
                   data: localStorage.Spotdata,
                   contentType: "application/json;charset=utf-8",
                   cache: false,
                   success: function (result) {
                       window.localStorage.removeItem('CacheItem');
                       window.localStorage.removeItem('Spotdata');
                       $('#CreateSpot').removeAttr('disabled');
                       if (result.SpotCreated == true || result.SpotCreated == 'true') {
                           setTimeout(function () {
                           }, 500);
                           if (result.EmailSentSuccessfully == true || result.EmailSentSuccessfully == 'true') {
                               switch (localStorage.Language) {
                                   case "1":
                                       alert(Language.Danish.SpotCreate);
                                       break;
                                   case "2":
                                       alert(Language.German.SpotCreate);
                                       break;
                                   case "3":
                                       alert(Language.English.SpotCreate);
                                       break;
                                   case "4":
                                       alert(Language.Spanish.SpotCreate);
                                       break;
                               }
                           } else {
                               switch (localStorage.Language) {
                                   case "1":
                                       alert(Language.Danish.SpotNoMail);
                                       break;
                                   case "2":
                                       alert(Language.German.SpotNoMail);
                                       break;
                                   case "3":
                                       alert(Language.English.SpotNoMail);
                                       break;
                                   case "4":
                                       alert(Language.Spanish.SpotNoMail);
                                       break;
                               }
                           }
                           app.application.navigate("myspots.html");
                       } else {
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
                   },
                   error: function (xhr, request, status, error) {
                       $('#CreateSpot').removeAttr('disabled');
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
    } else
        app.application.navigate("createspot.html");
}

function NotCreate() {
    window.localStorage.removeItem('Spotdata');
    app.application.navigate("settings.html");
}

function RecordTransaction(ID) {
    jQuery.support.cors = true;
            
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
            
    var Data = '{"RecieverID":"' + User.UserID + '","OwnerID":"' + localStorage.OwnerID + '","ProductID":"' + ID + '"}';
    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._RecordTransaction;
            
    $.ajax({
               type: "POST",
               url: URLFormed,
               dataType: 'json',
               data: Data,
               contentType: "application/json;charset=utf-8",
               cache: false,
               success: function (Result) {
                   $('#LoadingDiv,#Load').hide();
                   if (Result != null && Result != 'null') {
                       var data = JSON.stringify(Result);
                       
                     
                       data = $.parseJSON(data);
                       if (data.RecordTransacted == 1) {
                           window.localStorage.removeItem("SelectedProduct");
                           window.localStorage.removeItem("OwnerPhoneNumber");
                           window.localStorage.removeItem("OwnerID");
                           app.application.navigate("finditem.html");
                       } else if (data.RecordTransacted == 2) {
                           switch (localStorage.Language) {
                               case "1":
                                   alert(Language.Danish.Ralready);
                                   break;
                               case "2":
                                   alert(Language.German.Ralready);
                                   break;
                               case "3":
                                   alert(Language.English.Ralready);
                                   break;
                               case "4":
                                   alert(Language.Spanish.Ralready);
                                   break;
                           }
                           window.localStorage.removeItem("SelectedProduct");
                           window.localStorage.removeItem("OwnerPhoneNumber");
                           window.localStorage.removeItem("OwnerID");
                           app.application.navigate("finditem.html");
                           return;
                       } else {
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
                           window.localStorage.removeItem("SelectedProduct");
                           window.localStorage.removeItem("OwnerPhoneNumber");
                           window.localStorage.removeItem("OwnerID");
                           app.application.navigate("finditem.html");
                           return;
                       }
                   } else
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
            
//===================================================================== OWNER =============================================================
            
function GetProductOwner(ID) {
    jQuery.support.cors = true;
    var Parameters = ID;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetProductOwner + '/' + Parameters;
            
    $.ajax({
               type: "GET",
               url: URLFormed,
               dataType: 'json',
               data: '{}',
               cache: false,
               success: function (Result) {
                   if (Result != null && Result != 'null') {
                       var data = JSON.stringify(Result);
                       data = $.parseJSON(data);
            
                       if (data.Image == undefined || data.Image == '')
                           $('#image').attr('src', 'images/NoImage.jpg');
                       else
                           $('#image').attr('src', 'data:image/jpeg;base64,' + data.Image);
            
                       $('#OwnerName').html(data.Name);
                       $('#Position').html(data.Position);
                       if (data.City != '0' && data.City != 0 && data.City != '')
                           $('#OwnerCity').html(data.City);
                       else
                           $('#OwnerCity').html('--');
            
                       if (data.Country != '0' && data.Country != 0 && data.Country != '')
                           $('#OwnerCountry').html(data.Country);
                       else
                           $('#OwnerCountry').html('--');
            
                       localStorage.OwnerID = data.UserID;
                       localStorage.OwnerPhoneNumber = data.PhoneNumber;
            
                       if (data.RoleID == '2') {
                           $('#RecycleStar').css({ 'display': 'block' }).attr('src', 'images/supporter.png');
                       } else {
                           $('#RecycleStar').css({ 'display': 'block' }).attr('src', 'images/notsupporter.png');
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

function logout() {
    FB.logout(function (response) {
        alert('logged out');
    });
}
            
function login() {
    FB.login(
        function (response) {
            if (response.session) {
                alert('logged in');
            } else {
                // alert('not logged in');
            }
        },
        { scope: "email" }
        );
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
            
        if (User.RoleID == "3") {
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

    if (localStorage.Language == undefined && localStorage.Language == null || localStorage.Language == 0) {
        localStorage.Language = "3";
        localStorage.LanguageType = "en";
        GetAllLanguages();
    } else {
        GetAllLanguages();
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

        var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
        $("[data-localize]").localize("Recycle", opts);
    }

    $('#ddlCountry').change(function () {
        if (CheckConnection()) {
            if ($(this).val() == '0' || $(this).val() == 0) {
                return false;
            }

            localStorage.Language = $(this).val();

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

            var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
            $("[data-localize]").localize("Recycle", opts);
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
                Login.LoginDetails.RoleID = 1;
                //localStorage.FaceBookObject = FB;
                login();
            } else if ($('#RecycleLogin').is(':checked')) {
                Login.LoginDetails.FacebookId = null;
                // localStorage.FaceBookObject = null;
                Login.LoginDetails.LangaugeID = localStorage.Language;
                Login.LoginDetails.RoleID = 1;
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
    }else
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

function initFilters() {
    switch (localStorage.Language) {
        case "1":
            localStorage.LanguageType = "dk";
            
            var menuItem = $("<option id=''></option>");
            menuItem.html("Tags/kategorier");
            $("#select-custom-24").append(menuItem);
            
            $.each(Tags.Danish, function (i) {
                if (Tags.Danish[i] != undefined) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.Danish[i].Value);
                    menuItem.attr('id', Tags.Danish[i].id);
                    $("#select-custom-24").append(menuItem);
                }
            });
            
           // $("#select-custom-24").selectmenu('refresh');
            
            break;
        case "2":
            
            localStorage.LanguageType = "de";
            var menuItem = $("<option id=''></option>");
            menuItem.html("Tags/Categories");
            $("#select-custom-24").append(menuItem);
            
            $.each(Tags.German, function (i) {
                if (Tags.German[i] != undefined) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.German[i].Value);
                    menuItem.attr('id', Tags.German[i].id);
                    $("#select-custom-24").append(menuItem);
                }
            });
          //  $("#select-custom-24").selectmenu('refresh');
            
            break;
        case "3":
            
            localStorage.LanguageType = "en";
            var menuItem = $("<option id=''></option>");
            menuItem.html("Tags/Categories");
            $("#select-custom-24").append(menuItem);
            
            $.each(Tags.English, function (i) {
                if (Tags.English[i] != undefined) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.English[i].Value);
                    menuItem.attr('id', Tags.English[i].id);
                    $("#select-custom-24").append(menuItem);
                }
            });
          //  $("#select-custom-24").selectmenu('refresh');
            
            break;
        case "4":
            
            localStorage.LanguageType = "es";
            var menuItem = $("<option id=''></option>");
            menuItem.html("Tags/Categories");
            $("#select-custom-24").append(menuItem);
            
            $.each(Tags.Spanish, function (i) {
                if (Tags.Spanish[i] != undefined) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.Spanish[i].Value);
                    menuItem.attr('id', Tags.Spanish[i].id);
                    $("#select-custom-24").append(menuItem);
                }
            });
          //  $("#select-custom-24").selectmenu('refresh');
            
            break;
    }
}

function aboutThisAppInit(){
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

  function GoToBasicSettings() {
               app.application.navigate("basic_setup.html");
            }

function setupInit(){
    
        if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $.getJSON('http://ws.geonames.org/countryCode', {
                                      lat: position.coords.latitude,
                                      lng: position.coords.longitude,
                                      type: 'JSON',
                                      async: false
                                  }, function (result) {
                                      //                alert(result.countryCode);
                                      //                alert(CountryCode["IN"]);
                                      user.CountryCode = result.countryCode;
                                  });
                    });
            }
}

function co2thanksInit(){
       var CO2 = localStorage.CalculatedCO2;
                window.localStorage.removeItem("CalculatedCO2");
                $('#CO2Val').html(CO2);
            
                $('#ProceedToDonate').click(function () {
                   app.application.navigate("mystuff.html");
                });
    
}

function contactInit(){
    
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

  function takePictureSpot() {
                // navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
                var destinationType = navigator.camera.DestinationType;
                if ($('#image').attr('src') == "images/imageplaceholder.png") {
                            navigator.camera.getPicture(  function (imageData) {
                                // localStorage.SpotImage = imageData;
                                spot.Image = imageData;
                                
                                var damagephoto = document.getElementById('image');
                                damagephoto.src = "data:image/jpeg;base64," + imageData;
                            }
            			, onFail, { quality: 50, targetWidth: 400, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
                    } else {
                        //ask user if he wants to replace photo
                        navigator.notification.confirm('Do you want to take a new photo? This will replace the current photo.', onTakePictureConfirm, 'New photo', 'No,Yes');
                    }
            }

  var AmountToDenote;

function donateInit(){
    
     $('#Donate1').click(function () {
                    AmountToDenote = 1;
                    ProductID = '';
                    Payment(ProductID);
                });
                
                $('#Donate2').click(function () {
                    AmountToDenote = 2;
                    ProductID = '';
                    Payment(ProductID);
                });
                
                $('#RedirectToMyStuff').click(function () {
                    if (localStorage.IsNavigated == undefined || localStorage.IsNavigated == null) {
                        app.application.navigate("settings.html");
                    } else {
                        window.localStorage.removeItem("IsNavigated");
                        app.application.navigate("mystuff.html");
                    }
                });
}

     function Payment(ProductID) {
                // alert('Initializing Payment..');
                inappbilling.init(OnInitSuccess, OnInitFailure);
            }
            
            function OnInitSuccess(result) {
                // alert("Payment Init Success: \r\n" + result);
                switch (localStorage.Language) {
                    case "1":
                        alert(Language.Danish.Mpayment);
                        break;
                    case "2":
                        alert(Language.German.Mpayment);
                        break;
                    case "3":
                        alert(Language.English.Mpayment);
                        break;
                    case "4":
                        alert(Language.Spanish.Mpayment);
                        break;
                }
                inappbilling.purchase(OnPaymentSuccess, OnPaymentFailure, "android.test.purchased");
            }
            
            function OnInitFailure(result) {
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
            
            function OnPaymentSuccess(result) {
                switch (result) {
                    case "android.test.purchased":
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Donating);
                                break;
                            case "2":
                                alert(Language.German.Donating);
                                break;
                            case "3":
                                alert(Language.English.Donating);
                                break;
                            case "4":
                                alert(Language.Spanish.Donating);
                                break;
                        }
                        UpdateEarthHeartData();
                        break;
                    case "CANCELLED" || "cancelled":
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Pcancel);
                                break;
                            case "2":
                                alert(Language.German.Pcancel);
                                break;
                            case "3":
                                alert(Language.English.Pcancel);
                                break;
                            case "4":
                                alert(Language.Spanish.Pcancel);
                                break;
                        }
                        break;
                    case "REFUNDED" || "refunded":
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Prefund);
                                break;
                            case "2":
                                alert(Language.German.Prefund);
                                break;
                            case "3":
                                alert(Language.English.Prefund);
                                break;
                            case "4":
                                alert(Language.Spanish.Prefund);
                                break;
                        }
                        break;
                    case "EXPIRED" || "expired":
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Pexpire);
                                break;
                            case "2":
                                alert(Language.German.Pexpire);
                                break;
                            case "3":
                                alert(Language.English.Pexpire);
                                break;
                            case "4":
                                alert(Language.Spanish.Pexpire);
                                break;
                        }
                        break;
                }
            }
            
            function OnPaymentFailure(result) {
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
            
            function UpdateEarthHeartData() {
                var Type = 'Donation';
                var DonationAmount = AmountToDenote;
                var Transactions = 0;
                var FriendRecommendation = 0;
                var CO2Saved = 0;
                
                if (localStorage.User == null || localStorage.User == undefined) {
                   app.application.navigate('signup_login.html');
                } else {
                    User = $.parseJSON(localStorage.User);
                }
                
                var Parameters = User.UserID + '/'
                                 + Type + '/'
                                 + DonationAmount + '/'
                                 + Transactions + '/'
                                 + FriendRecommendation + '/'
                                 + CO2Saved;
                var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._EarthHeartData + '/' + Parameters;
                
                jQuery.support.cors = true;
                $.ajax({
                           type: "GET",
                           url: URLFormed,
                           dataType: 'json',
                           data: '{}',
                           cache: false,
                           success: function (Result) {
                               if (Result != null && Result != 'null') {
                                   var data = JSON.stringify(Result);
                                   data = $.parseJSON(data);
                                 //  if (data.IsDonated == true || data.IsDonated == 'true') {
                                       if (localStorage.IsNavigated == undefined || localStorage.IsNavigated == null) {
                                           app.application.navigate("settings.html");
                                       } else {
                                           window.localStorage.removeItem("IsNavigated");
                                          app.application.navigate("mystuff.html");
                                       }
                                 /*  } else {
                                       if (localStorage.IsNavigated == undefined || localStorage.IsNavigated == null) {
                                          app.application.navigate("settings.html");
                                       } else {
                                           window.localStorage.removeItem("IsNavigated");
                                           app.application.navigate("mystuff.html");
                                       }
                                   }*/
                               }
                           },
                           error: function (xhr) {
                               console.log(xhr);
                               alert('Please try again.');
                           }
                       });
            }

   function takePictureSpot() {
                // navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
                var destinationType = navigator.camera.DestinationType;
                if ($('#image').attr('src') == "images/imageplaceholder.png") {
                    navigator.camera.getPicture(onPhotoDataSuccessSpot, onFail, { quality: 50, targetWidth: 400, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL });
                } else if ($('#image').attr('src') != "images/imageplaceholder.png") {
                    navigator.camera.getPicture(onPhotoDataSuccessSpot, onFail, { quality: 50, targetWidth: 400, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL });
                } else {
                    //ask user if he wants to replace photo
                    navigator.notification.confirm('Do you want to take a new photo? This will replace the current photo.', onTakePictureConfirm, 'New photo', 'No,Yes');
                }
            }
            function onPhotoDataSuccessSpot(imageData) {
                //localStorage.EditSpotImage = imageData;
                spot.Image = imageData;
                var damagephoto = document.getElementById('image');
                damagephoto.src = "data:image/jpeg;base64," + imageData;
            }

function findItemInit(){
    
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
            
                $('.clsProduct').click( function () {
                    //$.mobile.loadingMessageTextVisible = true;
            
                    //$.mobile.showPageLoadingMsg("b", "please wait...");

                    localStorage.SelectedProduct = $(this).attr('id');
                   app.application.navigate("product.html");
                });
            
              
            
                $('#GetMore').click( function () {
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
            
function spotDifferenceInit(){
    
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

function terraShow(){
    
      setTimeout(function () {
                    localStorage.IsNavigated = true;
                   app.application.navigate("donate.html");
                }, 2500);
}

function thanksInit(){
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

function isLogged() {
    if ((window.User == undefined || window.User == null) && localStorage.User == undefined) {
        app.application.navigate("signup_login.html");
        return false;
    }else if (window.User == undefined || window.User == null) 
        window.User = JSON.parse(localStorage.User);
       
    return true;
}