var User;
var IsPaid = false;

$(document).ready(function () {
    
   /* if (localStorage.User == null || localStorage.User == undefined) {

       app.application.navigate('signup_login.html');
    }
    else {
        User = $.parseJSON(localStorage.User);*/

        //        if (User.UserRole == "2") {

        //            if (localStorage.SubscriptionInstallPaid != undefined && localStorage.SubscriptionInstallPaid != null) {
        //                UpdateUser(true);
        //            }
        //            else {
        //                if (User.MemberShipdate != '') {
        //                    var sDate = new Date(User.MemberShipdate);
        //                    StringDateResult = (sDate.getMonth()) + "/" + (sDate.getDate()) + "/" + (sDate.getFullYear());
        //                    var eDate = new Date();
        //                    var timeleft;
        //                    var diff = Math.abs(sDate - eDate);
        //                    if (Math.floor(diff / 86400000)) {
        //                        timeleft = Math.floor(diff / 86400000);
        //                    } else {
        //                        timeleft = 0;
        //                    }
        //                }

        //           

        //                var Message = 'Payment of your subscription plan ' + User.MemberShipType + ' is due today! Press "Ok" to pay now and be an active recycle world supporter or Press "Cancel" to continue as free member';
        //                if (User.MemberShipID == '1') {
        //                    if (timeleft > 30) {
        //                        if (confirm(Message)) {
        //                            var ProductID = '';


        //                            if (IsPaid)
        //                                UpdateUser(true);
        //                            else
        //                                Payment(ProductID);
        //                        }
        //                        else {
        //                            UpdateUser(false);
        //                        }
        //                    }
        //                } else if (User.MemberShipID == '2') {
        //                    if (timeleft > 90) {
        //                        if (confirm(Message)) {
        //                            var ProductID = '';
        //                    
        //                            if (IsPaid)
        //                                UpdateUser(true);
        //                            else
        //                                Payment(ProductID);
        //                        }
        //                        else {
        //                            UpdateUser(false);
        //                        }
        //                    }
        //                } else if (User.MemberShipID == '3') {
        //                    if (timeleft > 180) {
        //                        if (confirm(Message)) {
        //                            var ProductID = '';
        //                         
        //                            if (IsPaid)
        //                                UpdateUser(true);
        //                            else
        //                                Payment(ProductID);
        //                        }
        //                        else {
        //                            UpdateUser(false);
        //                        }
        //                    }
        //                } else if (User.MemberShipID == '4') {
        //                    if (timeleft > 365) {
        //                        if (confirm(Message)) {
        //                            var ProductID = '';

        //                            if (IsPaid)
        //                                UpdateUser(true);
        //                            else
        //                                Payment(ProductID);
        //                        }
        //                        else {
        //                            UpdateUser(false);
        //                        }
        //                    }
        //                }
        //            }
        //}
   // }

    $('#logout').click(function () {
        $(this).attr('disabled', 'disabled');
        logout();

    });
    $('#CreateSpot').click(function () {

       app.application.navigate("createspot.html");

    });
    $('#Mystuff').click(function () {

        if (User.UserRole == "3") {
            if (confirm("You have to register with Recycle World to watch my stuff.Do you want to register now")) {
              //  localStorage.User = null;
               app.application.navigate("signup_login.html");
                return;
            }
            else {
                return;
            }
        }
     
       app.application.navigate("mystuff.html");

    });
     
    $('#MySpots').click(function () {
        if (User.UserRole == "3") {
            if (confirm("You have to register with Recycle World to watch my spots.Do you want to register now")) {
               // localStorage.User = null;
                app.application.navigate("signup_login.html");
                return;
            }
            else {
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
            if (confirm("You have to register with Recycle World to invite your friends.Do you want to register now")) {
              //  localStorage.User = null;
                app.application.navigate("signup_login.html");
                return;
            }
            else {
                return;
            }
        }
        if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
            alert("Please update your profile in basic settings.");
            return;
        }
       app.application.navigate("invite.html");

    });
    $('#donate').click(function () {

        app.application.navigate("donate.html");

    });
    $('#BasicSettings').click(function () {
        if (User.UserRole == "3") {
            if (confirm("You have to register with Recycle World to update settings.Do you want to register now")) {
               // localStorage.User = null;
               app.application.navigate("signup_login.html");
                return;
            }
            else {
                return;
            }
        }
        app.application.navigate("basic_setup.html");

    });
    $('#FacebookSettings').click(function () {

        if (User.UserRole == "3") {
            if (confirm("You have to register with Recycle World to use this functionality.Do you want to register now")) {
              //  localStorage.User = null;
               app.application.navigate("signup_login.html");
                return;
            }
            else {
                return;
            }
        }
        if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
            alert("Please update your profile in basic settings.");
            return;
        }
      app.application.navigate("basic_setup_twitter.html");

    });
    $('#Niras').click(function () {
        app.application.navigate("niras.html");

    });
    $('#Contact').click(function () {
       app.application.navigate("about_this_app.html");

    });
    $('#About').click(function () {
       app.application.navigate("about_recycleworld.html");

    });
    $('#Qa').click(function () {
       app.application.navigate("qa.html");

    });



});

FB.Event.subscribe('auth.logout', function (response) {

});

function logout() {
    $('#logout').attr('disabled', 'disabled');
    if (confirm('Log out of recycle world.')) {
        if (localStorage.User == null || localStorage.User == undefined) {
            app.application.navigate('signup_login.html');
        }
        else {

            User = $.parseJSON(localStorage.User);
        }

        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
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
                window.localStorage.removeItem('spotID');
                window.localStorage.removeItem('CacheItem');
                window.localStorage.removeItem('Filters');
                window.localStorage.removeItem('SubscriptionPaid');
                window.localStorage.removeItem('SubscriptionInstallPaid');
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
    alert("Payment Init Success: \r\n" + result);
    alert('Making Payment...');
    inappbilling.purchase(OnPaymentSuccess, OnPaymentFailure, "android.test.canceled");
}

function OnInitFailure(result) {
    IsPaid = false;
    alert("Payment Init ERROR: \r\n" + result);
}

function OnPaymentSuccess(result) {
    alert("SUCCESS: \r\n" + result);
    switch (result) {
        case "PURCHASED" || "purchased":
            IsPaid = true;
            localStorage.SubscriptionInstallPaid = true;
            UpdateUser(true);
            break;
        case "CANCELLED" || "cancelled":
            IsPaid = false;
            alert('Purchase cancelled');
            break;
        case "REFUNDED" || "refunded":
            IsPaid = false;
            alert('Purchase refunded');
            break;
        case "EXPIRED" || "expired":
            IsPaid = false;
            alert('Purchase expired');
            break;
    }
}

function OnPaymentFailure(result) {

    IsPaid = true;
    localStorage.SubscriptionInstallPaid = true;
    UpdateUser(true);

    alert("ERROR: \r\n" + result + " Please try again");
}

//============================================================================================================================================



function UpdateUser(Paid) {
    
    $.support.cors = true;
    var data = '{"UserID": "' + User.Id + '",';
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

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

   /* $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: data,
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: function (result) {

         //   if (localStorage.SubscriptionInstallPaid != undefined && localStorage.SubscriptionInstallPaid != null) {
                localStorage.User = JSON.stringify(result);
                window.localStorage.removeItem('SubscriptionInstallPaid');
                alert('Profile updated successfully.');
           }
            else {
                localStorage.User = JSON.stringify(result);
                window.localStorage.removeItem('SubscriptionInstallPaid');
                alert('Profile updated successfully.');
            }

        },
        error: function (xhr, request, status, error) {
            console.log(xhr);
            alert('Please try again.');
        }
    });*/

}