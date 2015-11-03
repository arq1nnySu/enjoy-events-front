import request from './Request';
import reqwest from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL, USERS_URL} from '../constants/AppConstants';
import LoginActions from '../actions/LoginActions';
import UserActions from '../actions/UserActions';

class UserService {

  login(username, password) {
    return this.handleAuth(when(reqwest({
      url: LOGIN_URL,
      method: 'POST',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify({username, password})
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(user) {
    return this.handleAuth(when(reqwest({
      url: SIGNUP_URL,
      method: 'POST',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(user)
    })));
  }

  update(user) {
    return request.request({
      url: SIGNUP_URL,
      method: 'PUT',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(user)
    });
  }

  loggedUser() {
    request.request({
      url: SIGNUP_URL,
      method: 'GET'
    })
    .then(function(response) {
      UserActions.loggedUser(response);
    });
  }

  allUsers(){
    request.request({
      url: USERS_URL,
      method: 'GET'
    })
    .then(function(response) {
      UserActions.allUsers(response);
    });
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.access_token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new UserService()
