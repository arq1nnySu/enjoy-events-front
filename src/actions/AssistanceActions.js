import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {ALL_ASSISTANCE, ASSISTANCE_CREATED, ASSISTANCE_REMOVED} from '../constants/AppConstants.js';

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

  removeAssistance: () =>{
    AppDispatcher.dispatch({
      actionType: ASSISTANCE_REMOVED
    }) 
  }
}
