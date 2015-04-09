var slider;
var distanceValue = 10;
var loadCategoryProductMore = true;

$('#distance-filter-categoryProduct').html(distanceValue + 'km');

function onCategoryProductInit(e) {
    if (app.currentUser.distance == "Miles") {
        $(".distance-unit").html("miles");
    } else {
        $(".distance-unit").html("km");
    }

    $('#find-item-slider-categoryProduct').sGlide({
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
        $('#distance-filter-categoryProduct').html(distanceValue + 'km');
    }
}

var category;
function loadProductByCategory(e) {
    window.utility.resetScroller(e);
    category = e.sender.params.category;

    TranslateApp();

    getCategoryProduct();
}

var filterCategoryProductsByDistance = function () {
    log(distanceValue);
    getCategoryProduct(undefined, distanceValue);
}

var filterCategoryProductsByName = function () {
    var name = $("#filterNameCategoryProduct").val();
    getCategoryProduct(name, undefined);
}

function getCategoryProduct(filterWord, distance) {
    var visitedProductIds = [];
    if (localStorage.isVisitedProductIds) {
        visitedProductIds = JSON.parse(localStorage.isVisitedProductIds);
    }
    var interval = 12;

    if (localStorage.User == undefined) {
        app.application.navigate("signup_login.html");
        return;
    }

    var listID = "#ulCategoryProducts";
    var templateID = "#categoryproductTemplate";
    var tabstripId = "#category-products-tabstrip";
    $("#category-products-tabstrip span.view-title").text(category + "'s Stuff");

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
                    var categoryEx = ".*" + category + ".*";
                    var distanceUnit = "km";
                    if (app.currentUser.distance == "Miles") {
                        distanceUnit = "miles";
                    } else {
                        distanceUnit = "km";
                    }
                    if (city && user.onlycity) {
                        if (filterWord !== undefined) {
                            query.where().and().regex('Category', categoryEx).regex('Name', filterWord, 'i').regex('City', cityRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        }
                        else if (distance !== undefined) {
                            query.where().and().regex('Category', categoryEx).nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).regex('City', cityRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        } else {
                            query.where().and().regex('Category', categoryEx).regex('City', cityRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        }
                    } else if (country && user.onlycountry) {
                        if (filterWord !== undefined) {
                            query.where().and().regex('Category', categoryEx).regex('Name', filterWord, 'i').regex('Country', countryRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        }
                        else if (distance !== undefined) {
                            query.where().and().regex('Category', categoryEx).nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).regex('Country', countryRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        } else {
                            query.where().and().regex('Category', categoryEx).regex('Country', countryRegEx, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        }
                    } else {
                        if (filterWord !== undefined) {
                            query.where().and().regex('Category', categoryEx).regex('Name', filterWord, 'i').done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        } else if (distance !== undefined) {
                            query.where().and().regex('Category', categoryEx).nearSphere('Location', [app.currentPosition.coords.longitude, app.currentPosition.coords.latitude], distance, distanceUnit).done();
                            query.orderDesc('CreatedAt').skip(skip).take(interval);
                        } else
                            query.where().regex('Category', categoryEx).done().orderDesc('CreatedAt').skip(skip).take(interval);
                    }

                    data.get(query).then(function (data) {
                        options.success(data.result);

                        setTimeout(function () {
                            $(".img-holder").first().width();
                        }, 10);
                        everliveImages.responsiveAll();
                        hideLoading();

                        if (data.result.length == interval) {
                            loadCategoryProductMore = true;
                            skip += interval;
                        } else
                            loadCategoryProductMore = false;
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
                alert(JSON.stringify(error));
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
            if (loadCategoryProductMore) {
                if ($(listID).height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))
                    listView.dataSource.read();
            }
        });
        listView._scrollerInstance.scrollTo(0, 0);
    }
}

