import request from 'reqwest';
import when from 'when';
import {EVENT_URL} from '../constants/AppConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore.js';

class EventService {

  allEvents() {
    request({
      url: EVENT_URL,
      crossOrigin: true,
      method: 'GET'
      // headers: {
      //   'Authorization': 'Bearer ' + LoginStore.jwt
      // }
    })
    .then(function(response) {
      EventActions.allEvents(response);
    });
  }

}

export default new EventService()
