import {ALL_ASSISTANCE, ASSISTANCE_CREATED, LOGOUT_USER, LOGIN_USER, ASSISTANCE_REMOVED} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class AssistanceStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._assistances = null
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_ASSISTANCE:
        this._assistances = action.assistances
        this.emitChange()
        break;
      case ASSISTANCE_CREATED:
        this.assistance = action.assistance
        this._assistances = this._assistances || []
        this._assistances.push(this.assistance)
        this.emitChange();
        break;      
      case ASSISTANCE_REMOVED:
        this._assistances = null
        this.emitChange();
        break;      
       case LOGOUT_USER:
        this._assistances = null
        this.emitChange();
      case LOGIN_USER:
        this._assistances = null
        this.emitChange()
      default:
        break
    };
  }

  get assistances() {
    return this._assistances;
  }
}

export default new AssistanceStore();
