import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_EVENTS} from '../constants/AppConstants.js';

export default {
  allEvents: (events) => {
    AppDispatcher.dispatch({
      actionType: ALL_EVENTS,
      events: events
    })
  }
}
