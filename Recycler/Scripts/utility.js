window.utility = {};
(function ($, doc) {

    function scrollToTop() {
        $("#friendsApp").data("kendoMobileScroller").scrollTo(-30, -30);
    }

    function resetScroller(e) {
        e.view.scroller.reset();
    }

    window.utility.scrollToTop = scrollToTop;
    window.utility.resetScroller = resetScroller;
}(jQuery, document));