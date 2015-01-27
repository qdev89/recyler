var User;

$(document).ready(function () {

/*
    if (localStorage.User == null || localStorage.User == undefined) {

       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
    }*/

   TranslateApp();


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



     
    }


    $('#Friendsemail').val('');
    $('#description').val('');
    $('#phone').val('');
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