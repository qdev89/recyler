/**
 * Application Settings
 */

var appSettings = {
    msKey : "VqvySBFGk4rP47eqzj92nIXjrlBgpVLV",
    
    everlive: {
        apiKey: 'yPCpguY5pk7Zy5rc',  // Put your Backend Services API key here
        scheme: 'http'
    },

    eqatec: {
        productKey: '80007e7e05da4470b0c35abe36644cda',  // Put your EQATEC product key here
        version: '1.0.0.0' // Put your application version here
    },
    
    feedback: {
        apiKey: '1a016b40-8df6-11e5-906f-6f55d6db1313'  // Put your AppFeedback API key here
    },

    facebook: {
        appId: '1408629486049918', // Put your Facebook App ID here
        redirectUri: 'https://www.facebook.com/connect/login_success.html' // Put your Facebook Redirect URI here
    },

    google: {
        clientId: '406987471724-q1sorfhhcbulk6r5r317l482u9f62ti8.apps.googleusercontent.com', // Put your Google Client ID here
        redirectUri: 'http://localhost' // Put your Google Redirect URI here
    },

    liveId: {
        clientId: '000000004C10D1AF', // Put your LiveID Client ID here
        redirectUri: 'https://login.live.com/oauth20_desktop.srf' // Put your LiveID Redirect URI here
    },

    adfs: {
        adfsRealm: '$ADFS_REALM$', // Put your ADFS Realm here
        adfsEndpoint: '$ADFS_ENDPOINT$' // Put your ADFS Endpoint here
    },

    messages: {
        mistSimulatorAlert: 'The social login doesn\'t work in the In-Browser Client, you need to deploy the app to a device, or run it in the simulator of the Windows Client or Visual Studio.',
        removeActivityConfirm: 'Are you sure you want to delete this Activity?'
    }
};

var emailTemplates ={
    friendzone:"Friendzoneposting", //appName, userName,FromEmail,DefaultFromName
    
    thankYou:"Thankyou",//appName, userName,FromEmail,DefaultFromName   
    
    garageSale:"Garagesale",//appName, userName, FromEmail,DefaultFromName
    
    food:"Food",//appName, userName, FromEmail,DefaultFromName
    
    upcycling:"upcycling",//appName, userName, FromEmail,DefaultFromName
    
    help:"Help",//appName, userName, FromEmail,DefaultFromName
    
    recycling:"recycling", //appName, userName, FromEmail,DefaultFromName,teamName
    shop:"shop", //appName, userName, FromEmail,DefaultFromName,teamName
    freeFood:"freefood", //appName, userName, FromEmail,DefaultFromName,teamName
    terraspot:"terraspot", //appName, userName, FromEmail,DefaultFromName,teamName
    ecospot:"ecospot", //appName, userName, FromEmail,DefaultFromName,teamName
    
    
    test:"zzz", //appName, userName, FromEmail,DefaultFromName,teamName
    
    DefaultFromName:"Recycle world",
    FromEmail:"info@recycleworld.dk"
};