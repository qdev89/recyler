
var Service = new Object();


//==================== UAT ==========================

//Service.ImageUrl = "http://dotnetstg1.seasiaconsulting.com/RecycleUAT/Images/Image_Temp/";
//Service.dataServiceURL = "http://dotnetstg1.seasiaconsulting.com/RecycleUAT/Services/";

//==================== QA ===========================

//Service.ImageUrl = "http://dotnetstg2.seasiaconsulting.com/RecycleServices/Images/Image_Temp/";
//Service.dataServiceURL = "http://dotnetstg2.seasiaconsulting.com/RecycleServices/Services/";


//==================== PRODUCTION =================

Service.ImageUrl = "http://208.109.91.21/RecycleServices/Images/Image_Temp/";
Service.dataServiceURL = "http://208.109.91.21/RecycleServices/Services/";



 Service.ServiceName = {
    _ProductService: "Product.svc",
    _SpotService: "Spot.svc",
    _UserService: "User.svc",
    _LoginService:"Login.svc"
}

Service.ServiceMethods = {
    _CreateProduct: "CreateProduct",
    _GetMyStuff : "GetMyStuff",
    _AddCO2: "AddCO2",
    _EarthHeartData: "EarthHeartData",
    _GetProduct:"GetProduct",
    _CollectCo2: "CollectCo2",
    _GetEarthHeartData: "GetEarthHeartData",
    _GetNearestPlaces: "GetNearestPlaces",
    _CreateSpot: "CreateSpot",
    _RemoveProduct: "RemoveProduct",
    _GetAllItems: "GetAllItems",
    _GetSpot: "GetAllSpot",
    _GetSpotDetail:"GetSpotDetail",
    _GetProductOwner:"GetProductOwnerbyId",
    _RecordTransaction:"RecordTransaction",
    _GetRecipientByPhoneNumber: "GetRecipientByPhoneNumber",
    _TransactionComplete: "TransactionComplete",
    _GenerateAndSendSlip: "GenerateAndSendSlip",
    _SendCO2Mail: "SendCO2Mail",
    _CreateUser: "CreateUser",
    _Login: "GetLoginDetails",
    _GetLanguages: "GetLanguage",
    _GetRoles: "GetRoles",
    _EmailLanguage: "EmailLanguage",
    _GetMapProductSpot: "MapProductSpot",
    _UpdateSpot:"UpdateSpot",
    _ForgetPassword: "ForgetPassword",
    _deleteSpot: "deleteSpot",
    _SaveFaceBookSettings: "SaveUpdateFaceBookSettings",
    _CheckEmailID: "CheckEmailID",
    _GetMemberships: "GetMemberships",
    _InviteFriends: "InviteFriends",
    _GetSearchProduct: "GetSearchProduct",
    _GetAllPoints: "GetAllPoints",
    _SendContactUsMail: "SendContactUsMail",
    _GetAllFriendsSyncList: "GetAllFriends",
    _GetAllUsers: "GetAllUsers",
    _RemoveFromFriendZone: "RemoveFromFriendZone",
    _RemoveFromActiveFriendZone: "RemoveFromActiveFriendZone",
    _AddToFriendZone: "AddToFriendZone",
    _AddToActiveFriendZone: "AddToActiveFriendZone",
    _GetAllFaceBookFriends: "GetAllFaceBookFriends",
    _GetTotalChanceLeftForFriendZone: "GetTotalChanceLeftForFriendZone",
    _CancelRegistration: "CancelRegistration"
}


