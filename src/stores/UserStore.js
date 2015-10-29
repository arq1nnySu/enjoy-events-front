import {ALL_USERS, LOGGED_USER} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._users = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_USERS:
        this._users = action.users;
        this.emitChange();
        break;
      case LOGGED_USER:
        this._loggedUser = action.loggedUser;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get users() {
    return this._users;
  }


  get loggedUser() {
    return this._loggedUser;
  }
}

export default new UserStore();
