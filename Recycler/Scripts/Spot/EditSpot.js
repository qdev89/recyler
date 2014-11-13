var spot = {
    Id: '',
    Name: '',
    Image: '',
    Description: '',
    Address: '',
    City: '',
    Zip: '',
    State: '',
    Country: '',
    Phone: '',
    EventDate: '',
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
    UserId: '',
    blnFlag: true,
    Error: '',


    //----Get Spot for filling DataField-----//

    GetSpotDetail: function () {


      /*  var Parameters = localStorage.spotID + '/' + spot.userId;
        var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._GetSpotDetail + '/' + Parameters;

        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: URLFormed,
            dataType: 'json',
            data: '{}',
            cache: false,
            success: function (Result) {
                
                if (Result != null && Result != 'null') {
                    // alert("success");
                    var data = JSON.stringify(Result);
                    data = $.parseJSON(data);
                    var SpotList = '';

                    $('#spotype>option').each(function (i) {

                        if ($(this).val() == data.SpotType) {
                            $('#spotype').val($(this).val());
                            $('#spotype').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });


                    if (data.SpotType == "Garage sale/Market/Event") {
                        $('#lblGarageSale').show();
                        $('#SpotName').hide();
                        $('#SpotName').css({ 'display': 'none' });
                        $('#GarageName').show();
                        $('#EventDescription').show();
                        $('#SpotDescription').hide();
                        $('#EventDate').show();
                        $('#EventDateFields').show();
                        $('#SpotWeb').hide();
                        $('#SpotCVR').hide();
                        $('#btnspot').find('label').text('Update event or add');


                        var Array = data.EventDate.split('/');


                        $('#select-choice-month>option').each(function (i) {

                            if ($(this).val() == Array[1]) {
                            
                                $('#select-choice-month').val($(this).val());
                                $('#select-choice-month').parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });


                        $('#select-choice-year>option').each(function (i) {

                            if ($(this).val() == Array[2]) {
                                $('#select-choice-year').val($(this).val());
                                $('#select-choice-year').parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });


                        $('#select-choice-day>option').each(function (i) {

                            if ($(this).val() == Array[0]) {
                                $('#select-choice-day').val($(this).val());
                                $('#select-choice-day').parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });


                    }
                    else {
                        $('#lblGarageSale').hide();
                        $('#SpotName').show();
                        $('#GarageName').hide();
                        $('#EventDescription').hide();
                        $('#SpotDescription').show();
                        $('#EventDate').hide();
                        $('#EventDateFields').hide();
                        $('#SpotWeb').show();
                        $('#SpotCVR').show();
                        $('#btnspot').find('label').text('Update spot');
                    }





                    if (data.ImagePath != '' && data.ImagePath != undefined && data.ImagePath != null)
                        $('#image').attr('src', "data:image/jpeg;base64," + data.ImagePath);
                    else
                        $('#image').attr('src', "images/imageplaceholder.png");

                    spot.Image = data.ImagePath;
                    $("#spotname").val(data.Name);
                    $("#spotdesc").val(data.Description);
                    $("#spotadress").val(data.Address);
                    $("#spotcity").val(data.City);
                    $("#spotzip").val(data.Zip);

                    //   $("#spotstate").val(data[i].State).attr('selected', 'selected');
                    //   $("#spotcountry").val(data[i].Country).attr('selected', 'selected');
                    //countries0

                    $('#Select1>option').each(function (i) {

                        if ($(this).val() == data.Country) {
                            $('#Select1').val($(this).val());
                            $('#Select1').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });
                    if (data.Country == 'US') {
                        $('#dvState').css({ 'display': 'block' });
                        //   $("#state").val(data.State);

                        $('#select-choice-3>option').each(function (i) {

                            if ($(this).val() == data.State) {
                                $('#select-choice-3').val($(this).val());
                                $('#select-choice-3').parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                        $('#txtState').css({ 'display': 'none' });
                    }
                    else {
                        $('#dvState').css({ 'display': 'none' });
                        $('#txtState').css({ 'display': 'block' });
                        $("#txtState").val(data.State);
                    }

                    $("#spotphone").val(data.Phone);
                    $("#spotweb").val(data.Web);
                    $("#Cvr").val(data.CVR);



                    $('[name="spotopen"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursWeekdaysFrom) {
                            $('[name="spotopen"]').val($(this).val());
                            $('[name="spotopen"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });

                    $('[name="spotclose"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursWeekdaysTo) {
                            $('[name="spotclose"]').val($(this).val());
                            $('[name="spotclose"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });


                    $('[name="D20"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursSaturdayFrom) {
                            $('[name="D20"]').val($(this).val());
                            $('[name="D20"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });


                    $('[name="D21"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursSaturdayTo) {
                            $('[name="D21"]').val($(this).val());
                            $('[name="D21"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });

                    $('[name="D22"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursSundayFrom) {
                            $('[name="D22"]').val($(this).val());
                            $('[name="D22"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });

                    $('[name="D23"]>option').each(function (i) {

                        if ($(this).val() == data.OpeningHoursSundayTo) {
                            $('[name="D23"]').val($(this).val());
                            $('[name="D23"]').parent().children('span').find('.ui-btn-text').html($(this).html());
                            return;
                        }
                    });

                    //---------------------------------------------------------------------------------------------------

                    if (data.OpeningHoursWeekdaysFrom == '00' || data.OpeningHoursWeekdaysFrom == '0') {

                        $("#tdOpenWeek").hide();
                    }
                    else {
                        $("#tdOpenWeek").show();

                        $('#OpenTimeMonFri>option').each(function (i) {
                            if ($(this).val() == data.OpeningTimeWeekdays) {
                                $('#OpenTimeMonFri').val($(this).val());
                                $("#OpenTimeMonFri").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                    }



                    if (data.OpeningHoursWeekdaysTo == '00' || data.OpeningHoursWeekdaysTo == '0') {

                        $("#tdCloseWeek").hide();
                    } else {
                        $("#tdCloseWeek").show();
                        $('#CloseTimeMonFri>option').each(function (i) {
                            if ($(this).val() == data.ClosingTimeWeekdays) {
                                $('#CloseTimeMonFri').val($(this).val());
                                $("#CloseTimeMonFri").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                    }



                    if (data.OpeningHoursSaturdayFrom == '00' || data.OpeningHoursSaturdayFrom == '0') {

                        $("#tdOpenSat").hide();
                    } else {
                        $("#tdOpenSat").show();

                        $('#OpenTimeSat>option').each(function (i) {
                            if ($(this).val() == data.OpenTimeSat) {
                                $('#OpenTimeSat').val($(this).val());
                                $("#OpenTimeSat").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });

                    }



                    if (data.OpeningHoursSaturdayTo == '00' || data.OpeningHoursSaturdayTo == '0') {

                        $("#tdCloseSat").hide();
                    } else {
                        $("#tdCloseSat").show();

                        $('#CloseTimeSat>option').each(function (i) {
                            if ($(this).val() == data.ClosingTimeSat) {
                                $('#CloseTimeSat').val($(this).val());
                                $("#CloseTimeSat").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                    }





                    if (data.OpeningHoursSundayFrom == '00' || data.OpeningHoursSundayFrom == '0') {

                        $("#tdOpenSun").hide();
                    } else {
                        $("#tdOpenSun").show();

                        $('#OpenTimeSun>option').each(function (i) {
                            if ($(this).val() == data.OpeningTimeSun) {
                                $('#OpenTimeSun').val($(this).val());
                                $("#OpenTimeSun").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                    }



                    if (data.OpeningHoursSundayTo == '00' || data.OpeningHoursSundayTo == '0') {

                        $("#tdCloseSun").hide();
                    } else {
                        $("#tdCloseSun").show();

                        $('#CloseTimeSun>option').each(function (i) {
                            if ($(this).val() == data.ClosingTimeSun) {
                                $('#CloseTimeSun').val($(this).val());
                                $("#CloseTimeSun").parent().children('span').find('.ui-btn-text').html($(this).html());
                                return;
                            }
                        });
                    }





                }

            },
            error: function (xhr) {
                switch (localStorage.Language) {
                    case "1":
                        alert(Language.Danish.Ptry);
                        break;
                    case "2":
                        alert(Language.German.Ptry);
                        break;
                    case "3":
                        alert(Language.English.Ptry);
                        break;
                    case "4":
                        alert(Language.Spanish.Ptry);
                        break;
                }

            }
        });*/

    },




    UpdateSpot: function () {
        
       /* spot.SpotType = $('#spotype').val();


        if (spot.SpotType == "Garage sale/Market/Event") {
            spot.EventDate = $('#select-choice-month option:selected').val() + '/'
                               + $('#select-choice-day option:selected').val() + '/'
                               + $('#select-choice-year option:selected').val();
        }
        else {
            spot.EventDate = "";
        }



        spot.Name = $("#spotname").val();
        spot.Description = $("#spotdesc").val();
        spot.Address = $("#spotadress").val();
        spot.City = $("#spotcity").val();
        spot.Zip = $("#spotzip").val();

        spot.Country = $('#Select1').val();
        if (spot.Country == 'US') {
            spot.State = $('#select-choice-3').val();
        }
        else {
            spot.State = $("#txtState").val();
        }

        spot.Phone = $("#spotphone").val();
        spot.Web = $("#spotweb").val();
        spot.CVR = $("#Cvr").val();

        spot.OpeningHoursWeekdaysFrom = $('[name="spotopen"]').val();
        spot.OpeningHoursWeekdaysTo = $('[name="spotclose"]').val();
        spot.OpeningHoursSaturdayFrom = $('[name="D20"]').val();
        spot.OpeningHoursSaturdayTo = $('[name="D21"]').val();
        spot.OpeningHoursSundayFrom = $('[name="D22"]').val();
        spot.OpeningHoursSundayTo = $('[name="D23"]').val();


        spot.OpeningTimeWeekdays = $("#OpenTimeMonFri").val();
        spot.ClosingTimeWeekdays = $("#CloseTimeMonFri").val();
        spot.OpeningTimeSat = $("#OpenTimeSat").val();
        spot.ClosingTimeSat = $("#CloseTimeSat").val();
        spot.OpeningTimeSun = $("#OpenTimeSun").val();
        spot.ClosingTimeSun = $("#CloseTimeSun").val();


        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });


        $.support.cors = true;

        var data = '{"SpotId": "' + spot.Id + '",' +
                   '"SpotType":"' + spot.SpotType + '",' +
                   '"UserID":"' + spot.userId + '",' +
                   '"Image":"' + spot.Image + '",' +
        //  '"Image":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCADIAJYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNC09VpyrTwvFZmg0LUErbztXp/OnyybzsTp7d6ljhESl35P8AKnsIrMmwAH7x6+1W4YtiAHr3plvGZZDI3QH9auhKGwSIQlLsqcJS7KkZm3MJHI+oqWE+ZGG79DVuSHehHft9aoxMIJWDcK36Gq3QtmPmIjXPc9BTYYSq5b7x5NSQxNM/nOMD+EVOUpDKxSmlKslKYVpAVytMK1ZK0wrTArlajaMduKslaYVoFYqlGHvRU+2incVi2FAGScCoXdpTsjBx/OnLBLMcyHA9KuQxLGMKPxpbFEMFuI+Ty38qZJmaQRpyP881PNJu/dxjJPHHep7a28tcnlz1NHmAkUIRAo7VIE9qlC08LUjIQlLsqcJS7KBlcpWZdBZXcoOAevqa0r5zFAcfebgUiWoFr5RHJGT9aadtRNXI7ZhLArD0wfY1IUqtZN5c7RNwG6fWr+2h6AisUphSrRWmFaQFRkqNkq2y1Gy0wKpWmEVYZajZaBFcrRUhWigC3lUGWIFM3vOdkYwvf/69OitBnMjFjVxEVRgAAe1F0hkdvbrEM9W9asqtCrUgWlcdgApwUUoFOApANC0u2nYpaAKFyvmX8EfZfm/z+VWylVVAbVmyeg4/Kr2KbEjL1C2YHzk6jrjt71PbSieMHjcPvCru2qE1gyv5ls2xhztovcCYrTCtRC6li+W4hP8AvCni7t2H38exFFmO4jLUTLUrzQgf6xfzqvJcwj7pLewFAhrLUErKnLECnsZ5fuJ5Y9T1potlU5bLt6mmIrF5H5jTj1PeirJHPSii4F9RUqrTVFSKKkocq08CkWnikMUUuKBVe8vI7UAEFmIyAKYrlnFFYU+qXD8KRGPYVTkmkkOXdmPuc1XKybm1Ltj1WNifvAfnyP8ACtCuSLHdUrCRVBOcU3EEdRRXLJPJHyjsp9jirkGrToQHxIPfrS5WFzcIFQtbQt1jX8qba3kd0PlyGHVTVipGVfscA6RrSeSi/dRR9BVkimMKLjKrLULrVthULigRUZaKlYUUwLSipRTFFSKKkY5RTgKQU4UAKBWNrZ/0hP8Ac/rW0Kxdc/4+U/3P61UdyWZhpKU02tSRw+8DWlKmbYnHasztVv7cfsnklATz82aLGtOaSaZV7EU0U4dabQZFmynMM6OOxrphhlBByD0xXIqcGul0uXzbNeeVO3/D9KzmhonIppFSkUwioKTIGFROKsOKhcUDKzDminN1opiLK1ItMUU8UihwNOFNFOFAmPFYuuD9/H/u/wBa2RWRrnEsZ/2aqO5DMvaep4FKDGv8Jb6nA/Sm96StiQY7ugA+lJS0YoASlJBPK/lRikoAXA7H8619CkIZ4z3Gfy//AF1j1e0iTZeR5PU4/Mf/AKqiWw0dEaaaeTTTishoiaonqZhULigsgYc0UrDmimInWnio1qQGkUOFOFNFPFAmKKyNdHzRH2NbArJ14f6r8aqO5Bj0UU4DitiQAFLgU5UJoZcUxDCBTDinGmmgYlTWj7Jlb0IP5HNQ0+L7x9wahjR1xphpY33xK3qAaDisBojaoXNTNUT0yyBjzRSN1opiJ1FPFMWpFoGOFOFIBS4oBjhWVrvIi/GtQVl659yP8aqO5Jj1JGMnFR1IpAINbIg1rSxMke4YqteWzROVIrR0y6j8rYTg9c+tRapIjn5TnApiMVxg1GakkPNRGkAU+H/Wr9ajp8H+tX61LKR1Fof9Dh/65r/KpCahtP8Ajzh/3B/KpDWBSGtUTk09iahc0FEbHmims3NFMRZU1ItRLT16Uxkopwpi1IKBMUCsvXB+7j/H+lawFZmuD93H+NUtyTCNANIaStSSzFKU5BpJJi3eoA1NJpiHE5NNJpCaTNSMWpLf/Wr9ahqe1QvIAOp4FSxo6a3G22iU9kA/SnE0mcDFMZqxNLCMahc05mqJjQAxjzRTGPNFMRcU1ItQIamQ1QEy1IozUaVOoppEyYAVn60uYkPoTWlVe/i821cDkjkVViU9TlHGDTDU0y4JqA1YBmkJpCaQ0CFpKTNFIYtaekw7pQ2OBzWdGu5gK6DT4vJtwe7VnJlRRZJqNmpzNUTGszQazVEzUrGomNMQE+9FRFuaKBF5DUyGqqNUyNWgi5Gasr0qnE3NW4yCKaJkOooopkGBq1n5MhkQfu2P5GslxiuvnCupVgCD1zWHeaayktD8y/3e4ouXYyDTTUrxspIYEH0NMK0xDKUDJpwQk1dtrF3IL/Kvv1qWxpBp9sZHBI+UdTWyWAGB0qFAsSBVGAKC9ZvUtaD2aomamlqjZ6QDmaomakZ6iZqYClqKiLUUCLaPU6PVJHqVHrQRoRvVqKTFZiSVOk2O9MDTEgpjyVTE2O9BlzQKxO71Cz1G0lRl6kodIEfhlB+ozUJtoM58taUvTS9IY5UjT7qKPoKUtUW+ml6QEpemF6jL1GXoAkZqjZ6YWpjNQA5mqNmpC1MLUCFJoqMmigVydHqVXooqxEqvUgk96KKYDvM96PM96KKBiGSkMlFFIBhekL0UVIxpeml6KKAGl6YXoooAazUwtRRQIaWppNFFADc80UUUwP/Z",' +
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
                   '"ClosingTimeSun":"' + spot.ClosingTimeSun + '",';
        '"Latitude":"' + spot.Latitude + '",' +
                   '"Longitude":"' + spot.Longitude + '"}';

        var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._UpdateSpot;
        $.ajax({
            type: "POST",
            url: URLFormed,
            dataType: 'json',
            data: data,
            contentType: "application/json;charset=utf-8",
            cache: false,
            success: function (result) {
                $('#btnupdatespot').removeAttr('disabled');
                if (result.SpotCreated == false || result.SpotCreated == 'false') {
                
                    
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.SpotUpdated);
                            break;
                        case "2":
                            alert(Language.German.SpotUpdated);
                            break;
                        case "3":
                            alert(Language.English.SpotUpdated);
                            break;
                        case "4":
                            alert(Language.Spanish.SpotUpdated);
                            break;
                    }
                   app.application.navigate("myspots.html");
                }
                else {
                    //navigator.notification.alert('Please try again.', '', 'Recycle World', 'OK');
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.Ptry);
                            break;
                        case "2":
                            alert(Language.German.Ptry);
                            break;
                        case "3":
                            alert(Language.English.Ptry);
                            break;
                        case "4":
                            alert(Language.Spanish.Ptry);
                            break;
                    }

                }
            },
            error: function (xhr, request, status, error) {
                $('#btnupdatespot').removeAttr('disabled');
                //navigator.notification.alert('Please try again.', '', 'Recycle World', 'OK');
                switch (localStorage.Language) {
                    case "1":
                        alert(Language.Danish.Ptry);
                        break;
                    case "2":
                        alert(Language.German.Ptry);
                        break;
                    case "3":
                        alert(Language.English.Ptry);
                        break;
                    case "4":
                        alert(Language.Spanish.Ptry);
                        break;
                }

            }
        });*/


    },

    DeleteSpot: function () {

       /* var URLFormed = Service.dataServiceURL + Service.ServiceName._SpotService + '/' + Service.ServiceMethods._deleteSpot;

        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

        $.support.cors = true;
        $.ajax({
            type: "POST",
            url: URLFormed,
            dataType: 'json',
            data: '{ "SpotId":"' + localStorage.spotID + '"}',
            contentType: "application/json;charset=utf-8",
            cache: false,
            success: function (Result) {

                if (Result != null && Result != 'null' &&  Result !=undefined) {
                    var data = JSON.stringify(Result);
                    data = $.parseJSON(data);
                    if (data.SpotDeleted) {
                        switch (localStorage.Language) {
                            case "1":
                                spot.Error = spot.Error + Language.Danish.SpotDeleted;
                                break;
                            case "2":
                                spot.Error = spot.Error + Language.German.SpotDeleted;
                                break;
                            case "3":
                                spot.Error = spot.Error + Language.English.SpotDeleted;
                                break;
                            case "4":
                                spot.Error = spot.Error + Language.Spanish.SpotDeleted;
                                break;
                        }
                       app.application.navigate("myspots.html");
                    }
                    else {
                        switch (localStorage.Language) {
                            case "1":
                                alert(Language.Danish.Ptry);
                                break;
                            case "2":
                                alert(Language.German.Ptry);
                                break;
                            case "3":
                                alert(Language.English.Ptry);
                                break;
                            case "4":
                                alert(Language.Spanish.Ptry);
                                break;
                        }
                    }

                }
                else {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.Ptry);
                            break;
                        case "2":
                            alert(Language.German.Ptry);
                            break;
                        case "3":
                            alert(Language.English.Ptry);
                            break;
                        case "4":
                            alert(Language.Spanish.Ptry);
                            break;
                    }
                }

            },
            error: function (xhr) {
                switch (localStorage.Language) {
                    case "1":
                        alert(Language.Danish.Ptry);
                        break;
                    case "2":
                        alert(Language.German.Ptry);
                        break;
                    case "3":
                        alert(Language.English.Ptry);
                        break;
                    case "4":
                        alert(Language.Spanish.Ptry);
                        break;
                }

            }
        });*/

    }

};

$(document).ready(function () {


    Filldata();

    changeLanguage(localStorage.LanguageType);


    var opts = { language: localStorage.LanguageType, pathPrefix: "Scripts/Resources" };
    //$("[data-localize]").localize("Recycle", opts);
	if(localStorage.User==undefined){ 
      //  app.application.navigate("signup_login.html");
        return false;
        }
    var User = $.parseJSON(localStorage.User);


    spot.userId = User.Id;

    //----Update Spot-----
    $("#btnupdatespot").click(function () {



        if (localStorage.getItem('spotID') == null && localStorage.getItem('spotID') == "" && localStorage.getItem('spotID') == "null" && localStorage.getItem('spotID') == undefined) {
            spot.Id = '0';
        }
        else {
            spot.Id = localStorage.getItem('spotID');
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
            }
            else {
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

            if ((now.getFullYear() > target.getFullYear()) || (now.getMonth() > target.getMonth()) || (now.getDate() >= target.getDate())) {
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
                }
                else {
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
            // }
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
            }
            else {
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
        //        if ($("#spotdesc").val() == "") {
        //            spot.blnFlag = false;
        //            if (spot.Error == '') {
        //                spot.Error = "Please select spot description.\n";
        //            }
        //            else {
        //                spot.Error = spot.Error + "Please select spot description.\n";
        //            }
        //        }
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
            }
            else {
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
            }
            else {
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
            }
            else {
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
        if ($('#Select1').val() == '0') {
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
            }
            else {
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
            }
            else {
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
                }
                else {
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

       


        if ($(this).attr('disabled') == 'disabled')
            return;
        else
            $(this).attr('disabled', 'disabled');

        if (spot.blnFlag == false) {
            $('#btnupdatespot').removeAttr('disabled');
            alert(spot.Error);
            return false;
        }
        else if (spot.blnFlag == true) {
            spot.UpdateSpot();
            localStorage.removeItem('spotID');
        }
    });

    $('#Select1').change(function () {

        if ($(this).val() == 'US') {
            $('#dvState').css({ 'display': 'block' });
            $('#txtState').css({ 'display': 'none' });
            $('#select-choice-3').parent().children('span').find('.ui-btn-text').html('State');
        }
        else {
            $('#dvState').css({ 'display': 'none' });
            $('#txtState').css({ 'display': 'block' });
        }

    });

    if (localStorage.CacheItem != undefined && localStorage.CacheItem != '') {
        window.localStorage.removeItem('CacheItem');
    }

    if (localStorage.getItem('spotID') != "null" && localStorage.getItem('spotID') != undefined) {

        spot.GetSpotDetail();
        // localStorage.clear();
    }

    $('#whatDifference').click(function () {
        
        SpotCacheObject();
       app.application.navigate('spot_difference.html');

    });


    $('#btndeletespot').click(function () {
        var Message = '';
        switch (localStorage.Language) {
            case "1":
                Message = Language.Danish.SpotDeletedConfirm;
                break;
            case "2":
                Message = Language.German.SpotDeletedConfirm;
                break;
            case "3":
                Message = Language.English.SpotDeletedConfirm;
                break;
            case "4":
                Message = Language.Spanish.SpotDeletedConfirm;
                break;
        }
        if (confirm(Message)) {
            spot.DeleteSpot();
            return;
        }
        else {
            return;
        }


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
            $('#btnspot').find('label').text('Update event or add');
            $('#Title').text('Event Maker');
        }
        else {
            $('#lblGarageSale').hide();
            $('#SpotName').show();
            $('#GarageName').hide();
            $('#EventDescription').hide();
            $('#SpotDescription').show();
            $('#EventDate').hide();
            $('#EventDateFields').hide();
            $('#SpotWeb').show();
            $('#SpotCVR').show();
            $('#btnspot').find('label').text('Update spot');
            $('#Title').text('Create Spot');

        }

    });


    $('[name="spotopen"]').change(function () {

        if ($(this).val() == "00") {

            $("#tdOpenWeek").hide();
            $("#OpenTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeMonFri').val($(this).val());
                    return;
                }
            });
        }
        else {
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

    $('[name="spotclose"]').change(function () {
        if ($(this).val() == "00") {

            $("#tdCloseWeek").attr('disabled', 'disabled');
            $("#CloseTimeMonFri").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeMonFri>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeMonFri').val($(this).val());
                    return;
                }
            });
        }
        else {
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

    $('[name="D20"]').change(function () {

        if ($(this).val() == "00") {

            $("#tdOpenSat").attr('disabled', 'disabled');
            $("#OpenTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSat').val($(this).val());
                    return;
                }
            });
        }
        else {
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


    $('[name="D21"]').change(function () {

        if ($(this).val() == "00") {

            $("#tdCloseSat").attr('disabled', 'disabled');
            $("#CloseTimeSat").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSat>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSat').val($(this).val());
                    return;
                }
            });
        }
        else {
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

    $('[name="D22"]').change(function () {

        if ($(this).val() == "00") {

            $("#tdOpenSun").hide();
            $("#OpenTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#OpenTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#OpenTimeSun').val($(this).val());
                    return;
                }
            });
        }
        else {
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

    $('[name="D23"]').change(function () {


        if ($(this).val() == "00") {

            $("#tdCloseSun").hide();
            $("#CloseTimeSun").parent().children('span').find('.ui-btn-text').html('-');
            $('#CloseTimeSun>option').each(function (i) {
                if ($(this).html() == '-') {
                    $('#CloseTimeSun').val($(this).val());
                    return;
                }
            });
        }
        else {
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

});



function SpotCacheObject() {

    var data = '{"NavigateURL":"editspot.html"}';
    localStorage.CacheItem = data;

}



function ValidateURL(txtUrl) {
    var data = document.getElementById(txtUrl).value;

    var URL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (data.match(URL)) {
        return true;
    }
    else {
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
//                $('#Select1').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
//            });

//            $.each(States.English, function (i) {
//                $('#select-choice-3').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
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
//                $('#Select1').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
//            });

//            $.each(States.English, function (i) {
//                $('#select-choice-3').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
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
//                $('#Select1').append('<option value="' + Country.English[i].id + '">' + Country.English[i].Value + '</option>');
//            });

//            $.each(States.English, function (i) {
//                $('#select-choice-3').append('<option value="' + States.English[i].id + '">' + States.English[i].Value + '</option>');
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
//                $('#Select1').append('<option value="' + Country.Spanish[i].id + '">' + Country.Spanish[i].Value + '</option>');
//            });

//            $.each(States.Spanish, function (i) {
//                $('#select-choice-3').append('<option value="' + States.Spanish[i].id + '">' + States.Spanish[i].Value + '</option>');
//            });
            $.each(date.Spanish, function (i) {
                $('#select-choice-month').append('<option value="' + date.Spanish[i].id + '">' + date.Spanish[i].Value + '</option>');
            });
            break;
    }


}