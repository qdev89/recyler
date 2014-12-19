var editableSpot;

function checkForCreate(){
     TranslateApp();
    //log(userData);    
    if(userData.UserRole!="2"){        
        var data = app.everlive.data('Spot');
        data.count({ 'userId': userData.Id}, // filter
            function(data){
                if(data.result>0){
                	alert("Non supporters can have no more than 1 spot. Become supporter and you can have as many spots as you like!");
                    app.application.navigate("myspots.html");
                }
            },
            function(error){
                alert(JSON.stringify(error));
            });
    }
}



function deleteSpot(){
    
     navigator.notification.confirm(
                                    "Are you sure you want to delete this spot?", // message
                                     function(button){
                                         if(button==1)
                                             var id= editableSpot.Id;
                                             var data = app.everlive.data('Spot');
                                            data.destroySingle({ Id: id },
                                            function(){
                                                alert('Spot successfully deleted.');
                                                app.application.navigate("myspots.html");
                                            },
                                            function(error){
                                                alert(JSON.stringify(error));
                                            });
                                         
                                     },    
                             	  'Delete spot',
                                    ['Delete',           // title
                                    'Cancel' ]        // buttonLabels
                                );
    
    
   
}

function updateSpot(){
      
    if( $("#imageE").attr("src").indexOf("data:image/jpeg;base64,")!=-1){
        
         var file = {
        "Filename": "spotPicture.jpeg",
        "ContentType": "image/jpeg",
        "CustomField": "customValue",
        "base64": $("#imageE").attr("src").replace("data:image/jpeg;base64,","") 
            };

        app.everlive.Files.create(file,
                                  function (data) {
                                        console.log(data);                        
                                        ImageData = data.result.Uri;                        
                                        var data = app.everlive.data('Spot');     
                                        editableSpot.SpotType = $("#spotypeE option:selected").val();
                                		editableSpot.EventDate = $('#select-choice-monthE option:selected').val() + '/'
                                                             + $('#select-choice-dayE option:selected').val() + '/'
                                                             + $('#select-choice-yearE option:selected').val();
                                      

                                        editableSpot.Name = $("#spotnameE").val();
                                        editableSpot.Description = $("#spotdescE").val();
                                        editableSpot.Address = $("#spotadressE").val();
                                        editableSpot.City = $("#spotcityE").val();
                                        editableSpot.Zip = $("#spotzipE").val();
                                        editableSpot.Country = $('#spotcountryE').val();

                                        if (editableSpot.Country == 'US') {
                                            editableSpot.State = $('#spotstateE').val();
                                        } else {
                                            editableSpot.State = $("#txtStateE").val();
                                        }
                                       
                                        editableSpot.Phone = $("#spotphoneE").val();
                                        editableSpot.Web = $("#spotwebE").val();
                                        editableSpot.CVR = $("#CvrE").val();
                                        editableSpot.OpeningHoursWeekdaysFrom = $("#spotmonfrifromE").val();
                                        editableSpot.OpeningHoursWeekdaysTo = $("#spotmonfritoE").val();
                                        editableSpot.OpeningHoursSaturdayFrom = $("#spotopensatfromE").val();
                                        editableSpot.OpeningHoursSaturdayTo = $("#spotopensattoE").val();
                                        editableSpot.OpeningHoursSundayFrom = $("#spotopensunfromE").val();
                                        editableSpot.OpeningHoursSundayTo = $("#spotopensuntoE").val();
                                        editableSpot.OpeningTimeWeekdays = $("#OpenTimeMonFriE").val();
                                        editableSpot.ClosingTimeWeekdays = $("#CloseTimeMonFriE").val();
                                        editableSpot.OpeningTimeSat = $("#OpenTimeSatE").val();
                                        editableSpot.ClosingTimeSat = $("#CloseTimeSatE").val();
                                        editableSpot.OpeningTimeSun = $("#OpenTimeSunE").val();
                                        editableSpot.ClosingTimeSun = $("#CloseTimeSunE").val();
                                    
                                    data.update({
                                                      'SpotType': editableSpot.SpotType,                  
                                                      'EventDate': editableSpot.EventDate,                  
                                                      'Name': editableSpot.Name,                  
                                                      'Description': editableSpot.Description,                  
                                                      'Address': editableSpot.Address,                  
                                                      'City': editableSpot.City,                  
                                                      'Zip': editableSpot.Zip ,                  
                                                      'Country': editableSpot.Country,                  
                                                      'State': editableSpot.State,                  
                                                      'Phone': editableSpot.Phone,                  
                                                      'Web': editableSpot.Web,                  
                                                      'CVR':editableSpot.CVR ,                  
                                                      'OpeningHoursWeekdaysFrom':editableSpot.OpeningHoursWeekdaysFrom ,                  
                                                      'OpeningHoursWeekdaysTo': editableSpot.OpeningHoursWeekdaysTo,                  
                                                      'OpeningHoursSaturdayFrom': editableSpot.OpeningHoursSaturdayFrom,                  
                                                      'OpeningHoursSaturdayTo': editableSpot.OpeningHoursSaturdayTo,                  
                                                      'OpeningHoursSundayFrom':editableSpot.OpeningHoursSundayFrom ,                  
                                                      'OpeningHoursSundayTo': editableSpot.OpeningHoursSundayTo,                  
                                                      'OpeningTimeWeekdays': editableSpot.OpeningTimeWeekdays,                 
                                                      'OpeningTimeSat': editableSpot.OpeningTimeSat,                  
                                                      'ClosingTimeSat': editableSpot.ClosingTimeSat,                  
                                                      'OpeningTimeSun': editableSpot.OpeningTimeSun,                  
                                                      'ClosingTimeSun': editableSpot.ClosingTimeSun,
                                      				'Image':ImageData
                                                        			
                                                }, // data
                                                { 'Id': editableSpot.Id}, // filter
                                                function(data) {
                                                    console.log(data);
                                                    navigator.notification.alert("Info saved successfully!", null, "Success");
                                                },
                                                function(error) { 
                                                    alert(JSON.stringify(error)); 
                                                });  
                                  },
                                  function (error) {
                                      alert(JSON.stringify(error)); 
                                  });
        
    }
  
    	
}

function navigateEditSpot(id){
     var spotID = $(id).attr("spotId");
    app.application.navigate("editspot.html?spotId="+ spotID);    
}

function editSpot(e){
    TranslateApp();
    log(e.view.params.spotId);
     var spotID =e.view.params.spotId;
    var data = app.everlive.data('Spot');
	data.getById(spotID)
    .then(function(data){       
        Filldata("E");
        editableSpot = data.result;
        spot=editableSpot;
        $("#spotypeE").val( spot.SpotType);        
        var obj = spot.EventDate.split("/");
        $('#select-choice-monthE').val(obj[0]);
        $('#select-choice-dayE').val(obj[1]) ;
        $('#select-choice-yearE').val(obj[2]);    
        $("#spotnameE").val( spot.Name);
        $("#spotdescE").val( spot.Description);
        $("#spotadressE").val( spot.Address );
        $("#spotcityE").val(spot.City);
        $("#spotzipE").val( spot.Zip );
        $('#spotcountryE').val(spot.Country);

        if (spot.Country == 'US') {
            $('#spotstateE').val(spot.State);
        } else {
           $("#txtStateE").val( spot.State );
        }
       
        $("#imageE").attr("src",spot.Image);
        $("#spotphoneE").val(spot.Phone);
        $("#spotwebE").val(spot.Web);
        $("#CvrE").val( spot.CVR);
        $("#spotmonfrifromE").val(spot.OpeningHoursWeekdaysFrom);
        $("#spotmonfritoE").val(spot.OpeningHoursWeekdaysTo );
        $("#spotopensatfromE").val(spot.OpeningHoursSaturdayFrom);
        $("#spotopensattoE").val(spot.OpeningHoursSaturdayTo);
        $("#spotopensunfromE").val(spot.OpeningHoursSundayFrom);
        $("#spotopensuntoE").val(spot.OpeningHoursSundayTo);
        $("#OpenTimeMonFriE").val(spot.OpeningTimeWeekdays);
        $("#CloseTimeMonFriE").val(spot.ClosingTimeWeekdays);
        $("#OpenTimeSatE").val(spot.OpeningTimeSat);
        $("#CloseTimeSatE").val(spot.ClosingTimeSat);
        $("#OpenTimeSunE").val(spot.OpeningTimeSun);
        $("#CloseTimeSunE").val(spot.ClosingTimeSun );
    },
    function(error){
        alert(JSON.stringify(error));
    });
    
    
}





var spot = {
    Id: '',
    Image: '',
    Name: '',
    Description: '',
    EventDate: '',
    Address: '',
    City: '',
    Zip: '',
    State: '',
    Country: '',
    Phone: '',
    Web: '',
    CVR: '',
    SpotType: '',
    userId: '',
    OpeningHoursWeekdaysFrom: '',
    OpeningHoursWeekdaysTo: '',
    OpeningHoursSaturdayFrom: '',
    OpeningHoursSaturdayTo: '',
    OpeningHoursSundayFrom: '',
    OpeningHoursSundayTo: '',
    OpeningTimeWeekdays: '',
    ClosingTimeWeekdays: '',
    OpeningTimeSat: '',
    ClosingTimeSat: '',
    OpeningTimeSun: '',
    ClosingTimeSun: '',
    Latitude: '',
    Longitude: '',
    blnFlag: '0',
    Error: '',

    CreateSpot: function () {
        if (spot.Image == null || spot.Image == undefined || spot.Image == "")
            spot.Image = "";
      
        var data = '{"SpotId": "' + spot.Id + '",' +
                   '"SpotType":"' + spot.SpotType + '",' +
                   '"UserID":"' + spot.userId + '",' +
                   '"Image":"' + spot.Image + '",' +
                   '"Name":"' + spot.Name + '",' +
                   '"Description":"' + spot.Description + '",' +
                   '"Address":"' + spot.Address + '",' +
                   '"City":"' + spot.City + '",' +
                   '"Zip":"' + spot.Zip + '",' +
                   '"State":"' + spot.State + '",' +
                   '"Country":"' + spot.Country + '",' +
                   '"Phone":"' + spot.Phone + '",' +
                   '"EventDate":"' + spot.EventDate + '",' +
                   '"Web":"' + spot.Web + '",' +
                   '"CVR":"' + spot.CVR + '",' +
                   '"OpeningHoursWeekdaysFrom":"' + spot.OpeningHoursWeekdaysFrom + '",' +
                   '"OpeningHoursWeekdaysTo":"' + spot.OpeningHoursWeekdaysTo + '",' +
                   '"OpeningHoursSaturdayFrom":"' + spot.OpeningHoursSaturdayFrom + '",' +
                   '"OpeningHoursSaturdayTo":"' + spot.OpeningHoursSaturdayTo + '",' +
                   '"OpeningHoursSundayFrom":"' + spot.OpeningHoursSundayFrom + '",' +
                   '"OpeningHoursSundayTo":"' + spot.OpeningHoursSundayTo + '",' +
                   '"OpeningTimeWeekdays":"' + spot.OpeningTimeWeekdays + '",' +
                   '"ClosingTimeWeekdays":"' + spot.ClosingTimeWeekdays + '",' +
                   '"OpeningTimeSat":"' + spot.OpeningTimeSat + '",' +
                   '"ClosingTimeSat":"' + spot.ClosingTimeSat + '",' +
                   '"OpeningTimeSun":"' + spot.OpeningTimeSun + '",' +
                   '"ClosingTimeSun":"' + spot.ClosingTimeSun + '"}';
        
        localStorage.Spotdata = data;  
        //  app.application.navigate("confirm_spot.html");
        app.application.navigate("map.html?spot=true");
    }
};

function SaveSpot() {
    var lat, long;
    var Data = JSON.parse(localStorage.Spotdata);
    if (markersArray[0] != undefined) {
        lat = markersArray[0].position["k"];
        long = markersArray[0].position["B"];
    }
    
    if(Data.Image==""){
        app.application.navigate("createspot.html");
    	return;
    }
    
    var file = {
        "Filename": "spotPicture.jpeg",
        "ContentType": "image/jpeg",
        "CustomField": "customValue",
        "base64": Data.Image
    };
    console.log(file);  
    app.everlive.Files.create(file,
      function (data) {
          console.log(data);  
          
          app.everlive.Files.getById(data.result.Id)
              .then(function(res) {
                  var spot = app.everlive.data('Spot');     

                  spot.create({
                          'userId' : Data.UserID,
                          "Name": Data.Name, 
                          "Description" : Data.Description,
                          "Longitude":long,
                          "Latitude" : lat,
                          "Country":Data.Country,
                          "City":Data.City,
                          "CVR": Data.CVR,
                          "Address":Data.Address,
                          "EventDate":Data.EventDate,
                          "Phone":Data.Phone,
                          "SpotType": Data.SpotType,
                          "State":Data.State,
                          "Web":Data.Web, "Zip":Data.Zip,
                          "ClosingTimeSat":Data.ClosingTimeSat,
                          "ClosingTimeSun":Data.ClosingTimeSun,
                          "ClosingTimeWeekdays":Data.ClosingTimeWeekdays,
                          "OpeningHoursSaturdayFrom":Data.OpeningHoursSaturdayFrom,
                          "OpeningHoursSaturdayTo":Data.OpeningHoursSaturdayTo,
                          "OpeningHoursSundayFrom":Data.OpeningHoursSundayFrom,
                          "OpeningHoursSundayTo":Data.OpeningHoursSundayTo,
                          "OpeningHoursWeekdaysFrom":Data.OpeningHoursWeekdaysFrom,
                          "OpeningHoursWeekdaysTo":Data.OpeningHoursWeekdaysTo,
                          "OpeningTimeSat":Data.OpeningTimeSat,
                          "OpeningTimeSun":Data.OpeningTimeSun,
                          "OpeningTimeWeekdays":Data.OpeningTimeWeekdays,
                          "Image":res.result.Uri
                          
                      },
                      function(data2) {
                          // console.log(data);
                          app.application.navigate("myspots.html");
                      },
                      function(error) {
                          console.log(error);
                      });
              }, function (error3) {
                  console.log(error3); 
              }); 
      },
      function (error2) {
          console.log(error2); 
      });          
}

function InitCreateSpot() {
    Filldata();

    changeLanguage(localStorage.LanguageType);

   TranslateApp();
    if (localStorage.CacheItem != undefined && localStorage.CacheItem != '') {
        LoadStorageData();
    }

    //-----------------------------------------------------------------------------------------

    var now = new Date;
    var Mon = now.getMonth() + 1;
    if (Mon < 10) {
        Mon = '0' + Mon;
    }

    $('#select-choice-month>option').each(function (i) {
        if ($(this).val() == Mon) {
            $('#select-choice-month').val($(this).val());
            $('#select-choice-month').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });

    $('#select-choice-year>option').each(function (i) {
        if ($(this).val() == now.getFullYear()) {
            $('#select-choice-year').val($(this).val());
            $('#select-choice-year').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });

    $('#select-choice-day>option').each(function (i) {
        if ($(this).val() == now.getDate()) {
            $('#select-choice-day').val($(this).val());
            $('#select-choice-day').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });

    //==========================================================================================

    //window.localStorage.removeItem('Spotdata');
    window.localStorage.removeItem('CacheItem');
    //spot.showAddress('Columbus Circle, New York, NY');
    //----Create Spot------
    $("#btnspot").click(function () {
        CreateASpot();
    });

    $('#spotcountry').change(function () {
        if ($(this).val() == 'US') {
            $('#dvState').css({ 'display': 'block' });
            $('#txtState').css({ 'display': 'none' });
            $('#state').parent().children('span').find('.ui-btn-text').html('State');
        } else {
            $('#dvState').css({ 'display': 'none' });
            $('#txtState').css({ 'display': 'block' });
        }
    });

    $('#whatDifference').click(function () {
        SpotCacheObject();

        app.application.navigate('spot_difference.html');
    });

    $('#spotype').change(function () {
        if ($(this).val() == "Garage sale/Market/Event") {
            $('#lblGarageSale').show();
            $('#SpotName').hide();
            $('#GarageName').show();
            $('#EventDescription').show();
            $('#SpotDescription').hide();
            $('#EventDate').show();
            $('#EventDateFields').show();
            $('#SpotWeb').hide();
            $('#SpotCVR').hide();

            switch (localStorage.Language) {
                case "1":
                    $('#btnspot').find('label').text('Opret h�ndelse eller tilf�je');
                    $('#Title').text('Event Maker');
                    break;
                case "2":
                    $('#btnspot').find('label').text('Schaffen Sie Ereignis oder beitragen');
                    $('#Title').text('Ereignis-Sch�pfer');
                    break;
                case "3":
                    $('#btnspot').find('label').text('Create event or add');
                    $('#Title').text('Event Maker');
                    break;
                case "4":
                    $('#btnspot').find('label').text('Crear o agregar');
                    $('#Title').text('Marcador de sucesos');
                    break;
            }
        } else {
            $('#lblGarageSale').hide();
            $('#SpotName').show();
            $('#GarageName').hide();
            $('#EventDescription').hide();
            $('#SpotDescription').show();
            $('#EventDate').hide();
            $('#EventDateFields').hide();
            $('#SpotWeb').show();
            $('#SpotCVR').show();

            switch (localStorage.Language) {
                case "1":
                    $('#btnspot').find('label').text('Lav et sted');
                    $('#Title').text('Lav et sted');
                    break;
                case "2":
                    $('#btnspot').find('label').text('Stelle machen');
                    $('#Title').text('Stelle machen');
                    break;
                case "3":
                    $('#btnspot').find('label').text('Create spot');
                    $('#Title').text('Create Spot');
                    break;
                case "4":
                    $('#btnspot').find('label').text('Crear lugar');
                    $('#Title').text('Crear lugar');
                    break;
            }
        }
    });

    $('#spotmonfrifrom').change(function () {
        if ($(this).val() == "00") {
            //  $("#tdOpenWeek").hide();
            $("#OpenTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeMonFri').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdOpenWeek").show();
            $("#OpenTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeMonFri').val($(this).val());
                    return;
                }
            });
        }
    });

    $('#spotmonfrito').change(function () {
        if ($(this).val() == "00") {
            //  $("#tdCloseWeek").hide();
            $("#CloseTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeMonFri').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdCloseWeek").show();
            $("#CloseTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeMonFri').val($(this).val());
                    return;
                }
            });
        }
    });

    $('#spotopensatfrom').change(function () {
        if ($(this).val() == "00") {
            // $("#tdOpenSat").hide();
            $("#OpenTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSat').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdOpenSat").show();
            $("#OpenTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSat').val($(this).val());
                    return;
                }
            });
        }
    });

    $('#spotopensatto').change(function () {
        if ($(this).val() == "00") {
            //  $("#tdCloseSat").hide();
            $("#CloseTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSat').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdCloseSat").show();
            $("#CloseTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSat').val($(this).val());
                    return;
                }
            });
        }
    });

    $('#spotopensunfrom').change(function () {
        if ($(this).val() == "00") {
            //  $("#tdOpenSun").hide();
            $("#OpenTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSun').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdOpenSun").show();
            $("#OpenTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSun').val($(this).val());
                    return;
                }
            });
        }
    });

    $('#spotopensunto').change(function () {
        if ($(this).val() == "00") {
            //  $("#tdCloseSun").hide();
            $("#CloseTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSun').val($(this).val());
                    return;
                }
            });
        } else {
            $("#tdCloseSun").show();
            $("#CloseTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSun').val($(this).val());
                    return;
                }
            });
        }
    });
}

function CreateASpot() {
    var User = $.parseJSON(localStorage.User);

    if (User.UserRole == "3") {
        var message = '';
        switch (localStorage.Language) {
            case "1":
                message = Language.Danish.Register;
                break;
            case "2":
                message = Language.German.Register;
                break;
            case "3":
                message = Language.English.Register;
                break;
            case "4":
                message = Language.Spanish.Register;
                break;
        }

        if (confirm(message)) {
            //localStorage.User = null;
            SpotCacheObject();
            app.application.navigate("signup_login.html");
            return;
        } else {
            window.localStorage.removeItem('CacheItem');
            return;
        }
    }

    if (User.UserRole == "1") {
        var message = '';
        switch (localStorage.Language) {
            case "1":
                message = Language.Danish.PUpdate;
                break;
            case "2":
                message = Language.German.PUpdate;
                break;
            case "3":
                message = Language.English.PUpdate;
                break;
            case "4":
                message = Language.Spanish.PUpdate;
                break;
        }

        if (confirm(message)) {
            SpotCacheObject();
            app.application.navigate("basic_setup.html");
            return;
        } else {
            window.localStorage.removeItem('CacheItem');
            return;
        }
    }

    if (User.FirstName == "" || User.PhoneNumber == "" || User.EmailID == "") {
        var message = '';
        switch (localStorage.Language) {
            case "1":
                message = Language.Danish.PUpdate;
                break;
            case "2":
                message = Language.German.PUpdate;
                break;
            case "3":
                message = Language.English.PUpdate;
                break;
            case "4":
                message = Language.Spanish.PUpdate;
                break;
        }
        if (confirm(message)) {
            SpotCacheObject();
            app.application.navigate("basic_setup.html");
            return;
        } else {
            window.localStorage.removeItem('CacheItem');
            return;
        }
    }

    spot.blnFlag = true;
    spot.Error = '';

    if ($("#spotype").val() == "0") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.SelectType;
                    break;
                case "2":
                    spot.Error = Language.German.SelectType;
                    break;
                case "3":
                    spot.Error = Language.English.SelectType;
                    break;
                case "4":
                    spot.Error = Language.Spanish.SelectType;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.SelectType;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.SelectType;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.SelectType;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.SelectType;
                    break;
            }
        }
    } else if ($("#spotype").val() == "Garage sale/Market/Event") {
        //            if ($('#select-choice-month option:selected').val() == '0' ||
        //                $('#select-choice-day option:selected').val() == '0' ||
        //                $('#select-choice-year option:selected').val() == '0') {
        //                spot.blnFlag = false;
        //                if (spot.Error == '') {
        //                    spot.Error = "Please provide Event date.\n";
        //                }
        //                else {
        //                    spot.Error = spot.Error + "Please provide Event date.\n";
        //                }
        //            }
        //            else {
        var Dt = $('#select-choice-month option:selected').val() + '/'
                 + $('#select-choice-day option:selected').val() + '/'
                 + $('#select-choice-year option:selected').val();
        var now = new Date;
        var target = new Date(Dt);

        if (now - target > 0) {
            spot.blnFlag = false;
            if (spot.Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        spot.Error = Language.Danish.EventDate;
                        break;
                    case "2":
                        spot.Error = Language.German.EventDate;
                        break;
                    case "3":
                        spot.Error = Language.English.EventDate;
                        break;
                    case "4":
                        spot.Error = Language.Spanish.EventDate;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        spot.Error = spot.Error + Language.Danish.EventDate;
                        break;
                    case "2":
                        spot.Error = spot.Error + Language.German.EventDate;
                        break;
                    case "3":
                        spot.Error = spot.Error + Language.English.EventDate;
                        break;
                    case "4":
                        spot.Error = spot.Error + Language.Spanish.EventDate;
                        break;
                }
            }
        }
        //            }
    }

    if ($("#spotname").val() == "") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.PSpotName;
                    break;
                case "2":
                    spot.Error = Language.German.PSpotName;
                    break;
                case "3":
                    spot.Error = Language.English.PSpotName;
                    break;
                case "4":
                    spot.Error = Language.Spanish.PSpotName;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.PSpotName;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.PSpotName;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.PSpotName;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.PSpotName;
                    break;
            }
        }
    }

    if ($("#spotadress").val() == "") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.PSpotAdress;
                    break;
                case "2":
                    spot.Error = Language.German.PSpotAdress;
                    break;
                case "3":
                    spot.Error = Language.English.PSpotAdress;
                    break;
                case "4":
                    spot.Error = Language.Spanish.PSpotAdress;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.PSpotAdress;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.PSpotAdress;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.PSpotAdress;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.PSpotAdress;
                    break;
            }
        }
    }
    if ($("#spotcity").val() == "") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.pspotCity;
                    break;
                case "2":
                    spot.Error = Language.German.pspotCity;
                    break;
                case "3":
                    spot.Error = Language.English.pspotCity;
                    break;
                case "4":
                    spot.Error = Language.Spanish.pspotCity;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.pspotCity;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.pspotCity;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.pspotCity;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.pspotCity;
                    break;
            }
        }
    }
    if ($("#spotzip").val() == "") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.PspotZip;
                    break;
                case "2":
                    spot.Error = Language.German.PspotZip;
                    break;
                case "3":
                    spot.Error = Language.English.PspotZip;
                    break;
                case "4":
                    spot.Error = Language.Spanish.PspotZip;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.PspotZip;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.PspotZip;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.PspotZip;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.PspotZip;
                    break;
            }
        }
    }
    if ($("#spotcountry").val() == "0") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.PCountry;
                    break;
                case "2":
                    spot.Error = Language.German.PCountry;
                    break;
                case "3":
                    spot.Error = Language.English.PCountry;
                    break;
                case "4":
                    spot.Error = Language.Spanish.PCountry;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.PCountry;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.PCountry;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.PCountry;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.PCountry;
                    break;
            }
        }
    }

    if ($('#spotphone').val() == "") {
        spot.blnFlag = false;
        if (spot.Error == '') {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = Language.Danish.PPhoneNumber;
                    break;
                case "2":
                    spot.Error = Language.German.PPhoneNumber;
                    break;
                case "3":
                    spot.Error = Language.English.PPhoneNumber;
                    break;
                case "4":
                    spot.Error = Language.Spanish.PPhoneNumber;
                    break;
            }
        } else {
            switch (localStorage.Language) {
                case "1":
                    spot.Error = spot.Error + Language.Danish.PPhoneNumber;
                    break;
                case "2":
                    spot.Error = spot.Error + Language.German.PPhoneNumber;
                    break;
                case "3":
                    spot.Error = spot.Error + Language.English.PPhoneNumber;
                    break;
                case "4":
                    spot.Error = spot.Error + Language.Spanish.PPhoneNumber;
                    break;
            }
        }
    }

    if ($("#spotweb").val() != '') {
        if (!ValidateURL('spotweb')) {
            spot.blnFlag = false;
            if (spot.Error == '') {
                switch (localStorage.Language) {
                    case "1":
                        spot.Error = Language.Danish.PUrl;
                        break;
                    case "2":
                        spot.Error = Language.German.PUrl;
                        break;
                    case "3":
                        spot.Error = Language.English.PUrl;
                        break;
                    case "4":
                        spot.Error = Language.Spanish.PUrl;
                        break;
                }
            } else {
                switch (localStorage.Language) {
                    case "1":
                        spot.Error = spot.Error + Language.Danish.PUrl;
                        break;
                    case "2":
                        spot.Error = spot.Error + Language.German.PUrl;
                        break;
                    case "3":
                        spot.Error = spot.Error + Language.English.PUrl;
                        break;
                    case "4":
                        spot.Error = spot.Error + Language.Spanish.PUrl;
                        break;
                }
            }
        }
    }

    if (spot.blnFlag == false || spot.blnFlag == 'false') {
        $('#btnspot').removeAttr('disabled');
        alert(spot.Error);
        return;
    } else if (spot.blnFlag == true || spot.blnFlag == 'true') {
       

        spot.userId = User.Id;
        spot.Id = '0';
        spot.SpotType = $("#spotype option:selected").val();

            spot.EventDate = $('#select-choice-month option:selected').val() + '/'
                             + $('#select-choice-day option:selected').val() + '/'
                             + $('#select-choice-year option:selected').val();
      

        spot.Name = $("#spotname").val();
        spot.Description = $("#spotdesc").val();
        spot.Address = $("#spotadress").val();
        spot.City = $("#spotcity").val();
        spot.Zip = $("#spotzip").val();
        spot.Country = $('#spotcountry').val();

        if (spot.Country == 'US') {
            spot.State = $('#spotstate').val();
        } else {
            spot.State = $("#txtState").val();
        }
       
        spot.Phone = $("#spotphone").val();
        spot.Web = $("#spotweb").val();
        spot.CVR = $("#Cvr").val();
        spot.OpeningHoursWeekdaysFrom = $("#spotmonfrifrom").val();
        spot.OpeningHoursWeekdaysTo = $("#spotmonfrito").val();
        spot.OpeningHoursSaturdayFrom = $("#spotopensatfrom").val();
        spot.OpeningHoursSaturdayTo = $("#spotopensatto").val();
        spot.OpeningHoursSundayFrom = $("#spotopensunfrom").val();
        spot.OpeningHoursSundayTo = $("#spotopensunto").val();
        spot.OpeningTimeWeekdays = $("#OpenTimeMonFri").val();
        spot.ClosingTimeWeekdays = $("#CloseTimeMonFri").val();
        spot.OpeningTimeSat = $("#OpenTimeSat").val();
        spot.ClosingTimeSat = $("#CloseTimeSat").val();
        spot.OpeningTimeSun = $("#OpenTimeSun").val();
        spot.ClosingTimeSun = $("#CloseTimeSun").val();
        spot.CreateSpot();
    }
   
}

function LoadStorageData() {
    Item = $.parseJSON(localStorage.CacheItem);
    if (Item.Image != undefined && Item.Image != '') {
        spot.Image = Item.Image;
        var Image = document.getElementById('image');
        Image.src = "data:image/jpeg;base64," + Item.Image;
    }

    if (Item.SpotType != undefined && Item.SpotType != '') {
        $('#spotype>option').each(function (i) {
            if ($(this).val() == Item.SpotType) {
                $('#spotype').val($(this).val());
                $('#spotype').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });

        if (Item.SpotType == "Garage sale/Market/Event") {
            $('#lblGarageSale').show();
            $('#SpotName').hide();
            $('#GarageName').show();
            $('#EventDescription').show();
            $('#SpotDescription').hide();
            $('#EventDate').show();
            $('#EventDateFields').show();
            $('#SpotWeb').hide();
            $('#SpotCVR').hide();
            $('#btnspot').find('label').text('Create event or add');
            $('#Title').text('Event Maker');

            var array = Item.EventDate.split('/');
           
            $('#select-choice-month>option').each(function (i) {
                if ($(this).val() == array[0]) {
                    $('#select-choice-month').val($(this).val());
                    $('#select-choice-month').parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
         
            $('#select-choice-day>option').each(function (i) {
                if ($(this).val() == array[1]) {
                    $('#select-choice-day').val($(this).val());
                    $('#select-choice-day').parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });

            $('#select-choice-year>option').each(function (i) {
                if ($(this).val() == array[2]) {
                    $('#select-choice-year').val($(this).val());
                    $('#select-choice-year').parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }

    if (Item.Name != undefined && Item.Name != '')
        $("#spotname").val(Item.Name);
    if (Item.Description != undefined && Item.Description != '')
        $("#spotdesc").val(Item.Description);

    if (Item.Address != undefined && Item.Address != '')
        $("#spotadress").val(Item.Address);
    if (Item.City != undefined && Item.City != '')
        $("#spotcity").val(Item.City);
    if (Item.Zip != undefined && Item.Zip != '')
        $("#spotzip").val(Item.Zip);
    if (Item.Country != undefined && Item.Country != '') {
        $('#spotcountry>option').each(function (i) {
            if ($(this).val() == Item.Country) {
                $('#spotcountry').val($(this).val());
                $('#spotcountry').parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });

        if (Item.Country == 'United States') {
            $('#spotstate>option').each(function (i) {
                if ($(this).val() == Item.State) {
                    $('#spotstate').val($(this).val());
                    $('#spotstate').parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        } else {
            $("#txtState").val(Item.State);
        }
    }
    if (Item.Phone != undefined && Item.Phone != '')
        $("#spotphone").val(Item.Phone)
    if (Item.Web != undefined && Item.Web != '')
        $("#spotweb").val(Item.Web)
    if (Item.CVR != undefined && Item.CVR != '')
        $("#Cvr").val(Item.CVR)
    if (Item.OpeningHoursWeekdaysFrom != undefined && Item.OpeningHoursWeekdaysFrom != '') {
        $('#spotmonfrifrom>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursWeekdaysFrom) {
                $('#spotmonfrifrom').val($(this).val());
                $("#spotmonfrifrom").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }
    if (Item.OpeningHoursWeekdaysTo != undefined && Item.OpeningHoursWeekdaysTo != '') {
        $('#spotmonfrito>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursWeekdaysTo) {
                $('#spotmonfrito').val($(this).val());
                $("#spotmonfrito").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }
    if (Item.OpeningHoursSaturdayFrom != undefined && Item.OpeningHoursSaturdayFrom != '') {
        $('#spotopensatfrom>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursSaturdayFrom) {
                $('#spotopensatfrom').val($(this).val());
                $("#spotopensatfrom").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }
    if (Item.OpeningHoursSaturdayTo != undefined && Item.OpeningHoursSaturdayTo != '') {
        $('#spotopensatto>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursSaturdayTo) {
                $('#spotopensatto').val($(this).val());
                $("#spotopensatto").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }
    if (Item.OpeningHoursSundayFrom != undefined && Item.OpeningHoursSundayFrom != '') {
        $('#spotopensunfrom>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursSundayFrom) {
                $('#spotopensunfrom').val($(this).val());
                $("#spotopensunfrom").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }
    if (Item.OpeningHoursSundayTo != undefined && Item.OpeningHoursSundayTo != '') {
        $('#spotopensunto>option').each(function (i) {
            if ($(this).val() == Item.OpeningHoursSundayTo) {
                $('#spotopensunto').val($(this).val());
                $("#spotopensunto").parent().children('span').find('.ui-btn-text').html($(this).html());
                return;
            }
        });
    }

    if (Item.OpeningTimeWeekdays != undefined && Item.OpeningTimeWeekdays != '') {
        if (Item.OpeningTimeWeekdays == '-') {
            $("#tdOpenWeek").hide();
        } else {
            $("#tdOpenWeek").show();
            $('#OpenTimeMonFri>option').each(function (i) {
                if ($(this).val() == Item.OpeningTimeWeekdays) {
                    $('#OpenTimeMonFri').val($(this).val());
                    $("#OpenTimeMonFri").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }

    if (Item.ClosingTimeWeekdays != undefined && Item.ClosingTimeWeekdays != '') {
        if (Item.ClosingTimeWeekdays == '-') {
            $("#tdCloseWeek").hide();
        } else {
            $("#tdCloseWeek").show();
            $('#CloseTimeMonFri>option').each(function (i) {
                if ($(this).val() == Item.ClosingTimeWeekdays) {
                    $('#CloseTimeMonFri').val($(this).val());
                    $("#CloseTimeMonFri").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }

    if (Item.OpeningTimeSat != undefined && Item.OpeningTimeSat != '') {
        if (Item.OpeningTimeSat == '-') {
            $("#tdOpenSat").hide();
        } else {
            $("#tdOpenSat").show();
            $('#OpenTimeSat>option').each(function (i) {
                if ($(this).val() == Item.OpeningTimeSat) {
                    $('#OpenTimeSat').val($(this).val());
                    $("#OpenTimeSat").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }
    if (Item.ClosingTimeSat != undefined && Item.ClosingTimeSat != '') {
        if (Item.ClosingTimeSat == '-') {
            $("#tdCloseSat").hide();
        } else {
            $("#tdCloseSat").show();
            $('#CloseTimeSat>option').each(function (i) {
                if ($(this).val() == Item.ClosingTimeSat) {
                    $('#CloseTimeSat').val($(this).val());
                    $("#CloseTimeSat").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }
    if (Item.OpeningTimeSun != undefined && Item.OpeningTimeSun != '') {
        if (Item.OpeningTimeSun == '-') {
            $("#tdOpenSun").hide();
        } else {
            $("#tdOpenSun").show();
            $('#OpenTimeSun>option').each(function (i) {
                if ($(this).val() == Item.OpeningTimeSun) {
                    $('#OpenTimeSun').val($(this).val());
                    $("#OpenTimeSun").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }
    if (Item.ClosingTimeSun != undefined && Item.ClosingTimeSun != '') {
        if (Item.ClosingTimeSun == '-') {
            $("#tdCloseSun").hide();
        } else {
            $("#tdCloseSun").show();
            $('#CloseTimeSun>option').each(function (i) {
                if ($(this).val() == Item.ClosingTimeSun) {
                    $('#CloseTimeSun').val($(this).val());
                    $("#CloseTimeSun").parent().children('span').find('.ui-btn-text').html($(this).html());
                    return;
                }
            });
        }
    }
    // CreateASpot();
}

function SpotCacheObject() {
    var data = '{"NavigateURL":"createspot.html",' +
               '"SpotType":"' + $("#spotype").val() + '",' +
               '"Image":"' + spot.Image + '",' +
               '"Name":"' + $("#spotname").val() + '",' +
               '"Description":"' + $("#spotdesc").val() + '",' +
               '"Address":"' + $("#spotadress").val() + '",' +
               '"City":"' + $("#spotcity").val() + '",' +
               '"Zip":"' + $("#spotzip").val() + '",' +
               '"Country":"' + $('#spotcountry').val() + '",';
    if ($('#spotcountry').parent().children('span').find('.ui-btn-text').html() == 'United States') {
        data += '"State":"' + $('#spotstate').val() + '",';
    } else {
        data += '"State":"' + $("#txtState").val() + '",';
    }
    data += '"Phone":"' + $("#spotphone").val() + '",' +
            '"EventDate":"' + $('#select-choice-month').val()
            + '/' + $('#select-choice-day').val()
            + '/' + $('#select-choice-year').val() + '",' +
            '"Web":"' + $("#spotweb").val() + '",' +
            '"CVR":"' + $("#Cvr").val() + '",' +
            '"OpeningHoursWeekdaysFrom":"' + $("#spotmonfrifrom").val() + '",' +
            '"OpeningHoursWeekdaysTo":"' + $("#spotmonfrito").val() + '",' +
            '"OpeningHoursSaturdayFrom":"' + $("#spotopensatfrom").val() + '",' +
            '"OpeningHoursSaturdayTo":"' + $("#spotopensatto").val() + '",' +
            '"OpeningHoursSundayFrom":"' + $("#spotopensunfrom").val() + '",' +
            '"OpeningHoursSundayTo":"' + $("#spotopensunto").val() + '",' +
            '"OpeningTimeWeekdays":"' + $("#OpenTimeMonFri").val() + '",' +
            '"ClosingTimeWeekdays":"' + $("#CloseTimeMonFri").val() + '",' +
            '"OpeningTimeSat":"' + $("#OpenTimeSat").val() + '",' +
            '"ClosingTimeSat":"' + $("#CloseTimeSat").val() + '",' +
            '"OpeningTimeSun":"' + $("#OpenTimeSun").val() + '",' +
            '"ClosingTimeSun":"' + $("#CloseTimeSun").val() + '"}';
    		localStorage.CacheItem = data;
}

function ValidateURL(txtUrl) {
    var data = document.getElementById(txtUrl).value;

    var URL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (data.match(URL)) {
        return true;
    } else {
        return false;
    }
}

function Filldata(edit) {
    if(edit==undefined)
    edit = "";
     $('#select-choice-month'+edit).html("");
     $('#spotype'+edit).html("");
   //  $('#spotstate'+edit).html("");
    // $('#spotcountry'+edit).html("");
    switch (localStorage.Language) { 
        case "1":

            $.each(SpotType.Danish, function (i) {
                $('#spotype'+edit).append('<option value="' + SpotType.Danish[i].id + '">' + SpotType.Danish[i].Value + '</option>');
            });
                     /*  $.each(Country.English, function (i) {
                            $('#spotcountry'+edit).append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
                       
                       });

                       $.each(States.English, function (i) {
                           $('#spotstate'+edit).append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
                      });*/
            $.each(date.Danish, function (i) {
                $('#select-choice-month'+edit).append('<option value="' + date.Danish[i].id + '">' + date.Danish[i].Value + '</option>');
            });
            
            break;
        case "2":
            $.each(SpotType.German, function (i) {
                $('#spotype'+edit).append('<option value="' + SpotType.German[i].id + '">' + SpotType.German[i].Value + '</option>');
            });
                      /*  $.each(Country.English, function (i) {
                            $('#spotcountry'+edit).append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
                       });

                        $.each(States.English, function (i) {
                            $('#spotstate'+edit).append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
                        });*/
            $.each(date.German, function (i) {
                $('#select-choice-month'+edit).append('<option value="' + date.German[i].id + '">' + date.German[i].Value + '</option>');
            });
            break;
        case "3":
            $.each(SpotType.English, function (i) {
                $('#spotype'+edit).append('<option value="' + SpotType.English[i].id + '">' + SpotType.English[i].Value + '</option>');
            });
                       /* $.each(Country.English, function (i) {
                            $('#spotcountry'+edit).append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
                        });

                        $.each(States.English, function (i) {
                            $('#spotstate'+edit).append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
                        });*/
            $.each(date.English, function (i) {
                $('#select-choice-month'+edit).append('<option value="' + date.English[i].id + '">' + date.English[i].Value + '</option>');
            });
            break;
        case "4":
            $.each(SpotType.Spanish, function (i) {
                $('#spotype'+edit).append('<option value="' + SpotType.Spanish[i].id + '">' + SpotType.Spanish[i].Value + '</option>');
            });
                       /* $.each(Country.Spanish, function (i) {
                            $('#spotcountry'+edit).append('<option value="' + Country.Spanish[i].id + '">' + Country.Spanish[i].Value + '</option>');
                        });

                        $.each(States.Spanish, function (i) {
                            $('#spotstate'+edit).append('<option value="' + States.Spanish[i].id + '">' + States.Spanish[i].Value + '</option>');
                        });*/
            $.each(date.Spanish, function (i) {
                $('#select-choice-month'+edit).append('<option value="' + date.Spanish[i].id + '">' + date.Spanish[i].Value + '</option>');
            });
            break;
    }

    $('#spotcountry'+edit +'>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotcountry'+edit).val($(this).val());
            $('#spotcountry'+edit).parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
    $('#spotstate'+edit +'>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotstate'+edit).val($(this).val());
            $('#spotstate'+edit).parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
    $('#spotype'+edit +'>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotype'+edit).val($(this).val());
            $('#spotype'+edit).parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
}