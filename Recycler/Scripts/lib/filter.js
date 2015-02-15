window.filter = {};
(function ($, doc) {
    var findResults = [];

    function initFilters(e) {
        utility.resetScroller(e);
        TranslateApp();
        switch (localStorage.Language) {
            case "1":
                localStorage.LanguageType = "dk";

                var menuItem = $("<option id=''></option>");
                menuItem.html("Tags/kategorier");
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
                menuItem.html("Tags/Categories");
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
                menuItem.html("Tags/Categories");
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
                menuItem.html("Tags/Categories");
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

    function onFilter() {
        // get filter criteria 
        var search = $("#filterSearch").val();
        var category = $("#select-custom-24 option:selected").text();
        var distance = $("#Distance").val();
        var price = $("#Price").val();
        showLoading();
        window.getLocation()
            .done(function (position) {
                var data = app.everlive.data('Product');
                var query = new Everlive.Query();

                var contQuery = query.where().and();

                // search Name
                if (search) {
                    var searchRegEx = ".*" + search + ".*";
                    contQuery.regex('Name', searchRegEx, 'i');
                }

                // TODO for checkbox?

                // for Category
                if (category) {
                    var categoryRegEx = ".*" + category + ".*";
                    contQuery.regex('Category', categoryRegEx, 'i');
                }

                // for Distance
                if (distance && distance > 0) {
                    contQuery.nearSphere('Location', [position.coords.latitude, position.coords.longitude], distance, 'km');
                }

                // for Price
                if (price && price > 0) {
                    // not sure which
                    //contQuery.greaterThanEqual("Price", price);
                    contQuery.lessThanEqual("Price", price);
                }

                contQuery.done();
                query.orderDesc('CreatedAt');
                data.get(query).then(
                    function (data) {
                        findResults = data.result;
                        debugger;
                        hideLoading();

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

    window.filter = {
        initFilters: initFilters,
        onFilter: onFilter,
        onFilteredResultsShow: onFilteredResultsShow
    }
}(jQuery, document));