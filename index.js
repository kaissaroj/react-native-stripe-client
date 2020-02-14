import {STRIPE_URL, PAYMENT_METHOD_URL, SETUP_INTENT_URL} from './constants';
const FORMURLENCODED = require('form-urlencoded');

 module.exports = function(key) {
 return {
   createToken: async function (details) {
     const keys = Object.keys(details);
     const index = _findType(details, keys);
     var token;
     if (index === 0) {
       let type = keys[index];
       var newDetails = _convertDetails(type, details[type]);
       token = await _createTokenHelper(newDetails, key);
     } else {
       token = await _createTokenHelper(details, key);
     }
     return _parseJSON(token);
   },
   createPaymentMethod: async function(type, details){
     const url = PAYMENT_METHOD_URL;
     const { number, cvc, exp_month, exp_year} = details;
     const body = `type=${type}&card[number]=${number}&card[cvc]=${cvc}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&key=${key}`;
     const response =  await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: body
     })
     const res  = await response.json();
     return res;
   },
   handleCardSetup: async function(setupIntentId, id, clientSecret){
     const url = `${SETUP_INTENT_URL}/${setupIntentId}/confirm`;
     const body = `payment_method=${id}&expected_payment_method_type=card&key=${key}&client_secret=${clientSecret}`;
     const response =  await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: body
     })
     const res  = await response.json();
     return res;
  
 },
}
}
function _findType(details, keys) {
 if (details.card != null) {
   return keys.indexOf("card");
 } else if (details.bank_account != null) {
   return keys.indexOf("bank_account");
 } else if (details.pii != null) {
   return keys.indexOf("pii");
 } else return false;
}
function _convertDetails(type, details) {
 var convertedDetails = {}
 for (var data in details) {
   const string = type + '[' + data + ']';
   convertedDetails[string] = details[data];
 }
 return convertedDetails;
}
async function _parseJSON(token) {
 if (token._bodyInit === null) {
   return token;
 } else {
   const body = await token.json();
   return body;
 }
}
 
function _createTokenHelper(details, key) {
 const formBody = FORMURLENCODED(details);
 return fetch(STRIPE_URL + 'tokens', {
   method: 'post',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Bearer ' + key
   },
   body: formBody
 });
}
 

