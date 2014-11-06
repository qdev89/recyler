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
        //        else
        //            spot.Image = localStorage.SpotImage;
        //alert(spot.Image);
        $.support.cors = true;
        var data = '{"SpotId": "' + spot.Id + '",' +
                   '"SpotType":"' + spot.SpotType + '",' +
                   '"UserID":"' + spot.userId + '",' +
                   '"Image":"' + spot.Image + '",' +
                   //    '"Image":"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",' +
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
        $('#LoadingDiv,#Load').hide();

        app.application.navigate("confirm_spot.html");
    }
};

function InitCreateSpot() {
    Filldata();

    changeLanguage(localStorage.LanguageType);

    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);

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
            $("#tdOpenWeek").hide();
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
            $("#tdCloseWeek").hide();
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
            $("#tdOpenSat").hide();
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
            $("#tdCloseSat").hide();
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
            $("#tdOpenSun").hide();
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
            $("#tdCloseSun").hide();
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
            localStorage.User = null;
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
        $("#LoadingDiv").css({
                                 "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
                                 'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
                                 'background-color': 'white'
                             });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').show();

        spot.userId = User.UserID;

        spot.Id = '0';
        spot.SpotType = $("#spotype option:selected").val();

        if (spot.SpotType == "Garage sale/Market/Event") {
            spot.EventDate = $('#select-choice-month option:selected').val() + '/'
                             + $('#select-choice-day option:selected').val() + '/'
                             + $('#select-choice-year option:selected').val();
        } else {
            spot.EventDate = "";
        }

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

        //spot.GetLonLat();
        //$.mobile.loadingMessageTextVisible = true;

        //$.mobile.showPageLoadingMsg("b", "please wait...");
        spot.CreateSpot();
    }
    // spot.CreateSpot();
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

function Filldata() {
    switch (localStorage.Language) {
        case "1":

            $.each(SpotType.Danish, function (i) {
                $('#spotype').append('<option value="' + SpotType.Danish[i].id + '">' + SpotType.Danish[i].Value + '</option>');
            });
            //            $.each(Country.English, function (i) {
            //                $('#spotcountry').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
            //            
            //            });

            //            $.each(States.English, function (i) {
            //                $('#spotstate').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
            //            });
            $.each(date.Danish, function (i) {
                $('#select-choice-month').append('<option value="' + date.Danish[i].id + '">' + date.Danish[i].Value + '</option>');
            });
            
            break;
        case "2":
            $.each(SpotType.German, function (i) {
                $('#spotype').append('<option value="' + SpotType.German[i].id + '">' + SpotType.German[i].Value + '</option>');
            });
            //            $.each(Country.English, function (i) {
            //                $('#spotcountry').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
            //            });

            //            $.each(States.English, function (i) {
            //                $('#spotstate').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
            //            });
            $.each(date.German, function (i) {
                $('#select-choice-month').append('<option value="' + date.German[i].id + '">' + date.German[i].Value + '</option>');
            });
            break;
        case "3":
            $.each(SpotType.English, function (i) {
                $('#spotype').append('<option value="' + SpotType.English[i].id + '">' + SpotType.English[i].Value + '</option>');
            });
            //            $.each(Country.English, function (i) {
            //                $('#spotcountry').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
            //            });

            //            $.each(States.English, function (i) {
            //                $('#spotstate').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
            //            });
            $.each(date.English, function (i) {
                $('#select-choice-month').append('<option value="' + date.English[i].id + '">' + date.English[i].Value + '</option>');
            });
            break;
        case "4":
            $.each(SpotType.Spanish, function (i) {
                $('#spotype').append('<option value="' + SpotType.Spanish[i].id + '">' + SpotType.Spanish[i].Value + '</option>');
            });
            //            $.each(Country.Spanish, function (i) {
            //                $('#spotcountry').append('<option value="' + Country.Spanish[i].id + '">' + Country.Spanish[i].Value + '</option>');
            //            });

            //            $.each(States.Spanish, function (i) {
            //                $('#spotstate').append('<option value="' + States.Spanish[i].id + '">' + States.Spanish[i].Value + '</option>');
            //            });
            $.each(date.Spanish, function (i) {
                $('#select-choice-month').append('<option value="' + date.Spanish[i].id + '">' + date.Spanish[i].Value + '</option>');
            });
            break;
    }

    $('#spotcountry>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotcountry').val($(this).val());
            $('#spotcountry').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
    $('#spotstate>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotstate').val($(this).val());
            $('#spotstate').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
    $('#spotype>option').each(function (i) {
        if ($(this).val() == '0') {
            $('#spotype').val($(this).val());
            $('#spotype').parent().children('span').find('.ui-btn-text').html($(this).html());
            return;
        }
    });
}