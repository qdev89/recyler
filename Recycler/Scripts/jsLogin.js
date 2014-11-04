var LoggedIn = false;
var Login = new Object();

Login.LoginDetails = {
    FacebookId: null,
    Username: null,
    Password: null,
    RoleID: '',
    LangaugeID: ''
}

function GetLoginDetails(_LoginDetails) {

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

    var URLFormed = Service.dataServiceURL + Service.ServiceName._LoginService + '/' + Service.ServiceMethods._Login;
    jQuery.support.cors = true;

    $.ajax({

        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: '{"FacebookId":"' + _LoginDetails.FacebookId + '","UserName":"' + _LoginDetails.Username + '","Password":"' + _LoginDetails.Password + '"}',
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: function (Result) {
          
            $('#Login').removeAttr('disabled');
           
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
        
                if (data.UserExists == true || data.UserExists == 'true') {
                    if (data.User == null || data.User == 'null') {
                        switch (localStorage.Language) {
                            case "1":
                                navigator.notification.alert(Language.Danish.PassWrong, '', 'Recycle World', 'OK');
                                break;
                            case "2":
                                navigator.notification.alert(Language.German.PassWrong, '', 'Recycle World', 'OK');
                                break;
                            case "3":
                                navigator.notification.alert(Language.English.PassWrong, '', 'Recycle World', 'OK');
                                break;
                            case "4":
                                navigator.notification.alert(Language.Spanish.PassWrong, '', 'Recycle World', 'OK');
                                break;
                        }
                        $('#Password').val('');
                    }
                    else {
                        localStorage.User = JSON.stringify(data.User);
                        LoggedIn = true;
                        User = $.parseJSON(localStorage.User);

                        localStorage.Language = User.LanguageID;

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

                        window.localStorage.removeItem('CacheItem');
                        //  $("#LoadingDiv").css({ "display": "none" });

                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.WelcomeMessage);
                                break;
                            case "2":
                                alert(Language.German.WelcomeMessage);
                                break;
                            case "3":
                                alert(Language.English.WelcomeMessage);
                                break;
                            case "4":
                                alert(Language.Spanish.WelcomeMessage);
                                break;
                        }

                        if (data.User.PhoneNumber != '') {
                            app.application.navigate("index.html");
                        }
                        else {
                           app.application.navigate("basic_setup.html");
                        }
                    }
                }
                else {
                   
                    if (_LoginDetails.FacebookId != null) {
                        CreateNewUser(_LoginDetails);
                    }
                    else {
                        var message = '';

                        switch (localStorage.Language) {
                            case "1":
                                message = Language.Danish.Welcome;
                                break;
                            case "2":
                                message = Language.German.Welcome;
                                break;
                            case "3":
                                message = Language.English.Welcome;
                                break;
                            case "4":
                                message = Language.Spanish.Welcome;
                                break;
                        }                 

                        if (confirm(message)) {
                            CreateNewUser(_LoginDetails);
                        }
                    }
                }
            }


        },
        error: function (xhr) {
            
            $('#Login').removeAttr('disabled');
          
            Result = null;
            switch (localStorage.Language) {
                case "1":
                    navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "2":
                    navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "3":
                    navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "4":
                    navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                    break;
            }
        }
    });


}

function CreateNewUser(_Details) {
    
    var Data = '{"UserID": "",' +
                   '"RoleID":"' + _Details.RoleID + '",' +
                   '"Username":"",' +
                   '"Password":"' + _Details.Password + '",' +
                   '"Email":"' + _Details.Username + '",' +
                   '"FirstName":"",' +
                   '"CompanyName":"",' +
                   '"Address":"",' +
                   '"City":"",' +
                    '"Zip":"",' +
                   '"State":"",' +
                   '"Country":"",' +
                   '"LanguageID":"' + _Details.LangaugeID + '",' +
                   '"ImageData":"",' +
                   '"FacebookID":"' + _Details.FacebookId + '"}';

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._CreateUser;
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

                if (data.UserCreated == true || data.UserCreated == 'true') {
                    localStorage.User = JSON.stringify(data);
                    if (_Details.FacebookId == null)
                        switch (localStorage.Language) {
                        case "1":
                            navigator.notification.alert(Language.Danish.OkMember, '', 'Recycle World', 'OK');
                            break;
                        case "2":
                            navigator.notification.alert(Language.German.OkMember, '', 'Recycle World', 'OK');
                            break;
                        case "3":
                            navigator.notification.alert(Language.English.OkMember, '', 'Recycle World', 'OK');
                            break;
                        case "4":
                            navigator.notification.alert(Language.Spanish.OkMember, '', 'Recycle World', 'OK');
                            break;
                    }
                    else
                        switch (localStorage.Language) {
                        case "1":
                            navigator.notification.alert(Language.Danish.Welcome1, '', 'Recycle World', 'OK');
                            break;
                        case "2":
                            navigator.notification.alert(Language.German.Welcome1, '', 'Recycle World', 'OK');
                            break;
                        case "3":
                            navigator.notification.alert(Language.English.Welcome1, '', 'Recycle World', 'OK');
                            break;
                        case "4":
                            navigator.notification.alert(Language.Spanish.Welcome1, '', 'Recycle World', 'OK');
                            break;
                    }
                    //  alert('You are now registered with recycleworld - remember to fill in your additonal data under settings');

                    if (localStorage.CacheItem != undefined && localStorage.CacheItem != '') {
                        Item = $.parseJSON(localStorage.CacheItem);
                        app.application.navigate(Item.NavigateURL);
                    }

                    app.application.navigate("basic_setup.html");
                }
                else {
                    $('#Login').removeAttr('disabled');
                    switch (localStorage.Language) {
                        case "1":
                            navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                            break;
                        case "2":
                            navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                            break;
                        case "3":
                            navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                            break;
                        case "4":
                            navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                            break;
                    }
               }
            }
            else {
                $('#Login').removeAttr('disabled');
                switch (localStorage.Language) {
                    case "1":
                        navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "2":
                        navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "3":
                        navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "4":
                        navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                        break;
                }              
            }

        },
        error: function (xhr) {
            $('#Login').removeAttr('disabled');
            Result = null;
            switch (localStorage.Language) {
                case "1":
                    navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "2":
                    navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "3":
                    navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "4":
                    navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                    break;
            }     
        }
    });
}

function GetAllLanguages() {
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetLanguages;
    jQuery.support.cors = true;
    $.ajax({

        type: "GET",
        url: URLFormed,
        dataType: 'json',
        data: '{}',
        cache: false,
        success: function (Result) {
            $('#ddlCountry').html('');
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                $('#ddlCountry').append('<option value="0">Language</option>');
               
                $.each(data, function (i) {

                    $('#ddlCountry').append('<option value="' + data[i].ID + '">' + data[i].LanguageType + '</option>');

                });

                $('#ddlCountry>option').each(function (i) {
                    if ($(this).val() == '3') {
                        $('#ddlCountry').val($(this).val());
                        $('#ddlCountry').parent().children('span').find('.ui-btn-text').html($(this).html());
                        return;
                    }
                });
            }
        },
        error: function (xhr) {
            Result = null;
            localStorage.Language = 3;
            navigator.notification.alert('Recycle world can not retrieve languages right now! your default language would be english', '', 'Recycle World', 'OK');

        }
    });
}

function CreateUserWithRecycleWorld() {
    
    var Flag = true;
    var ErrorMessage = '';
    if ($.trim($('#email').val()) == '') {
        Flag = false;
        if (ErrorMessage == '') {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = Language.Danish.PPUsernama;
                    break;
                case "2":
                    ErrorMessage = Language.German.PPUsernama;
                    break;
                case "3":
                    ErrorMessage = Language.English.PPUsernama;
                    break;
                case "4":
                    ErrorMessage = Language.Spanish.PPUsernama;
                    break;
            }

        }
        else {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = ErrorMessage + Language.Danish.PPUsernama;
                    break;
                case "2":
                    ErrorMessage = ErrorMessage + Language.German.PPUsernama;
                    break;
                case "3":
                    ErrorMessage = ErrorMessage + Language.English.PPUsernama;
                    break;
                case "4":
                    ErrorMessage = ErrorMessage + Language.Spanish.PPUsernama;
                    break;
            }
        }
    }
    else if (!validateEmail('email')) {

        Flag = false;
        if (ErrorMessage == '') {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = Language.Danish.EnterEmailV;
                    break;
                case "2":
                    ErrorMessage = Language.German.EnterEmailV;
                    break;
                case "3":
                    ErrorMessage = Language.English.EnterEmailV;
                    break;
                case "4":
                    ErrorMessage = Language.Spanish.EnterEmailV;
                    break;
            }
        }
        else {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = ErrorMessage + Language.Danish.EnterEmailV;
                    break;
                case "2":
                    ErrorMessage = ErrorMessage + Language.German.EnterEmailV;
                    break;
                case "3":
                    ErrorMessage = ErrorMessage + Language.English.EnterEmailV;
                    break;
                case "4":
                    ErrorMessage = ErrorMessage + Language.Spanish.EnterEmailV;
                    break;
            }
        }
    }
    else {
        Login.LoginDetails.Username = $.trim($('#email').val());
    }


    if ($.trim($('#Password').val()) == '') {
        Flag = false;
        if (ErrorMessage == '') {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = Language.Danish.PPPassword;
                    break;
                case "2":
                    ErrorMessage = Language.German.PPPassword;
                    break;
                case "3":
                    ErrorMessage = Language.English.PPPassword;
                    break;
                case "4":
                    ErrorMessage = Language.Spanish.PPPassword;
                    break;
            }
        }
        else {
            switch (localStorage.Language) {
                case "1":
                    ErrorMessage = ErrorMessage + Language.Danish.PPPassword;
                    break;
                case "2":
                    ErrorMessage = ErrorMessage + Language.German.PPPassword;
                    break;
                case "3":
                    ErrorMessage = ErrorMessage + Language.English.PPPassword;
                    break;
                case "4":
                    ErrorMessage = ErrorMessage + Language.Spanish.PPPassword;
                    break;
            }
        }
    }
    else {
        Login.LoginDetails.Password = $.trim($('#Password').val());
    }

    if ($('#Login').attr('disabled') == 'disabled')
        return;
    else
        $(this).attr('disabled', 'disabled');

    if (Flag) {
        $('#Login').attr('disabled', 'disabled');
        GetLoginDetails(Login.LoginDetails);
    }
    else {
       navigator.notification.alert(ErrorMessage, '', 'Recycle World', 'OK');
       //alert(ErrorMessage);
    }
}

function CreateGuestUser() {
    var User = '{"UserID":"",' +
                           '"Name":"",' +
                           '"FirstName":"",' +
                           '"UserName":"",' +
                           '"Password":"",' +
                           '"Address":"",' +
                           '"City":"",' +
                           '"Country":"",' +
                           '"Zip":"",' +
                           '"State":"",' +
                           '"PhoneNumber":"",' +
                           '"EmailID":"",' +
                           '"RoleID":"3",' +
                           '"FacebookID":"",' +
                           '"CompanyName":"",' +
                           '"LanguageID":"",' +
                           '"Image":""' +
                           '}';
    localStorage.User = User;
}


function validateEmail(txtEmail) {

    var a = $.trim(document.getElementById(txtEmail).value);
    // var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
    var filter = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


function recoverPassword() {   

    if ($.trim($('#email').val()) == '') {
        switch (localStorage.Language) {
            case "1":
                navigator.notification.alert(Language.Danish.EnterEmail, '', 'Recycle World', 'OK');
                break;
            case "2":
                navigator.notification.alert(Language.German.EnterEmail, '', 'Recycle World', 'OK');
                break;
            case "3":
                navigator.notification.alert(Language.English.EnterEmail, '', 'Recycle World', 'OK');
                break;
            case "4":
                navigator.notification.alert(Language.Spanish.EnterEmail, '', 'Recycle World', 'OK');
                break;
        }
        $('#email').focus();
        return;
    }

    if (!validateEmail('email')) {
        
            switch (localStorage.Language) {
                case "1":
                    navigator.notification.alert(Language.Danish.EnterEmailV, '', 'Recycle World', 'OK');
                    break;
                case "2":
                    navigator.notification.alert(Language.German.EnterEmailV, '', 'Recycle World', 'OK');
                    break;
                case "3":
                    navigator.notification.alert(Language.English.EnterEmailV, '', 'Recycle World', 'OK');
                    break;
                case "4":
                    navigator.notification.alert(Language.Spanish.EnterEmailV, '', 'Recycle World', 'OK');
                    break;
            }
            $('#email').focus();
            return;  
    }
    
    var Parameters = $.trim($('#email').val());
    var URLFormed = Service.dataServiceURL + Service.ServiceName._LoginService + '/' + Service.ServiceMethods._ForgetPassword;
    jQuery.support.cors = true;

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
        data: '{"Email":"' + Parameters + '"}',
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: function (Result) {
            
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                if (data.UserExists) {

                    $('#LoadingDiv,#Load').hide();
                    if (data.PhoneNumber != '' && data.PhoneNumber != 'null' && data.PhoneNumber != null) {
                 

                        var Message = '';
                        switch (localStorage.Language) {
                            case "1":
                                Message = Language.Danish.PasswordSent;
                                break;
                            case "2":
                                Message = Language.German.PasswordSent;
                                break;
                            case "3":
                                Message = Language.English.PasswordSent;
                                break;
                            case "4":
                                Message = Language.Spanish.PasswordSent;
                                break;
                        }            

                        var messageBody = '';
                        switch (localStorage.Language) {
                            case "1":
                                messageBody = Language.Danish.Pmessage;
                                break;
                            case "2":
                                messageBody = Language.German.Pmessage;
                                break;
                            case "3":
                                messageBody = Language.English.Pmessage;
                                break;
                            case "4":
                                messageBody = Language.Spanish.Pmessage;
                                break;
                        }                   

                        window.plugins.Sms.sendSMS(function () {
                            switch (localStorage.Language) {
                                case "1":
                                    navigator.notification.alert(Language.Danish.PasswordSent, '', 'Recycle World', 'OK');
                                    break;
                                case "2":
                                    navigator.notification.alert(Language.German.PasswordSent, '', 'Recycle World', 'OK');
                                    break;
                                case "3":
                                    navigator.notification.alert(Language.English.PasswordSent, '', 'Recycle World', 'OK');
                                    break;
                                case "4":
                                    navigator.notification.alert(Language.Spanish.PasswordSent, '', 'Recycle World', 'OK');
                                    break;
                            }

                            return;
                        },
                		        function (e) {
                		            alert('Message Failed:' + e);
                		        },
                		        data.PhoneNumber,
                		        messageBody + data.Password);
                    }
                    else {
                        switch (localStorage.Language) {
                            case "1":
                                navigator.notification.alert(Language.Danish.NoNumber + $('#email').val(), '', 'Recycle World', 'OK');
                                break;
                            case "2":
                                navigator.notification.alert(Language.German.NoNumber + $('#email').val(), '', 'Recycle World', 'OK');
                                break;
                            case "3":
                                navigator.notification.alert(Language.English.NoNumber + $('#email').val(), '', 'Recycle World', 'OK');
                                break;
                            case "4":
                                navigator.notification.alert(Language.Spanish.NoNumber + $('#email').val(), '', 'Recycle World', 'OK');
                                break;
                        }
                    }
                }
                else {
                    switch (localStorage.Language) {
                        case "1":
                            navigator.notification.alert(Language.Danish.NoUser + $('#email').val() + Language.Danish.NoRecords, '', 'Recycle World', 'OK');
                            break;
                        case "2":
                            navigator.notification.alert(Language.German.NoUser + $('#email').val() + Language.German.NoRecords, '', 'Recycle World', 'OK');
                            break;
                        case "3":
                            navigator.notification.alert(Language.English.NoUser + $('#email').val() + Language.English.NoRecords, '', 'Recycle World', 'OK');
                            break;
                        case "4":
                            navigator.notification.alert(Language.Spanish.NoUser + $('#email').val() + Language.Spanish.NoRecords, '', 'Recycle World', 'OK');
                            break;
                    }
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "2":
                        navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "3":
                        navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                        break;
                    case "4":
                        navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                        break;
                }
            }
        },
        error: function (xhr) {
            Result = null;
            switch (localStorage.Language) {
                case "1":
                    navigator.notification.alert(Language.Danish.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "2":
                    navigator.notification.alert(Language.German.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "3":
                    navigator.notification.alert(Language.English.Ptry, '', 'Recycle World', 'OK');
                    break;
                case "4":
                    navigator.notification.alert(Language.Spanish.Ptry, '', 'Recycle World', 'OK');
                    break;
            }
        }
    });
}


/*$(document).ready(function () {


    $('#email').focus();

    if (localStorage.Language == undefined && localStorage.Language == null || localStorage.Language == 0) {

        localStorage.Language = "3";
        localStorage.LanguageType = "en";
        GetAllLanguages();
    }
    else {
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
        //$("[data-localize]").localize("Recycle", opts);

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
            //$("[data-localize]").localize("Recycle", opts);
        }
        else {

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
            }
            else if ($('#RecycleLogin').is(':checked')) {
                Login.LoginDetails.FacebookId = null;
                // localStorage.FaceBookObject = null;
                Login.LoginDetails.LangaugeID = localStorage.Language;
                Login.LoginDetails.RoleID = 1;
                CreateUserWithRecycleWorld();
            }
        }
        else {

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
        }
        else {
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
        }
        else {

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


});*/



function CheckConnection() {

   if(navigator.connection==undefined) return true;
    var networkState = navigator.connection.type;  
		console.log(networkState);
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';
    
    if (networkState == null || networkState == 'none') {

        return false;
    }

    return true;
}