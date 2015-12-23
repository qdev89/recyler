(function (global) {
    var MembershipViewModel,
        app = global.app = global.app || {};

    MembershipViewModel = kendo.data.ObservableObject.extend({

        initStore: function () {
            TranslateApp();
            if (!app.membershipService.viewModel.checkSimulator()) {
                // Enable maximum logging level
                store.verbosity = store.DEBUG;

                // Inform the store of your products
                store.register({
                    id: '1month_nonrenewal',
                    alias: '1month-alias',
                    type: store.PAID_SUBSCRIPTION
                });

                //store.register({
                //    id: '6month',
                //    alias: '6 months Supporter Subscription',
                //    type: store.CONSUMABLE
                //});

                store.register({
                    id: '12month_nonrenewal',
                    alias: '1year-alias',
                    type: store.NON_CONSUMABLE
                });

                // When any product gets updated, refresh the HTML
                store.when("product").updated(function (p) {
                     
                    //alert(JSON.stringify(p));

                    ////var elId = p.id;
                    ////var el = document.getElementById(elId);
                    ////var container = document.getElementById('productContainer');
                    ////if (!el) {
                    ////    container.innerHTML += '<div id="' + elId + '"></div>';
                    ////    el = document.getElementById(elId);
                    ////}

                    ////if (!p.loaded) {
                    ////    el.innerHTML += '<h3>...</h3>';
                    ////} else if (!p.valid) {
                    ////    el.innerHTML += '<h3>' + p.alias + ' Invalid</h3>';
                    ////} else if (p.valid) {
                    ////    var html = "<h3>" + p.alias + "</h3>";
                    ////    if (p.canPurchase) {
                    ////        html += "<button class='button' onclick='store.order(\"" + p.id + "\")'>Buy for " + p.price + "</button>";
                    ////    }
                    ////    el.innerHTML = html;
                    ////}

                    var storeId = p.id;
                    var storeButton = $('#' + storeId);
                    var storeLabel = $('#' + storeId + 'label');
                    alert(storeId + "  subscription updated");

                    if (!p.valid) {
                        storeLabel.html(p.id + ' Invalid');
                    } else if (p.valid) {
                        if (p.canPurchase) {
                            storeButton.click(function () {
                                store.order(p.id);
                            });
                        }
                    }

                });

                // handle subscription events
                store.when("1month-alias").approved(function (p) {
                    alert("1  subscription approved");
                    p.verify();
                });

                store.when("1month-alias").verified(function (p) {
                    alert("1 subscription verified");
                    //var data = app.everlive.data('Users');
                    //data.update({
                    //    'UserRole': 2,
                    //    'StartedSupporterTime': moment(),
                    //    'ExpireSupporterTime': moment().days(30),
                    //    'SupporterType': 30,

                    //}, // data
                    //            { 'Id': app.currentUser.Id }, // filter
                    //            function (data) {

                    //            },
                    //            function (error) {
                    //                alert(JSON.stringify(error));
                    //            });
                    p.finish();
                });

                store.when("1month-alias").unverified(function (p) {
                    alert("1 subscription unverified");
                });

                store.when("1month-alias").updated(function (p) {
                    if (p.owned) {
                        var storeId = p.id;
                        var storeButton = $('#' + storeId);
                        storeButton.hide();
                        var paidBtn = $('#' + storeId + 'pay');
                        paidBtn.show();
                        alert('1 subscription updated');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        //alert('You don\'t have a 1 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
                    }
                });

                // handle subscription events
                store.when("1year-alias").approved(function (p) {
                    //alert("12 verify subscription");
                    p.verify();
                });

                store.when("1year-alias").verified(function (p) {
                    //alert("12 subscription verified");
                    
                    //var data = app.everlive.data('Users');
                    //data.update({
                    //    'UserRole': 2,
                    //    'StartedSupporterTime': moment(),
                    //    'ExpireSupporterTime': moment().days(365),
                    //    'SupporterType': 365,

                    //}, // data
                    //            { 'Id': app.currentUser.Id }, // filter
                    //            function (data) {
                                  
                    //            },
                    //            function (error) {
                    //                alert(JSON.stringify(error));
                    //            });

                    p.finish();
                });

                store.when("1year-alias").unverified(function (p) {
                    //alert("12 subscription unverified");
                });

                store.when("1year-alias").updated(function (p) {
                    if (p.owned) {
                        var storeId = p.id;
                        var storeButton = $('#' + storeId);
                        storeButton.hide();
                        var paidBtn = $('#' + storeId + 'pay');
                        paidBtn.show();
                        //alert('You have a 12 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        //alert('You don\'t have a 12 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
                    }
                });



                // When the store is ready all products are loaded and in their "final" state.
                // Note that the "ready" function will be called immediately if the store is already ready.
                // When the store is ready, activate the "refresh" button;
                store.ready(function () {
                    console.log("The store is ready");
                });

                // Refresh the store.
                // This will contact the server to check all registered products validity and ownership status.
                // It's fine to do this only at application startup, as it could be pretty expensive.
                store.refresh();
            }
        },

        checkSimulator: function () {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                //var storeId = "1month";
                //var storeButton = $('#' + storeId);
                //storeButton.hide();
                //var paidBtn = $('#' + storeId + 'pay');
                //paidBtn.show();
                return true;
            } else if (window.store === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                //alert('You are ready to use this function.');
                return false;
            }
        }
    });

    app.membershipService = {
        viewModel: new MembershipViewModel()
    };
})(window);