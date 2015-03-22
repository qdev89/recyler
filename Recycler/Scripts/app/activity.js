/**
 * Activity view model
 */

var app = app || {};

app.Activity = (function () {
    'use strict'

    var $commentsContainer,
        listScroller;

    var activityViewModel = (function () {

        var activityUid,
            activity,
            $activityPicture;

        var init = function () {
            $commentsContainer = $('#comments-listview');
            $activityPicture = $('#picture');
        };

        var show = function (e) {
            showLoading();
            $commentsContainer.empty();

            listScroller = e.view.scroller;
            listScroller.reset();

            activityUid = e.view.params.uid;
            // Get current activity (based on item uid) from Activities model
            activity = app.Activities.activities.getByUid(activityUid);
            app.Comments.comments.filter({
                field: 'ActivityId',
                operator: 'eq',
                value: activity.Id
            });

            kendo.bind(e.view.element, activity, kendo.mobile.ui);

            var evl = app.everlive.data('Activities');
            evl.getById(activity.Id)
                 .then(function (data) {
                     debugger;
                     activity = data.result;
                     $activityPicture[0].style.display = activity.Picture ? 'block' : 'none';
                     $('#picture').attr('src', activity.Picture);
                     $('#picture').click(function () {
                         openImageFullModal(activity.Picture);
                     });
                     hideLoading();
                 },
              function (error) {
                  hideLoading();
                  alert(JSON.stringify(error));
              });
        };

        var removeActivity = function () {

            var activities = app.Activities.activities;
            var activity = activities.getByUid(activityUid);

            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Delete Activity',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {

                        activities.remove(activity);
                        activities.one('sync', function () {
                            app.application.navigate('#:back');
                        });
                        activities.sync();
                    }
                }
            );
        };

        return {
            init: init,
            show: show,
            remove: removeActivity,
            activity: function () {
                return activity;
            },
        };

    }());

    return activityViewModel;

}());
