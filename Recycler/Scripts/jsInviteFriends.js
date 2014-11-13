var User;

$(document).ready(function () {

/*
    if (localStorage.User == null || localStorage.User == undefined) {

       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
    }*/

    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);



    $('#Invite').click(function () {


        var _blnFlag = true;
        var _ErrorMessage = '';

        if ($('#description').val() == '') {
            _blnFlag = false;

            if (_ErrorMessage == '') {
                switch (localStorage.Language) {
                    case "1":
                        _ErrorMessage = Language.Danish.TextInvite;
                        break;
                    case "2":
                        _ErrorMessage = Language.German.TextInvite;
                        break;
                    case "3":
                        _ErrorMessage = Language.English.TextInvite;
                        break;
                    case "4":
                        _ErrorMessage = Language.Spanish.TextInvite;
                        break;
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        _ErrorMessage = _ErrorMessage + Language.Danish.TextInvite;
                        break;
                    case "2":
                        _ErrorMessage = _ErrorMessage + Language.German.TextInvite;
                        break;
                    case "3":
                        _ErrorMessage = _ErrorMessage + Language.English.TextInvite;
                        break;
                    case "4":
                        _ErrorMessage = _ErrorMessage + Language.Spanish.TextInvite;
                        break;
                }
            }
        }

        if ($('#phone').val() == '' && $('#Friendsemail').val() == '') {
            _blnFlag = false;
            if (_ErrorMessage == '') {
                switch (localStorage.Language) {
                    case "1":
                        _ErrorMessage = Language.Danish.ProvidePhone;
                        break;
                    case "2":
                        _ErrorMessage = Language.German.ProvidePhone;
                        break;
                    case "3":
                        _ErrorMessage = Language.English.ProvidePhone;
                        break;
                    case "4":
                        _ErrorMessage = Language.Spanish.ProvidePhone;
                        break;
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        _ErrorMessage = _ErrorMessage + Language.Danish.ProvidePhone;
                        break;
                    case "2":
                        _ErrorMessage = _ErrorMessage + Language.German.ProvidePhone;
                        break;
                    case "3":
                        _ErrorMessage = _ErrorMessage + Language.English.ProvidePhone;
                        break;
                    case "4":
                        _ErrorMessage = _ErrorMessage + Language.Spanish.ProvidePhone;
                        break;
                }
            }
        }

        if (_blnFlag) {
            InviteFriends();
        }
        else
            alert(_ErrorMessage);

    });


});



function InviteFriends() {
    
    if ($('#phone').val() != '') {


//        if (!validateNumeric('phone')) {
//            switch (localStorage.Language) {
//                case "1":
//                    alert("Please provide a valid phone number");
//                    //alert(Language.Danish.PphoneNum);
//                    break;
//                case "2":
//                    alert("Please provide a valid phone number");
//                    // alert(Language.German.PphoneNum);
//                    break;
//                case "3":
//                    alert("Please provide a valid phone number");
//                    // alert(Language.English.PphoneNum);
//                    break;
//                case "4":
//                    alert("Please provide a valid phone number");
//                    // alert(Language.Spanish.PphoneNum);
//                    break;
//            }
//            return;
//        }

        window.plugins.Sms.sendSMS(function () {


            var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._InviteFriends;
            var Data = '{"UserId":"' + User.Id + '","EmailID":"' + $('#Friendsemail').val() + '","Description":"' + $('#description').val() + '"}';


            $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                'background-color': 'white'
            });
            $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
            $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
            $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });


            jQuery.support.cors = true;
            $.ajax({

                type: "POST",
                url: URLFormed,
                dataType: 'json',
                data: Data,
                contentType: "application/json;charset=utf-8",
                cache: false,
                success: function (Result) {

                    if (Result != null && Result != 'null') {
                        var data = JSON.stringify(Result);
                        data = $.parseJSON(data);
                        if (data.InvitationSent) {

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
                        }
                    }
                },
                error: function (xhr) {
                    Result = null;

                }
            });


        },
                		        function (e) {
                		            alert('Message Failed:' + e);
                		        },
                		        $('#phone').val(),
                		        $('#description').val());

    }

    if ($('#Friendsemail').val() != '') {



        if (!validateEmail('Friendsemail')) {

            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.EnterEmailV);
                    break;
                case "2":
                    alert(Language.German.EnterEmailV);
                    break;
                case "3":
                    alert(Language.English.EnterEmailV);
                    break;
                case "4":
                    alert(Language.Spanish.EnterEmailV);
                    break;
            }
            return;
        }



        var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._InviteFriends;
        var Data = '{"UserId":"' + User.Id + '","EmailID":"' + $('#Friendsemail').val() + '","Description":"' + $('#description').val() + '"}';


        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });


        jQuery.support.cors = true;
        $.ajax({

            type: "POST",
            url: URLFormed,
            dataType: 'json',
            data: Data,
            contentType: "application/json;charset=utf-8",
            cache: false,
            success: function (Result) {

                if (Result != null && Result != 'null') {
                    var data = JSON.stringify(Result);
                    data = $.parseJSON(data);
                    if (data.InvitationSent) {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.InviteSent);
                                break;
                            case "2":
                                alert(Language.German.InviteSent);
                                break;
                            case "3":
                                alert(Language.English.InviteSent);
                                break;
                            case "4":
                                alert(Language.Spanish.InviteSent);
                                break;
                        }
                    }
                    else {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.InviteFail);
                                break;
                            case "2":
                                alert(Language.German.InviteFail);
                                break;
                            case "3":
                                alert(Language.English.InviteFail);
                                break;
                            case "4":
                                alert(Language.Spanish.InviteFail);
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


    $('#Friendsemail').val('');
    $('#description').val('');
    $('#phone').val('');
}




function validateEmail(txtEmail) {

    var a = $.trim(document.getElementById(txtEmail).value);
    // var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
    var filter = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


function validateNumeric(txtNumeric) {
    var data = $.trim(document.getElementById(txtNumeric).value);

    var numbers = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    if (data.match(numbers)) {
        return true;
    }
    else {
        return false;
    }
}