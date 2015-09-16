import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_EVENTS, EVENT_CREATED, GET_EVENT} from '../constants/AppConstants.js';

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
}
