var BASE_URL = process.env.BASE_URL || 'http://enjoy-events-portal.herokuapp.com/';

export default {

  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'auth',
  SIGNUP_URL: BASE_URL + 'user',
  EVENT_URL: BASE_URL +'events',

  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ALL_EVENTS: 'ALL_EVENTS'

}
