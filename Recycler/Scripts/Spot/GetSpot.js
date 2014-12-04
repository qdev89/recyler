var app = window.app = window.app || {};

app.Spot = (function () {
    'use strict';
	var loadMore = true;   
    
    var spotsViewModel = (function () {        
        var getMySpots = function () {
            
            if(localStorage.User==undefined){
                app.application.navigate('signup_login.html');
                return;
            } 
            
            var myId = JSON.parse(localStorage.User).Id;   
            var interval = 12;
            var skip=0;
            var dataSource = new kendo.data.DataSource({
			transport: {  
                    read: function(options) {
                         showLoading();
                        try {
                            var data = app.everlive.data('Spot');
                            var query = new Everlive.Query();
                            query.where().eq('userId', myId).done().skip(skip).take(interval);
                            data.get(query).then(function(data) {
                                console.log(data.result);
                                options.success(data.result);
                                hideLoading();
                                if(data.result.length==interval){
                                    loadMore = true;
                                    skip+=interval;
                                }else
                                loadMore = false;
                            },
                             function(error) {
                                 alert(JSON.stringify(error));
                             });
                        }catch (err) {
                             hideLoading();
                            console.log(err);
                        }
                    }
                },
           error: function(e) {
               hideLoading();
               if (typeof(e.errorThrown) !== "undefined" && e.errorThrown == "Unauthorized")
                   app.application.navigate("index.html");
               else
                   displayErrorAlert();
           }          
          });
            
        		 $("#my-spots-list").kendoMobileListView({
                                                     dataSource: dataSource,
                                                     template:$("#spotTemplate").html(),
                                                     appendOnRefresh:true   									
                                                 });
            
            
           var listView = $("#my-spots-list").data("kendoMobileListView");
           if (listView != null) {
               listView._scrollerInstance.scrollElement.on("touchend", function() {
                   if (loadMore) {
                       var tabstripId = "#find-item-tabstrip";
                      
                       if ($("#my-spots-list").height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))                         
                         listView.dataSource.read();
                   }       
               });    			
              listView._scrollerInstance.scrollTo(0, 0);    
           }
        }
         
        return {
            getMySpots: getMySpots           
        };
    }());

    return spotsViewModel;
}());




















/*$(document).ready(function () {
  return false;
    
    
    
    
    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);
    var User = $.parseJSON(localStorage.User); 

    Getspot.Id = '0';
    Getspot.userId = User.Id;
    Getspot.GetSpot();


    //----Redirect to EditSpot Html fill SpotDetail----

    $(".divSpot").click(function () {
        
        localStorage.setItem('spotID', $(this).children('a').attr("id"));
       
       app.application.navigate("editspot.html");
    });
});*/
