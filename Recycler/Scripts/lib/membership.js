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
                    id: 'Monthly_supporter',
                    alias: '1 month Supporter',
                    type: store.PAID_SUBSCRIPTION
                });

                store.register({
                    id: '6months_supporter',
                    alias: '6 months Supporter',
                    type: store.PAID_SUBSCRIPTION
                });

                store.register({
                    id: 'Year_supporter',
                    alias: '1 year Supporter',
                    type: store.PAID_SUBSCRIPTION
                });

                // When any product gets updated, refresh the HTML
                store.when("product").updated(function (p) {
                    var container = document.getElementById('productContainer');
                    var elId = p.id.split(".")[3];
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
                        var html = "<h3>" + p.title + "</h3>" + "<p>" + p.description + "</p>";
                        if (p.canPurchase) {
                            html += "<button class='button' onclick='store.order(\"" + p.id + "\")'>Buy for " + p.price + "</button>";
                        }
                        el.innerHTML = html;
                    }
                });

                // handle subscription events
                store.when("1 year Supporter").approved(function (p) {
                    alert("verify subscription");
                    p.verify();
                });

                store.when("1 year Supporter").verified(function (p) {
                    alert("subscription verified");
                    p.finish();
                });

                store.when("1 year Supporter").unverified(function (p) {
                    alert("subscription unverified");
                });

                store.when("1 year Supporter").updated(function (p) {
                    if (p.owned) {
                        console.log('You have a subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are a lucky subscriber!';
                    } else {
                        console.log('You don\'t have a subscription');
                        //document.getElementById('subscriber-info').innerHTML = 'You are not subscribed';
                    }
                });
                // Deal with errors
                store.error(function (error) {
                    alert('ERROR ' + error.code + ': ' + error.message);
                });

                // When purchase of 100 coins is approved, show an alert
                store.when("1 month Supporter").approved(function (order) {
                    alert("You got an additional 100 coins!");
                    order.finish();
                });

                // When purchase of the full version is approved, show an alert and finish the transaction.
                store.when("6months_supporter").approved(function (order) {
                    alert('You just unlocked the FULL VERSION!');
                    order.finish();
                });

                // The play button can only be accessed when the user owns the full version.
                store.when("6months_supporter").updated(function (product) {
                    console.log("The full version updated to " + (product.owned ? "owned" : "not owned"));
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
                alert('You are ready to use this function.');
                return false;
            }
        }
    });

    app.membershipService = {
        viewModel: new MembershipViewModel()
    };
})(window);