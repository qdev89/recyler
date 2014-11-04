var Product = new Object();
Product.Display = {
    Style: 'List',
    Page: 1,
    PageSize: 10,
    Total: 0
}
Product.SearchFilters = {
    Distance: '0',
    Price: '0',
    Categories: null,
    Latitude: '0',
    Longitude: '0',
    Text:''
}

var User;


function GetAllProducts(_ProductDisplayStyle, _ProductSearchFilters) {
  
    User = $.parseJSON(localStorage.User);

    jQuery.support.cors = true;
     var Data = '{         "Page":' + _ProductDisplayStyle.Page +
                           ',"PageSize":' + _ProductDisplayStyle.PageSize +
                           ',"UserId":"' + User.UserID +
                           '","Distance":"' + _ProductSearchFilters.Distance +
                           '","Price":"' + _ProductSearchFilters.Price +
                           '","Categories":"' + _ProductSearchFilters.Categories +
                           '","Latitude":"' + _ProductSearchFilters.Latitude +
                           '","Longitude":"' + _ProductSearchFilters.Longitude +
                           '","Text":"' + _ProductSearchFilters.Text +
                           '","Country":"' + User.Country + 
                '"}';




    var URLFormed = Service.dataServiceURL
                   + Service.ServiceName._ProductService + '/'
                   + Service.ServiceMethods._GetSearchProduct;


    $.ajax({
        type: "POST",
        url: URLFormed,
        dataType: 'json',
        data: Data,
        cache: false,
        contentType: "application/json;charset=utf-8",
        success: function (Result) {
            
            // $("#LoadingDiv,#Load").css({ "display": "none" });
            if (Result != null && Result != 'null' && Result != '' && Result != undefined) {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                if (_ProductDisplayStyle.Style == 'List') {
                    GenerateListView(data);
                }
                else {
                    GenerateGridView(data);
                }
            }
            else {
                $('#LoadingDiv,#Load').hide();
                switch (localStorage.Language) {
                    case '1':
                        $('#ulProducts').html('<div style="margin-top:22%"><img  src="images/NothingFound/nothing_dk.png" width="100%" /></div>');
                        break;
                    case '2':
                        $('#ulProducts').html('<div style="margin-top:22%"><img  src="images/NothingFound/nothing_de.png" width="100%" /></div>');
                        break;
                    case '3':
                        $('#ulProducts').html('<div style="margin-top:22%"><img  src="images/NothingFound/nothing_gb_us.png" width="100%" /></div>');
                        break;
                    case '4':
                        $('#ulProducts').html('<div style="margin-top:22%"><img  src="images/NothingFound/nothing_es.png" width="100%" /></div>');
                        break;
                }
            }
        },
        error: function (xhr) {
            $('#LoadingDiv,#Load').hide();
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


function GenerateListView(data) {

    var ProductList = '';

    //  $('#ulProducts').html('');
    $.each(data, function (i) {

        ProductList = ProductList + '<li style="min-height:50px" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div"' +
                                    'data-icon="arrow-r" data-iconpos="right"  ' +
                                    'class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a">' +
                                    '<div style="padding-left:0px" class="ui-btn-inner ui-li">' +
                                    '<div class="ui-btn-text"><a style="padding-top:0px" id="' + data[i].ProductID + '" class="ui-link-inherit clsProduct">';

        if (data[i].ImagePath != undefined && data[i].ImagePath != null  && data[i].ImagePath != '') {
            ProductList = ProductList + '<img';
            switch (data[i].Type) {
                case 'Swap':
                    ProductList = ProductList + ' style="border:2px solid #000000" ';
                    break;
                case 'free':
                    ProductList = ProductList + ' style="border:2px solid #7fb400" ';
                    break;
                case 'priced':
                    ProductList = ProductList + ' style="border:2px solid #ff0000" ';
                    break;
            }
            ProductList = ProductList + ' alt="" width="157px" height="100px" src="data:image/jpeg;base64,' + data[i].ImagePath + '" class="ui-li-thumb">';
        }
        else {
            ProductList = ProductList + '<img';

            switch (data[i].Type) {
                case 'Swap':
                    ProductList = ProductList + ' style="border:2px solid #000000" ';
                    break;
                case 'free':
                    ProductList = ProductList + ' style="border:2px solid #7fb400" ';
                    break;
                case 'priced':
                    ProductList = ProductList + ' style="border:2px solid #ff0000" ';
                    break;
            }
            ProductList = ProductList + ' style="border:2px solid #7fb400" alt="" width="157px" height="100px" src="images/NoImage.jpg" class="ui-li-thumb">';
        }

        ProductList = ProductList + '<h3 class="ui-li-heading"><label for="itemtext">' + data[i].Name;
        if (data[i].IsInFriendZone) {
            //ProductList = ProductList + '   <span style="font-size:8pt">(FriendZone)</span>';
        }
        ProductList = ProductList + '</label></h3>';
       // ProductList = ProductList + '<p style="height:0px" class="ui-li-desc"><label for="itemcity" >' + data[i].GeoLocation + '</label></p>';
        ProductList = ProductList + '<p style="height:5px" class="ui-li-desc"></p>';
        switch (data[i].Type) {
            case 'Swap':
                ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 9pt">' + data[i].Price + '</label></p>';
                break;
            case 'free':
                ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 9pt">FREE/GRATIS</label></p>';
                break;
            case 'priced':
                ProductList = ProductList + '<p class="ui-li-desc"><label for="itemprice" style="font-weight: bold;font-size: 9pt">' + data[i].Price + '</label></p>';
                break;
        }
        ProductList = ProductList + '<p class="ui-li-desc"><label style="font-size: 8pt"  for="itemdate">' + data[i].Createddate + '</label></p></a>' +
                                    '</div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>';

        ProductList = ProductList + '</div>';
        ProductList = ProductList + '</li>';

    });

    if (data[0].Total > (Product.Display.Page * Product.Display.PageSize))
        ProductList = ProductList + '<div style="background-color:#046daf; width:100%;height:40px;text-align:center;color:#ffffff;padding-top:10px" id="GetMore">Load More</div>';

    $('#ulProducts').append(ProductList);


}

function GenerateGridView(data) {
    
    var ProductList = '';
    var count = 1;
    ProductList = '';
    $.each(data, function (i) {
        
        if (count == 1) {
            ProductList = ProductList + '<div style="width:100%;height:7%;">';
        }

        ProductList = ProductList + '<div style="width:22%;height:7%;margin:3px 2px 0px 3px;float:left;';
        switch (data[i].Type) {
            case 'Swap':
                ProductList = ProductList + ' border:2px solid #000000;background-color:#000000"><div style="width:100%;height:100%">';
                break;
            case 'free':
                ProductList = ProductList + ' border:2px solid #7fb400;background-color:#7fb400"><div style="width:100%;height:100%">';
                break;
            case 'priced':
                ProductList = ProductList + ' border:2px solid #ff0000;background-color:#ff0000"><div style="width:100%;height:100%">';
                break;
            case 'null':
                ProductList = ProductList + ' margin-top:2px;"><div style="width:100%;height:100%">';
                break;
            case null:
                ProductList = ProductList + ' margin-top:2px;"><div style="width:100%;height:100%">';
                break
            case '':
                ProductList = ProductList + ' margin-top:2px;"><div style="width:100%;height:100%">';
                break;
        }

        ProductList = ProductList + '<a id="' + data[i].ProductID + '" class="clsProduct">';
        if (data[i].ImagePath != undefined && data[i].ImagePath != null && data[i].ImagePath != '') {
            ProductList = ProductList + '<img src="data:image/jpeg;base64,' + data[i].ImagePath + '" style="width:100%;height:80px" ></a></div>';
        }
        else {
            ProductList = ProductList + '<img src="images/NoImage.jpg" style="width:100%;height:80px" ></a></div>';
        }


        ProductList = ProductList + '</div>';

        if (count > 4) {
            ProductList = ProductList + '</div>';
        }

        $('#ulProducts').append(ProductList);
       
        if (count > 4) {
            count = 1;
        }
        else {
            count += 1;
        }
        ProductList = '';
    });



    if (data[0].Total > (Product.Display.Page * Product.Display.PageSize))
        $('#ulProducts').append('<div style="clear:both;background-color:#046daf; width:100%;height:40px;text-align:center;color:#ffffff;padding-top:10px" id="GetMore">Load More</div>');

}



function GetProduct(ID) {

    jQuery.support.cors = true;
    var Parameters = ID;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._GetProduct + '/' + Parameters;

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

                $('#image').attr('src', 'data:image/jpeg;base64,' + data.ImagePath);

                $('#Tags').text(data.Categories);
                $('#ProductName').text(data.Name);
                $('#ProductCity').text(data.GeoLocation);
                $('#whatisit').html(data.Name);
                $('#long').html(data.MoreInformation);
                if (data.Description != '' || data.Description != null) {
                    $('#imightlike').html(data.Description);
                    $('#tdimightlike').css('display', 'block');
                }
                $('#ProductCreatedDate').text(data.Createddate);
                $('#ProductImageUrl').val(data.PostImagePath);

                switch (data.Type) {
                    case 'Swap':
                        $('#swap').css('display', 'block');
                        $('#priceTag').css('display', 'none');
                        $('#free').css('display', 'none');
                        $('#Price').text(data.Price);
                        break;
                    case 'free':
                        $('#priceTag').css('display', 'none');
                        $('#swap').css('display', 'none');
                        $('#free').css('display', 'block');
                        $('#Price').text('FREE/GRATIS');
                        break;
                    case 'priced':
                        $('#free').css('display', 'none');
                        $('#priceTag').css('display', 'block');
                        $('#swap').css('display', 'block');
                        $('#Price').text(data.Price);
                        break;
                }

                var ProductLocation = new google.maps.LatLng(data.Latitude, data.Longitude);

                drawMaps(ProductLocation, data.Name, data.Description);
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


//---------------------------MAP--------------------------------
var map;
function drawMaps(latlng, name, Description) {
    var options = {
        center: latlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
    }
    $("#map_canvas").height(250);
    map = new google.maps.Map(document.getElementById('map_canvas'), options);

    icon = 'images/product.png';
    var html = "<div class=\"information\"><div class=\"name\" " +
               "style='font-size:9pt'>Name : " + name + "</div>";
    if (Description != '') {
        html += "<div class=\"Phone\" style='font-size:9pt'>Description : " + Description + "</div>";
    }

    html += "<div>";

    spotMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        name: name,
        information: html
    });

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(spotMarker, 'click', function () {
        infowindow.setContent(this.information);
        infowindow.open(map, this);
    });
}



function productInit(){
    
    
/*FB.init({ appId: "313796158728708", nativeInterface: CDV.FB, useCachedDialogs: false });*/
          
                if (localStorage.CacheItem != undefined && localStorage.CacheItem != '') {
                    Item = $.parseJSON(localStorage.CacheItem);
                    if (Item.SelectedProduct != undefined && Item.SelectedProduct != '') {
                        localStorage.SelectedProduct = Item.SelectedProduct;
                    }
                }
            
                var ID = localStorage.SelectedProduct;
                GetProduct(ID);
            
                $('#WantIt').click(function () {
                    //$.mobile.loadingMessageTextVisible = true;
            
                    //$.mobile.showPageLoadingMsg("b", "please wait...");
                    User = $.parseJSON(localStorage.User);
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
                            //$.mobile.hidePageLoadingMsg();
                            localStorage.User = null;
                            var CacheItem = '{"NavigateURL":"product.html",' +
                                            '"SelectedProduct":"' + localStorage.SelectedProduct + '"' +
                                            '}';
                            localStorage.CacheItem = CacheItem;
                            app.application.navigate("signup_login.html");
                            return;
                        } else {
                            //$.mobile.hidePageLoadingMsg();
                            window.localStorage.removeItem("CacheItem");
                            return;
                        }
                    } else {
                        if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
                            switch (localStorage.Language) {
                                case "1":
                                    alert(Language.Danish.PleaseUpdate);
                                    break;
                                case "2":
                                    alert(Language.German.PleaseUpdate);
                                    break;
                                case "3":
                                    alert(Language.English.PleaseUpdate);
                                    break;
                                case "4":
                                    alert(Language.Spanish.PleaseUpdate);
                                    break;
                            }
                            return;
                        }
                        window.localStorage.removeItem("CacheItem");
                        app.application.navigate("contact.html");
                    }
                });
            
                $('#NoInterest').click(function () {
                    localStorage.isFilterEnabled = true;
                    window.localStorage.removeItem("CacheItem");
                    app.application.navigate("finditem.html");
                });
}


          /*  FB.Event.subscribe('auth.login', function (response) {
            });
            
            FB.Event.subscribe('auth.statusChange', handleStatusChange);*/
            
            function handleStatusChange(session) {
                if (session.authResponse) {
                    var data = $.parseJSON(localStorage.User);
            
                    if (data.AlwaysInGroup && data.AlwaysOnPage) {
                        postToFeed();
                        if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                            postToGroup(data.GroupID);
                        }
                    } else if (data.AlwaysInGroup) {
                        if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                            postToGroup(data.GroupID);
                        }
                    } else if (data.AlwaysOnPage) {
                        postToFeed();
                    } else {
                        alert('Please tweak facebook posting settings in More -> facebook settings tab.');
                        return;
                    }
                } else {
                    document.body.className = 'not_connected';
                }
            }

            
            function getLoginStatus2() {
                FB.getLoginStatus(function (response) {
                    if (response.status == 'connected') {
                        var data = $.parseJSON(localStorage.User);
            
                        if (data.AlwaysInGroup && data.AlwaysOnPage) {
                            postToFeed();
                            if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                                postToGroup(data.GroupID);
                            }
                        } else if (data.AlwaysInGroup) {
                            if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                                postToGroup(data.GroupID);
                            }
                        } else if (data.AlwaysOnPage) {
                            postToFeed();
                        } else {
                            alert('Please tweak facebook posting settings in More -> facebook settings tab.');
                            return;
                        }
                    } else {
                        login();
                    }
                });
            }
            
            function postToFeed() {
                $("#LoadingDiv").css({
                                         "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                                         'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                                         'background-color': 'white'
                                     });
                $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
                $('#LoadingDiv,#Load').show();
            
                var params = {};
                params['name'] = $('#ProductName').text();
                params['caption'] = $('#ProductCity').text();
                params['description'] = $('#imightlike').val();
                params['picture'] = Service.ImageUrl + $('#ProductImageUrl').val();
            
                FB.api('/me/feed', 'post', params, function (response) {
                    $('#LoadingDiv,#Load').hide();
                    if (!response || response.error) {
                        alert(JSON.stringify(response.error));
                    } else {
                        alert('Content Posted on your wall successfully.');
                    }
                });
            }
            
            function login() {
                FB.login(
                    function (response) {
                        if (response.session) {
                            var data = $.parseJSON(localStorage.User);
            
                            if (data.AlwaysInGroup && data.AlwaysOnPage) {
                                postToFeed();
                                if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                                    postToGroup(data.GroupID);
                                }
                            } else if (data.AlwaysInGroup) {
                                if (data.GroupID != null && data.GroupID != '' && data.GroupID != undefined) {
                                    postToGroup(data.GroupID);
                                }
                            } else if (data.AlwaysOnPage) {
                                postToFeed();
                            } else {
                                alert('Please tweak facebook posting settings in More -> facebook settings tab.');
                                return;
                            }
                        } else {
                        }
                    },
                    { perms: "email,user_status,user_photos,user_about_me,publish_actions,friends_groups,user_groups,read_stream,publish_stream,user_hometown,user_location" }
                    , { scope: "email,user_status,user_photos,user_about_me,publish_actions,friends_groups,user_groups,read_stream,publish_stream,user_hometown,user_location" }
                    );
            }
            
            
            
            function postToGroup(Group) {
                $("#LoadingDiv").css({
                                         "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                                         'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                                         'background-color': 'white'
                                     });
                $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
                $('#LoadingDiv,#Load').show();
            
                var params = {};
                params['name'] = $('#ProductName').text();
                params['caption'] = $('#ProductCity').text();
                params['description'] = $('#imightlike').val();
                params['picture'] = Service.ImageUrl + $('#ProductImageUrl').val();
            
                FB.api("/" + Group + "/feed", 'post', params, function (response) {
                    $('#LoadingDiv,#Load').hide();
                    if (!response || response.error) {
                        alert(JSON.stringify(response.error));
                    } else {
                        alert('Content Posted in your Group successfully.');
                    }
                });
            }
            
