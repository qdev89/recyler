var MailSent = false;
var User;
var EarthHeartData = new Object();

EarthHeartData.Values = {
    DonationAmount: '',
    Transactions: '',
    FriendRecommendation: '',
    CO2Saved: '',
    Type: ''
}



//=================================================== Calculate Material CO2 =========================================================

function Ins_Upd_EarthHeartData(_Data, _ReturnUrl) {
    if (localStorage.User == null || localStorage.User == undefined) {
       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
    }

    var Parameters = User.UserID + '/'
                    + _Data.Type + '/'
                    + _Data.DonationAmount + '/'
                    + _Data.Transactions + '/'
                    + _Data.FriendRecommendation + '/'
                    + _Data.CO2Saved;
   /* var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._EarthHeartData + '/' + Parameters;


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
                if (data.IsDonated == true || data.IsDonated == 'true') {

                    //alert('Earth heart data updated Successfully.');
                    if (_ReturnUrl != '') {
                        window.localStorage.removeItem('MyProduct');
                        window.localStorage.removeItem('ProductCO2');
                        window.localStorage.removeItem('RecipientID');
                       app.application.navigate(_ReturnUrl);
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






//================================================= GetEarthHeartData ======================================================

function GetEarthHeartData(e) {    

    if (localStorage.User == null || localStorage.User == undefined) {
        e.preventDefault();
        app.application.navigate('signup_login.html');
        return;
    }
    else {

        User = $.parseJSON(localStorage.User);
    }

    if (User.UserRole == "3" || User.UserRole == "1") {
        $('#KarmaUser').css({ "display": "none" });
        $('#NoKarmaFreeUser').css({ "display": "block" });

    }
    else {
        $('#KarmaUser').css({ "display": "block" });
        $('#NoKarmaFreeUser').css({ "display": "none" });
        var Parameters = User.UserID;

        var URLFormed = Service.dataServiceURL
                    + Service.ServiceName._ProductService + '/'
                    + Service.ServiceMethods._GetEarthHeartData + '/'
                    + Parameters;

        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

       /* jQuery.support.cors = true;
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
                    if (data.HeartStatus != 0 || data.HeartStatus != '0') {

                        $('#Position').html(data.Position);
                        $('#transactions').html(data.transactions);
                        $('#Co2Saved').html(data.Co2Saved);
                        $('#Donationsli').css({ 'display': 'block' });
                        $('#Donations').html(data.Donations + '/' + data.DonationAmount);
                    //    }
                        $('#HeartStatus').html(data.HeartStatus);
                        switch (data.HeartStatus) {
                            case "25" || 25:
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:67%;left:0"><img src="images/EarthImages/heart_red_4.png" width="75%" height="10%" /></div>');
                                break;
                            case "50" || 50:
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:67%;left:0"><img src="images/EarthImages/heart_red_4.png" width="75%" height="10%" /></div>');
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:44%;left:0"><img src="images/EarthImages/heart_red_3.png" width="75%" height="7%" /></div>');
                                break;
                            case "75" || 75:
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:67%;left:0"><img src="images/EarthImages/heart_red_4.png" width="75%" height="10%" /></div>');
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:44%;left:0"><img src="images/EarthImages/heart_red_3.png" width="75%" height="7%" /></div>');
                                $('#imgHeart').append('<div style="width: 100%; height: 100%;position:absolute;top:23%;left:0"><img src="images/EarthImages/heart_red_2.png" width="75%" height="7%" /></div>');
                                break;
                            case "100" || 100:
                                $('#imgHeart').html('<img src="images/EarthImages/heart_red.png" width="75%" height="30%" />');
                                break;
                        }
                    }
                    else {

                        $('#imgHeart').attr('src', 'images/NoKarma.PNG');
                        $('#Position').html('0');
                        $('#transactions').html('0');
                        $('#Co2Saved').html('0');
                        if (User.UserRole == "2") {
                            $('#Donationsli').css({ 'display': 'none' });
                        }
                        else {
                            $('#Donationsli').css({ 'display': 'block' });
                            $('#Donations').html('0/0');
                        }
                        $('#HeartStatus').html('0');
                    }
                }
                else {
                    $('#imgHeart').attr('src', 'images/NoKarma.PNG');
                    $('#Position').html('0');
                    $('#transactions').html('0');
                    $('#Co2Saved').html('0');
                    if (User.UserRole == "2") {
                        $('#Donationsli').css({ 'display': 'none' });
                    }
                    else {
                        $('#Donationsli').css({ 'display': 'block' });
                        $('#Donations').html('0/0');
                    }
                    $('#HeartStatus').html('0');
                }

            },
            error: function (xhr) {
                console.log(xhr);
                return;
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
        });  */
    }
    
        $('#SendMyCO2').click(function () {
                    SendCO2ToMail();
                });
            
                $('.clsSettings').click(function () {
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
                           // localStorage.User = null;
                          app.application.navigate("signup_login.html");
                            return;
                        } else {
                            window.localStorage.removeItem('CacheItem');
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
                            return;
                        } else {
                            window.localStorage.removeItem('CacheItem');
                            return;
                        }
                    }
            
                   app.application.navigate('basic_setup.html');
                });

}



function SendCO2ToMail() {

    if (MailSent) {
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.MailSendAlready);
                break;
            case "2":
                alert(Language.German.MailSendAlready);
                break;
            case "3":
                alert(Language.English.MailSendAlready);
                break;
            case "4":
                alert(Language.Spanish.MailSendAlready);
                break;
        }
        return;
    }


    if (localStorage.User == null || localStorage.User == undefined) {
       app.application.navigate('signup_login.html');
    }
    else {
        User = $.parseJSON(localStorage.User);
    }
    var Position = $('#Position').html();
    var Co2 = $('#Co2Saved').html();
    var HeartStatus = $('#HeartStatus').html();

    var Data =  '{"Name":"' + User.FirstName + '",' +
                '"HeartStatus":"' + HeartStatus + '",'+
                '"Position":"' + Position + '","Co2":"' + Co2 + '",'+
                '"EmailID": "' + User.EmailID + '",' +
                '"Donation":"' + $('#Donations').html() + '",' +
                '"transactions":"'+ $('#transactions').html() +'"}';


    var URLFormed = Service.dataServiceURL +
                                    Service.ServiceName._ProductService + '/' +
                                    Service.ServiceMethods._SendCO2Mail;

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

   /* jQuery.support.cors = true;
    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: OnSuccess,
        error: function (xhr) {
            MailSent = false;
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

var OnSuccess = function (Result) {

    var data = JSON.stringify(Result);
    data = $.parseJSON(data);

    if (data.CO2SentByMail) {
        MailSent = true;
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.MailSucces);
                break;
            case "2":
                alert(Language.German.MailSucces);
                break;
            case "3":
                alert(Language.English.MailSucces);
                break;
            case "4":
                alert(Language.Spanish.MailSucces);
                break;
        }
    }
    else {
        MailSent = false;
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.MailFail);
                break;
            case "2":
                alert(Language.German.MailFail);
                break;
            case "3":
                alert(Language.English.MailFail);
                break;
            case "4":
                alert(Language.Spanish.MailFail);
                break;
        }
    }
}