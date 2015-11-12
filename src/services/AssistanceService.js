import request from './Request';
import when from 'when';
import {ASSISTANCES_URL, CREATE_ASSISTANCE_URL} from '../constants/AppConstants';
import AssistanceActions from '../actions/AssistanceActions';
import LoginStore from '../stores/LoginStore.js';
import ga from 'react-ga';

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

  createAssistance(assistance){
    ga.event({ category: 'Assistance', action: 'Created',label:assistance.event} );
    return request.request({
      url: CREATE_ASSISTANCE_URL,
      method: 'POST',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(assistance)
    })
    .then(function(response) {
      AssistanceActions.createAssistance(response);
    })
  }
}

export default new AssistanceService()
