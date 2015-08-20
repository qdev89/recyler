var app = window.app = window.app || {};
var editableProduct;
var currentProductID;
function navigateToEditProduct(el) {
    var productID = $(el).attr('productID');
    console.log(productID);
    app.application.navigate("giveaway.html?editSpotId=" + productID);
}


function toggleFavorite() {
    if ($("#favorite-on-button").css('display') == 'none') {
        addFavorite();
    } else {
        removeFavorite();
    }
}

function getFavorite() {
    debugger;
    var user = $.parseJSON(localStorage.User);
    var data = app.everlive.data('FavoriteProducts');
    data.count({ 'ProductID': currentProductID, 'UserID': user.Id }, // filter
    function (data) {
        debugger;
        if (data.result == 1) {
            $("#favorite-off-button").hide();
            $("#favorite-on-button").show();
        } else {
            $("#favorite-off-button").show();
            $("#favorite-on-button").hide();
        }
    },
    function (error) {
        debugger;
        alert(JSON.stringify(error));
    });
    }

    function addFavorite() {
        var user = $.parseJSON(localStorage.User);
        var data = app.everlive.data('FavoriteProducts');
        debugger;
        data.create({
            ProductID: currentProductID,
            UserID: user.Id
        }, function (data) {
            $("#favorite-off-button").hide();
            $("#favorite-on-button").show();
        },
             function (error) {
                 // DO NOTHING
             });
    }

    function removeFavorite() {
        var user = $.parseJSON(localStorage.User);
        var data = app.everlive.data('FavoriteProducts');

        data.destroy({
            ProductID: currentProductID,
            UserID: user.Id
        }, function (data) {
            $("#favorite-off-button").show();
            $("#favorite-on-button").hide();
        },
             function (error) {
                 // DO NOTHING
             });
    }

    function loadProduct(e) {
        currentProductID = e.sender.params.productID;
        var visitedProductIds = [];
        if (localStorage.isVisitedProductIds) {
            visitedProductIds = JSON.parse(localStorage.isVisitedProductIds);
        }

        if (visitedProductIds.indexOf(e.sender.params.productID) == -1) {
            visitedProductIds.push(e.sender.params.productID);
            localStorage.isVisitedProductIds = JSON.stringify(visitedProductIds);
        }

        window.utility.resetScroller(e);
        TranslateApp();
        app.addBanner(20);


        //console.log(e);

        var fillProductInfo = function (product) {

            showLoading();
            var fillCallback = function (user) {
                getFavorite();
                console.log(user);

                app.lastProductOwner = user;

                // calculate distance
                var distance = 0;
                if (product.Latitude && product.Longitude && app.currentPosition) {
                    distance = getDistanceFromLatLonInKm(product.Latitude, product.Longitude, app.currentPosition.coords.latitude, app.currentPosition.coords.longitude);
                }

                if (user.distance == "Miles") {
                    //$("product-distance-unit").html(" miles)
                    distance = convertKmToMiles(distance) + " miles";
                } else {
                    distance = distance + " km";
                }

                var selector = "#product-tabstrip .fields ";
                $(selector + ".username").html(user.DisplayName);
                $(selector + ".distance").html(distance);
                $(selector + ".city").html(user.City);

                $(selector + ".type").html(product.Type);
                $(selector + ".type").attr("data-localize", product.Type);
                $(selector + ".title").html(product.Name);
                $(selector + ".status").html(product.Status);
                $(selector + ".date").html(new Date(product.CreatedAt).toDateString());
                $(selector + ".price").html(product.Price);
                $(selector + ".info").html(product.MoreInformation);
                $(selector + ".instead").html(product.Description);

                var translatedCategory = TranslateCategory(product.Category);
                $(selector + ".category").html(translatedCategory);
                $("#categoryProduct").attr("href", "categoryProducts.html?category=" + product.Category);
                //$(selector + ".category").attr("category", product.Category);

                $("#WantIt").attr("href", "userItems.html?userId=" + product.UserID);
                $("#NoInterest").attr("productId", product.Id);
                var publishUser = $.grep(app.Users.users(), function (e) {
                    return e.Id === product.UserID;
                })[0];
                $("#publisherAvatar").attr("src", publishUser.ImageData);

                var images = [];
                if (product.Image1 != undefined)
                    images.push({
                        url: product.Image1
                    });

                if (product.Image2 != undefined)
                    images.push({
                        url: product.Image2
                    });

                if (product.Image3 != undefined)
                    images.push({
                        url: product.Image3
                    });

                var x = new kendo.data.DataSource({
                    data: images
                });
                $("#scrollview-container").data("kendoMobileScrollView").setDataSource(x);
                everliveImages.responsiveAll();

                // add map location

                // MOCKUP:
                // var geoString = '{ "lat": -34.397, "lng" : 150.644}';
                //var geo =JSON.parse(geoString);
                if (product.Latitude && product.Longitude) {
                    $('#map_of_where_item_is_placed').show();
                    var geo = {
                        lat: product.Latitude,
                        lng: product.Longitude
                    };
                    window.mapUtitityShow(product.Name, geo);
                } else {
                    $('#map_of_where_item_is_placed').hide();
                }


                // Update Views
                var views = product.Views ? product.Views + 1 : 1;
                var updateProduct = app.everlive.data('Product');

                updateProduct.updateSingle({
                    Id: product.Id,
                    'Views': views
                }, function (data) {
                    console.log(data);
                },
                     function (error) {
                         // DO NOTHING
                     });
                TranslateApp();

                hideLoading();
            }
            console.log(product.CreatedBy);
            app.Users.getUserByID(product.CreatedBy, fillCallback);

        };

        app.Product.getProductByID(e.sender.params.productID, fillProductInfo);
    }


    function giveToThisUser(el) {
        var userID = $(el).attr("userID");
        console.log(userID, editableProduct.Id);

        navigator.notification.confirm(
             "Are you sure you want to give the product to this user?", // message
             function (button) {
                 if (button == 1) {
                     var data = app.everlive.data('Product');
                     data.updateSingle({
                         Id: editableProduct.Id,
                         'UserID': userID
                     },
                          function (data) {
                              alert("Product transferred successfully!");
                              app.application.navigate("mystuff.html");
                          },
                          function (error) {
                              alert(JSON.stringify(error));
                          });
                 }
             },
             'Collect CO2', ['Give', // title
                   'Cancel'] // buttonLabels
        );
    }

    function editThisProduct(productID) {

        log(productID);
        $(".radio-options").hide();
        $(".after-radio").show();
        $("#Save").hide();
        $("#Update").show();

        var data = app.everlive.data('Product');
        data.getById(productID)
             .then(function (data) {

                 editableProduct = data.result;
                 log(editableProduct);
                 if (editableProduct.Type == "free") $(".price-div").hide();
                 else $(".price-div").show();
                 $('#description').val(editableProduct.Name);
                 $('#MightLike').val(editableProduct.Description);
                 $('#long_description').val(editableProduct.MoreInformation);
                 $('#price').val(editableProduct.Price);
                 $("#select-custom-24").val(editableProduct.Category);

                 if (editableProduct.Image1 != undefined) {
                     $("#image1").attr("src", editableProduct.Image1);
                 } else {
                     $("#image1").attr("src", "images/imageplaceholder.png");
                 }

                 if (editableProduct.Image2 != undefined) {
                     $("#image2").attr("src", editableProduct.Image2);
                 } else {
                     $("#image2").attr("src", "images/imageplaceholder.png");
                 }

                 if (editableProduct.Image3 != undefined) {
                     $("#image3").attr("src", editableProduct.Image3);
                 } else {
                     $("#image3").attr("src", "images/imageplaceholder.png");
                 }

             },
                  function (error) {
                      alert(JSON.stringify(error));
                  });


    }

    function deleteItem() {

        navigator.notification.confirm(
             "Are you sure you want to delete this product?", // message
             function (button) {
                 if (button == 1)
                     var data = app.everlive.data('Product');
                 data.destroySingle({
                     Id: editableProduct.Id
                 },
                      function () {
                          alert('Product successfully deleted.');
                          app.application.navigate("mystuff.html");
                      },
                      function (error) {
                          alert(JSON.stringify(error));
                      });

             },
             'Delete product', ['Delete', // title
                                       'Cancel'] // buttonLabels
        );


    }

    function updateItem() {


        var data = app.everlive.data('Product');
        editableProduct.Name = $('#description').val();
        editableProduct.Description = $('#MightLike').val();
        editableProduct.MoreInformation = $('#long_description').val();
        editableProduct.Price = $('#price').val();
        editableProduct.Category = $("#select-custom-24").val();

        data.update({
            'Name': editableProduct.Name,
            'Description': editableProduct.Description,
            'MoreInformation': editableProduct.MoreInformation,
            'Price': editableProduct.Price,
            'Category': editableProduct.Category

        }, // data
             {
                 'Id': editableProduct.Id
             }, // filter
             function (data) {
                 console.log(data);
                 navigator.notification.alert("Info saved successfully!", null, "Success");
             },
             function (error) {
                 alert(JSON.stringify(error));
             });







        if ($("#image1").attr("src").indexOf("data:image/jpeg;base64,") != -1) {

            var imageData = $("#image1").attr("src").replace("data:image/jpeg;base64,", "");
            createGiveAwayImage(editableProduct.Id, imageData, 1)
        }
        if ($("#image2").attr("src").indexOf("data:image/jpeg;base64,") != -1) {

            var imageData = $("#image2").attr("src").replace("data:image/jpeg;base64,", "");
            createGiveAwayImage(editableProduct.Id, imageData, 2)
        }
        if ($("#image3").attr("src").indexOf("data:image/jpeg;base64,") != -1) {
            var imageData = $("#image3").attr("src").replace("data:image/jpeg;base64,", "");
            createGiveAwayImage(editableProduct.Id, imageData, 3)
        }


    }

    var slider;
    var distanceValue = 10;
    var currentUser;
    $('#distance-filter-findItem').html(distanceValue + 'km');

    function onFindItemInit(e) {
        var distanceUnit = "km";
        if (app.currentUser.distance == "Miles") {
            distanceUnit = "miles";
            $(".distance-unit").html(distanceUnit);
        } else {
            distanceUnit = "km";
            $(".distance-unit").html(distanceUnit);
        }

        $('#find-item-slider').sGlide({
            'startAt': 10,
            'pill': false,
            'totalRange': [0, 250],
            'colorShift': ['#3598db', '#3598db'],
            'buttons': true,
            drag: displayResult,
            onButton: displayResult
        });

        function displayResult(o) {
            distanceValue = Math.round(o.custom);
            $('#distance-filter-findItem').html(distanceValue);
        }
    }

    function onProductShow(e) {
        if (e.sender.params.refresh != "false") {
            utility.resetScroller(e);
            app.Product.getProducts();
        }
    }


    app.Product = (function () {
        'use strict';

        var loadMore = true;


        var productsViewModel = (function () {
            var userId = null;

            var nointerest = function (i) {

                var productId = $("#NoInterest").attr("productId");

                var visitedProductIds = [];
                if (localStorage.isVisitedProductIds) {
                    visitedProductIds = JSON.parse(localStorage.isVisitedProductIds);
                }

                var index = visitedProductIds.indexOf(productId);

                if (index != -1) {
                    visitedProductIds.splice(index, 1);
                    localStorage.isVisitedProductIds = JSON.stringify(visitedProductIds);
                }
                var selector = "[productid-finditem=" + productId + "]";
                var selectorNew = "[productid-finditem-new=" + productId + "]";
                var item = $(selector);
                var itemNew = $(selectorNew);
                if (item) {
                    item.removeClass('grayscale-img');
                }

                if (itemNew) {
                    itemNew.removeAttr('style');
                }

                app.application.navigate("finditem.html?refresh=false");
            }

            var getProductsByUserID = function (e) {
                var visitedProductIds = [];
                if (localStorage.isVisitedProductIds) {
                    visitedProductIds = JSON.parse(localStorage.isVisitedProductIds);
                }

                userId = e.sender.params.userId;
                showLoading();
                var fillCallback = function (user) {
                    $("#user-items-tabstrip span.view-title").text(user.DisplayName + "'s Stuff");
                    TranslateApp();
                    var interval = 24;

                    var listID = "#ulUserProducts";
                    var templateID = "#productTemplate";
                    var tabstripId = "#user-items-tabstrip";

                    var skip = 0;
                    var dataSource = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                showLoading();
                                try {
                                    var data = app.everlive.data('Product');
                                    var query = new Everlive.Query();
                                    query.where().eq('UserID', userId).done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    data.get(query).then(function (data) {


                                        hideLoading();
                                        options.success(data.result);

                                        setTimeout(function () {
                                            $(".img-holder").first().width();
                                        }, 10);
                                        everliveImages.responsiveAll();
                                        hideLoading();
                                        if (data.result.length == interval) {
                                            loadMore = true;
                                            skip += interval;
                                        } else
                                            loadMore = false;
                                    },
                                         function (error) {
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
                        schema: { // describe the result format
                            parse: function (response) {
                                //  console.log(response);
                                $.each(response, function (i, el) {
                                    el.Views = el.Views || 0;
                                    el.City = el.City || '';
                                    if (el.Latitude && el.Longitude && app.currentPosition) {
                                        el.Distance = getDistanceFromLatLonInKm(el.Latitude, el.Longitude, app.currentPosition.coords.latitude, app.currentPosition.coords.longitude);
                                    } else {
                                        el.Distance = 0;
                                    }

                                    if (app.currentUser.distance == "Miles") {
                                        el.Distance = convertKmToMiles(el.Distance) + " miles";
                                    } else {
                                        el.Distance = el.Distance + " km";
                                    }

                                    el.isVisited = visitedProductIds.indexOf(el.Id) != -1;

                                    if (el.Name === undefined)
                                        el.Name = "No name";

                                    el.Image = "";

                                    if (el.Image1 !== undefined)
                                        el.Image = el.Image1;
                                    else if (el.Image2 !== undefined)
                                        el.Image = el.Image2;
                                    else if (el.Image3 !== undefined)
                                        el.Image = el.Image3;

                                });
                                return response;
                            }

                        }
                    });

                    $(listID).kendoMobileListView({
                        dataSource: dataSource,
                        template: $(templateID).html(),
                        appendOnRefresh: true
                    });

                    var listView = $(listID).data("kendoMobileListView");
                    if (listView != null) {
                        listView._scrollerInstance.scrollElement.on("touchend", function () {
                            if (loadMore) {
                                if ($(listID).height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))
                                    listView.dataSource.read();
                            }
                        });
                        listView._scrollerInstance.scrollTo(0, 0);
                    }
                }

                app.Users.getUserByID(userId, fillCallback);
            }

            var getMyProducts = function () {
                getProducts(true);
            }

            var filterProducts = function () {
                var word = $("#filterWord").val();
                //   log(word);
                getProducts(false, word);
            }

            var filterProductsByDistance = function () {
                //var distance = slider.value();
                log(distanceValue);
                getProducts(false, undefined, distanceValue);
            }

            var getProducts = function (isMy, filterWord, distance) {

                var visitedProductIds = [];
                if (localStorage.isVisitedProductIds) {
                    visitedProductIds = JSON.parse(localStorage.isVisitedProductIds);
                }

                TranslateApp();
                var interval = 24;

                if (isMy && isMy.sender && isMy.sender.params.refresh == "false")
                    return;



                if (localStorage.User == undefined) {
                    app.application.navigate("signup_login.html");
                    return;
                }

                var myId = JSON.parse(localStorage.User).Id;
                var listID = "#ulProducts";
                var templateID = "#productTemplate";
                var tabstripId = "#find-item-tabstrip";
                if (isMy === true) {
                    tabstripId = "#my-stuff-tabstrip";
                    listID = "#ulMyProducts";
                    templateID = "#myProductTemplate";
                }

                if (filterWord === undefined) $("#filterWord").val("");
                //if (distance === undefined) slider.value(0);

                var skip = 0;
                var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            showLoading();
                            try {

                                var data = app.everlive.data('Product');
                                var query = new Everlive.Query();



                                var user = $.parseJSON(localStorage.User);
                                var country = user.Country || '';

                                var city = user.City || '';
                                var cityRegEx = ".*" + city + ".*";
                                var countryRegEx = ".*" + country + ".*";
                                var distanceUnit = "km";
                                if (app.currentUser.distance == "Miles") {
                                    distanceUnit = "miles";
                                } else {
                                    distanceUnit = "km";
                                }

                                //.nearSphere('Location', [app.currentPosition.coords.latitude, app.currentPosition.coords.longitude], distance, 'km');
                                if (city && user.onlycity) {
                                    if (isMy === true)
                                        query.where().eq('UserID', myId).done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    else if (filterWord !== undefined) {
                                        query.where().and().regex('Name', filterWord, 'i').regex('City', cityRegEx, 'i').done();
                                        query.orderDesc('CreatedAt').skip(skip).take(interval);
                                    }
                                    else if (distance !== undefined) {
                                        query.where().and().nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).regex('City', cityRegEx, 'i').done();
                                        query.orderDesc('CreatedAt').skip(skip).take(interval);
                                    }
                                    else
                                        query.where().regex('City', cityRegEx, 'i').done().orderDesc('CreatedAt').skip(skip).take(interval);
                                } else if (country && user.onlycountry) {
                                    if (isMy === true)
                                        query.where().and().eq('UserID', myId).done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    else if (filterWord !== undefined) {
                                        query.where().and().regex('Name', filterWord, 'i').regex('Country', countryRegEx, 'i').done();
                                        query.orderDesc('CreatedAt').skip(skip).take(interval);
                                    }
                                    else if (distance !== undefined) {
                                        query.where().and().nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).regex('Country', countryRegEx, 'i').done();
                                        query.orderDesc('CreatedAt').skip(skip).take(interval);
                                    } else
                                        query.where().regex('Country', countryRegEx, 'i').done().orderDesc('CreatedAt').skip(skip).take(interval);
                                } else {
                                    if (isMy === true)
                                        query.where().eq('UserID', myId).done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    else if (filterWord !== undefined)
                                        query.where().regex('Name', filterWord, 'i').done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    else if (distance !== undefined)
                                        query.where().nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).done().orderDesc('CreatedAt').skip(skip).take(interval);
                                    else
                                        query.orderDesc('CreatedAt').skip(skip).take(interval);
                                }

                                data.get(query).then(function (data) {
                                    options.success(data.result);

                                    setTimeout(function () {

                                        // var ul = $(".li-image").first().closest("ul");
                                        // $(ul).find("li").height($(ul).find(".img-holder").first().width());

                                        /*$(".li-image").each(function(){
                                            if($(this).height()>$(this).width())
                                                $(this).css("width","100%");
                                            else 
                                                $(this).css("height","100%")
                                        });*/

                                        $(".img-holder").first().width();
                                    }, 10);
                                    everliveImages.responsiveAll();
                                    TranslateApp();
                                    hideLoading();
                                    if (data.result.length == interval) {
                                        loadMore = true;
                                        skip += interval;
                                    } else
                                        loadMore = false;
                                },
                                     function (error) {
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
                    schema: { // describe the result format
                        parse: function (response) {
                            //  console.log(response);
                            $.each(response, function (i, el) {
                                el.Views = el.Views || 0;
                                el.City = el.City || '';

                                // calculate distance
                                if (el.Latitude && el.Longitude && app.currentPosition) {
                                    el.Distance = getDistanceFromLatLonInKm(el.Latitude, el.Longitude, app.currentPosition.coords.latitude, app.currentPosition.coords.longitude);
                                } else {
                                    el.Distance = 0;
                                }

                                if (app.currentUser.distance == "Miles") {
                                    el.Distance = convertKmToMiles(el.Distance) + " miles";
                                } else {
                                    el.Distance = el.Distance + " km";
                                }

                                el.isVisited = visitedProductIds.indexOf(el.Id) != -1;

                                if (el.Name === undefined)
                                    el.Name = "No name";

                                el.Image = "";

                                if (el.Image1 !== undefined)
                                    el.Image = el.Image1;
                                else if (el.Image2 !== undefined)
                                    el.Image = el.Image2;
                                else if (el.Image3 !== undefined)
                                    el.Image = el.Image3;

                            });
                            return response;
                        }

                    }
                });

                $(listID).kendoMobileListView({
                    dataSource: dataSource,
                    template: $(templateID).html(),
                    appendOnRefresh: true
                });

                var listView = $(listID).data("kendoMobileListView");
                if (listView != null) {
                    listView._scrollerInstance.scrollElement.on("touchend", function () {
                        if (loadMore) {
                            if ($(listID).height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))
                                listView.dataSource.read();
                        }
                    });
                    listView._scrollerInstance.scrollTo(0, 0);
                }
            }


            var getProductByID = function (id, callback) {
                showLoading();
                if (localStorage.User == undefined) {
                    app.application.navigate("signup_login.html");
                    return;
                }

                var data = app.everlive.data('Product');

                data.getById(id)
                     .then(function (data) {
                         callback(data.result);
                         hideLoading();
                     },
                          function (error) {
                              alert(JSON.stringify(error));
                          });
            }
            return {
                userId: userId,
                getProducts: getProducts,
                getProductsByUserID: getProductsByUserID,
                getMyProducts: getMyProducts,
                filterProducts: filterProducts,
                filterProductsByDistance: filterProductsByDistance,
                getProductByID: getProductByID,
                nointerest: nointerest
            };
        }());

        //<!-- here the google code starts -->




        return productsViewModel;
    }());