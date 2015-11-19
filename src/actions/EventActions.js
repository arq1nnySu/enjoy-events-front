import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_EVENTS, EVENT_CREATED, GET_EVENT, CLEAR_EVENT, REMOVE_EVENT, ASSISTS_EVENT} from '../constants/AppConstants.js';

export default {
  allEvents: (events) => {
    AppDispatcher.dispatch({
      actionType: ALL_EVENTS,
      events: events
    })
  },
 
  createEvent: (event) => {
    AppDispatcher.dispatch({
      actionType: EVENT_CREATED,
      event: event
    })
  },

  getEvent: (event) => {
    AppDispatcher.dispatch({
      actionType: GET_EVENT,
      event: event
    })
  },

  removeEvent: () => {
    AppDispatcher.dispatch({
      actionType: REMOVE_EVENT    
    })
  },

  assistsEvent: (assists) => {
    AppDispatcher.dispatch({
      actionType: ASSISTS_EVENT,
      assists: assists
    })
  },

  clearEvent:()=>{
    AppDispatcher.dispatch({actionType:CLEAR_EVENT})
  }
}
