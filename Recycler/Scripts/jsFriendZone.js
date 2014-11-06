
var TabSelected = '';
var Isloaded = false;
var SearchPhoneText = '';
var AppID = '313796158728708';
var SecretID = '31b43aa8cd60569833dca6172b87e451';

var User = null;
function friendzoneInit() {

    if (localStorage.User == null || localStorage.User == undefined) {
       app.application.navigate('signup_login.html');
    }
    else {

        User = $.parseJSON(localStorage.User);
    }


    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);

    

    GetAllActiveFriends('');


    $('#Searchusers').keyup(function () {
        switch (TabSelected) {
            case 'Friends':
                GetAllActiveFriends($(this).val());
                break;
            case 'Phone':
                GetAllPhoneBookUsers($(this).val());
                break;
            case 'FaceBook':
                GetAllFaceBookFriends($(this).val());
                break;
        }
    });


    $('.clsFacebookFriendSelect').click( function () {

        if ($.trim($(this).attr('src')) == 'images/select_icon.png') {

            if (!confirm('Delete friend from friend zone?')) {
                return;
            }
            $(this).attr('src', 'images/nonslect.png');
            RemoveFromFriendZone('', '', $(this).parent().parent().children('td:eq(1)').attr('id'));
        }
        else {
            $(this).attr('src', 'images/select_icon.png');
            AddToFriendZone($(this), '', '', $(this).parent().parent().children('td:eq(1)').attr('id'));
        }


    });


    $('.clsSelect').click( function () {

        if ($.trim($(this).attr('src')) == 'images/select_icon.png') {

            if (!confirm('Delete friend from friend zone?')) {
                return;
            }
            $(this).attr('src', 'images/nonslect.png');
            RemoveFromFriendZone($(this).parent().parent().children('td:eq(1)').attr('num'),
                                 $(this).parent().parent().children('td:eq(1)').attr('nam'), '');
        }
        else {

            AddToFriendZone($(this), $(this).parent().parent().children('td:eq(1)').attr('num'),
                            $(this).parent().parent().children('td:eq(1)').attr('nam'), '');
        }
    });


    $('.clsFriendSelect').click( function () {

        if ($.trim($(this).attr('src')) == 'images/select_icon.png') {

            if (!confirm('Remove friend from active friend zone?')) {
                return;
            }
            $(this).attr('src', 'images/nonslect.png');
            RemoveActiveFromFriendZone($(this).parent().parent().children('td:eq(1)').attr('id'));
        }
        else {
            $(this).attr('src', 'images/select_icon.png');
            AddToActiveFriendZone($(this).parent().parent().children('td:eq(1)').attr('id'));
        }


    });


    $('#ActiveFriends').click(function () {

        $('#TxtMessage').css({ 'display': 'none' });
        Isloaded = true;
        TabSelected = 'FaceBook';
        getLoginStatus();

    });


    $('#getAllActiveFriends').click(function () {
        $('#TxtMessage').css({ 'display': 'none' });
        TabSelected = 'Friends';
        //$.mobile.loadingMessageTextVisible = true;

        //$.mobile.showPageLoadingMsg("b", "please wait...");
        GetAllActiveFriends('');

    });

    $('#getAllPhoneContacts').click(function () {
        $('#TxtMessage').css({ 'display': 'block' });
        TabSelected = 'Phone';

        GetAllPhoneBookUsers("");

    });


}


function RemoveActiveFromFriendZone(ID) {

    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");
    array = ID.split('_');
  //  alert(array[0] + ', ' + array[1]);
   /* jQuery.support.cors = true;
    var Data = '{ "UserID": "' + array[0] + '" ,"FriendID":"' + array[1] + '"}';

    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._RemoveFromActiveFriendZone;


    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            //$.mobile.hidePageLoadingMsg();
            if (Result) {
                alert('Removed from active friend zone successfully.');
            }
            else {
                alert('Cannot be removed ! try again later');

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

function RemoveFromFriendZone(PhoneNumber, Name ,FaceBookID) {


    if (FaceBookID == 'undefined' || FaceBookID == undefined)
        FaceBookID = '';

    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");
   /* jQuery.support.cors = true;
    var Data = '{ "UserID": "' + User.UserID + '" ,"Friend": { "Name":"' + Name + '","Phonenumber" : "' + PhoneNumber + '" , "FaceBookID":"' + FaceBookID + '"}}';

    
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._RemoveFromFriendZone;


    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            //$.mobile.hidePageLoadingMsg();
                if (Result) {
                    alert('Removed from friend zone successfully.');
                }
                else {
                    alert('Cannot be removed ! try again later');

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

    //$.mobile.hidePageLoadingMsg();
}


function AddToFriendZone(obj, PhoneNumber, Name, FaceBookID) {

    //===================================================== 3 Friends if Non Supporter =================================================





    var IsFlag = false;
    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");



    if (User.UserRole == "1") {

      /*  jQuery.support.cors = true;
        var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetTotalChanceLeftForFriendZone + '/' + User.UserID;


        $.ajax({
            type: "GET",
            url: URLFormed,
            dataType: 'json',
            data: Data,
            cache: false,
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (Result) {

                //$.mobile.hidePageLoadingMsg();
                if (Result) {
                    IsFlag = true;
                }
            },
            error: function (xhr) {


            }
        });*/
    }

    //================================================================================================================================================================

    if (IsFlag) {

        if (confirm('Want to add more friends? Become a supporter.')) {
           app.application.navigate("basic_setup.html");
            return false;
        }
        else {
            return false;
        }
    }


    
  //  alert(PhoneNumber + ', ' + Name + ', ' + FaceBookID);

    if (FaceBookID != '' && FaceBookID != null) {
        FB.ui({
            method: 'apprequests',
            frictionlessRequests: true,
            message: 'Download and install now and understand the value of recycling and tackle unnecessary food waste.',
            to: FaceBookID
        }, function (response) {
            if (!response || response.error) {
                alert(response.error.message);
            } else {


                //$.mobile.loadingMessageTextVisible = true;

                //$.mobile.showPageLoadingMsg("b", "please wait...");

              /*  jQuery.support.cors = true;
                var Data = '{ "UserID": "' + User.UserID + '" ,"Friend": { "Name":"' + Name + '","Phonenumber" : "' + PhoneNumber + '" , "FaceBookID" : "' + FaceBookID + '"} }';
                var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._AddToFriendZone;


                $.ajax({
                    type: "POST",
                    url: URLFormed,
                    dataType: 'json',
                    data: Data,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (Result) {
                        //$.mobile.hidePageLoadingMsg();
                        if (Result) {
                            alert('Added to Friend Zone successfully.');
                        }
                        else {
                            alert('Cannot be added! Please try again later.');

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
        });
    }
    else {




        if ($('#TxtMessage').val() == "") {

            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.TextInvite);
                    break;
                case "2":
                    alert(Language.German.TextInvite);
                    break;
                case "3":
                    alert(Language.English.TextInvite);
                    break;
                case "4":
                    alert(Language.Spanish.TextInvite);
                    break;
            }
            //$.mobile.hidePageLoadingMsg();
            return false;
        }
     



        //$.mobile.loadingMessageTextVisible = true;

        //$.mobile.showPageLoadingMsg("b", "please wait...");

        if (FaceBookID == 'undefined' || FaceBookID == undefined)
            FaceBookID = '';

       /* jQuery.support.cors = true;
        var Data = '{ "UserID": "' + User.UserID + '" ,"Friend": { "Name":"' + Name + '","Phonenumber" : "' + PhoneNumber + '" , "FaceBookID" : "' + FaceBookID + '"} }';
        var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._AddToFriendZone;


        $.ajax({
            type: "POST",
            url: URLFormed,
            dataType: 'json',
            data: Data,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (Result) {
                //$.mobile.hidePageLoadingMsg();
                if (Result) {
                    alert('Added to Friend Zone successfully.');
                    obj.attr('src', 'images/select_icon.png');
                    if (FaceBookID == '' || FaceBookID == null) {
                        // var Mesg = User.FirstName + " has added you in his friend Zone and want you to be a part of Recycle World! Download and install now and understand the value of recycling and tackle unnecessary food waste.";

                  
                        window.plugins.Sms.sendSMS(function () {

                            alert('Sms sent successfully.');
                        },
                    function (e) {
                        //alert('Message Failed:' + e);
                    },
                		        PhoneNumber,
                                $('#TxtMessage').val());
                		      //  'You are now in my friend Zone, Download and install Recycle World now and understand the value of recycling and tackle unnecessary food waste.');
                    }
                }
                else {
                    alert('Cannot be added! Please try again later.');

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
        });
*/
    }

}



function AddToActiveFriendZone(ID) {
    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");
    array = ID.split('_');
    //alert(array[0] + ', ' + array[1]);
   /* jQuery.support.cors = true;
    var Data = '{ "UserID": "' + array[0] + '" ,"FriendID":"' + array[1] + '"}';
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._AddToActiveFriendZone;


    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            //$.mobile.hidePageLoadingMsg();

            if (Result) {
                alert('Friend added to active friend Zone successfully.');
            }
            else {
                alert('Cannot be activated! Please try again later.');

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





function GetAllPhoneBookUsers(SearchText) {
    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait..."); 
     var options = new ContactFindOptions();
     options.filter = SearchText;
    options.multiple = true;
    var fields = ["displayName","phoneNumbers"]; //["displayName", "name","phoneNumbers"];
    navigator.contacts.find(fields, onContactSuccess, onContactError, options);

    
}

function onContactError(contactError) {
    alert('Error in getting contacts!' +
             contactError);
}

function onContactSuccess(contacts) {//alert(contacts.length);

   

   /* jQuery.support.cors = true;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetAllFriendsSyncList + '/' + User.UserID;


    $('#dvAllUsers').html('');

    $.ajax({
        type: "GET",
        url: URLFormed,
        dataType: 'json',
        data: {},
        cache: false,
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            //$.mobile.hidePageLoadingMsg();
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);

                var PhoneNumbers = [];

                for (var i = 0; i < contacts.length; i++) {

                    if (contacts[i].phoneNumbers != null)  // Checking if not null
                        for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {

                            var NumberExists = false;
                            if (PhoneNumbers.length > 0) {
                                
                                if ($.inArray(contacts[i].phoneNumbers[j].value, PhoneNumbers) > -1) {
                                    NumberExists = true;

                                }
                            }
                          
                            if (NumberExists == false) {
                                if (contacts[i].phoneNumbers[j].value != null && contacts[i].phoneNumbers[j].value != "") {
                                  
                                    PhoneNumbers.push(contacts[i].phoneNumbers[j].value);
                                    var Html = '<div>' +
                                                    '<table width="100%">' +
                                                        '<tr>' +
                                                            '<td width="30">' +
                                                             '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td nam= "' + contacts[i].displayName + '" num = "' + contacts[i].phoneNumbers[j].value + '">';
                                    if (contacts[i].displayName != null)
                                        Html += ' ' + contacts[i].displayName;
                                    else if (contacts[i].phoneNumbers[j].value != "")
                                        Html += ' ' + contacts[i].phoneNumbers[j].value;
                                    Html += '</td><td width="50">';

                                    var Flag = true;

                                    $.each(data, function (index) {

                                        if (contacts[i].phoneNumbers[j].value === data[index].Phonenumber) {
                                            Flag = false;
                                        }
                                    });



                                    if (Flag == false) {
                                        Html += '<img src="images/select_icon.png" width="35" alt="selected" class ="clsSelect">';
                                    } 
                                    else {
                                        Html += '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsSelect">';
                                    }
                                    Html += '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                    '</div>';


                                    $('#dvAllUsers').append(Html);
                                }

                            }
                        }
                }

            }
            else {
               
                var PhoneNumbers = [];
                for (var i = 0; i < contacts.length; i++) {

                   
                    if (contacts[i].phoneNumbers != null)  // Checking if not null
                        for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {

                            var NumberExists = false;
                            if (PhoneNumbers.length > 0) {

                                if ($.inArray(contacts[i].phoneNumbers[j].value, PhoneNumbers) > -1) {
                                    NumberExists = true;

                                }
                            }
                           

                            if (NumberExists == false) {
                                if (contacts[i].phoneNumbers[j].value != null && contacts[i].phoneNumbers[j].value != "") {

                                   
                                    PhoneNumbers.push(contacts[i].phoneNumbers[j].value);
                                    var Html = '<div>' +
                                        '<table width="100%">' +
                                            '<tr>' +
                                                '<td width="30">' +
                                                 '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                '</td>' +
                                                '<td nam= "' + contacts[i].displayName + '" num = "' + contacts[i].phoneNumbers[j].value + '">';
                                    if (contacts[i].displayName != null)
                                        Html += ' ' + contacts[i].displayName;
                                    else if (contacts[i].phoneNumbers[j].value != "")
                                        Html += ' ' + contacts[i].phoneNumbers[j].value;
                                    Html += '</td><td width="50">' +
                                                    '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsSelect">' +
                                                    '</td></tr>' +
                                                    '</table>' +
                                                '</div>';


                                    $('#dvAllUsers').append(Html);
                                }
                            }
                        }
                }

            }
        },
        error: function (xhr) {


        }
    });*/

  

}






function GetAllActiveFriends(SearchText) {

    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");


   /* var Data = '{"SearchText":"' + SearchText + '","UserID" :"' + User.UserID + '"}';

    jQuery.support.cors = true;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetAllUsers;



    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {

            //$.mobile.hidePageLoadingMsg();

            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                $('#dvAllUsers').html('');
                $.each(data, function (i) {


                    if (SearchText != '') {
                        if (data[i].Name.indexOf(SearchText) >= 0) {
                            var Html = '<div>' +
                                                    '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + data[i].UserID + '_' + data[i].FriendID + '">' +
                                                            'Contact: ' + data[i].Name +
                                                            '</td><td width="50">' +
                                                            '<img src="images/select_icon.png" width="35" alt="selected" class ="clsFriendSelect">' +
                                                            '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                            $('#dvAllUsers').append(Html);
                        }
                    }
                    else {
                        var Html = '<div>' +
                                                    '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + data[i].UserID + '_' + data[i].FriendID + '">' +
                                                            'Contact: ' + data[i].Name +
                                                            '</td><td width="50">' +
                                                            '<img src="images/select_icon.png" width="35" alt="selected" class ="clsFriendSelect">' +
                                                            '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                        $('#dvAllUsers').append(Html);                 
                    }
                });

            }
            else {
                $('#dvAllUsers').html("No active friend found in Friend Zone");
            }


        },
        error: function (xhr) {


        }
    });*/
    //$.mobile.hidePageLoadingMsg();
    return false;
}





//================================================================================FACE BOOK API =======================================================================



function GetAllFaceBookFriends(SearchText) {

 
    //$.mobile.loadingMessageTextVisible = true;

    //$.mobile.showPageLoadingMsg("b", "please wait...");

    /*jQuery.support.cors = true;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._UserService + '/' + Service.ServiceMethods._GetAllFaceBookFriends + '/' + User.UserID;


    $.ajax({
        type: "GET",
        url: URLFormed,
        dataType: 'json',
        data: {},
        cache: false,
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {

            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);


                $('#dvAllUsers').html('');

                FB.api('/me/friends', function (response) {
                    var friend_data = response.data;


                    for (var i = 0; i < friend_data.length; i++) {

                        if (SearchText != '') {
                            if (friend_data[i].name.indexOf(SearchText) >= 0) {
                                var Html = '<div>' +
                              '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + friend_data[i].id + '">' +
                                                            'Contact: ' + friend_data[i].name +
                                                            '</td><td width="50">';
                                var Flag = true;




                                $.each(data, function (index) {


                                    if (friend_data[i].id === data[index].FaceBookID) {
                                        Flag = false;
                                    }
                                });



                                if (Flag == false) {
                                    Html += '<img src="images/select_icon.png" width="35" alt="selected" class ="clsFacebookFriendSelect">';
                                }
                                else {
                                    Html += '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsFacebookFriendSelect">';
                                }


                                Html += '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                                $('#dvAllUsers').append(Html);

                            }


                        }
                        else {

                            var Html = '<div>' +
                              '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + friend_data[i].id + '">' +
                                                            'Contact: ' + friend_data[i].name +
                                                            '</td><td width="50">';
                            var Flag = true;




                            $.each(data, function (index) {


                                if (friend_data[i].id === data[index].FaceBookID) {
                                    Flag = false;
                                }
                            });



                            if (Flag == false) {
                                Html += '<img src="images/select_icon.png" width="35" alt="selected" class ="clsFacebookFriendSelect">';
                            }
                            else {
                                Html += '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsFacebookFriendSelect">';
                            }


                            Html += '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                            $('#dvAllUsers').append(Html);
                        }
                    }
                    //$.mobile.hidePageLoadingMsg();
                });
            }
            else {
                $('#dvAllUsers').html('');
                FB.api('/me/friends', function (response) {
                    var friend_data = response.data;

                    for (var i = 0; i < friend_data.length; i++) {
                        if (SearchText != '') {
                            if (friend_data[i].name.indexOf(SearchText) >= 0) {
                                var Html = '<div>' +
                              '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + friend_data[i].id + '">' +
                                                            'Contact: ' + friend_data[i].name +
                                                            '</td><td width="50">' +
                                                            '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsFacebookFriendSelect">' +
                                                            '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                                $('#dvAllUsers').append(Html);

                            }
                        }
                        else {
                            var Html = '<div>' +
                              '<table width="100%">' +
                                                         '<tr>' +
                                                            '<td width="30">' +
                                                            '<img src="images/man_icon.png" width="30" height="29" alt="manicon">' +
                                                            '</td>' +
                                                            '<td id= "' + friend_data[i].id + '">' +
                                                            'Contact: ' + friend_data[i].name +
                                                            '</td><td width="50">' +
                                                            '<img src="images/nonslect.png" width="35" alt="nonselect" class ="clsFacebookFriendSelect">' +
                                                            '</td>' +
                                                         '</tr>' +
                                                      '</table>' +
                                                    '</div>';


                            $('#dvAllUsers').append(Html);                      
                        }
                    }
                    //$.mobile.hidePageLoadingMsg();
                });
            }
        },
        error: function (xhr) {


        }
    });*/
}





//====================================== FaceBook EVENTS and FUNCTIONS =================================\

FB.Event.subscribe('auth.login', function (response) {

});

FB.Event.subscribe('auth.statusChange', handleStatusChange);

function handleStatusChange(session) {

    if (Isloaded) {
        if (session.authResponse) {
           
        GetAllFaceBookFriends('');

        } else {
            login();

        }
    }
}


function getLoginStatus() {

    FB.getLoginStatus(function (response) {

        if (response.status == 'connected') {

            
            GetAllFaceBookFriends('');

        } else {

            login();


        }
    });

}






function login() {

    FB.login(
                    function (response) {
                        if (response.session) {

                      
                           GetAllFaceBookFriends('');

                        } else {

                        }
                    },
                    { perms: "email" }
                );
}


