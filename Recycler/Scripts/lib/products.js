var app = window.app = window.app || {};

app.Product = (function () {
    'use strict';

    var productsViewModel = (function () {
        var getProducts = function () {
            console.log("getProducts");
            var dataSource = new kendo.data.DataSource({
			transport: {  
                    read: function(options) {
                        try {
                            var data = app.everlive.data('Product');
                            var query = new Everlive.Query();
                            query.skip(0).take(10);
                            data.get(query).then(function(data) {
                                //  console.log(data.result);
                                options.success(data.result);
                            },
                                                 function(error) {
                                                     alert(JSON.stringify(error));
                                                 });
                        }catch (err) {
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
                        //   var products = [];
                        $.each(response, function (i, el) {
                            // console.log(el.Name);
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
                        //  console.log(response);
                        return response;
                    }
                                                                
                }
          });
            
            $("#ulProducts").kendoMobileListView({
                                                     dataSource: dataSource,
                                                     template:$("#productTemplate").html(),
                                                     appendOnRefresh:true   									
                                                 });
        }
         
        return {
            getProducts: getProducts           
        };
    }());

    return productsViewModel;
}());
