var BASE_URL = process.env.BASE_URL || 'http://localhost:5000/';

export default {

  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'auth',
  SIGNUP_URL: BASE_URL + 'user',
  EVENTS_URL: BASE_URL +'events',
  GET_EVENT_URL: BASE_URL +'events/',
  CREATE_EVENT_URL: BASE_URL + 'events/',
  

  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ALL_EVENTS: 'ALL_EVENTS',
  EVENT: 'EVENT',
  EVENT_CREATED: 'EVENT_CREATED'
}
