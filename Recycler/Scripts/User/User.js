var user = {
    UserID: '',
    Username: '',
    Password: '',
    Email: '',
    FirstName: '',
    CompanyName: '',
    Address: '',
    City: '',
    Zip: '',
    State: '',
    Country: '',
    Language: '',
    RoleID: '',
    image: '',
    MailSent: false,
    Phoneno: '',
    Navigate: 'false',
    blnFlag: 'true',
    Error: '',
    MemberShipID: '',
    MemberShipType: '',
    UpdateSubscription: false,
    SubscriptionPaid: false,
    LanguageMailSent: false,
    CountryCode: '',

   
    GetRoles: function () {       
		if(Roles==undefined) return;
        switch (localStorage.Language) {
            case "1":
                $.each(Roles.Danish, function (i) {
                    $('#role').append('<option value="' + Roles.Danish[i].id + '">' + Roles.Danish[i].Value + '</option>');
                });

                $.each(Languages.Danish, function (i) {
                    $('#Languages').append('<option value="' + Languages.Danish[i].id + '">' + Languages.Danish[i].Value + '</option>');
                });

                break;
            case "2":
                $.each(Roles.German, function (i) {
                    $('#role').append('<option value="' + Roles.German[i].id + '">' + Roles.German[i].Value + '</option>');
                });               

                $.each(Languages.German, function (i) {
                    $('#Languages').append('<option value="' + Languages.German[i].id + '">' + Languages.German[i].Value + '</option>');
                });

                break;
            case "3":
                $.each(Roles.English, function (i) {
                    $('#role').append('<option value="' + Roles.English[i].id + '">' + Roles.English[i].Value + '</option>');
                });
             
                $.each(Languages.English, function (i) {
                    $('#Languages').append('<option value="' + Languages.English[i].id + '">' + Languages.English[i].Value + '</option>');
                });

                break;
            case "4":
                $.each(Roles.Spanish, function (i) {
                    $('#role').append('<option value="' + Roles.Spanish[i].id + '">' + Roles.Spanish[i].Value + '</option>');
                });              

                $.each(Languages.Spanish, function (i) {
                    $('#Languages').append('<option value="' + Languages.Spanish[i].id + '">' + Languages.Spanish[i].Value + '</option>');
                });
                break;
        }


        $('#role>option').each(function (i) {
            if ($(this).val() == '0') {
                $('#role').val($(this).val());
                $('#role').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
        $('#country>option').each(function (i) {
            if ($(this).val() == '0') {
                $('#country').val($(this).val());
                $('#country').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
        $('#state>option').each(function (i) {
            if ($(this).val() == '0') {
                $('#state').val($(this).val());
                $('#state').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
        $('#Languages>option').each(function (i) {
            if ($(this).val() == '0') {
                $('#Languages').val($(this).val());
                $('#Languages').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
       
    },


    validateNumeric: function (txtNumeric) {
        var data = document.getElementById(txtNumeric).value;

        var numbers = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
        if (data.match(numbers)) {
            return true;
        }
        else {
            return false;
        }
    },

   
 
    
};

$(document).ready(function () {
    changeLanguage(localStorage.LanguageType);
    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);
    if (localStorage.SubscriptionPaid != undefined && localStorage.SubscriptionPaid != null) {
        var array = localStorage.SubscriptionPaid.split('_');
        User = $.parseJSON(localStorage.User);
        user.UserID = User.Id;
        if (array[2] == '1')
            user.UserRole = '1';
        else
            user.UserRole = '2';
        user.Username = User.UserName;
        user.Password = User.Password;
        user.Email = User.EmailID;
        user.FirstName = User.FirstName;
        user.CompanyName = User.CompanyName;
        user.Address = User.Address;
        user.City = User.City;
        user.Zip = User.Zip;
        user.State = User.State;
        user.Country = User.Country;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                try{
                    $.getJSON('http://ws.geonames.org/countryCode', {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        type: 'JSON',
                        async: false
                    }, 
                    function (result) {
                        user.CountryCode = result.countryCode;
                    }, 
                    function (err) {
                          //                alert(result.countryCode);
                          //                alert(CountryCode["IN"]);
                         console.log(err);
                    });
               }catch(err){console.log(err);}
            });
        }
        else {
            user.CountryCode = user.Country;
        }
        user.Language = User.LanguageID;
        user.Phoneno = User.PhoneNumber;
        user.image = User.Image;
        user.MailSent = User.MailSent;
        user.UpdateSubscription = true;
        user.MemberShipID = array[1];
        alert(user.MemberShipID + ', ' + user.UpdateSubscription);
        user.CreateUser();
    }
    user.LanguageMailSent = false;
    user.GetRoles();
    $("#saveuser").click(function () {
        var data = $.parseJSON(localStorage.User);
        if (data.RoleID == "3") {
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
            }
            else {
                return;
            }
        }
        user.CreateClick();
        if (user.blnFlag) {
            if ($('#Save').attr('disabled') == 'disabled')
                return;
            else
                $('#Save').attr('disabled', 'disabled');
            if (user.UserID == null || user.UserID == "") {
                user.UserID = '0';
            }
            user.UserRole = $("#role option:selected").val();
            user.Username = $("#username_fb").val();
            user.Password = $("#password_fb").val();
            user.Email = $("#email").val();
            user.FirstName = $("#name").val();
            user.CompanyName = $("#companyname").val();
            user.Address = $("#homeadress").val();
            user.City = $("#homecity").val();
            user.Zip = $("#zip").val();
            // user.Country = $("#country").val();
            user.Country = $('#country').val();
            if ((user.CountryCode == '' || user.CountryCode == null) && (user.Country == '' || user.Country == null || user.Country == '0' || user.Country == 0)) {
               
            }
            else {
                user.CountryCode = user.Country;
            }

            if (user.Country == 'US') {
                user.State = $('#state').val();
            }
            else {
                user.State = $("#txtState").val();
            }

            user.Phoneno = $("#phoneno").val();
            
            if ($("#Languages option:selected").val() == null || $("#Languages option:selected").val() == "" || $("#Languages option:selected").val() == '0') {
                user.Language = localStorage.Language;
            }
            else {
                user.Language = $("#Languages option:selected").val();

                // user.Language = $('#Languages').parent().children('span').find('.ui-btn-text').html();
                localStorage.Language = user.Language;
                 console.log((localStorage.Language))
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
            }
            
            if (user.UserRole == "2") {
                $('#Save').removeAttr('disabled');
                if (user.MemberShipID == 'null' || user.MemberShipID == '' || user.MemberShipID == null) {
                    
                    //var Plan = $('#MemberShip').parent().children('span').find('.ui-btn-text').html();
                    var Plan = $('#Plan').text();
                    var message = '';
                    switch (localStorage.Language) {
                        case "1":
                            message = Language.Danish.SupporterYes;
                            break;
                        case "2":
                            message = Language.German.SupporterYes;
                            break;
                        case "3":
                            message = Language.English.SupporterYes;
                            break;
                        case "4":
                            message = Language.Spanish.SupporterYes;
                            break;
                    }

                    if (confirm(message)) {
                        user.UpdateSubscription = true;
                        if (user.SubscriptionPaid) {                         
                            user.CreateUser();
                        }
                        else {                           
                            user.SubscriptionPayment();
                        }
                    }
                    else {
                        return;
                    }
                }
                else {   
                    user.UpdateSubscription = false;
                     user.CreateUser();
                 
                }
            }
            else {              

                if (user.MemberShipID != 'null' && user.MemberShipID != '' && user.MemberShipID != null) {
                    $('#Save').removeAttr('disabled');
                    var message = '';
                    switch (localStorage.Language) {
                        case "1":
                            message = Language.Danish.ChangeMember;
                            break;
                        case "2":
                            message = Language.German.ChangeMember;
                            break;
                        case "3":
                            message = Language.English.ChangeMember;
                            break;
                        case "4":
                            message = Language.Spanish.ChangeMember;
                            break;
                    }

                    if (confirm(message)) {
                        user.UpdateSubscription = false;
                        user.MemberShipID = '';
                        user.CreateUser();
                    }
                    else {
                        return;
                    }
                }
                else {
                    user.UpdateSubscription = false;
                    user.CreateUser();
                }
            }
        }
        else {            
            alert(user.Error);
            user.Error = '';            
        }
    });

    $('#country').change(function () {
        if ($(this).val() == 'US') {
            $('#dvState').css({ 'display': 'block' });
            $('#txtState').css({ 'display': 'none' });
            $('#state').parent().children('span').find('.ui-btn-text').html('State');
        }
        else {
            $('#dvState').css({ 'display': 'none' });
            $('#txtState').css({ 'display': 'block' });
        }
    });


    $('#EmailLanguage').click(function () {
        var blnFlag = true;
        var Error = '';
        if ($("#name").val() == "") {
            blnFlag = false;
            if (user.Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.EnterName;
                        break;
                    case "2":
                        Error = Language.German.EnterName;
                        break;
                    case "3":
                        Error = Language.English.EnterName;
                        break;
                    case "4":
                        Error = Language.Spanish.EnterName;
                        break;
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.EnterName;
                        break;
                    case "2":
                        Error = Error + Language.German.EnterName;
                        break;
                    case "3":
                        Error = Error + Language.English.EnterName;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.EnterName;
                        break;
                }
            }
        }
        if ($("#email").val() == "") {
            blnFlag = false;
            if (user.Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.EnterEmail;
                        break;
                    case "2":
                        Error = Language.German.EnterEmail;
                        break;
                    case "3":
                        Error = Language.English.EnterEmail;
                        break;
                    case "4":
                        Error = Language.Spanish.EnterEmail;
                        break;
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.EnterEmail;
                        break;
                    case "2":
                        Error = Error + Language.German.EnterEmail;
                        break;
                    case "3":
                        Error = Error + Language.English.EnterEmail;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.EnterEmail;
                        break;
                }
            }
        }
        else if (!user.validateEmail('email')) {

            blnFlag = false;
            if (user.Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.EnterEmailV;
                        break;
                    case "2":
                        Error = Language.German.EnterEmailV;
                        break;
                    case "3":
                        Error = Language.English.EnterEmailV;
                        break;
                    case "4":
                        Error = Language.Spanish.EnterEmailV;
                        break;
                }
            }
            else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.EnterEmailV;
                        break;
                    case "2":
                        Error = Error + Language.German.EnterEmailV;
                        break;
                    case "3":
                        Error = Error + Language.English.EnterEmailV;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.EnterEmailV;
                        break;
                }
            }
        }

        if (blnFlag) {
            user.SendEmailLanguage($("#name").val(), $("#email").val());
        }
        else {
            // navigator.notification.alert(Error, '', 'Recycle World', 'OK');
            alert(Error);
        }
    });

   
});  
