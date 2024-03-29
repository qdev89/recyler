/**
 * Users model
 */
function fillProfileInfo(e) {
    TranslateApp();
    var user;
    if (e.sender.params.self == "true") {
        user = JSON.parse(localStorage.User);
        fillProfileInfoWithUser(user);
    } else if (e.sender.params.userId !== undefined) {
        app.Users.getUserByID(e.sender.params.userId, function (data) {
            fillProfileInfoWithUser(data);
        })
    } else {
        user = app.lastProductOwner;
        fillProfileInfoWithUser(user);
    }
}

function fillProfileInfoWithUser(user) {
    if (!user) return;
    var selector = "#tabstrip-profile-details ";

    if (user.ImageData) {
        //$(selector + "#userPicture").attr("data-src", user.ImageData);
        //everliveImages.responsiveAll();
        $(selector + "#userPicture").attr("src", user.ImageData);
        //everliveImages.responsiveAll();
    }
    else
        $(selector + "#userPicture").attr("src", "images/NoImage.jpg");
    $(selector + ".username").html(user.DisplayName);
    $(selector + ".phone").html(user.PhoneNumber);

    $(selector + ".email").html(user.Email);
    $(selector + ".address").html(user.AddressLine1);
    $(selector + ".city").html(user.City);
    $(selector + ".state").html(user.State);

    $(selector + "#fbLink").attr("link", user.Facebook).addClass("link");
    $(selector + "#twitterLink").attr("link", user.Twitter).addClass("link");
    $(selector + "#webLink").attr("link", user.Web).addClass("link");
    $(selector + "#email_send").attr("link", "mailto:" + user.Email).addClass("link");
    $(selector + "#phone_num").attr("href", "tel:+" + user.PhoneNumber);
    $(selector + "#sms_num").attr("href", "sms:" + user.PhoneNumber);
}

var app = app || {};

app.Users = (function () {
    'use strict';

    var getUserByID = function (id, callback) {

        app.everlive.Users.getById(id)
            .then(function (data) {
                console.log(data)
                callback(data.result);
            },
            function (error) {
                alert(JSON.stringify(error));
            });
    }


    var usersModel = (function () {

        var currentUser = kendo.observable({ data: null });
        var usersData;

        // Retrieve current user and all users data from Backend Services
        var loadUsers = function () {

            // Get the data about the currently logged in user
            return app.everlive.Users.currentUser()
            .then(function (data) {

                var currentUserData = data.result;
                //  currentUserData.PictureUrl = app.helper.resolveProfilePictureUrl(currentUserData.Picture);
                currentUser.set('data', currentUserData);

                // Get the data about all registered users
                return app.everlive.Users.get();
            })
            .then(function (data) {

                usersData = new kendo.data.ObservableArray(data.result);
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };
        var GetRoles = function () {

            if (Roles == undefined) return;
            if (localStorage.Language && localStorage.Language !== null && localStorage.Language != 'null') {
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
            } else {
                $.each(Roles.English, function (i) {
                    $('#role').append('<option value="' + Roles.English[i].id + '">' + Roles.English[i].Value + '</option>');
                });

                $.each(Languages.English, function (i) {
                    $('#Languages').append('<option value="' + Languages.English[i].id + '">' + Languages.English[i].Value + '</option>');
                });
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

        }

        return {
            getUserByID: getUserByID,
            load: loadUsers,
            users: function () {
                return usersData;
            },
            currentUser: currentUser,
            GetRoles: GetRoles,
        };

    }());

    return usersModel;

}());


function LoadAllUsers() {
    TranslateApp();
    //  var myId = JSON.parse(localStorage.User).Id;
    var listID = "#ulAllUsers";
    var templateID = "#userTemplate";
    //  var tabstripId = "#users-tabstrip";


    var skip = 0;
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                showLoading();
                try {
                    app.everlive.Users.get()
                    .then(function (data) {
                        var users = data.result;
                        log(users);
                        options.success(users);
                        hideLoading();
                    },
                    function (error) {
                        hideLoading();
                        alert(JSON.stringify(error));
                    });

                } catch (err) {
                    hideLoading();
                    console.log(err);
                }
            }
        },
        error: function (e) {
            hideLoading();
            if (typeof (e.errorThrown) !== "undefined" && e.errorThrown == "Unauthorized")
                app.application.navigate("index.html");
            else
                displayErrorAlert();
        },
        schema: {        // describe the result format
            parse: function (response) {
                console.log(response);
                response = $.grep(response, function (el, i) {
                    if (el.Id == userData.Id) return false;

                    if (el.ImageData === undefined)
                        el.ImageData = "images/imageplaceholder.png";
                    if (el.DisplayName == undefined)
                        el.DisplayName = "";
                    if (el.PhoneNumber == undefined)
                        el.PhoneNumber = "";

                    return true;

                });
                return response;
            }

        }

    });

    $(listID).kendoMobileListView({
        dataSource: dataSource,
        template: $(templateID).html()

    });

    //   var listView = $(listID).data("kendoMobileListView");
    /* if ( listView != null) {
        listView._scrollerInstance.scrollElement.on("touchend", function() {
             if (loadMore) {
                 if ($(listID).height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))                         
                   listView.dataSource.read();
             }       
         });    			
        listView._scrollerInstance.scrollTo(0, 0);    
     }*/
}


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

        if (Roles == undefined) return;
        if (localStorage.Language && localStorage.Language !== null && localStorage.Language != 'null') {
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
        } else {
            $.each(Roles.English, function (i) {
                $('#role').append('<option value="' + Roles.English[i].id + '">' + Roles.English[i].Value + '</option>');
            });

            $.each(Languages.English, function (i) {
                $('#Languages').append('<option value="' + Languages.English[i].id + '">' + Languages.English[i].Value + '</option>');
            });
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
    }

};

$(document).ready(function () {
    changeLanguage(localStorage.LanguageType);
    TranslateApp();

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
                try {
                    $.getJSON('http://ws.geonames.org/countryCode', {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        username: 'Recycle',
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
                } catch (err) { console.log(err); }
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
    //user.GetRoles();
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

            user.Facebook = $("#facebookaddress").val();
            user.Twitter = $("#twitteraddress").val();
            user.Web = $("#wwwaddress").val();
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
                console.log((localStorage.Language));
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

function saveUserData() {
    debugger;
    if (userData.IdentityProvider != "Facebook" && !validateEmail($("#email").val())) {
        navigator.notification.alert("You should fill a valid email!", null, "");
        return;
    }

    if ($("#email").val() == "" || $("#name").val() == "" || $("#phoneno").val() == "" || $("#country").val() == "0") {
        navigator.notification.alert("All mandatory fields are required!", null, "");
        return;
    }

    var base64 = $("#avatarImage").attr("src");
    var ImageData = userData.ImageData;


    if (base64 != "images/imageplaceholder.png" && base64.indexOf("data:image/jpeg;base64,") != -1) {

        var file = {
            "Filename": "userPicture.jpeg",
            "ContentType": "image/jpeg",
            "CustomField": "customValue",
            "base64": base64.replace("data:image/jpeg;base64,", "")
        };

        app.everlive.Files.create(file,
                                  function (data) {

                                      //console.log(data);

                                      ImageData = data.result.Uri;

                                      var users = app.everlive.data('Users');
                                      users.update({
                                          'ImageData': ImageData
                                      }, // data
                                                  { 'Id': userData.Id }, // filter
                                                  function (data) {
                                                      //  console.log(data);
                                                      //navigator.notification.alert("Info saved successfully!", null, "Success");
                                                  },
                                                  function (error) {
                                                      alert(JSON.stringify(error));
                                                  });
                                  },
                                  function (error) {
                                      alert(JSON.stringify(error));
                                  });
    } else {
        ImageData = $("#avatarImage").attr("src");
    }



    var mail = false;
    if (userData.UserRole != 2 && $("#role").val() == 2) {
        mail = true;
    }
    var data = app.everlive.data('Users');

    //data.update({
    //    'UserRole': 2,
    //    'StartedSupporterTime': moment(),
    //    'ExpireSupporterTime': moment().days(30),
    //    'SupporterType': 30,

    //}, // data
    //            { 'Id': app.currentUser.Id }, // filter
    //            function (data) {

    //            },
    //            function (error) {
    //                alert(JSON.stringify(error));
    //            });
    data.update({
        'UserRole': $("#role").val(),
        'ImageData': ImageData,
        'Email': $("#email").val(),
        'DisplayName': $("#name").val(),
        'PhoneNumber': $("#phoneno").val(),
        'CompanyName': $("#companyname").val(),
        'Zip': $("#zip").val(),
        'AddressLine1': $("#homeadress").val(),
        'City': $("#homecity").val(),
        'Country': $("#country").val(),
        'State': $("#txtState").val(),
        'LanguageID': $("#Languages").val(),
        "Facebook": $("#facebookaddress").val(),
        "Twitter": $("#twitteraddress").val(),
        "Web": $("#wwwaddress").val(),
        "weight": $("#weight").val(),
        "distance": $("#distance").val(),
        "brigade": $("#brigade").is(":checked"),
        "onlycountry": $("#onlycountry").is(":checked"),
        "onlycity": $("#onlycity").is(":checked"),
        "cityGeo": user.cityGeo

    }, // data
                { 'Id': userData.Id }, // filter
                function (data) {
                    //console.log(data);
                    //navigator.notification.alert("Info saved successfully! Changes will take effect when you login next time.", null, "Success");

                    if (mail) {
                        sendMail(emailTemplates.thankYou, [userData.Email], { "appName": emailTemplates.DefaultFromName, "DefaultFromName": emailTemplates.DefaultFromName, "userName": $("#name").val(), "FromEmail": emailTemplates.FromEmail });

                        app.Login.login(app.Username, app.password, true);

                        //app.application.navigate("membership.html");
                    }
                    if (userData.IdentityProvider != "Facebook") {
                        app.Login.login(app.Username, app.password);
                    } else {
                        app.Login.repopulateUserAfterSave();
                    }
                },
                function (error) {
                    alert(JSON.stringify(error));
                });
}

function fillUserData(user) {
    userData = user;
    //alert(JSON.stringify(user));
    if (user.ImageData != "" && user.ImageData != undefined)
        $("#avatarImage").attr("src", user.ImageData);

    if (user.Email != undefined) {
        $("#email").val(user.Email);
        $("#email").prop("disabled", true);
    }
    else $("#email").prop("disabled", false);

    if (user.UserRole != undefined)
        $("#role").val(user.UserRole);

    if (user.UserRole == "2") {
        $("#isSupporter").attr("src", "images/supporter.png");
    } else {
        $("#isSupporter").attr("src", "images/notsupporter.png");
    }

    if (user.brigade != undefined)
        $("#brigade").val(user.brigade);

    if (user.brigade == "Yes") {
        $("#brigade").attr("src", "images/profilbut/terrabut.jpg");
    } else {
        $("#brigade").attr("src", "images/profilbut/no_terrabut.jpg");
    }

    if (user.DisplayName != undefined)
        $("#name").val(user.DisplayName);

    if (user.PhoneNumber != undefined)
        $("#phoneno").val(user.PhoneNumber);

    if (user.CompanyName != undefined)
        $("#companyname").val(user.CompanyName);

    if (user.Zip != undefined)
        $("#zip").val(user.Zip);

    if (user.AddressLine1 != undefined)
        $("#homeadress").val(user.AddressLine1);

    if (user.City != undefined)
        $("#homecity").val(user.City);

    if (user.Country != undefined)
        $("#country").val(user.Country);

    if (user.State != undefined)
        $("#txtState").val(user.State);

    if (user.LanguageID != undefined)
        $("#Languages").val(user.LanguageID);

    if (user.Facebook != undefined)
        $("#facebookaddress").val(user.Facebook);

    if (user.Twitter != undefined)
        $("#twitteraddress").val(user.Twitter);

    if (user.Web != undefined)
        $("#wwwaddress").val(user.Web);

    if (user.weight != undefined)
        $("#weight").val(user.weight);

    if (user.distance != undefined)
        $("#distance").val(user.distance);

    if (user.brigade != undefined)
        $("#brigade").prop("checked", user.brigade);

    if (user.onlycountry != undefined)
        $("#onlycountry").prop("checked", user.onlycountry);

    if (user.onlycity != undefined)
        $("#onlycity").prop("checked", user.onlycity);

    if ((user.ImageData == "" || user.ImageData === undefined) && user.IdentityProvider == "Facebook") {
        //$("#avatarImage").attr("src", user.ImageData);
        if (!checkFacebookSimulator()) {
            facebookConnectPlugin.login(
  ["email"], // array of permissions
  function (response) {
      if (response.status === "connected") {
          facebookConnectPlugin.api(
                           "me/?fields=picture", // graph path
                           [], // array of additional permissions
                           function (response) {
                               if (response.error) {
                                   alert("Facebook API error! " + JSON.stringify(response.error));
                               } else {
                                   //alert(JSON.stringify(response));
                                   $("#avatarImage").attr("src", response.picture.data.url);
                               }
                           });
      } else {
          console.log("You are not logged in");
      }
  });



        }
    }
}

function emptyUserInfo() {
    $("#avatarImage").attr("src", 'images/imageplaceholder.png');

    $("#email").val('');
    $("#email").prop("disabled", false);

    //$("#role").val('');

    $("#isSupporter").attr("src", "images/notsupporter.png");


    $("#brigade").val('');

    $("#name").val('');

    $("#phoneno").val("");

    $("#companyname").val("");

    $("#zip").val();

    $("#homeadress").val('');

    $("#homecity").val('');

    $("#country").val('0');

    $("#txtState").val('');

    //$("#Languages").val('');

    $("#facebookaddress").val('');

    $("#twitteraddress").val('');

    $("#wwwaddress").val('');

    $("#weight").val('');

    $("#distance").val("");

    $("#brigade").prop("checked", false);

    $("#onlycountry").prop("checked", false);

    $("#onlycity").prop("checked", false);
}

function loadBasicSetup(e) {
    window.utility.resetScroller(e);
    TranslateApp();
}

function setupInit() {
  app.Users.GetRoles();
    $("#EmailLanguage").on("click", function () {
        var url = $(this).attr("link");
        if (url !== undefined && url !== "undefined") {
            window.open(url, '_blank', 'location=yes');
        }

    });
    emptyUserInfo();
    //if (localStorage.User == undefined) {
    app.everlive.Users.currentUser(
        function (data) {
            console.log(data.result);

            localStorage.User = JSON.stringify(data.result);
            fillUserData(data.result);
        });
    //} else
    //    fillUserData(JSON.parse(localStorage.User));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            try {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {

                    var city = "";
                    var street = "";
                    var route = "";
                    var country = "";
                    var zip = "";
                    if (status == google.maps.GeocoderStatus.OK) {
                        // get city, postal code, country

                        if (results[1]) {
                            city = getLocalFromGPS(results, "administrative_area_level_1", "administrative_area_level_2");
                            street = getLocalFromGPS(results, "street_number");
                            route = getLocalFromGPS(results, "route");
                            country = getLocalFromGPS(results, "country");
                            zip = getLocalFromGPS(results, "postal_code");
                        }
                    }

                    debugger;
                    user = app.Users.currentUser.data;
                    if (user.City === undefined || user.City == '') {
                        user.cityGeo = city;
                        user.City = city;
                        $("#homecity").val(user.City);
                    }

                    if (user.Zip === undefined || user.Zip == '') {
                        user.Zip = zip;
                        $("#zip").val(user.Zip);
                    }

                    if (user.AddressLine1 === undefined || user.AddressLine1 == '') {
                        user.AddressLine1 = street + ", " + route;
                        $("#homeadress").val(user.AddressLine1);
                    }

                    if (user.Country === undefined || user.Country == '') {
                        user.Country = country;
                        $("#country").val(user.Country);

                        //$("#country option[text=" + user.Country + "]").attr("selected", "selected");

                        $("#country option").filter(function () {
                            return this.text == user.Country;
                        }).attr('selected', true);
                    }
                });

                $.getJSON('http://ws.geonames.org/countryCode', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    type: 'JSON',
                    username: 'Recycle',
                    async: false
                }, function (result) {
                    //                alert(result.countryCode);
                    //                alert(CountryCode["IN"]);
                    user.CountryCode = result.countryCode;
                }, function (err) {
                    //                alert(result.countryCode);
                    //                alert(CountryCode["IN"]);
                    console.log(err);
                }

                    );
            } catch (err) { console.log(err); }
        });
    }
}

function getLocalFromGPS(results, level1, level2) {
    var hasLevel1AdminArea = false;
    var value = "";
    //find city name
    for (var i = 0; i < results[0].address_components.length; i++) {
        for (var b = 0; b < results[0].address_components[i].types.length; b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (results[0].address_components[i].types[b] == level1) {
                //this is the object you are looking for
                value = results[0].address_components[i].long_name;
                hasLevel1AdminArea = true;
                break;
            }
        }
    }

    if (level2) {
        if (!hasLevel1AdminArea) {
            for (var i = 0; i < results[0].address_components.length; i++) {
                for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == level2) {
                        //this is the object you are looking for
                        value = results[0].address_components[i].long_name;
                        break;
                    }
                }
            }
        }

    }

    return value;
}

function isUserLogged() {

    if (localStorage.Username !== undefined && localStorage.Password !== undefined) return true;
    else return false;

}

function removeLocalStorageUser() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Password");
    localStorage.removeItem("User");
}

function autoLogin() {
    if (isUserLogged()) {
        app.Username = localStorage.Username;
        app.password = localStorage.Password;
        if (app.Login !== undefined && app.Login.login !== undefined) {
            debugger;
            app.Login.login(localStorage.Username, localStorage.Password);
        }
    }
}


function logoutUser() {

    if (localStorage.User == undefined) return false;
    app.everlive.Users.logout(function (d) { console.log(d) });
    removeLocalStorageUser();
    app.application.navigate("signup_login.html");

}

function deleteUser() {
    navigator.notification.confirm("Are you sure you want to delete your profile?",
           function (button) {
               if (button == 1) {
                   app.everlive.Users.destroySingle({ Id: userData.Id },
                                                    function () {
                                                        alert('User successfully deleted.');
                                                        localStorage.removeItem("User");
                                                        app.application.navigate("signup_login.html");
                                                    },
                                                    function (error) {
                                                        alert(JSON.stringify(error));
                                                    });
               }
           },
           'Delete account',
           ['Delete', 'Cancel']);
}

function isLogged() {
    if ((window.User == undefined || window.User == null) && localStorage.User == undefined) {
        app.application.navigate("signup_login.html");
        return false;
    } else if (window.User == undefined || window.User == null)
        window.User = JSON.parse(localStorage.User);

    return true;
}
