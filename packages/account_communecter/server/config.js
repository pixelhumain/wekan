import { Accounts } from 'meteor/accounts-base';
import { loginGen } from './login.js';
import './rest-login.js';

Accounts.registerLoginHandler(function(loginRequest) {

  return loginGen(loginRequest);

});
