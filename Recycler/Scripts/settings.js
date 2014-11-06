   		 var User;
            var IsPaid = false;
            
          function initSettings () {
              
               FB.init({ appId: "313796158728708", nativeInterface: CDV.FB, useCachedDialogs: false });
              
                if (localStorage.User == null || localStorage.User == undefined) {
                    // app.application.navigate('signup_login.html');
                } else {
                    User = $.parseJSON(localStorage.User);
                    
                    if (User.UserRole == "2") {
                        if (localStorage.SubscriptionInstallPaid != undefined && localStorage.SubscriptionInstallPaid != null) {
                            UpdateUser(true);
                        } else {
                            if (User.SubscriptionExpiresIn != '' && User.SubscriptionExpiresIn != null) {
                                var Message = '';
                                
                                if (User.MemberShipID == '1') {
                                    if (parseInt(User.SubscriptionExpiresIn) >= 30) {
                                        switch (localStorage.Language) {
                                            case "1":
                                                Message = Language.Danish.SPayment;
                                                break;
                                            case "2":
                                                Message = Language.German.SPayment;
                                                break;
                                            case "3":
                                                Message = Language.English.SPayment;
                                                break;
                                            case "4":
                                                Message = Language.Spanish.SPayment;
                                                break;
                                        }
                                        
                                        if (confirm(Message)) {
                                            var ProductID = '';
                                            
                                            if (IsPaid)
                                                UpdateUser(true);
                                            else
                                                Payment(ProductID);
                                        } else {
                                            UpdateUser(false);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                $('#logout').click(function () {
                    $(this).attr('disabled', 'disabled');
                    logout();
                });
                $('#CreateSpot').click(function () {
                    app.application.navigate("createspot.html");
                });
                $('#Mystuff').click(function () {
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
                            localStorage.User = null;
                            app.application.navigate("signup_login.html");
                            return;
                        } else {
                            return;
                        }
                    }
                  
                    app.application.navigate("mystuff.html");
                });
                $('#MySpots').click(function () {
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
                            localStorage.User = null;
                            app.application.navigate("signup_login.html");
                            return;
                        } else {
                            return;
                        }
                    }
                    
                    if (User.UserRole == "1") {
                        var message = '';
                        switch (localStorage.Language) {
                            case "1":
                                message = Language.Danish.PUpdate;
                                break;
                            case "2":
                                message = Language.German.PUpdate;
                                break;
                            case "3":
                                message = Language.English.PUpdate;
                                break;
                            case "4":
                                message = Language.Spanish.PUpdate;
                                break;
                        }
                        
                        if (confirm(message)) {
                           app.application.navigate("basic_setup.html");
                        } else {
                            return;
                        }
                    }
                   app.application.navigate("myspots.html");
                });
                $('#fooddonation').click(function () {
                   app.application.navigate("food.html");
                });
                $('#invite').click(function () {
                    //alert('Coming soon');
                    //return;
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
                            localStorage.User = null;
                          app.application.navigate("signup_login.html");
                            return;
                        } else {
                            return;
                        }
                    }
                    if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.PleaseUpdate);
                                break;
                            case "2":
                                alert(Language.German.PleaseUpdate);
                                break;
                            case "3":
                                alert(Language.English.PleaseUpdate);
                                break;
                            case "4":
                                alert(Language.Spanish.PleaseUpdate);
                                break;
                        }
                        return;
                    }
                  app.application.navigate("invite.html");
                });
                $('#donate').click(function () {
                  app.application.navigate("donate.html");
                });
                $('#BasicSettings').click(function () {
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
                            localStorage.User = null;
                          app.application.navigate("signup_login.html");
                            return false;
                        } else {
                            return false;
                        }
                    }
                   app.application.navigate("basic_setup.html");
                });
                $('#FacebookSettings').click(function () {
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
                            localStorage.User = null;
                          app.application.navigate("signup_login.html");
                            return false;
                        } else {
                            return false;
                        }
                    }
                    if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.PleaseUpdate);
                                break;
                            case "2":
                                alert(Language.German.PleaseUpdate);
                                break;
                            case "3":
                                alert(Language.English.PleaseUpdate);
                                break;
                            case "4":
                                alert(Language.Spanish.PleaseUpdate);
                                break;
                        }
                      
                        return false;
                    }
                  app.application.navigate("basic_setup_twitter.html");
                });
               
                $('#friend').click(function () {
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
                            localStorage.User = null;
                            app.application.navigate("signup_login.html");
                            return false;
                        } else {
                            return false;
                        }
                    }
                    
                    if (User.UserRole == "1") {
                        var message = '';
                        switch (localStorage.Language) {
                            case "1":
                                message = Language.Danish.PUpdate;
                                break;
                            case "2":
                                message = Language.German.PUpdate;
                                break;
                            case "3":
                                message = Language.English.PUpdate;
                                break;
                            case "4":
                                message = Language.Spanish.PUpdate;
                                break;
                        }
                        
                        if (confirm(message)) {
                            app.application.navigate("basic_setup.html");
                            return false;
                        } else {
                            return false;
                        }
                    }
                    app.application.navigate("friendzone.html");
                });
                
                $('#Contact').click(function () {
                   app.application.navigate("about_this_app.html");
                });
                $('#About').click(function () {
                   app.application.navigate("about_recycleworld.html");
                });
                $('#qa').click(function () {
                    app.application.navigate("qa.html");
                });
                //            $('#credits').click(function () {
                //                app.application.navigate("ithankyou.html");
                
                //            });
                $('#terracycle').click(function () {
                   app.application.navigate("terracycle.html");
                });
                //            $('#book').click(function () {
                //               app.application.navigate("book.html");
                
                //            });
                
                $('#how').click(function () {
                   app.application.navigate("howworks.html");
                });
                
                $('#friendzone').click(function () {
                    app.application.navigate("friendzone.html");
                });
            }
            
            
            FB.Event.subscribe('auth.logout', function (response) {
            });
            
            function logout() {
                $('#logout').attr('disabled', 'disabled');
                
                var message = '';
                switch (localStorage.Language) {
                    case "1":
                        message = Language.Danish.Logout;
                        break;
                    case "2":
                        message = Language.German.Logout;
                        break;
                    case "3":
                        message = Language.English.Logout;
                        break;
                    case "4":
                        message = Language.Spanish.Logout;
                        break;
                }
                
                if (confirm(message)) {
                    if (localStorage.User == null || localStorage.User == undefined) {
                       app.application.navigate('signup_login.html');
                    } else {
                        User = $.parseJSON(localStorage.User);
                    }
                    
                    if ((User.PhoneNumber == '' || User.PhoneNumber == 'null' || User.PhoneNumber == null) && User.UserRole != "3") {
                        if (confirm('You are about to log out of the app without setting your details ! your account will be cancelled.Do you want to continue?')) {
                            var URLFormed = Service.dataServiceURL + Service.ServiceName._LoginService + '/' + Service.ServiceMethods._CancelRegistration;
                            jQuery.support.cors = true;
                            
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
                            
                           /* jQuery.support.cors = true;
                            $.ajax({
                                       type: "POST",
                                       url: URLFormed,
                                       dataType: 'json',
                                       data: '{"UserID":' + User.UserID + '}',
                                       contentType: "application/json;charset=utf-8",
                                       cache: false,
                                       async: false,
                                       success: function (Result) {
                                           if (Result != null && Result != 'null') {
                                               if (Result) {
                                                   alert('Your account has been cancelled! you may register again.');
                                                   $("#LoadingDiv").css({
                                                                            "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                                                                            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                                                                            'background-color': 'white'
                                                                        });
                                                   $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
                                                   $('#LoadingDiv,#Load').show();
                                                   
                                                   FB.getLoginStatus(function (response) {
                                                       if (response.status == 'connected') {
                                                           FB.logout(function (response) {
                                                               window.localStorage.removeItem("User");
                                                               
                                                               window.localStorage.removeItem("PostProductData");
                                                               window.localStorage.removeItem("OwnerID");
                                                               window.localStorage.removeItem("OwnerPhoneNumber");
                                                               window.localStorage.removeItem("ProductCO2");
                                                               window.localStorage.removeItem("RecipientID");
                                                               window.localStorage.removeItem("ProductData");
                                                               window.localStorage.removeItem('spotID');
                                                               window.localStorage.removeItem('CacheItem');
                                                               window.localStorage.removeItem('Filters');
                                                               window.localStorage.removeItem('SubscriptionPaid');
                                                               window.localStorage.removeItem('SubscriptionInstallPaid');
                                                               $('#logout').removeAttr('disabled');
                                                               $('#LoadingDiv,#Load').hide();
                                                              app.application.navigate("signup_login.html");
                                                           });
                                                       } else {
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
                                                           $('#logout').removeAttr('disabled');
                                                           $('#LoadingDiv,#Load').hide();
                                                          app.application.navigate("signup_login.html");
                                                       }
                                                   });
                                               }
                                           }
                                       },
                                       error: function (xhr) {
                                       }
                                   });*/
                        } else {
                            return false;
                        }
                    }
                    
                    $("#LoadingDiv").css({
                                             "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                                             'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                                             'background-color': 'white'
                                         });
                    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
                    $('#LoadingDiv,#Load').show();
                    
                    FB.getLoginStatus(function (response) {
                        if (response.status == 'connected') {
                            FB.logout(function (response) {
                                window.localStorage.removeItem("User");
                                window.localStorage.removeItem("Language");
                                window.localStorage.removeItem("PostProductData");
                                window.localStorage.removeItem("OwnerID");
                                window.localStorage.removeItem("OwnerPhoneNumber");
                                window.localStorage.removeItem("ProductCO2");
                                window.localStorage.removeItem("RecipientID");
                                window.localStorage.removeItem("ProductData");
                                window.localStorage.removeItem('spotID');
                                window.localStorage.removeItem('CacheItem');
                                window.localStorage.removeItem('Filters');
                                window.localStorage.removeItem('SubscriptionPaid');
                                window.localStorage.removeItem('SubscriptionInstallPaid');
                                $('#logout').removeAttr('disabled');
                                $('#LoadingDiv,#Load').hide();
                               app.application.navigate("signup_login.html");
                            });
                        } else {
                            window.localStorage.removeItem("User");
                            window.localStorage.removeItem("Language");
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
                            $('#logout').removeAttr('disabled');
                            $('#LoadingDiv,#Load').hide();
                           app.application.navigate("signup_login.html");
                        }
                    });
                }
            }
            

            
            //===========================================================PAYMENT======================================================================
            
            function Payment(ProductID) {
                alert('Initializing Payment..');
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
                IsPaid = false;
                localStorage.SubscriptionInstallPaid = false;
                alert("Payment Init ERROR: \r\n" + result);
            }
            
            function OnPaymentSuccess(result) {
                switch (result) {
                    case "android.test.purchased":
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Paid);
                                break;
                            case "2":
                                alert(Language.German.Paid);
                                break;
                            case "3":
                                alert(Language.English.Paid);
                                break;
                            case "4":
                                alert(Language.Spanish.Paid);
                                break;
                        }
                        IsPaid = true;
                        localStorage.SubscriptionInstallPaid = true;
                        UpdateUser(true);
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
                        IsPaid = false;
                        localStorage.SubscriptionInstallPaid = false;
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
                        IsPaid = false;
                        localStorage.SubscriptionInstallPaid = false;
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
                        IsPaid = false;
                        localStorage.SubscriptionInstallPaid = false;
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
                IsPaid = false;
                localStorage.SubscriptionInstallPaid = false;
            }
            
            //============================================================================================================================================
            
            
            
            function UpdateUser(Paid) {
               /* $.support.cors = true;
                var data = '{"UserID": "' + User.UserID + '",';
                if (Paid == false)
                    data += '"RoleID":"1",';
                else
                    data += '"RoleID":"' + User.UserRole + '",';
                data += '"Username":"' + User.UserName + '",' +
                        '"Password":"' + User.Password + '",' +
                        '"Email":"' + User.EmailID + '",' +
                        '"FirstName":"' + User.FirstName + '",' +
                        '"CompanyName":"' + User.CompanyName + '",' +
                        '"Address":"' + User.Address + '",' +
                        '"City":"' + User.City + '",' +
                        '"Zip":"' + User.Zip + '",' +
                        '"State":"' + User.State + '",' +
                        '"Country":"' + User.Country + '",' +
                        '"LanguageID":"' + User.LanguageID + '",' +
                        '"PhoneNo":"' + User.PhoneNumber + '",' +
                        '"ImageData":"' + User.Image + '",' +
                        '"MailSent":"' + User.MailSent + '",' +
                        '"UpdateSubscription":"' + Paid + '",';
                if (Paid == false)
                    data += '"MemberShipID":""}';
                else
                    data += '"MemberShipID":"' + User.MemberShipID + '"}';
                    
                var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._CreateUser;
                
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
                           data: data,
                           contentType: "application/json;charset=utf-8",
                           cache: false,
                           success: function (result) {
                             //  if (localStorage.SubscriptionInstallPaid != undefined && localStorage.SubscriptionInstallPaid != null) {
                                   localStorage.User = JSON.stringify(result);
                                   window.localStorage.removeItem('SubscriptionInstallPaid');
                                   switch (localStorage.Language) {
                                       case "1":
                                           alert(Language.Danish.Pupdate);
                                           break;
                                       case "2":
                                           alert(Language.German.Pupdate);
                                           break;
                                       case "3":
                                           alert(Language.English.Pupdate);
                                           break;
                                       case "4":
                                           alert(Language.Spanish.Pupdate);
                                           break;
                                   }
                               //}
                               else {
                                   localStorage.User = JSON.stringify(result);
                                   window.localStorage.removeItem('SubscriptionInstallPaid');
                                   switch (localStorage.Language) {
                                       case "1":
                                           alert(Language.Danish.Pupdate);
                                           break;
                                       case "2":
                                           alert(Language.German.Pupdate);
                                           break;
                                       case "3":
                                           alert(Language.English.Pupdate);
                                           break;
                                       case "4":
                                           alert(Language.Spanish.Pupdate);
                                           break;
                                   }
                               }
                           },
                           error: function (xhr, request, status, error) {
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
                       });*/
            }
            
         
               
           
            
                    
            