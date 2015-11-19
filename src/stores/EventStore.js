import {ALL_EVENTS, GET_EVENT, CLEAR_EVENT, EVENT_CREATED, LOGOUT_USER, LOGIN_USER, REMOVE_EVENT, ASSISTS_EVENT} from '../constants/AppConstants';
import BaseStore from './BaseStore';

class EventStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._eventos = null;
    this._page = 1
    this._totalPages = 1
  }

  resetEvents(){
    this._eventos = null;
    this._page = 1
    this._totalPages = 1
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ALL_EVENTS:
        this._eventos = (this._eventos || []).concat(action.result.events);
        this._page = action.result.page
        this._totalPages = action.result.totalPages
        this.emitChange();
        break;
      case GET_EVENT:
        this.event = action.event;
        this.event.assistances = {}
        this.emitChange();
        break;
      case CLEAR_EVENT:
        this.event = null;
        this.emitChange();
        break;
      case REMOVE_EVENT:
        this.event = null;
        this.resetEvents()
        this.emitChange();
        break;
      case EVENT_CREATED:
        this.event = action.event;
        this.emitChange();
        break;      
      case LOGOUT_USER:
        this.resetEvents()
        this.emitChange();
        break;
      case LOGIN_USER:
        this.resetEvents()
        this.emitChange();
        break;
      case ASSISTS_EVENT:
        action.result.assistances =  (this.event.assistances.assistances || []).concat(action.result.assistances)
        this.event.assistances = action.result
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
  
  get totalPages(){
    return this._totalPages
  }

  nextPage(){
    this._page+=1
  }
}

export default new EventStore();
