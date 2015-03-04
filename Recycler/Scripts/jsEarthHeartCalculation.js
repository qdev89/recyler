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
    if (localStorage.User == null || localStorage.User == undefined)
        app.application.navigate('signup_login.html');
    else
        User = $.parseJSON(localStorage.User);

    var Parameters = User.Id + '/'
                     + _Data.Type + '/'
                     + _Data.DonationAmount + '/'
                     + _Data.Transactions + '/'
                     + _Data.FriendRecommendation + '/'
                     + _Data.CO2Saved;
}

//================================================= GetEarthHeartData ======================================================

function GetEarthHeartData(e) {
    TranslateApp();
    if (localStorage.User == null || localStorage.User == undefined) {
        e.preventDefault();
        app.application.navigate('signup_login.html');
        return;
    } else
        User = $.parseJSON(localStorage.User);

    if (User.UserRole != "2") {
        $('#KarmaUser').hide();
        $('#NoKarmaFreeUser').show();
        return;
    }

    $('#KarmaUser').show();
    $('#NoKarmaFreeUser').hide();

    showLoading();
    app.everlive.Users.get()
        .then(function (data) {
            var users = data.result;
            var data = app.everlive.data('Product');
            data.get().then(function (data) {
                var products = data.result;
                var lengthSupporters = 0;
                var transactions = 0;
                var transactionsLastMonth = 0;

                var monthBefore = new Date();
                monthBefore.setDate(monthBefore.getDate() - 30);

                $.each(products, function (indexP, valueP) {
                    if (valueP.CreatedBy == User.Id && valueP.UserID != valueP.CreatedBy) {
                        log(valueP.CreatedBy, User.Id, valueP.UserID);
                        transactions++;

                        if (new Date(valueP.ModifiedAt) > monthBefore)
                            transactionsLastMonth++
                    }
                });

                console.log("last month", transactionsLastMonth);
                // transactionsLastMonth *= 25;
                var transPercent = transactionsLastMonth * 25;
                if (transPercent > 100)
                    transPercent = 100;

                var img = 'images/EarthImages/' + transPercent + '_percent.jpg';

                $("#HeartStatus").html(transPercent);
                $("#imgHeart img").attr("src", img)

                $.each(users, function (indexU, valueU) {
                    if (valueU.UserRole == "2")
                        lengthSupporters++;
                    valueU.totalCo = 0;
                    $.each(products, function (indexP, valueP) {
                        if (valueU.Id == valueP.CreatedBy && valueU.Id != valueP.UserID) {
                            if (valueP.CO2 != undefined)
                                valueU.totalCo += valueP.CO2;
                        }
                    });
                });

                var ranking = 1;
                var userCo = 0;

                $.each(users, function (indexU, valueU) {
                    if (valueU.Id == User.Id)
                        userCo = valueU.totalCo;
                });

                $.each(users, function (indexU, valueU) {
                    if (valueU.Id != User.Id && valueU.totalCo > userCo)
                        ranking++;
                });

                $("#totalUsers").html(users.length);
                $("#supporters").html(lengthSupporters);
                $("#Position").html(ranking);
                if (User.weight == "kg") {
                    $("#Co2Saved").html(userCo);

                } else {

                    var weightPound = Round2Digit(userCo * 2.2);
                    $("#Co2Saved").html(weightPound);
                    $("#meWeight").html(" pound");
                }
                $("#transactions").html(transactions);
                hideLoading();
            },
            function (error) {
                hideLoading();
                alert(JSON.stringify(error));
            });
        },
        function (error) {
            hideLoading();
            alert(JSON.stringify(error));
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
    } else {
        User = $.parseJSON(localStorage.User);
    }
    var Position = $('#Position').html();
    var Co2 = $('#Co2Saved').html();
    var HeartStatus = $('#HeartStatus').html();

    var Data = '{"Name":"' + User.FirstName + '",' +
               '"HeartStatus":"' + HeartStatus + '",' +
               '"Position":"' + Position + '","Co2":"' + Co2 + '",' +
               '"EmailID": "' + User.EmailID + '",' +
               '"Donation":"' + $('#Donations').html() + '",' +
               '"transactions":"' + $('#transactions').html() + '"}';
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
    } else {
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