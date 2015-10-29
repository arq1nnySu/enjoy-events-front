import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_USERS, LOGGED_USER} from '../constants/AppConstants.js';

export default {
  allUsers: (users) => {
    AppDispatcher.dispatch({
      actionType: ALL_USERS,
      users: users
    })
  },

  loggedUser: (user) => {
    AppDispatcher.dispatch({
      actionType: LOGGED_USER,
      loggedUser: user
    })
  },

}
