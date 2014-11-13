var User;

function GetProduct(ID) {

/*jQuery.support.cors = true; 
    var Parameters = ID;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._GetProduct + '/' + Parameters;

    $.ajax({
        type: "GET",
        url: URLFormed,
        dataType: 'json',
        data: '{}',
        cache: false,
        success: function (Result) {
     
            if (Result != null && Result != 'null') {
                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                if (data.ImagePath != '' && data.ImagePath != undefined && data.ImagePath != null)
                {
                    $('#image').attr('src','data:image/jpeg;base64,'+ data.ImagePath);
                }
                else
                {
                    $('#image').attr('src','images/NoImage.jpg');
                }
                localStorage.ProductCO2 = data.CO2;
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





function DeleteProduct(ID) {

  /*  jQuery.support.cors = true; 
    var Parameters = ID;
    var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._RemoveProduct + '/' + Parameters;

    $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
        'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
        'background-color': 'white'
    });
    $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
    $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
    $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

    $.ajax({
        type: "GET",
        url: URLFormed,
        dataType: 'json',
        data: '{}',
        cache: false,
        success: function (Result) {

            if (Result != null && Result != 'null') {

                var data = JSON.stringify(Result);
                data = $.parseJSON(data);
                if (data.ProductRemoved) {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.RemovedSucces);
                            break;
                        case "2":
                            alert(Language.German.RemovedSucces);
                            break;
                        case "3":
                            alert(Language.English.RemovedSucces);
                            break;
                        case "4":
                            alert(Language.Spanish.RemovedSucces);
                            break;
                    }
                    window.localStorage.removeItem('MyProduct');
                    window.localStorage.removeItem('ProductCO2'); 
                   app.application.navigate("mystuff.html");
                }
                else {
                    switch (localStorage.Language) {
                        case "1":
                            alert(Language.Danish.CantRemove);
                            break;
                        case "2":
                            alert(Language.German.CantRemove);
                            break;
                        case "3":
                            alert(Language.English.CantRemove);
                            break;
                        case "4":
                            alert(Language.Spanish.CantRemove);
                            break;
                    }
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
    });
*/
}




var ProductStatus = {
    CheckRecipientExists: function () {
        /*if (localStorage.User == null || localStorage.User == undefined) {
           app.application.navigate('signup_login.html');
        }
        else {

            User = $.parseJSON(localStorage.User);
        }

        if (User.FirstName == "" && User.PhoneNumber == "" && User.EmailID == "") {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.PleaseUpdate);
                    break;
                case "2":
                    alert(Language.German.PleaseUpdate);
                    break;
                case "3":
                    alert(Language.English.PleaseUpdate);
                    break;
                case "4":
                    alert(Language.Spanish.PleaseUpdate);
                    break;
            }
            return;
        }

        jQuery.support.cors = true;
        if ($('#newowner').val() == '') {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.NewOwner);
                    break;
                case "2":
                    alert(Language.German.NewOwner);
                    break;
                case "3":
                    alert(Language.English.NewOwner);
                    break;
                case "4":
                    alert(Language.Spanish.NewOwner);
                    break;
            }
            return;
        }

        var Parameters = $('#newowner').val() + '/' + localStorage.MyProduct;
        var URLFormed = Service.dataServiceURL
                     + Service.ServiceName._UserService + '/'
                     + Service.ServiceMethods._GetRecipientByPhoneNumber + '/'
                     + Parameters;

        $.ajax({
            type: "GET",
            url: URLFormed,
            dataType: 'json',
            data: '{}',
            cache: false,
            success: ProductStatus.OnCheckSuccess,
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
        });
*/


    },
    OnCheckSuccess: function (Result) {


        if (Result != null && Result != 'null') {

            var data = JSON.stringify(Result);
            data = $.parseJSON(data);

            localStorage.RecipientID = data.UserID;
            localStorage.RecipientEmailID = data.EmailID;
            ProductStatus.TransactionComplete(localStorage.MyProduct);

        }
        else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.NoOwner + $('#newowner').val() + Language.Danish.Exists);
                
                    break;
                case "2":
                    alert(Language.German.NoOwner + $('#newowner').val() + Language.German.Exists);
                    break;
                case "3":
                    alert(Language.English.NoOwner + $('#newowner').val() + Language.English.Exists);
                    break;
                case "4":
                    alert(Language.Spanish.NoOwner + $('#newowner').val() + Language.Spanish.Exists);
                    break;
            }


            return;
        }

    },

    TransactionComplete: function (ID) {

       /* jQuery.support.cors = true;
        var Parameters = ID + '/' + localStorage.RecipientID;
        var URLFormed = Service.dataServiceURL + Service.ServiceName._ProductService + '/' + Service.ServiceMethods._TransactionComplete + '/' + Parameters;
        $("#LoadingDiv").css({ "position": "absolute", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });
        $.ajax({
            type: "GET",
            url: URLFormed,
            dataType: 'json',
            data: '{}',
            cache: false,
            success: ProductStatus.OnTransactionSuccess,
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

    OnTransactionSuccess: function (Result) {


        if (Result != null && Result != 'null') {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.TComplete);
                    break;
                case "2":
                    alert(Language.German.TComplete);
                    break;
                case "3":
                    alert(Language.English.TComplete);
                    break;
                case "4":
                    alert(Language.Spanish.TComplete);
                    break;
            }
            var data = JSON.stringify(Result);
            data = $.parseJSON(data);
            if (data.TransactionComplete) {

                if (User.UserRole == '2') {
                    if ($('#flip-1').val() == 'yes') {

                        ProductStatus.GenerateReciept(localStorage.MyProduct);

                    } else {
                        window.localStorage.removeItem('MyProduct');
                        window.localStorage.removeItem('ProductCO2');
                        window.localStorage.removeItem('RecipientID');
                        window.localStorage.removeItem('RecipientEmailID'); 
                       app.application.navigate("me.html");

                    }
                }
                else {
                    window.localStorage.removeItem('MyProduct');
                    window.localStorage.removeItem('ProductCO2');
                    window.localStorage.removeItem('RecipientID');
                    window.localStorage.removeItem('RecipientEmailID'); 
                   app.application.navigate("me.html");
                }
            }

        }
    },

    GenerateReciept: function (ID) {
        
      /*  jQuery.support.cors = true;
        switch (localStorage.Language) {
            case "1":
                alert(Language.Danish.GreenSlip);
                break;
            case "2":
                alert(Language.German.GreenSlip);
                break;
            case "3":
                alert(Language.English.GreenSlip);
                break;
            case "4":
                alert(Language.Spanish.GreenSlip);
                break;
        }

        if (User.EmailID == null || User.EmailID == '') {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.SlitNO);
                    break;
                case "2":
                    alert(Language.German.SlitNO);
                    break;
                case "3":
                    alert(Language.English.SlitNO);
                    break;
                case "4":
                    alert(Language.Spanish.SlitNO);
                    break;
            }
           app.application.navigate("basic_setup.html");
        }

        var Data = '{"ProductID":"' + ID + '","RecieverID":"' + localStorage.RecipientID + '","UserID":"' + User.Id + '","EmailID":"'
                            + localStorage.RecipientEmailID + '"}';

        var URLFormed = Service.dataServiceURL +
                         Service.ServiceName._ProductService + '/' +
                         Service.ServiceMethods._GenerateAndSendSlip;

        $("#LoadingDiv").css({ "position": "absolute", "display": "block", "left": "0px", "top": "0px", 'opacity': '0.8', "z-index": "20002",
            'filter': 'alpha(opacity=40)', "width": "100%", "height": "100%",
            'background-color': 'white'
        });
        $("#Load").css({ "position": "fixed", "z-index": "20003", "top": "50%", "left": "30%" });
        $('#LoadingDiv,#Load').ajaxStart(function () { $('#LoadingDiv,#Load').show(); });
        $('#LoadingDiv,#Load').ajaxComplete(function () { $('#LoadingDiv,#Load').hide(); });

        $.ajax({
            type: "POST",
            url: URLFormed,
            dataType: 'json',
            data: Data,
            contentType: "application/json;charset=utf-8",
            cache: false,
            success: ProductStatus.OnRecieptSuccess,
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

    OnRecieptSuccess: function (Result) {
        var data = JSON.stringify(Result);
        data = $.parseJSON(data);
        if (data.SlipGeneratedAndSent) {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.GSend);
                    break;
                case "2":
                    alert(Language.German.GSend);
                    break;
                case "3":
                    alert(Language.English.GSend);
                    break;
                case "4":
                    alert(Language.Spanish.GSend);
                    break;
            }
            window.localStorage.removeItem('MyProduct');
            window.localStorage.removeItem('ProductCO2');
            window.localStorage.removeItem('RecipientID');
            window.localStorage.removeItem('RecipientEmailID'); 
           app.application.navigate("me.html");
        }
        else {
            switch (localStorage.Language) {
                case "1":
                    alert(Language.Danish.GFail);
                    break;
                case "2":
                    alert(Language.German.GFail);
                    break;
                case "3":
                    alert(Language.English.GFail);
                    break;
                case "4":
                    alert(Language.Spanish.GFail);
                    break;
            }
            window.localStorage.removeItem('MyProduct');
            window.localStorage.removeItem('ProductCO2');
            window.localStorage.removeItem('RecipientID');
            window.localStorage.removeItem('RecipientEmailID'); 
            app.application.navigate("me.html");
        }
    }
}


function productStatusInit(){
     if (localStorage.User == null || localStorage.User == undefined) {
                   app.application.navigate('signup_login.html');
                } else {
                    User = $.parseJSON(localStorage.User);
                }
            
                if (User.UserRole == '2') {
                    $('#tblGreenSlip').show();
                }
                $('#CollectMyCO2').click(function () {
                    ProductStatus.CheckRecipientExists();
                });
            
                $('#DeleteProduct').click(function () {
                    DeleteProduct(localStorage.MyProduct);
                });
            
                GetProduct(localStorage.MyProduct);
}

