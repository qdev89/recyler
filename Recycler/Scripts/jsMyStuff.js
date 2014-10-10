
var User;
function myStuffInit(){
    //changeLanguage(localStorage.Language);

    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    $("[data-localize]").localize("Recycle", opts);

    if(!isLogged())return;

    if (User.RoleID == "3") {
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
            localStorage.User = null;
            app.application.navigate("signup_login.html");
            return;
        }
        else {
            return;
        }
    }

    GetMyStuffItems();

    $('.divProduct').click( function () {
        var ProductID = $(this).children('a').attr('id');
        localStorage.MyProduct = ProductID;
       app.application.navigate("product_status.html");
    });

}

function GetMyStuffItems() {

    jQuery.support.cors = true;
    var Parameters = User.UserID;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._GetMyStuff + '/' + Parameters;

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
                var ProductList = '';
                $.each(data, function (i) {
                    ProductList = ProductList + '<li data-corners="false" data-shadow="false" data-iconshadow="true" ' +
                    'data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" ' +
                    'class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">' +
                    '<div style="padding-left:0px" class="ui-btn-inner ui-li"><div  class="ui-btn-text  divProduct"><a  data-transition="slide"' +
                    ' id="' + data[i].ProductID + '" class="ui-link-inherit">';
                    if (data[i].ImagePath != undefined && data[i].ImagePath != null && data[i].ImagePath != '') {
                        ProductList = ProductList + '<img alt="" style="height: 100%" src="data:image/jpeg;base64,' + data[i].ImagePath + '" class="ui-li-thumb">';
                    }
                    else {
                        ProductList = ProductList + '<img alt="" style="height: 100%" src="images/NoImage.jpg" class="ui-li-thumb">';
                    }
                    ProductList = ProductList + '<h3 class="ui-li-heading"><label for="gem">' + data[i].Name + '</label></h3>' +
                    '<p class="ui-li-desc">' + data[i].Description + ' </p>' +
                    '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
                });
                $('#ProductList').html(ProductList);

            }
            else {
                $('#ProductList').html('<div style="margin-top:12%"><img  src="images/empty.png" width="100%" /></div>');
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


