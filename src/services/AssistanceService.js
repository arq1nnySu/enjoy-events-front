import request from './Request';
import when from 'when';
import {ASSISTANCES_URL} from '../constants/AppConstants';
import AssistanceActions from '../actions/AssistanceActions';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore.js';
import ga from 'react-ga';

class AssistanceService {

  allAssistances() {
    ga.event({ category: 'Assistance', action: 'All'} );
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
      url: ASSISTANCES_URL,
      method: 'POST',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(assistance)
    })
    .then(function(response) {
      AssistanceActions.createAssistance(response);
    })
  }

  cancelAssistance(eventTag){
    ga.event({ category: 'Assistance', action: 'Cancel',label:eventTag} );
    return request.request({
      url: ASSISTANCES_URL,
      method: 'DELETE',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify({event:eventTag})
    })
    .then(function(response) {
      AssistanceActions.removeAssistance();
    })
  }


  assistsEvent(eventTag, page) {
    ga.event({ category: 'Assistance', action: 'AssistsEvent',label:eventTag} )
    request.request({
      url: ASSISTANCES_URL+"/"+eventTag,
      method: 'GET',
      data:{page:page}
    })
    .then(function(response) {
      EventActions.assistsEvent(response)
    });
  }
}
export default new AssistanceService()
