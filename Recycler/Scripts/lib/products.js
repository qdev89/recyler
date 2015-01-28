var app = window.app = window.app || {};
var editableProduct;

function navigateToEditProduct(el){    
    var productID = $(el).attr('productID');
    console.log(productID); 
     app.application.navigate("giveaway.html?editSpotId=" + productID);
}

function loadProduct(e){
    TranslateApp();    
    console.log(e);
    
    var fillProductInfo= function(product){
        console.log(product);
        
        /*
        CO2: 9339.199999999999
        CO2Type: "Materials"
        CO2Values: "055,055,055,055,055,055,055,05,055,055,055,055,055"
        Category: "Indoor"
        CreatedAt: Wed Jan 28 2015 14:03:30 GMT+0200 (FLE Standard Time)
        CreatedBy: "4a230810-a53f-11e4-8ef7-793cc3c4a0c6"
        Description: ""
        Id: "ace2bde0-a6e5-11e4-9720-5761b1707099"
        Image1: "https://bs2.cdn.telerik.com/v1/yPCpguY5pk7Zy5rc/ad4c5520-a6e5-11e4-9720-5761b1707099"
        IsActive: "true"
        Meta: Object
        ModifiedAt: Wed Jan 28 2015 14:07:39 GMT+0200 (FLE Standard Time)
        ModifiedBy: "4a230810-a53f-11e4-8ef7-793cc3c4a0c6"
        MoreInformation: "info"
        Name: "head"
        Owner: "4a230810-a53f-11e4-8ef7-793cc3c4a0c6"
        Price: "0"
        Status: "POSTED"
        Type: "free"
        UserID: "a623bf70-34f5-11e4-98c4-8727e453409a"
        */
        
        var selector = "#product-tabstrip .fields ";
        $(selector + ".type").html(product.Type);
        $(selector + ".title").html(product.Name);
        $(selector + ".status").html(product.Status);
        $(selector + ".date").html(new Date(product.CreatedAt).toDateString());
        $(selector + ".price").html(product.Price);
        $(selector + ".info").html(product.Description);
        $(selector + ".instead").html(product.MoreInformation);
        
        
        /*
        var x = new kendo.data.DataSource({data:[{title:"Item 1", url:"https://scontent-b-vie.xx.fbcdn.net/hphotos-xap1/l/t31.0-8/10914832_1071675562859672_5119075484052789290_o.jpg"},
            {title:"Item 2", url:"https://scontent-b-vie.xx.fbcdn.net/hphotos-xap1/l/t31.0-8/10914832_1071675562859672_5119075484052789290_o.jpg"}]});
    
        $("#scrollview-container div").first().kendoMobileScrollView({
            dataSource: x,
            template: $("#scrollview-template").html(),
            contentHeight: 120,
            enablePager: false
        });
        */
        
        
    };
    
    app.Product.getProductByID(e.sender.params.productID,fillProductInfo);
}

  
function giveToThisUser(el){
    var userID = $(el).attr("userID");
    console.log(userID, editableProduct.Id);
    
      navigator.notification.confirm(
                "Are you sure you want to give the product to this user?", // message
                 function(button){
                     if(button==1){
                        var data = app.everlive.data('Product');
                       data.updateSingle({ Id: editableProduct.Id, 'UserID': userID },
                            function(data){
                                alert("Product transferred successfully!");
                                app.application.navigate("mystuff.html"); 
                            },
                            function(error){
                                alert(JSON.stringify(error));
                            });
                     }                                
                 },    
         	  'Collect CO2',
                ['Give',           // title
                'Cancel' ]        // buttonLabels
            );
} 

function editThisProduct(productID){
   
    log(productID);   
    $(".radio-options").hide();
    $(".after-radio").show();    
    $("#Save").hide();
    $("#Update").show();
    
     var data = app.everlive.data('Product');
	data.getById(productID)
    .then(function(data){       
       
        editableProduct = data.result;
        log(editableProduct);
        if(editableProduct.Type=="free") $(".price-div").hide();
        else $(".price-div").show();
        $('#description').val(editableProduct.Name);
    	$('#MightLike').val(editableProduct.Description);
   	 $('#long_description').val(editableProduct.MoreInformation);
        $('#price').val(editableProduct.Price);
         $("#select-custom-24").val(editableProduct.Category);
        
        if (editableProduct.Image1!=undefined) {
         $("#image1").attr("src",editableProduct.Image1);
        }else {
           $("#image1").attr("src","images/imageplaceholder.png");
        }
        
         if (editableProduct.Image2!=undefined) {
         $("#image2").attr("src",editableProduct.Image2);
        }else {
           $("#image2").attr("src","images/imageplaceholder.png");
        }
        
         if (editableProduct.Image3!=undefined) {
         $("#image3").attr("src",editableProduct.Image3);
        }else {
           $("#image3").attr("src","images/imageplaceholder.png");
        }
            
    },
    function(error){
        alert(JSON.stringify(error));
    });
    
    
}

function deleteItem(){
   
     navigator.notification.confirm(
                                    "Are you sure you want to delete this product?", // message
                                     function(button){
                                         if(button==1)
                                            var data = app.everlive.data('Product');
                                            data.destroySingle({ Id:  editableProduct.Id },
                                            function(){
                                                alert('Product successfully deleted.');
                                                app.application.navigate("mystuff.html");
                                            },
                                            function(error){
                                                alert(JSON.stringify(error));
                                            });
                                         
                                     },    
                             	  'Delete product',
                                    ['Delete',           // title
                                    'Cancel' ]        // buttonLabels
                                );
    
      
}

function updateItem(){
    
   
      var data = app.everlive.data('Product');     
      editableProduct.Name= $('#description').val();
      editableProduct.Description = $('#MightLike').val();
      editableProduct.MoreInformation= $('#long_description').val();
      editableProduct.Price=   $('#price').val();
      editableProduct.Category= $("#select-custom-24").val();
                                    
                                    data.update({
                                                      'Name': editableProduct.Name,                  
                                                      'Description': editableProduct.Description,                  
                                                      'MoreInformation': editableProduct.MoreInformation,                  
                                                      'Price': editableProduct.Price,                  
                                                      'Category': editableProduct.Category 
                                                        			
                                                }, // data
                                                { 'Id': editableProduct.Id}, // filter
                                                function(data) {
                                                    console.log(data);
                                                    navigator.notification.alert("Info saved successfully!", null, "Success");
                                                },
                                                function(error) { 
                                                    alert(JSON.stringify(error)); 
                                                });  
    
    
    
    
    
    
    
        if ( $("#image1").attr("src").indexOf("data:image/jpeg;base64,")!=-1) {
        
          var imageData =   $("#image1").attr("src").replace("data:image/jpeg;base64,","");
             createGiveAwayImage(editableProduct.Id, imageData,1)
        }
        if ( $("#image2").attr("src").indexOf("data:image/jpeg;base64,")!=-1) {
        
          var imageData =   $("#image2").attr("src").replace("data:image/jpeg;base64,","");
             createGiveAwayImage(editableProduct.Id, imageData,2)
        }
        if ( $("#image3").attr("src").indexOf("data:image/jpeg;base64,")!=-1) {        
          var imageData =   $("#image3").attr("src").replace("data:image/jpeg;base64,","");
             createGiveAwayImage(editableProduct.Id, imageData,3)
        }
    
        
}





app.Product = (function () {
    'use strict';
	var loadMore = true;
   
    
    var productsViewModel = (function () {          
        
       var getMyProducts = function () {           
           getProducts(true);
       }
        
         var filterProducts = function () {     
           var word = $("#filterWord").val();
          //   log(word);
           getProducts(false,word);
       }
        
        var getProducts = function (isMy, filterWord) {     
            TranslateApp();
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
          
            if(filterWord===undefined) $("#filterWord").val("");
            
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
                            else if (filterWord!==undefined)
                                query.where().regex('Name', filterWord, 'i').done().orderDesc('CreatedAt').skip(skip).take(interval); 
                            else
                                query.orderDesc('CreatedAt').skip(skip).take(interval);                            
                            
                            data.get(query).then(function(data) {
                                /* var res = [];
                               log(data.result);
                                if(filterWord!==undefined){
                                    var word = filterWord.toLowerCase();                                   
                                    data.result.forEach(function(el,index){                                       
                                        if(el.Name.toLowerCase().indexOf(word)!==-1)
                                        res.push(el);
                                    });
                                     options.success(res);
                                }
                                else*/
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
                       //  console.log(response);
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
         
        
        var getProductByID = function (id, callback) {     
            showLoading(); 
            if (localStorage.User == undefined) {
                app.application.navigate("signup_login.html");
                return;
            }
          
            var data = app.everlive.data('Product');
                            
            data.getById(id)
                .then(function(data) {
                        callback(data.result);
                        hideLoading();
                      },
                      function(error) {
                          alert(JSON.stringify(error));
                      });
        }
        return {
            getProducts: getProducts  ,
            getMyProducts: getMyProducts,
            filterProducts: filterProducts,
            getProductByID:getProductByID

        };
    }());

    return productsViewModel;
}());
