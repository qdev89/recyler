/**
 * AddActivity view model
 */

var app = app || {};

app.AddActivity = (function () {
    'use strict'

    var addActivityViewModel = (function () {

        var $newStatus;
        var $newTitle;
        var validator;

        var init = function () {

            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            $newStatus = $('#newStatus');
            $newTitle = $('#newTitle ');
        };

        var show = function () {

            // Clear field on view show
            $newStatus.val('');
            $newTitle.val('');
            validator.hideMessages();
        };

        var saveActivity = function () {

            // Validating of the required fields
            if (validator.validate()) {
                showLoading();
                // Adding new activity to Activities model
                var activities = app.Activities.activities;

                var activity = activities.add();

                activity.Text = $newStatus.val();
                activity.Title = $newTitle.val();
                activity.UserId = app.Users.currentUser.get('data').Id;
                 
                activity.Id = guid();
                activities.one('sync', function (data) {
                    var activityID = data.sender._data[0].Id;
                    var base64 = $("#imageActivity").attr("src");
                    var ImageData = app.AddActivity.Photo;

                    if (base64 != "images/imageplaceholder.png" && base64.indexOf("data:image/jpeg;base64,") != -1) {

                        var file = {
                            "Filename": "activityPicture.jpeg",
                            "ContentType": "image/jpeg",
                            "CustomField": "customValue",
                            "base64": base64.replace("data:image/jpeg;base64,", "")
                        };

                        app.everlive.Files.create(file,
                                                  function (data) {
                                                      ImageData = data.result.Uri;

                                                      var activity = app.everlive.data('Activities');
                                                      activity.update({
                                                          'Picture': ImageData
                                                      }, // data
                                                                  { 'Id': activityID }, // filter
                                                                  function (data) {
                                                                      hideLoading();
                                                                      app.application.navigate('#:back');
                                                                  },
                                                                  function (error) {
                                                                      hideLoading();
                                                                      alert(JSON.stringify(error));
                                                                  });
                                                  },
                                                  function (error) {
                                                      hideLoading();
                                                      alert(JSON.stringify(error));
                                                  });
                    } else {
                        hideLoading();
                        app.application.navigate('#:back');

                    }

                });

                activities.sync();
            }
        };

        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveActivity: saveActivity
        };

    }());

    return addActivityViewModel;

}());
