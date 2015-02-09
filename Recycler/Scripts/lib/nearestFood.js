function nearestFoodInit() {
     // get current loction 
     window.getLocation()
          .done(function (position) {    
              debugger;
                    var query = new Everlive.Query();
                    //query.where().nearSphere('Location', [position.coords.latitude, position.coords.longitude], 20, 'km');
                    query.where().nearSphere('Location', [43.465187,  -80.52237200000002], 20, 'km');
              query.take(10);
                    var data = app.everlive.data('Spot');
                    data.get(query)
                        .then(function(data){
                            alert(JSON.stringify(data));
                        },
                        function(error){
                            alert(JSON.stringify(error));
                        });
          })
          .fail(function (error) {
               alert(error.message); /*TODO: Better handling*/
          });


}