import {ALL_EVENTS, GET_EVENT, CLEAR_EVENT, EVENT_CREATED, LOGOUT_USER, LOGIN_USER} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._eventos = [];
    this._page = 0;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_EVENTS:
        this._eventos = action.events;
        this.emitChange();
        break;
      case GET_EVENT:
        this.event = action.event;
        this.emitChange();
        break;
      case CLEAR_EVENT:
        this.event = null;
        this.emitChange();
        break;
      case EVENT_CREATED:
        this.event = action.event;
        this.emitChange();
        break;      
      case LOGOUT_USER:
        this._eventos = [];
        this._page = 0
        this.emitChange();
      case LOGIN_USER:
        this._eventos = [];
        this._page = 0
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get events() {
    return this._eventos;
  }

  get page(){
    return this._page
  }

  nextPage(){
    this._page+=1
  }
}

export default new EventStore();
