var Categories = '';

var GiveProduct = new Object();

GiveProduct.Product = {
    Name: '',
    Description: '',
    long_description: '',
    Price: '',
    Type: '',
    Image: '',
    Category: '',
    GeoLocation: '',
    Lat: '',
    Long: '',
    IsActive: true,
    Status: 'POSTED'
}

function saveItem() {
    if (User == undefined)
        return;
    if (User.UserRole == "3") {
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
            var CacheItem = '{  "NavigateURL":"giveaway.html",' +
                            '"GiveAwayImage":"' + ProductImage + '",' +
                            '"GiveAwayProductName":"' + $('#description').val() + '",' +
                            '"GiveAwayProductDescription":"' + $('#MightLike').val() + '",' +
                            '"GiveAwayProductFurtherDescription":"' + $('#long_description').val() + '",' +
                            '"GiveAwayProductCategories":"' + $('#select-custom-24').val() + '",' +
                            '"GiveAwayPrice":"' + $('#SwapValue').val() + '",' +
                            '"GiveAwayLat":"' + ProductLat + '",' +
                            '"GiveAwayLong":"' + ProductLong + '"' +
                            '}';
            localStorage.CacheItem = CacheItem;
            app.application.navigate("signup_login.html");
            return;
        } else {
            return;
        }
    }

    if (User.FirstName == "" || User.PhoneNumber == "" || User.EmailID == "") {
        var message = '';
        switch (localStorage.Language) {
            case "1":
                message = Language.Danish.PleaseUpdate;
                break;
            case "2":
                message = Language.German.PleaseUpdate;
                break;
            case "3":
                message = Language.English.PleaseUpdate;
                break;
            case "4":
                message = Language.Spanish.PleaseUpdate;
                break;
        }

        if (confirm(message)) {
            var CacheItem = '{"NavigateURL":"giveaway.html",' +
                            '"GiveAwayImage":"' + ProductImage + '",' +
                            '"GiveAwayProductName":"' + $('#description').val() + '",' +
                            '"GiveAwayProductDescription":"' + $('#MightLike').val() + '",' +
                            '"GiveAwayProductFurtherDescription":"' + $('#long_description').val() + '",' +
                            '"GiveAwayProductCategories":"' + $('#select-custom-24').val() + '",' +
                            '"GiveAwayPrice":"' + $('#SwapValue').val() + '",' +
                            '"GiveAwayLat":"' + ProductLat + '",' +
                            '"GiveAwayLong":"' + ProductLong + '"' +
                            '}';
            localStorage.CacheItem = CacheItem;
            app.application.navigate("basic_setup.html");
            return;
        } else {
            return;
        }
    }

    var flag = true;
    var Error = '';
    if (PictureTaken == false) {
        flag = false;
        if (Error == '') {
            switch (localStorage.Language) {
                case "1":
                    Error = Language.Danish.PicItem;
                    break;
                case "2":
                    Error = Language.German.PicItem;
                    break;
                case "3":
                    Error = Language.English.PicItem;
                    break;
                case "4":
                    Error = Language.Spanish.PicItem;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    Error = Error + Language.Danish.PicItem;
                    break;
                case "2":
                    Error = Error + Language.German.PicItem;
                    break;
                case "3":
                    Error = Error + Language.English.PicItem;
                    break;
                case "4":
                    Error = Error + Language.Spanish.PicItem;
                    break;
            }
        }
    }

    if ($('#description').val() == '') {
        flag = false;
        if (Error == '') {
            switch (localStorage.Language) {
                case "1":
                    Error = Language.Danish.NameItem;
                    break;
                case "2":
                    Error = Language.German.NameItem;
                    break;
                case "3":
                    Error = Language.English.NameItem;
                    break;
                case "4":
                    Error = Language.Spanish.NameItem;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    Error = Error + Language.Danish.NameItem;
                    break;
                case "2":
                    Error = Error + Language.German.NameItem;
                    break;
                case "3":
                    Error = Error + Language.English.NameItem;
                    break;
                case "4":
                    Error = Error + Language.Spanish.NameItem;
                    break;
            }
        }
    }

    var filter = /^[+]?([.]\d+|\d+([.]\d+)?)$/;

    var selectedOption = $("input[name='abc']:checked").val();
    debugger;
    if (selectedOption == "3" || selectedOption == "4" || selectedOption == "5" || selectedOption == "6") {
        if ($('#price').val() == 'Value' || $('#price').val() == '' || $('#price').val() == '0') {
            flag = false;
            if (Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.PriceItem;
                        break;
                    case "2":
                        Error = Language.German.PriceItem;
                        break;
                    case "3":
                        Error = Language.English.PriceItem;
                        break;
                    case "4":
                        Error = Language.Spanish.PriceItem;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.PriceItem;
                        break;
                    case "2":
                        Error = Error + Language.German.PriceItem;
                        break;
                    case "3":
                        Error = Error + Language.English.PriceItem;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.PriceItem;
                        break;
                }
            }
        } else if (!filter.test($('#price').val())) {
            flag = false;
            if (Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.ValidSwap;
                        break;
                    case "2":
                        Error = Language.German.ValidSwap;
                        break;
                    case "3":
                        Error = Language.English.ValidSwap;
                        break;
                    case "4":
                        Error = Language.Spanish.ValidSwap;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.ValidSwap;
                        break;
                    case "2":
                        Error = Error + Language.German.ValidSwap;
                        break;
                    case "3":
                        Error = Error + Language.English.ValidSwap;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.ValidSwap;
                        break;
                }
            }
        }
    }

    if (selectedOption == "4" || selectedOption == "5") {
        if ($('#price').val() == 'Value' || $('#price').val() == '' || $('#price').val() == '0') {
            flag = false;
            if (Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.ValidPice;
                        break;
                    case "2":
                        Error = Language.German.ValidPice;
                        break;
                    case "3":
                        Error = Language.English.ValidPice;
                        break;
                    case "4":
                        Error = Language.Spanish.ValidPice;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.ValidPice;
                        break;
                    case "2":
                        Error = Error + Language.German.ValidPice;
                        break;
                    case "3":
                        Error = Error + Language.English.ValidPice;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.ValidPice;
                        break;
                }
            }
        } else if (!filter.test($('#price').val())) {
            flag = false;
            if (Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        Error = Language.Danish.ValidPice;
                        break;
                    case "2":
                        Error = Language.German.ValidPice;
                        break;
                    case "3":
                        Error = Language.English.ValidPice;
                        break;
                    case "4":
                        Error = Language.Spanish.ValidPice;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        Error = Error + Language.Danish.ValidPice;
                        break;
                    case "2":
                        Error = Error + Language.German.ValidPice;
                        break;
                    case "3":
                        Error = Error + Language.English.ValidPice;
                        break;
                    case "4":
                        Error = Error + Language.Spanish.ValidPice;
                        break;
                }
            }
        }
    }



    if (flag == false) {
        $('#Save').removeAttr('disabled');
        alert(Error);
        return;
    }

    GiveProduct.Product.Name = $('#description').val();
    GiveProduct.Product.Description = $('#MightLike').val();
    GiveProduct.Product.long_description = $('#long_description').val();

    if (selectedOption == "3" || selectedOption == "4" || selectedOption == "5" || selectedOption == "6") {
        GiveProduct.Product.Price = $('#price').val();

        if (selectedOption == "4" || selectedOption == "5")
            GiveProduct.Product.Type = 'Swap';
        else
            GiveProduct.Product.Type = 'priced';
    } else {
        GiveProduct.Product.Price = 0;
        GiveProduct.Product.Type = 'free';
    }

    debugger;
    switch(selectedOption) {
        case "1":
            GiveProduct.Product.Type = 'giveaway';
            break;
        case "2":
            GiveProduct.Product.Type = 'trade';
            break;
        case "3":
            GiveProduct.Product.Type = 'lend';
            break;
        case "4":
            GiveProduct.Product.Type = 'service';
            break;
        case "5":
            GiveProduct.Product.Type = 'sell';
            break;
        default:
            // it should be an exception
            GiveProduct.Product.Type = 'none';
            break;
    }

    var str = "";
    $("select option:selected").each(function () {
        str += $(this).attr('id') + ",";
    });

    if ($.trim(str) != "" && $.trim(str) != null)
        GiveProduct.Product.Category = str.substring(0, str.length - 1);
    else
        GiveProduct.Product.Category = "NO";

    /* if (ProductImage == '')
    GiveProduct.Product.Image = "";
    else
    GiveProduct.Product.Image = ProductImage;*/

    GiveProduct.Product.Category = $("#select-custom-24").val();
    if ($("#image1").attr("src") != "images/imageplaceholder.png") {
        GiveProduct.Product.Image1 = $("#image1").attr("src").replace("data:image/jpeg;base64,", "")
    } else {
        GiveProduct.Product.Image1 = "";
    }

    if ($("#image2").attr("src") != "images/imageplaceholder.png") {
        GiveProduct.Product.Image2 = $("#image2").attr("src").replace("data:image/jpeg;base64,", "")
    } else {
        GiveProduct.Product.Image2 = "";
    }

    if ($("#image3").attr("src") != "images/imageplaceholder.png") {
        GiveProduct.Product.Image3 = $("#image3").attr("src").replace("data:image/jpeg;base64,", "")
    } else {
        GiveProduct.Product.Image3 = "";
    }

    if (GiveProduct.Product.Category.indexOf("Food") >= 0) {
        IsFoodSelected = true;

        Data = '{"UserID": "' + User.Id + '",' +
               '"name":"' + GiveProduct.Product.Name + '",' +
               '"description":"' + GiveProduct.Product.Description + '",' +
               '"long_description":"' + GiveProduct.Product.long_description + '",' +
             //  '"Categorylist":"' + GiveProduct.Product.Category + '",' +
               '"Image":"' + GiveProduct.Product.Image + '",' +
               '"Price":"' + GiveProduct.Product.Price + '",' +
               '"Type":"' + GiveProduct.Product.Type + '",' +
        		 '"Category":"' + GiveProduct.Product.Category + '",' +
               '"Latitude":"' + ProductLat + '",' +
               '"Longitude":"' + ProductLong + '",';

        localStorage.PostProductData = Data;
    } else {
        IsFoodSelected = false;
        Data = '{"UserID": "' + User.Id + '",' +
               '"name":"' + GiveProduct.Product.Name + '",' +
               '"description":"' + GiveProduct.Product.Description + '",' +
               '"long_description":"' + GiveProduct.Product.long_description + '",' +
               '"Categorylist":"' + GiveProduct.Product.Category + '",' +
               '"Image1":"' + GiveProduct.Product.Image1 + '",' +
               '"Image2":"' + GiveProduct.Product.Image2 + '",' +
               '"Image3":"' + GiveProduct.Product.Image3 + '",' +
               '"Price":"' + GiveProduct.Product.Price + '",' +
               '"Type":"' + GiveProduct.Product.Type + '",' +
       		 '"Category":"' + GiveProduct.Product.Category + '",' +
               '"Latitude":"' + ProductLat + '",' +
               '"Longitude":"' + ProductLong + '",' +
               '"IsActive":"' + GiveProduct.Product.IsActive + '",' +
               '"Status":"' + GiveProduct.Product.Status + '"}';
    }

    if ($('#PriceTag').is(':checked')) {
        Payment();
    } else {
        if (IsFoodSelected == false)
            CreateProduct(JSON.parse(Data));
        else
            app.application.navigate("nearest_food.html");
    }
}

function CreateProduct(Data) {
    console.log(Data);
    var data = app.everlive.data('Product');
    window.getLocation()
           .done(function (position) {
               debugger;
               data.create({
                   'UserID': Data.UserID, "Name": Data.name, "Description": Data.description, "MoreInformation": Data.long_description,
                   "IsActive": Data.IsActive, "Price": Data.Price, "Type": Data.Type, "Status": Data.Status, "Category": Data.Category,
                   "Latitude": position.coords.latitude, "Longitude": position.coords.longitude
               },
           function (data) {
               console.log(data);
               localStorage.NewProductID = data.result.Id;
               createGiveAwayImage(data.result.Id, Data.Image1, 1);
               createGiveAwayImage(data.result.Id, Data.Image2, 2);
               createGiveAwayImage(data.result.Id, Data.Image3, 3);

               switch (localStorage.Language) {
                   case "1":
                       alert(Language.Danish.ItemPosted);
                       break;
                   case "2":
                       alert(Language.German.ItemPosted);
                       break;
                   case "3":
                       alert(Language.English.ItemPosted);
                       break;
                   case "4":
                       alert(Language.Spanish.ItemPosted);
                       break;
               }

               window.localStorage.removeItem('CacheItem');
               if (User.UserRole == "1") {
                   app.application.navigate("Terra.html");
               } else {
                   app.application.navigate("thanks.html");
               }
           },
           function (error) {
               console.log(error);
           });
           })
           .fail(function (error) {
               alert(error.message); /*TODO: Better handling*/
           });


}

function createGiveAwayImage(id, image, num) {
    if (image == "")
        return;

    var file = {
        "Filename": "giveAwayPicture.jpeg",
        "ContentType": "image/jpeg",
        "CustomField": "customValue",
        "base64": image
    };

    app.everlive.Files.create(file,
                  function (data) {
                      app.everlive.Files.getById(data.result.Id)
                         .then(function (res) {
                             var d = app.everlive.data("Product");
                             var field = 'Image' + num;
                             var obj = {};
                             obj.Id = id;
                             obj['' + field] = res.result.Uri;
                             console.log(obj);
                             d.updateSingle(obj,
                                      function (i) {
                                          console.log(i);
                                      },
                                      function (error) {
                                          console.log(error);
                                      });
                         },
                         function (error) {
                             alert(JSON.stringify(error));
                         });
                  },
                  function (error) {
                      alert(JSON.stringify(error));
                  });
}


//===========================================================PAYMENT======================================================================


///////////////////////////////////////////////////give html

var IsFoodSelected = false;
var ProductLat = '';
var ProductLong = '';
var ProductImage = '';
var PictureTaken = false;
var geocoder;
var User = null;
var Data;

function LoadStorageData() {
    // var Item = JSON.stringify(localStorage.CacheItem);
    Item = $.parseJSON(localStorage.CacheItem);
    if (Item.GiveAwayImage != undefined && Item.GiveAwayImage != '') {
        PictureTaken = true;
        ProductImage = Item.GiveAwayImage;
        var Image = document.getElementById('image');
        Image.src = "data:image/jpeg;base64," + Item.GiveAwayImage;
    }

    if (Item.GiveAwayProductName != undefined && Item.GiveAwayProductName != '')
        $('#description').val(Item.GiveAwayProductName);
    if (Item.GiveAwayProductDescription != undefined && Item.GiveAwayProductDescription != '')
        $('#MightLike').val(Item.GiveAwayProductDescription);
    if (Item.GiveAwayProductFurtherDescription != undefined && Item.GiveAwayProductFurtherDescription != '')
        $('#long_description').val(Item.GiveAwayProductDescription);
    if (Item.GiveAwayProductCategories != undefined && Item.GiveAwayProductCategories != '')
        $('#select-custom-24').val(Item.GiveAwayProductCategories);

    if (Item.GiveAwayPrice != undefined && Item.GiveAwayPrice != '') {
        if (User.UserRole == "2" || User.UserRole == "3") {
            $('#SwapValue').val(Item.GiveAwayPrice);
        } else {
            $('#SwapValue').val(0);
        }
    }
    if (Item.GiveAwayLat != undefined && Item.GiveAwayLat != '')
        ProductLat = Item.GiveAwayLat;
    if (Item.GiveAwayLong != undefined && Item.GiveAwayLong != '')
        ProductLong = Item.GiveAwayLong;
}

function onGetCurrentPositionSuccess(position) {
    //  alert(position.coords.latitude + ',' + position.coords.longitude);
    var lat = parseFloat(position.coords.latitude);
    var lng = parseFloat(position.coords.longitude);
    ProductLat = lat;
    ProductLong = lng;
}

function onGetCurrentPositionError(error) {
    alert("Couldn't get geo coords from device");
}

function takePicture() {
    gpsEnabledSuccessCallback(true);
    // window.plugins.diagnostic.isLocationEnabled(locationEnabledSuccessCallback, locationEnabledErrorCallback);
}

function onPhotoDataSuccess(imageData) {
    PictureTaken = true;
    ProductImage = imageData;
    var Image = document.getElementById('image');
    Image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    // alert('There was a problem when taking the picture: \n Possible issues:\n'+
    //        'Memory card is not available.');
}

function onTakePictureConfirm(buttonIndex) {
    //alert('You selected button ' + buttonIndex);
}

function locationEnabledSuccessCallback(result) {
    if (result)
        window.plugins.diagnostic.isGpsEnabled(gpsEnabledSuccessCallback, gpsEnabledErrorCallback);
    else {
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.Location);
                break;
            case "2":
                alert(Language.German.Location);
                break;
            case "3":
                alert(Language.English.Location);
                break;
            case "4":
                alert(Language.Spanish.Location);
                break;
        }
        window.plugins.diagnostic.switchToLocationSettings();
    }
}

function locationEnabledErrorCallback(error) {
    alert("error location enabled: " + error);
}

function gpsEnabledSuccessCallback(result) {
    if (result) {
        var options = { maximumAge: 60000, timeout: 40000, enableHighAccuracy: true };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError, options);
        } else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.FailLoc);
                    break;
                case "2":
                    alert(Language.German.FailLoc);
                    break;
                case "3":
                    alert(Language.English.FailLoc);
                    break;
                case "4":
                    alert(Language.Spanish.FailLoc);
                    break;
            }
        }

        var destinationType = navigator.camera.DestinationType;
        if ($('#image').attr('src') == "images/imageplaceholder.png") {
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
        } else {
            navigator.notification.confirm('Do you want to take a new photo? This will replace the current photo.',
                                           function () {
                                               navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 300, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
                                           }, 'New photo', 'No,Yes');
        }
    } else {
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.Location);
                break;
            case "2":
                alert(Language.German.Location);
                break;
            case "3":
                alert(Language.English.Location);
                break;
            case "4":
                alert(Language.Spanish.Location);
                break;
        }
        window.plugins.diagnostic.switchToLocationSettings();
    }
}

function gpsEnabledErrorCallback(error) {
    alert("error gps enabled: " + error);
}

// Show a custom confirmation dialog
//

function changeLanguage(lang) {
    // var langResources = getLanguageResources()[lang];
    // $("span[name='spn']").each(function (i, elt) {
    //  $(elt).html(langResources[$.trim($(elt).text())]);
    // });
}

function showGiveAway(e) {
    TranslateApp();
    window.utility.resetScroller(e);
    $(".radio-options").show();
    $(".after-radio").hide();
    $('input:radio[name=abc]:checked').prop("checked", false);
    $("#Save").show();
    $("#Update").hide();

    if (e.view.params.editSpotId != undefined) {
        editThisProduct(e.view.params.editSpotId);
    } else {
        $('#description').val();
        $('#MightLike').val();
        $('#long_description').val();
        $('#price').val();
        $("#select-custom-24").val();
        $("#image1").attr("src", "images/imageplaceholder.png");
        $("#image2").attr("src", "images/imageplaceholder.png");
        $("#image3").attr("src", "images/imageplaceholder.png");
    }
}

function initGiveAway() {
    try {
        $('input:radio[name=abc]').click(function () {
            $(".radio-options").hide();
            $(".after-radio").show();
            var opt = $('input:radio[name=abc]:checked').val();
            if (opt == '2' || opt == '5' || opt == '6') {
                $(".mightLike").show();
            } else {
                $(".mightLike").hide();
            }

            if (opt == '3' || opt == '6') {
                $(".price").show();
                $(".lend").hide();
                $(".price-div").show();
            } else if (opt == '4' || opt == '5') {
                $(".price").hide();
                $(".lend").show();
                $(".price-div").show();
            } else {
                $(".price-div").hide();
            }
        });

        $('#trMightLike,#trMightLikelabel').css({ 'display': 'none' });

        if (localStorage.User == null || localStorage.User == undefined) {
            app.application.navigate('signup_login.html');
        } else {
            User = $.parseJSON(localStorage.User);
        }

        switch (localStorage.Language) {
            case "1":
                localStorage.LanguageType = "dk";

                var menuItem = $("<option value='' id=''></option>");
                menuItem.html("Tags/kategorier");
                $("#select-custom-24").append(menuItem);

                $.each(Tags.Danish, function (i) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.Danish[i].Value);
                    menuItem.attr('id', Tags.Danish[i].id);
                    menuItem.attr('Value', Tags.Danish[i].id);
                    $("#select-custom-24").append(menuItem);
                });
                break;
            case "2":
                localStorage.LanguageType = "de";
                var menuItem = $("<option value='' id=''></option>");
                menuItem.html("Tags/Categories");
                $("#select-custom-24").append(menuItem);

                $.each(Tags.German, function (i) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.German[i].Value);
                    menuItem.attr('id', Tags.German[i].id);
                    menuItem.attr('value', Tags.German[i].id);
                    $("#select-custom-24").append(menuItem);
                });
                break;
            case "3":
                localStorage.LanguageType = "en";
                var menuItem = $("<option value='' id=''></option>");
                menuItem.html("Tags/Categories");
                $("#select-custom-24").append(menuItem);

                $.each(Tags.English, function (i) {
                    var menuItem = $("<option id=''></option>");
                    if (Tags.English[i] != undefined) {
                        menuItem.html(Tags.English[i].Value);
                        menuItem.attr('id', Tags.English[i].id);
                        menuItem.attr('value', Tags.English[i].id);
                        $("#select-custom-24").append(menuItem);
                    }
                });
                break;
            case "4":
                localStorage.LanguageType = "es";
                var menuItem = $("<option value='' id=''></option>");
                menuItem.html("Tags/Categories");
                $("#select-custom-24").append(menuItem);

                $.each(Tags.Spanish, function (i) {
                    var menuItem = $("<option id=''></option>");
                    menuItem.html(Tags.Spanish[i].Value);
                    menuItem.attr('id', Tags.Spanish[i].id);
                    menuItem.attr('value', Tags.Spanish[i].id);
                    $("#select-custom-24").append(menuItem);
                });
                break;
        }

        if (localStorage.CacheItem != undefined && localStorage.CacheItem != '') {
            LoadStorageData();
        }

        window.localStorage.removeItem('CacheItem');

        $('.ui-select').parent().css({ 'z-index': '1' });

        $('#maskDiv').css({
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': '100%',
            'z-index': '2',
            'display': 'block',
            'position': 'absolute'
        });

        $('#maskDiv').click(function () {
            var flag = true;
            var Error = '';
            if (PictureTaken == false) {
                flag = false;
                if (Error == '') {
                    switch (localStorage.Language) {
                        case "1":
                            Error = Language.Danish.PicItem;
                            break;
                        case "2":
                            Error = Language.German.PicItem;
                            break;
                        case "3":
                            Error = Language.English.PicItem;
                            break;
                        case "4":
                            Error = Language.Spanish.PicItem;
                            break;
                    }
                } else {
                    switch (localStorage.Language) {
                        case "1":
                            Error = Error + Language.Danish.PicItem;
                            break;
                        case "2":
                            Error = Error + Language.German.PicItem;
                            break;
                        case "3":
                            Error = Error + Language.English.PicItem;
                            break;
                        case "4":
                            Error = Error + Language.Spanish.PicItem;
                            break;
                    }
                }
            }

            if ($('#description').val() == '') {
                flag = false;
                if (Error == '') {
                    switch (localStorage.Language) {
                        case "1":
                            Error = Language.Danish.NameItem;
                            break;
                        case "2":
                            Error = Language.German.NameItem;
                            break;
                        case "3":
                            Error = Language.English.NameItem;
                            break;
                        case "4":
                            Error = Language.Spanish.NameItem;
                            break;
                    }
                } else {
                    switch (localStorage.Language) {
                        case "1":
                            Error = Error + Language.Danish.NameItem;
                            break;
                        case "2":
                            Error = Error + Language.German.NameItem;
                            break;
                        case "3":
                            Error = Error + Language.English.NameItem;
                            break;
                        case "4":
                            Error = Error + Language.Spanish.NameItem;
                            break;
                    }
                }
            }

            var filter = /^[+]?([.]\d+|\d+([.]\d+)?)$/;
            if ($('#PriceTag').is(':checked')) {
                if ($('#SwapValue').val() == 'Value' || $('#SwapValue').val() == '' || $('#SwapValue').val() == '0') {
                    flag = false;
                    if (Error == '') {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Language.Danish.PriceItem;
                                break;
                            case "2":
                                Error = Language.German.PriceItem;
                                break;
                            case "3":
                                Error = Language.English.PriceItem;
                                break;
                            case "4":
                                Error = Language.Spanish.PriceItem;
                                break;
                        }
                    } else {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Error + Language.Danish.PriceItem;
                                break;
                            case "2":
                                Error = Error + Language.German.PriceItem;
                                break;
                            case "3":
                                Error = Error + Language.English.PriceItem;
                                break;
                            case "4":
                                Error = Error + Language.Spanish.PriceItem;
                                break;
                        }
                    }
                } else if (!filter.test($('#SwapValue').val())) {
                    flag = false;
                    if (Error == '') {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Language.Danish.ValidSwap;
                                break;
                            case "2":
                                Error = Language.German.ValidSwap;
                                break;
                            case "3":
                                Error = Language.English.ValidSwap;
                                break;
                            case "4":
                                Error = Language.Spanish.ValidSwap;
                                break;
                        }
                    } else {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Error + Language.Danish.ValidSwap;
                                break;
                            case "2":
                                Error = Error + Language.German.ValidSwap;
                                break;
                            case "3":
                                Error = Error + Language.English.ValidSwap;
                                break;
                            case "4":
                                Error = Error + Language.Spanish.ValidSwap;
                                break;
                        }
                    }
                }
            }

            if ($('#chkSwap').is(':checked')) {
                if ($('#SwapValue').val() == 'Value' || $('#SwapValue').val() == '' || $('#SwapValue').val() == '0') {
                    flag = false;
                    if (Error == '') {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Language.Danish.ValidPice;
                                break;
                            case "2":
                                Error = Language.German.ValidPice;
                                break;
                            case "3":
                                Error = Language.English.ValidPice;
                                break;
                            case "4":
                                Error = Language.Spanish.ValidPice;
                                break;
                        }
                    } else {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Error + Language.Danish.ValidPice;
                                break;
                            case "2":
                                Error = Error + Language.German.ValidPice;
                                break;
                            case "3":
                                Error = Error + Language.English.ValidPice;
                                break;
                            case "4":
                                Error = Error + Language.Spanish.ValidPice;
                                break;
                        }
                    }
                } else if (!filter.test($('#SwapValue').val())) {
                    flag = false;
                    if (Error == '') {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Language.Danish.ValidPice;
                                break;
                            case "2":
                                Error = Language.German.ValidPice;
                                break;
                            case "3":
                                Error = Language.English.ValidPice;
                                break;
                            case "4":
                                Error = Language.Spanish.ValidPice;
                                break;
                        }
                    } else {
                        switch (localStorage.Language) {
                            case "1":
                                Error = Error + Language.Danish.ValidPice;
                                break;
                            case "2":
                                Error = Error + Language.German.ValidPice;
                                break;
                            case "3":
                                Error = Error + Language.English.ValidPice;
                                break;
                            case "4":
                                Error = Error + Language.Spanish.ValidPice;
                                break;
                        }
                    }
                }
            }

            if (flag) {
                $('#maskDiv').css({ 'display': 'none' });
                //  $('select').selectmenu('open');
            } else {
                alert(Error);
                //  e.stopPropagation();
                return false;
            }
        });

        $('#PriceTag').click(function () {
            $('#trMightLike ,#trMightLikelabel').removeAttr('style');
            $('#trvalue').css({ 'display': 'block' });
            $('#chkFree').removeAttr('checked');
            $('#chkSwap').removeAttr('checked');
            if ($(this).is(':checked')) {
                var message = '';
                switch (localStorage.Language) {
                    case "1":
                        message = Language.Danish.pricetag;
                        break;
                    case "2":
                        message = Language.German.pricetag;
                        break;
                    case "3":
                        message = Language.English.pricetag;
                        break;
                    case "4":
                        message = Language.Spanish.pricetag;
                        break;
                }

                if (confirm(message)) {
                    return;
                } else {
                    $('#trMightLike,#trMightLikelabel').css({ 'display': 'none' });
                    $('#trvalue').css({ 'display': 'none' });
                    $(this).removeAttr('checked');
                    $('#chkFree').attr('checked');
                }
            }
        });

        $('#chkFree').click(function () {
            $('#trMightLike,#trMightLikelabel').css({ 'display': 'none' });
            $('#trvalue').css({ 'display': 'none' });
            $('#chkSwap').removeAttr('checked');
            $('#PriceTag').removeAttr('checked');
        });

        $('#chkSwap').click(function () {
            $('#trMightLike ,#trMightLikelabel').removeAttr('style');
            $('#trvalue').css({ 'display': 'block' });
            $('#chkFree').removeAttr('checked');
            $('#PriceTag').removeAttr('checked');
        });
    } catch (err) {
        alert(err);
        alert(JSON.stringify(err));
    }
}

var imgNumber = "";

function takePictureGiveAway(e) {
    imgNumber = e;
    var destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onPhotoDataSuccessGA, onFail, { quality: 70, targetWidth: 600, targetHeight: 400, allowEdit: true, destinationType: destinationType.DATA_URL, correctOrientation: true });
}

function onPhotoDataSuccessGA(imageData) {
    // localStorage.SpotImage = imageData;      
    PictureTaken = true;
    debugger;
    var canvas = document.getElementById("cc");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.crossOrigin = "Anonymous"; //cors support
    img.onload = function () {
        var W = img.width;
        var H = img.height;
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(img, 0, 0); //draw image

        //resize manually with 350 x 350 px
        //https://github.com/viliusle/Hermite-resize/
        resample_hermite(canvas, W, H, 350, 350);

        var resizedImageData = canvas.toDataURL("image/jpeg");
        var photo = document.getElementById('image' + imgNumber);
        // UNDONE: implement Cordova for this https://jbkflex.wordpress.com/2012/12/21/html5-canvas-todataurl-support-for-android-devices-working-phonegap-2-2-0-plugin/#comment-2803
        photo.src = resizedImageData;
        //photo.src = "data:image/jpeg;base64," + imageData;
    }

    img.src = "data:image/jpeg;base64," + imageData;
}