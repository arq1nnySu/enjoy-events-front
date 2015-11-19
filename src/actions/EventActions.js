import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_EVENTS, EVENT_CREATED, GET_EVENT, CLEAR_EVENT, REMOVE_EVENT, ASSISTS_EVENT} from '../constants/AppConstants.js';

export default {
  allEvents: (result) => {
    AppDispatcher.dispatch({
      actionType: ALL_EVENTS,
      result: result
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

  assistsEvent: (result) => {
    AppDispatcher.dispatch({
      actionType: ASSISTS_EVENT,
      result: result
    })
  },

  clearEvent:()=>{
    AppDispatcher.dispatch({actionType:CLEAR_EVENT})
  }
}
