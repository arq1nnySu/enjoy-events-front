import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_VENUES} from '../constants/AppConstants.js';

export default {
  allVenues: (venues) => {
    AppDispatcher.dispatch({
      actionType: ALL_VENUES,
      venues: venues
    })
  },
}
