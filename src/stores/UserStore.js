import {ALL_USERS} from '../constants/AppConstants';
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
      default:
        break;
    };
  }

  get users() {
    return this._users;
  }
}

export default new UserStore();
