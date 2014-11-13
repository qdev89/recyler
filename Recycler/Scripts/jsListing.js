
var User;
function listInit(){  
    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);

    GetAllItems(localStorage.OverLapLatLong);

    $('.clsProduct').click( function () {
        $("#LoadingDiv").css({ "position": "absolute",
            "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').show();
        localStorage.SelectedProduct = $(this).attr('id');
       app.application.navigate("product.html");

    });
  

    $(".divSpot").click( function () {      
        localStorage.setItem('spotID', $(this).children('a').attr("id"));         
       app.application.navigate("editspot.html");
    });


}

function GetAllItems(LatLong) {

    /*var User = $.parseJSON(localStorage.User);

    var array = LatLong.split('_');

    jQuery.support.cors = true;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._GetAllPoints;
    var Data = '{"Latitude":"' + array[0] + '","Longitude":"' + array[1] + '","UserID":' + User.Id + '}';


    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        contentType: "application/json;charset=utf-8",
        cache: false,
        success: function (Result) {
            
            if (Result != null && Result != 'null' && Result != '' && Result != undefined) {

                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                GenerateListView(data);

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

function GenerateListView(data) {
    var Products = data.Products;
    var Spots = data.Spots;
    var ProductList = '';
    if (Products != null) {
        $.each(Products, function (i) {
            ProductList = ProductList + '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div"' +
                                    'data-icon="arrow-r" data-iconpos="right"  ' +
                                    'class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a">' +
                                    '<div style="padding-left:0px" class="ui-btn-inner ui-li">' +
                                    '<div class="ui-btn-text"><a id="' + Products[i].ProductID + '" class="ui-link-inherit clsProduct">';

            if (Products[i].ImagePath != undefined && Products[i].ImagePath != null && Products[i].ImagePath != '') {
                ProductList = ProductList + '<img';
                switch (Products[i].Type) {
                    case 'Swap':
                        ProductList = ProductList + ' style="border:3px solid #000000" ';
                        break;
                    case 'free':
                        ProductList = ProductList + ' style="border:3px solid #7fb400" ';
                        break;
                    case 'priced':
                        ProductList = ProductList + ' style="border:3px solid #ff0000" ';
                        break;
                }
                ProductList = ProductList + ' alt="" width="152px" height="88px" src="data:image/jpeg;base64,' + Products[i].ImagePath + '" class="ui-li-thumb">';
            }
            else {
                ProductList = ProductList + '<img';

                switch (Products[i].Type) {
                    case 'Swap':
                        ProductList = ProductList + ' style="border:3px solid #000000" ';
                        break;
                    case 'free':
                        ProductList = ProductList + ' style="border:3px solid #7fb400" ';
                        break;
                    case 'priced':
                        ProductList = ProductList + ' style="border:3px solid #ff0000" ';
                        break;
                }
                ProductList = ProductList + ' style="border:2px solid #7fb400" alt="" width="152px" height="88px" src="images/NoImage.jpg" class="ui-li-thumb">';
            }

            ProductList = ProductList + '<h3 class="ui-li-heading"><label for="itemtext">' + Products[i].Name + '</label></h3>' +
                                    '<p class="ui-li-desc"><label for="itemcity">' + Products[i].GeoLocation + '</label></p>';

            switch (Products[i].Type) {
                case 'Swap':
                    ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 12pt" >' + Products[i].Price + '</label>';
                    break;
                case 'free':
                    ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 12pt">FREE/GRATIS</label>';
                    break;
                case 'priced':
                    ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 12pt">' + Products[i].Price + '</label>';
                    break;
            }
            ProductList = ProductList + '<label for="itemdate" style="margin-left:15px">' + Products[i].Createddate + '</label></p></a>' +
                                    '</div>';



            ProductList = ProductList + '</div>';



            switch (Products[i].Type) {
                case 'Swap':
                    ProductList = ProductList + '<div style="height:17px;top:86px; position:absolute"><img alt="" width="88px" height="17px" src="images/swap_1.png" ></div>';
                    break;
                case 'free':
                    ProductList = ProductList + '<div style="height:17px;top:86px; position:absolute"><img alt="" width="87px" height="17px"  src="images/free_green_1.png"  ></div>';
                    break;
                case 'priced':
                    ProductList = ProductList + '<div style="height:17px;top:86px; position:absolute"><img alt="" width="87px" height="17px"  src="images/ptag_1.png"  ></div>';
                    break;
            }

            ProductList = ProductList + '</li>';

        });

        $('#ListSpots').append(ProductList);
    }


    if (Spots != null) {
        var SpotList = '';
        $.each(Spots, function (i) {

            SpotList = SpotList + '<li class="ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb" data-theme="c" data-iconpos="right" data-icon="arrow-r" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperEls="div" jQuery17206322357529134885="29">' +
                                           '<div class="ui-btn-inner ui-li" jQuery17206322357529134885="30">' +
                                           '<div class="ui-btn-text divSpot" jQuery17206322357529134885="31"><a id="' + Spots[i].spotID + '" class=ui-link-inherit data-transition="slide">';
            if (Spots[i].ImagePath != undefined && Spots[i].ImagePath != null && Spots[i].ImagePath != '') {
                SpotList = SpotList + '<IMG style="HEIGHT: 100%" class=ui-li-thumb alt="" src="data:image/jpeg;base64,' + Spots[i].ImagePath + '"> <LABEL style="DISPLAY: none" for=spottype>ID</LABEL>';
            }
            else {
                SpotList = SpotList + '<IMG style="HEIGHT: 100%" class=ui-li-thumb alt="" src="images/NoImage.jpg"> <LABEL style="DISPLAY: none" for=spottype>ID</LABEL>';
            }

            SpotList = SpotList + '<H3 class=ui-li-heading><LABEL for=spottype>' + Spots[i].Name + ' </LABEL></H3>' +
                        '<P class=ui-li-desc><LABEL for=spotcity>' + Spots[i].City + '</LABEL></P></A></DIV></DIV></LI>';
        });
        //alert(SpotList);
        $('#ListSpots').append(SpotList);

    }
    $('#LoadingDiv,#Load').hide();
}


