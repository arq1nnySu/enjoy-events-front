import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_USERS} from '../constants/AppConstants.js';

export default {
  allUsers: (users) => {
    AppDispatcher.dispatch({
      actionType: ALL_USERS,
      users: users
    })
  },
}
