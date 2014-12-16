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
                           
                        } else {
                            return false;
                        }
                    }
                    
                  
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
            
            }
            
         
               
           
            
                    
            