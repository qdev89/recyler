/**
 * AddActivity view model
 */

var app = app || {};

app.AddActivity = (function () {
    'use strict'

    var addActivityViewModel = (function () {
        var $newStatus;
        var validator;
        var user;
        var init = function () {
            user = JSON.parse(localStorage.User);
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            $newStatus = $('#newStatus');
            $("#add-activity-avatar").attr("src", user.ImageData);
        };

        var show = function () {

            // Clear field on view show
            $newStatus.val('');
            validator.hideMessages();
        };

        var saveActivity = function () {

            // Validating of the required fields
            if (validator.validate()) {
                // Adding new activity to Activities model
                var activities = app.Activities.activities;
                debugger;
                var activity = activities.add();// doesn't work!
                //var activity = {};
                debugger;
                activity.Text = $newStatus.val();
                activity.UserId = user.Id;
                //activities.add(activity);
                activities.one('sync', function () {
                    app.application.navigate('#:back');
                });
                activities.sync();
                alert("Activity posted");
            }
        };
        return {
            init: init,
            show: show,
            me: user,
            saveActivity: saveActivity
        };

    }());

    return addActivityViewModel;

}());
