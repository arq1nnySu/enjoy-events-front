import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_ASSISTANCE, ASSISTANCE_CREATED} from '../constants/AppConstants.js';

export default {
  allAssistances: (assistances) => {
    AppDispatcher.dispatch({
      actionType: ALL_ASSISTANCE,
      assistances: assistances
    })
  },
  
  createAssistance: (assistance) => {
    AppDispatcher.dispatch({
      actionType: ASSISTANCE_CREATED,
      assistance: assistance
    })
  },
}
