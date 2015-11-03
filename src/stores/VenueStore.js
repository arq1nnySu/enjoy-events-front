import {ALL_VENUES} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class VenueStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._users = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_VENUES:
        this._venues = action.venues;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get venues() {
    return this._venues;
  }
}

export default new VenueStore();
