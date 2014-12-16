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

    var Parameters = User.Id + '/'
                    + _Data.Type + '/'
                    + _Data.DonationAmount + '/'
                    + _Data.Transactions + '/'
                    + _Data.FriendRecommendation + '/'
                    + _Data.CO2Saved;
  

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
        var Parameters = User.Id;

      
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