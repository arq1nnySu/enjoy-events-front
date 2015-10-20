import {ALL_ASSISTANCE} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class AssistanceStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._assistances = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_ASSISTANCE:
        this._assistances = action.assistances;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get assistances() {
    return this._assistances;
  }
}

export default new AssistanceStore();
