(function (win) {
    'use strict';
 var app = win.app = win.app || {};
    // Global error handling
    var showAlert = function(message, title, callback) {
        if(navigator.notification!=undefined)
        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };

    var showError = function(message) {
        showAlert(message, 'Error occured');
    };

    /*win.addEventListener('error', function (e) {
        e.preventDefault();

        var message = e.message + "' from " + e.filename + ":" + e.lineno;

        showAlert(message, 'Error occured');

        return true;
    });*/

    // Global confirm dialog
    var showConfirm = function(message, title, callback) {
        navigator.notification.confirm(message, callback || function () {
        }, title, ['OK', 'Cancel']);
    };

    var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    var isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !isNullOrEmpty(key) && !regEx.test(key);
    };

    var fixViewResize = function () {
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    // Handle device back button tap
    var onBackKeyDown = function(e) {
        e.preventDefault();

        navigator.notification.confirm('Do you really want to exit?', function (confirmed) {
            var exit = function () {
                navigator.app.exitApp();
            };

            if (confirmed === true || confirmed === 1) {
                // Stop EQATEC analytics monitor on app exit
                if (analytics.isAnalytics()) {
                    analytics.Stop();
                }
                AppHelper.logout().then(exit, exit);
            }
        }, 'Exit', ['OK', 'Cancel']);
    };

    var onDeviceReady = function() {
        // Handle "backbutton" event
        document.addEventListener('backbutton', onBackKeyDown, false);

        navigator.splashscreen.hide();
        fixViewResize();
            autoLogin();
        if (analytics.isAnalytics()) {
            analytics.Start();
        }
        
        // Initialize AppFeedback
        if (app.isKeySet(appSettings.feedback.apiKey)) {
            try {
                feedback.initialize(appSettings.feedback.apiKey);
               // log("feeeeeeed")
            } catch (err) {
                console.log('Something went wrong:');
                console.log(err);
            }
        } else {
          //  console.log('Telerik AppFeedback API key is not set. You cannot use feedback service.');
        }
        setTimeout(function(){
      
        if (window.plugins.AdMob) {
            try {
                // alert("admobExport exists");
                /*  BANNER: 'BANNER',
                IAB_MRECT: 'IAB_MRECT',
                IAB_BANNER: 'IAB_BANNER',
                IAB_LEADERBOARD: 'IAB_LEADERBOARD',
                SMART_BANNER: 'SMART_BANNER'*/
                window.plugins.AdMob.createBannerView({
                            //'publisherId': 'ca-app-pub-5656565656565/1234567890',
                             'publisherId':'ca-app-pub-xxx/4353543543' ,
                             'adSize':window.plugins.AdMob.AD_SIZE.BANNER,
                             'bannerAtTop': false
                         }, 

                         function() {
                             //alert("create");
                             window.plugins.AdMob.requestAd(
                                 {'isTesting':false},
                                 // requestAd success callback: we can now show he ad in the placeholder
                                 function() {
                                   //  alert("req");
                                     window.plugins.AdMob.showAd(
                                         true,
                                         // showAd success callback: if this is called, the ad is being shown
                                         function() {
                                           //  alert('show ok')
                                              setTimeout(function(){
                                                  window.plugins.AdMob.destroyBannerView();
                                              },10000);
                                         },
                                         // showAd error callback
                                         function() {
                                             alert('failed to show ad')
                                         });
                                 },
                                 // requestAd error callback
                                 function() {
                                     alert('failed to request ad');
                                 }
                                 );
                         },
                         // createBannerView error callback
                         function(err) {
                             //alert(JSON.stringify(err));
                             //alert('failed to create banner view');
                         }
                    );
                                
            }catch (err) {               
                alert(err);
                alert(JSON.stringify(err));
            }
        }else {
            alert("No admobExport");
        }
            },100);
    };

    // Handle "deviceready" event
    document.addEventListener('deviceready', onDeviceReady, false);
    // Handle "orientationchange" event
    document.addEventListener('orientationchange', fixViewResize);

    // Initialize Everlive SDK
    var el = new Everlive({
                              apiKey: appSettings.everlive.apiKey,
                              scheme: appSettings.everlive.scheme
                          });

    var emptyGuid = '00000000-0000-0000-0000-000000000000';

    var AppHelper = {

        // Return user profile picture url
        resolveProfilePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return 'styles/images/avatar.png';
            }
        },

        // Return current activity picture url
        resolvePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return '';
            }
        },

        // Date formatter. Return date in d.m.yyyy format
        formatDate: function (dateString) {
            return kendo.toString(new Date(dateString), 'MMM d, yyyy');
        },

        // Current user logout
        logout: function () {
            return el.Users.logout();
        }
    };

  /*  var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';
*/
    // Initialize KendoUI mobile application
   /* var mobileApp = new kendo.mobile.Application(document.body, {
                                                     transition: 'slide',
                                                     statusBarStyle: statusBarStyle,
                                                     skin: 'flat'
                                                 });
*/
    
    var getYear = (function () {
        return new Date().getFullYear();
    }());    
     
        
        app.showAlert=showAlert;
         app.showError= showError;
         app.showConfirm= showConfirm;
         app.isKeySet= isKeySet,
       //  app.mobileApp= mobileApp;
         app.helper= AppHelper;
         app.everlive= el;
         app.getYear= getYear;
     
    
   /*  admobExport.createBannerView({
        'publisherId': 4353543543,
        'adSize':admobExport.AD_SIZE.SMART_BANNER,
        'bannerAtTop': false
    },function(){console.log("sss")},function(e){console.log(e)});*/
  
}(window));
