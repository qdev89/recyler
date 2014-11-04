var Getspot = {
    userId: '',
    Id: '',

    GetSpot: function () {

        $.support.cors = true;
        var UserIDParameter = Getspot.userId;
        var SportIDParameter = Getspot.Id;

        var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._GetSpot + '/' + SportIDParameter + '/' + UserIDParameter;
        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

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
                    var SpotList = '';
                    $.each(data, function (i) {

                       

                        SpotList = SpotList + '<li class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb" data-theme="c" data-iconpos="right" data-icon="arrow-r" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperEls="div" jQuery17206322357529134885="29">' +
                                           '<div style="padding-left:0px" class="ui-btn-inner ui-li" jQuery17206322357529134885="30">' +
                                           '<div class="ui-btn-text divSpot" jQuery17206322357529134885="31"><a id="' + data[i].spotID + '" class=ui-link-inherit data-transition="slide">';
                        if (data[i].ImagePath != undefined && data[i].ImagePath != null && data[i].ImagePath != '') {
                            SpotList = SpotList + '<IMG style="HEIGHT: 100%" class=ui-li-thumb alt="" src="data:image/jpeg;base64,' + data[i].ImagePath + '"> <LABEL style="DISPLAY: none" for=spottype>ID</LABEL>';
                        }
                        else {
                            SpotList = SpotList + '<IMG style="HEIGHT: 100%" class=ui-li-thumb alt="" src="images/NoImage.jpg"> <LABEL style="DISPLAY: none" for=spottype>ID</LABEL>';
                        }

                        SpotList = SpotList + '<H3 class=ui-li-heading><LABEL for=spottype>' + data[i].Name + ' </LABEL></H3>' +
                        '<P class=ui-li-desc><LABEL for=spotcity>' + data[i].City + '</LABEL></P></A></DIV><SPAN class="ui-icon ui-icon-arrow-r ui-icon-shadow" jQuery17206322357529134885="32">&nbsp;</SPAN></DIV></LI>';
                    });
                    //alert(SpotList);
                    $('#getallspot').html(SpotList);

                }
                else {
                    $('#getallspot').html('<div style="margin-top:12%"><img  src="images/empty.png" width="100%" /></div>');
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
    }
}


$(document).ready(function () {
  return false;
    
    
    
    
    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);
    var User = $.parseJSON(localStorage.User); 

    Getspot.Id = '0';
    Getspot.userId = User.UserID;
    Getspot.GetSpot();


    //----Redirect to EditSpot Html fill SpotDetail----

    $(".divSpot").click(function () {
        
        localStorage.setItem('spotID', $(this).children('a').attr("id"));
       
       app.application.navigate("editspot.html");
    });
});
