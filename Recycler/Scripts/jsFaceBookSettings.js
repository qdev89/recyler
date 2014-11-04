var User;

$(document).ready(function () {


    FB.init({ appId: "313796158728708", nativeInterface: CDV.FB, useCachedDialogs: false });

    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {

        } else {
            $('#changeGroup').find('label').text('Login to FB to get groups');
        }
    });  


    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);


    /*if (localStorage.User == null || localStorage.User == undefined) {

       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
         GetfacebookSettings(User);
    }*/

   



    $('#SaveSettings').click(function () {
        
        if (User.SettingsID == undefined || User.SettingsID == '') {
            User.SettingsID = '0';
        }

        var Data = '{ "SettingsID" : "' + User.SettingsID + '",' +
                   '"UserID":"' + User.UserID + '",';

        if ($('#ddlGroups option:selected').val() != '0') {
            Data = Data + '"GroupID" : "' + $('#ddlGroups option:selected').val() + '" ,' +
                          '"GroupName" : "' + $('#ddlGroups').parent().children('span').find('.ui-btn-text').html() + '" ,';
        }
        else {
            if (User.GroupID != '' && User.GroupID != null && User.GroupID != 'null') {
                Data = Data + '"GroupID" : "' + User.GroupID + '" ,' +
                              '"GroupName" : "' + User.GroupName + '" ,';
            }
        }


        if ($('#OnPage').val() == "on")
            Data = Data + '"AlwaysOnPage" : true,';
        else
            Data = Data + '"AlwaysOnPage" : false,';

        if ($('#InGroup').val() == "on") {

            if ($('#ddlGroups option:selected').val() == '0') {
                if (User.GroupID == '' || User.GroupID == null || User.GroupID == 'null') {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.SelectGroup);
                            break;
                        case "2":
                            alert(Language.German.SelectGroup);
                            break;
                        case "3":
                            alert(Language.English.SelectGroup);
                            break;
                        case "4":
                            alert(Language.Spanish.SelectGroup);
                            break;
                    }
                    return;
                }
                else {
                    Data = Data + '"AlwaysInGroup" : true}';
                }
            }
            else {
                Data = Data + '"AlwaysInGroup" : true}';
            }
        }
        else
            Data = Data + '"AlwaysInGroup" : false}';



        SaveSettings(Data);


    });

    $('#changeGroup').click(function () {
        getLoginStatus();
    });

    $('#ddlGroups').change(function () {
        $('#GroupName').text($(this).parent().children('span').find('.ui-btn-text').html());
    });

});


function GetfacebookSettings(User) {

    $('#GroupName').text(User.GroupName);
    //  $('#ddlGroups').parent().children('span').find('.ui-btn-text').html(User.Group);
    //  $('#ddlGroups>option').each(function (i) {
    //      if ($(this).html() == User.Group) {
    //          $('#ddlGroups').val($(this).val());
    //          return;
    //      }
    //  });
    // if (User.Group != null && User.Group != '')
    //     $('#fb_group').val(User.Group);

    if (User.AlwaysOnPage == false) {
        $('#OnPage').val('off');
        $('#OnPage').parent().find('div span:first').css({ 'width': '0%' });
        $('#OnPage').parent().find('div span:eq(2)').css({ 'width': '100%' });
        $('#OnPage').parent().find('div div a').css({ 'left': '0%' });
    }
    else {
        $('#OnPage').val('on');

        $('#OnPage').parent().find('div span:first').css({ 'width': '100%' });
        $('#OnPage').parent().find('div span:eq(2)').css({ 'width': '0%' });
        $('#OnPage').parent().find('div div a').css({ 'left': '100%' });
    }


    if (User.AlwaysInGroup == false) {
        $('#InGroup').val('off');
        $('#InGroup').parent().find('div span:first').css({ 'width': '0%' });
        $('#InGroup').parent().find('div span:eq(2)').css({ 'width': '100%' });
        $('#InGroup').parent().find('div div a').css({ 'left': '0%' });
    }
    else {
        $('#InGroup').val('on');


        $('#InGroup').parent().find('div span:first').css({ 'width': '100%' });
        $('#InGroup').parent().find('div span:eq(2)').css({ 'width': '0%' });
        $('#InGroup').parent().find('div div a').css({ 'left': '100%' });
    }
}


function SaveSettings(Data) {

    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._SaveFaceBookSettings;

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
                localStorage.User = JSON.stringify(Result);
               // if (User.SettingsID == '' || User.SettingsID == '0') {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.UpdateSucces);
                            break;
                        case "2":
                            alert(Language.German.UpdateSucces);
                            break;
                        case "3":
                            alert(Language.English.UpdateSucces);
                            break;
                        case "4":
                            alert(Language.Spanish.UpdateSucces);
                            break;
                    }
               /* }
                else {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.UpdateSucces);
                            break;
                        case "2":
                            alert(Language.German.UpdateSucces);
                            break;
                        case "3":
                            alert(Language.English.UpdateSucces);
                            break;
                        case "4":
                            alert(Language.Spanish.UpdateSucces);
                            break;
                    }
                }*/
                app.application.navigate("settings.html");
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



FB.Event.subscribe('auth.login', function (response) {

});

 FB.Event.subscribe('auth.statusChange', Groupsdata);
            



function getLoginStatus() {

    FB.getLoginStatus(function (response) {

        if (response.status == 'connected') {
            Groupsdata();
        } else {

            login();
        }
    });
}


function login() {
    //$('#changeGroup').find('label').text(' Click here to get all groups');
    FB.login(
                    function (response) {
                        if (response.session) {
                            Groupsdata();
                        }
                    },
                    { perms: "email" }
                );
}


function Groupsdata() {

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').show();

    FB.api('/me/groups', function (response) {
        $('#LoadingDiv,#Load').hide();
        if (response.error) {
            alert(JSON.stringify(response.error));
        } else {
            $('#trchangegroup').css({ 'display': 'none' });
            $('#trFaceBookGroups').css({ 'display': 'block' });
            response.data.forEach(function (item) {
                $('#ddlGroups').append('<option value="' + item.id + '" >' + item.name + '</option>');
            });

        }
    });
}