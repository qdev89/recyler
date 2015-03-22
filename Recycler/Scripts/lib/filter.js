window.filter = {};
(function ($, doc) {
    var findResults = [];
    var currentDefaultTag;
    function initFilters(e) {
        utility.resetScroller(e);
        TranslateApp();

        onClearFilter();

        // init numeric input
        $("#PriceFrom").ForceNumericOnly();
        $("#PriceTo").ForceNumericOnly();
        $("#Distance").ForceNumericOnly();

        switch (localStorage.Language) {
            case "1":
                localStorage.LanguageType = "dk";

                var menuItem = $("<option id=''></option>");
                currentDefaultTag = "Choose / Vælg / Wählen / Elegir";
                menuItem.html(currentDefaultTag);
                $("#select-custom-24").append(menuItem);

                $.each(Tags.Danish, function (i) {
                    if (Tags.Danish[i] != undefined) {
                        var menuItem = $("<option id=''></option>");
                        menuItem.html(Tags.Danish[i].Value);
                        menuItem.attr('id', Tags.Danish[i].id);
                        $("#select-custom-24").append(menuItem);
                    }
                });

                // $("#select-custom-24").selectmenu('refresh');

                break;
            case "2":

                localStorage.LanguageType = "de";
                var menuItem = $("<option id=''></option>");
                currentDefaultTag = "Tags/Categories";
                menuItem.html(currentDefaultTag);
                $("#select-custom-24").append(menuItem);

                $.each(Tags.German, function (i) {
                    if (Tags.German[i] != undefined) {
                        var menuItem = $("<option id=''></option>");
                        menuItem.html(Tags.German[i].Value);
                        menuItem.attr('id', Tags.German[i].id);
                        $("#select-custom-24").append(menuItem);
                    }
                });
                //  $("#select-custom-24").selectmenu('refresh');

                break;
            case "3":

                localStorage.LanguageType = "en";
                var menuItem = $("<option id=''></option>");
                currentDefaultTag = "Tags/Categories";
                menuItem.html(currentDefaultTag);
                $("#select-custom-24").append(menuItem);

                $.each(Tags.English, function (i) {
                    if (Tags.English[i] != undefined) {
                        var menuItem = $("<option id=''></option>");
                        menuItem.html(Tags.English[i].Value);
                        menuItem.attr('id', Tags.English[i].id);
                        $("#select-custom-24").append(menuItem);
                    }
                });
                //  $("#select-custom-24").selectmenu('refresh');

                break;
            case "4":

                localStorage.LanguageType = "es";
                var menuItem = $("<option id=''></option>");
                currentDefaultTag = "Tags/Categories";
                menuItem.html(currentDefaultTag);
                $("#select-custom-24").append(menuItem);

                $.each(Tags.Spanish, function (i) {
                    if (Tags.Spanish[i] != undefined) {
                        var menuItem = $("<option id=''></option>");
                        menuItem.html(Tags.Spanish[i].Value);
                        menuItem.attr('id', Tags.Spanish[i].id);
                        $("#select-custom-24").append(menuItem);
                    }
                });
                //  $("#select-custom-24").selectmenu('refresh');

                break;
        }
    }

    function onClearFilter() {
        $("#filterSearch").val('');
        $("#Distance").val(0);
        $("#PriceFrom").val(0);
        $("#PriceTo").val(0);
        $('input[name="productTypeCheckBox"]').attr('checked', false);
        $("#select-custom-24").val($("#select-custom-24").data("default-value"));
    }

    function onFilter() {
        // get filter criteria 
        var search = $("#filterSearch").val();
        var category = $("#select-custom-24 option:selected").attr("id");
        var categoryIndex = $("#select-custom-24 option:selected").val();
        var distance = $("#Distance").val();
        var priceFrom = $("#PriceFrom").val();
        var priceTo = $("#PriceTo").val();
        var selectedProductTypeIndex = $("input[name='productTypeCheckBox']:checked").val();
        showLoading();
        window.getLocation()
            .done(function (position) {
                var data = app.everlive.data('Product');
                var query = new Everlive.Query();

                var contQuery = query.where().and();

                // search Name
                if (search && search != '') {
                    var searchRegEx = ".*" + search + ".*";
                    contQuery.regex('Name', searchRegEx, 'i');
                }

                // TODO for checkbox
                if (selectedProductTypeIndex && selectedProductTypeIndex > 0) {
                    
                    var productType;
                    switch (selectedProductTypeIndex) {
                        case "1":
                            productType = 'giveaway';
                            break;
                        case "2":
                            productType = 'trade';
                            break;
                        case "3":
                            productType = 'lend';
                            break;
                        case "4":
                            productType = 'service';
                            break;
                        case "5":
                            productType = 'sell';
                            break;
                        default:
                            // it should be an exception
                            productType = 'none';
                            break;
                    }

                    contQuery.eq('Type', productType);
                }

                // for Category
                if (category && category != currentDefaultTag) {
                    var categoryRegEx = ".*" + category + ".*";
                    contQuery.regex('Category', categoryRegEx, 'i');
                }

                // for Distance
                if (distance && distance > 0) {
                    contQuery.nearSphere('Location', [position.coords.latitude, position.coords.longitude], distance, 'km');
                }

                // for Price
                if (priceFrom && priceTo && priceTo > priceFrom) {
                    // priceFrom =< price =< priceTo
                    contQuery.greaterThanEqual("Price", priceFrom);
                    contQuery.lessThanEqual("Price", priceTo);
                }

                contQuery.done();
                query.orderDesc('CreatedAt');
                
                data.get(query).then(
                    function (data) {
                        hideLoading();

                        if (data.result.length == 0) {
                            app.application.navigate('notFound.html');
                            return;
                        }

                        findResults = data.result;
                        app.application.navigate('filterResults.html');
                    },
                    function (error) {
                        hideLoading();
                        alert(JSON.stringify(error));
                    });
            })
            .fail(function (error) {
                alert(error.message); /*TODO: Better handling*/
            });
    }

    function onFilteredResultsShow(e) {
        utility.resetScroller(e);

        TranslateApp();
        var interval = 12;

        var listID = "#ulFilterResults";
        var templateID = "#findResultTemplate";
        var tabstripId = "#find-result-tabstrip";

        var skip = 0;
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    showLoading();
                    options.success(findResults);

                    setTimeout(function () {
                        $(".img-holder").first().width();
                    }, 10);
                    everliveImages.responsiveAll();
                    hideLoading();
                    if (findResults.length == interval) {
                        loadMore = true;
                        skip += interval;
                    } else
                        loadMore = false;
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

    function onNotFoundShow() {
        switch (localStorage.Language) {
            case "1":
                localStorage.LanguageType = "dk";

                $("#notFoundImage").attr("src", "images/NothingFound/nothing_dk.png");
                break;
            case "2":
                localStorage.LanguageType = "de";
                $("#notFoundImage").attr("src", "images/NothingFound/nothing_de.png");

                break;
            case "3":
                localStorage.LanguageType = "en";
                $("#notFoundImage").attr("src", "images/NothingFound/nothing_gb_us.png");

                break;
            case "4":
                localStorage.LanguageType = "es";
                $("#notFoundImage").attr("src", "images/NothingFound/nothing_es.png");

                break;
        }
    }

    window.filter = {
        initFilters: initFilters,
        onFilter: onFilter,
        onFilteredResultsShow: onFilteredResultsShow,
        onClearFilter: onClearFilter,
        onNotFoundShow: onNotFoundShow,
    }
}(jQuery, document));


// Numeric only control handler
jQuery.fn.ForceNumericOnly =
function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};