var prd = new Object();
prd.Co2Data = {
    Co2: '',
    Co2Type: '',
    Co2Values: ''
}

//=================================================== Calculate Material CO2 =========================================================

function AddMaterialProductCO2() {
    if (localStorage.NewProductID == undefined) return;
    calculateMaterialCo2();
    saveProductCo2(localStorage.NewProductID);
}

function calculateMaterialCo2() {


    var Cleaning_rate_perKg = 8.81;
    var Office_rate_perKg = 30.86;
    var Communication_rate_perKg = 17.96;
    //  var Smaller_Electric_rate_perKg = 5.75;
    var Electric_rate_perKg = 6.71;
    var Leather_rate_perKg = 27.63;
    var Textiles_rate_perKg = 7.81;
    var Clothing_rate_perKg = 21.27;
    var Glass_rate_perKg = 1.35;
    var Plastic_rate_perKg = 3.85;
    var Metal_rate_perKg = 4.05;
    var Paper_rate_perKg = 2.46;
    var Three_rate_perKg = 1.38;
    var tableClass = ".materials ";

    var Cleaning_in_Kg = $(tableClass + '#slider-mini12').val();
    var Office_in_Kg = $(tableClass + '#slider-mini11').val();
    var Communication_in_Kg = $(tableClass + '#slider-mini10').val();
    var Smaller_Electric_in_Kg = $('#slider-mini9').val();
    var Electric_in_Kg = $(tableClass + '#slider-mini8').val();
    var Leather_in_Kg = $(tableClass + '#slider-mini7').val();
    var Textiles_in_Kg = $(tableClass + '#slider-mini6').val();
    var Clothing_in_Kg = $(tableClass + '#slider-mini5').val();
    var Glass_in_Kg = $(tableClass + '#slider-mini4').val();
    var Plastic_in_Kg = $(tableClass + '#slider-mini3').val();
    var Metal_in_Kg = $(tableClass + '#slider-mini2').val();
    var Paper_in_Kg = $(tableClass + '#slider-mini1').val();
    var Three_in_Kg = $(tableClass + '#slider-mini0').val();



    prd.Co2Data.Co2 = (Cleaning_rate_perKg * Cleaning_in_Kg) +
            (Office_rate_perKg * Office_in_Kg) +
            (Communication_rate_perKg * Communication_in_Kg) +
            (Smaller_Electric_in_Kg * Smaller_Electric_in_Kg) +
            (Electric_rate_perKg * Electric_in_Kg) +
            (Leather_rate_perKg * Leather_in_Kg) +
            (Textiles_rate_perKg * Textiles_in_Kg) +
            (Clothing_rate_perKg * Clothing_in_Kg) +
            (Glass_rate_perKg * Glass_in_Kg) +
            (Plastic_rate_perKg * Plastic_in_Kg) +
            (Metal_rate_perKg * Metal_in_Kg) +
            (Paper_rate_perKg * Paper_in_Kg) +
            (Three_rate_perKg * Three_in_Kg);



    prd.Co2Data.Co2Values = Cleaning_in_Kg + ','
    						 + Office_in_Kg + ','
     						+ Communication_in_Kg + ','
         					+ Smaller_Electric_in_Kg + ','
                             + Electric_in_Kg + ','
                             + Leather_in_Kg + ','
                             + Textiles_in_Kg + ','
                             + Clothing_in_Kg + ','
                             + Glass_in_Kg + ','
                             + Plastic_in_Kg + ','
                             + Metal_in_Kg + ','
                             + Paper_in_Kg + ','
                             + Three_in_Kg;

    prd.Co2Data.Co2Type = "Materials";
}

//=================================================== Calculate Food CO2 =========================================================

function AddFoodProductCO2() {
    if (localStorage.NewProductID == undefined) return;
    calculateFoodCo2();
    saveProductCo2(localStorage.NewProductID);
}

function calculateFoodCo2() {


    var Beef_rate_perKg = 39.69;
    var Pork_rate_perKg = 21.79;
    var Poultry_rate_perKg = 14.19;
    var Fish_rate_perKg = 5.49;
    var DiaryProducts_rate_perKg = 8.30;
    var FruitsAndVegetables_rate_perKg = 0.20;
    var Potatoes_rate_perKg = 0.25;
    var Bread_cookies_rate_perKg = 4.91;
    var Beaverages_rate_perKg = 1.04;
    var Rice_rate_perKg = 0.99;

    var tableClass = ".food ";

    var Beef_in_Kg = $(tableClass + '#slider-mini0').val();
    var Pork_in_Kg = $(tableClass + '#slider-mini1').val();
    var Poultry_in_Kg = $(tableClass + '#slider-mini2').val();
    var Fish_in_Kg = $(tableClass + '#slider-mini3').val();
    var DiaryProducts_in_Kg = $(tableClass + '#slider-mini4').val();
    var FruitsAndVegetables_in_Kg = $(tableClass + '#slider-mini5').val();
    var Potatoes_in_Kg = $(tableClass + '#slider-mini6').val();
    var Bread_cookies_in_Kg = $(tableClass + '#slider-mini7').val();
    var Beaverages_in_Kg = $(tableClass + '#slider-mini8').val();
    var Rice_in_Kg = $(tableClass + '#slider-mini9').val();

    prd.Co2Data.Co2 = (Beef_rate_perKg * Beef_in_Kg) +
                        (Pork_rate_perKg * Pork_in_Kg) +
                        (Poultry_rate_perKg * Poultry_in_Kg) +
                        (Fish_rate_perKg * Fish_in_Kg) +
                        (DiaryProducts_rate_perKg * DiaryProducts_in_Kg) +
                        (FruitsAndVegetables_rate_perKg * FruitsAndVegetables_in_Kg) +
                        (Potatoes_rate_perKg * Potatoes_in_Kg) +
                        (Bread_cookies_rate_perKg * Bread_cookies_in_Kg) +
                        (Beaverages_rate_perKg * Beaverages_in_Kg) +
                        (Rice_rate_perKg * Rice_in_Kg);

    prd.Co2Data.Co2Values = Beef_in_Kg + ','
                             + Pork_in_Kg + ','
                             + Poultry_in_Kg + ','
                             + Fish_in_Kg + ','
                             + DiaryProducts_in_Kg + ','
                             + FruitsAndVegetables_in_Kg + ','
                             + Potatoes_in_Kg + ','
                             + Bread_cookies_in_Kg + ','
                             + Beaverages_in_Kg + ','
                             + Rice_in_Kg;

    prd.Co2Data.Co2Type = "Food";

}

function saveProductCo2(id) {
    var data = app.everlive.data('Product');

    console.log({
        'CO2': prd.Co2Data.Co2,
        'CO2Type': prd.Co2Data.Co2Type,
        'CO2Values': prd.Co2Data.Co2Values
    });

    data.update({
        'CO2': prd.Co2Data.Co2,
        'CO2Type': prd.Co2Data.Co2Type,
        'CO2Values': prd.Co2Data.Co2Values


    }, // data
                { 'Id': id }, // filter
                function (data) {
                    console.log(data);
                    navigator.notification.alert("Info saved successfully!", null, "Success");
                    app.application.navigate("co2_thanks.html");
                },
                function (error) {
                    alert(JSON.stringify(error));
                });
}

function fillCO2Value() {
    TranslateApp();
    if (User.weight == "kg") {
        $("#CO2Val").html(prd.Co2Data.Co2);
    } else {
        var weightPound = Round2Digit(prd.Co2Data.Co2 * 2.2);
        $("#CO2Val").html(weightPound);
        $("#co2weight").html("pound. Co2.");
    }
}

function donateOrStuff() {
    if (userData) {
        if (userData.UserRole == "2")
            app.application.navigate("mystuff.html");
        else
            app.application.navigate("donate.html");
    } else {
        app.application.navigate("donate.html");
    }
}
