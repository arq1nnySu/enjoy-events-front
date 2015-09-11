import request from 'reqwest';
import when from 'when';
import {EVENTS_URL, GET_EVENT_URL} from '../constants/AppConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore.js';

class EventService {

  allEvents() {
    request({
      url: EVENTS_URL,
      crossOrigin: true,
      method: 'GET'
    })
    .then(function(response) {
      EventActions.allEvents(response);
    });
  }

  getEvent(id) {
    request({
      url: GET_EVENT_URL+id,
      crossOrigin: true,
      method: 'GET'
      // headers: {
      //   'Authorization': 'Bearer ' + LoginStore.jwt
      // }
    })
    .then(function(response) {
      EventActions.getEvent(response);
    });
  }

}

export default new EventService()
