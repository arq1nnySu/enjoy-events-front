import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_EVENTS, GET_EVENT} from '../constants/AppConstants.js';

export default {
  allEvents: (events) => {
    AppDispatcher.dispatch({
      actionType: ALL_EVENTS,
      events: events
    })
  },

  getEvent: (event) => {
    AppDispatcher.dispatch({
      actionType: GET_EVENT,
      event: event
    })
  },

}
