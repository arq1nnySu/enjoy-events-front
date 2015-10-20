import request from './Request';
import when from 'when';
import {ASSISTANCES_URL} from '../constants/AppConstants';
import AssistanceActions from '../actions/AssistanceActions';
import LoginStore from '../stores/LoginStore.js';

class AssistanceService {

  allAssistances() {
    request.request({
      url: ASSISTANCES_URL,
      method: 'GET'
    })
    .then(function(response) {
      AssistanceActions.allAssistances(response);
    });
  }
}

export default new AssistanceService()
