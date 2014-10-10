var SmsPlugin = function () {
 
};

SmsPlugin.prototype.sendSMS = function (successCallback, failureCallback, phone, message) { 
 return PhoneGap.exec(successCallback, failureCallback, 'SmsPlugin', "SendSMS", [phone, message]);
}