import request from './Request';
import when from 'when';
import {EVENTS_URL, CREATE_EVENT_URL, GET_EVENT_URL} from '../constants/AppConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore.js';

class EventService {

  allEvents() {
    request.request({
      url: EVENTS_URL,
      method: 'GET'
    })
    .then(function(response) {
      EventActions.allEvents(response);
    });
  }

  createEvent(event, errorHandler){
    return request.request({
      url: CREATE_EVENT_URL,
      method: 'POST',
      type: 'json',
      data: event,
    })
    .then(function(response) {
      EventActions.createEvent(response);
    })
    .catch(function(error){
      errorHandler(JSON.parse(error.responseText))
    });
  }

  getEvent(id) {
    request.request({
      url: GET_EVENT_URL+id,
      crossOrigin: true,
      method: 'GET'
    })
    .then(function(response) {
      EventActions.getEvent(response);
    });
  }

}

export default new EventService()
