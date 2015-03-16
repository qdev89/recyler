(function (global) {
    var MembershipViewModel,
        app = global.app = global.app || {};

    MembershipViewModel = kendo.data.ObservableObject.extend({

        initStore: function () {
            debugger ;
            if (!app.membershipService.viewModel.checkSimulator()) {
                // Enable maximum logging level
                store.verbosity = store.DEBUG;

                // Inform the store of your products
                store.register({
                    id: '1month',
                    alias: 'Monthly running Supporter Subscription',
                    type: store.PAID_SUBSCRIPTION
                });

                store.register({
                    id: '6months1',
                    alias: '6 months Supporter Subscription',
                    type: store.CONSUMABLE
                });

                store.register({
                    id: 'full',
                    alias: '12 months Supporter Subscription',
                    type: store.NON_CONSUMABLE
                });
              
                // When any product gets updated, refresh the HTML
                store.when("product").updated(function (p) {
                    debugger;
                    alert(JSON.stringify(p));

                    var container = document.getElementById('productContainer');
                    var elId = p.id;
                    var el = document.getElementById(elId);
                    if (!el) {
                        container.innerHTML += '<div id="' + elId + '"></div>';
                        el = document.getElementById(elId);
                    }

                    if (!p.loaded) {
                        el.innerHTML += '<h3>...</h3>';
                    } else if (!p.valid) {
                        el.innerHTML += '<h3>' + p.alias + ' Invalid</h3>';
                    } else if (p.valid) {
                        var html = "<h3>" + p.alias + "</h3>";
                        if (p.canPurchase) {
                            html += "<button class='button' onclick='store.order(\"" + p.id + "\")'>Buy for " + p.price + "</button>";
                        }
                        el.innerHTML = html;
                    }
                });

                // handle subscription events
                store.when("Monthly running Supporter Subscription").approved(function (p) {
                    alert("1 verify subscription");
                    p.verify();
                });

                store.when("Monthly running Supporter Subscription").verified(function (p) {
                    alert("1 subscription verified");
                    p.finish();
                });

                store.when("Monthly running Supporter Subscription").unverified(function (p) {
                    alert("1 subscription unverified");
                });

                store.when("Monthly running Supporter Subscription").updated(function (p) {
                    if (p.owned) {
                        alert('You have a 1 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        alert('You don\'t have a 1 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
                    }
                });

                // handle subscription events
                store.when("6 months Supporter Subscription").approved(function (p) {
                    alert("6 verify subscription");
                    p.verify();
                });

                store.when("6 months Supporter Subscription").verified(function (p) {
                    alert("6 subscription verified");
                    p.finish();
                });

                store.when("6 months Supporter Subscription").unverified(function (p) {
                    alert("6 subscription unverified");
                });

                store.when("6 months Supporter Subscription").updated(function (p) {
                    if (p.owned) {
                        alert('You have a 6 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        alert('You don\'t have a 6 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
                    }
                });

                // handle subscription events
                store.when("12 months Supporter Subscription").approved(function (p) {
                    alert("12 verify subscription");
                    p.verify();
                });

                store.when("12 months Supporter Subscription").verified(function (p) {
                    alert("12 subscription verified");
                    p.finish();
                });

                store.when("12 months Supporter Subscription").unverified(function (p) {
                    alert("12 subscription unverified");
                });

                store.when("12 months Supporter Subscription").updated(function (p) {
                    if (p.owned) {
                        alert('You have a 12 subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        alert('You don\'t have a 12 subscription');
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