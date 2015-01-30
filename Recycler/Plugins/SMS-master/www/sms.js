var sms = {
  send: function(phone, message, method, success, failure) {
    phone = sms.convertPhoneToArray(phone);

    cordova.exec(
      success,
      failure,
      'Sms',
      'send',
      [phone, message, method]
    );
  },

  convertPhoneToArray: function(phone) {
    if(typeof phone === 'string' && phone.indexOf(',') !== -1) {
      phone = phone.split(',');
    }
    if(Object.prototype.toString.call(phone) !== '[object Array]') {
      phone = [phone];
    }
    return phone;
  }
};

//module.exports = sms;
app.sms = sms;

var sendTestSMS = function(){
    try{
    alert("send");
            var number = 564654;
            var message = "#messageTxt";
            var intent = "INTENT"; //leave empty for sending sms using default intent
            var success = function () { alert('Message sent successfully'); };
            var error = function (e) { alert('Message Failed:' + e); };
    
            app.sms.send(number, message, intent, success, error);
        
        }catch(err){
            alert(JSON.stringify(err));
        }
}