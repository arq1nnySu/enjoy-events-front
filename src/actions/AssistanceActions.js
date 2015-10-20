import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_ASSISTANCE} from '../constants/AppConstants.js';

export default {
  allAssistances: (assistances) => {
    AppDispatcher.dispatch({
      actionType: ALL_ASSISTANCE,
      assistances: assistances
    })
  },
}
