var BASE_URL = process.env.BASE_URL || 'http://enjoy-events-portal.herokuapp.com/';

export default {

  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'auth',
  SIGNUP_URL: BASE_URL + 'user',
  EVENTS_URL: BASE_URL +'events',
  GET_EVENT_URL: BASE_URL +'events/',
  CREATE_EVENT_URL: BASE_URL + 'events',
  CREATE_ASSISTANCE_URL: BASE_URL + 'assistances',
  ASSISTANCES_URL: BASE_URL +'assistances',
  ALL_USERS_URL : BASE_URL + 'users',

  

  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ALL_EVENTS: 'ALL_EVENTS',
  EVENT: 'EVENT',
  EVENT_CREATED: 'EVENT_CREATED',
  ASSISTANCE_CREATED: 'ASSISTANCE_CREATED',
  ALL_ASSISTANCE: 'ALL_ASSISTANCE',
  ALL_USERS: 'ALL_USERS',
  LOGGED_USER: 'LOGGED_USER'
}
