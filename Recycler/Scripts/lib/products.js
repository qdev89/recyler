var app = window.app = window.app || {};

app.Product = (function () {
    'use strict';
	var loadMore = true;
   
    
    var productsViewModel = (function () {          
        
       var getMyProducts = function () {           
           getProducts(true);
       }
        
        var getProducts = function (isMy) {         
            var interval = 12; 
         
            if(localStorage.User==undefined){
                app.application.navigate("signup_login.html");
                return;
            }
            
            var myId = JSON.parse(localStorage.User).Id;
            var listID= "#ulProducts";
            var templateID="#productTemplate";
            var tabstripId = "#find-item-tabstrip";
            if(isMy===true){
                tabstripId = "#my-stuff-tabstrip";                
                listID= "#ulMyProducts";
          	  templateID="#myProductTemplate";
            }
          
            var skip=0;
            var dataSource = new kendo.data.DataSource({ 
			transport: {  
                    read: function(options) {
                         showLoading();
                        try {
                            var data = app.everlive.data('Product');
                            var query = new Everlive.Query();
                            
                            if (isMy===true)                          		 
                                query .where().eq('UserID', myId).done().orderDesc('CreatedAt').skip(skip).take(interval);                                  
                            else
                                query.orderDesc('CreatedAt').skip(skip).take(interval);                            
                            
                            data.get(query).then(function(data) {
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
           } ,
           schema: {        // describe the result format
                    parse: function (response) {
                         console.log(response);
                        $.each(response, function (i, el) {
                            if (el.Name===undefined)
                                el.Name = "No name";
                            
                            el.Image="";
                            
                             if (el.Image1!==undefined)
                                el.Image = el.Image1;
                            else  if (el.Image2!==undefined)
                                el.Image = el.Image2;
                              else  if (el.Image3!==undefined)
                                el.Image = el.Image3;
                                                          
                        });
                        return response;
                    }
                                                                
                }
          });
            
           		 $(listID).kendoMobileListView({
                									dataSource: dataSource,
                                                     template:$(templateID).html(),
                                                     appendOnRefresh:true   									
                                                 });
            
            var listView = $(listID).data("kendoMobileListView");
           if ( listView != null) {
              listView._scrollerInstance.scrollElement.on("touchend", function() {
                   if (loadMore) {
                       if ($(listID).height() < (listView._scrollerInstance.scrollTop + $(window).height() - $(tabstripId + " .km-header").height()))                         
                         listView.dataSource.read();
                   }       
               });    			
              listView._scrollerInstance.scrollTo(0, 0);    
           }
        }
         
        return {
            getProducts: getProducts  ,
            getMyProducts: getMyProducts
        };
    }());

    return productsViewModel;
}());
