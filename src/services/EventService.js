import request from './Request';
import when from 'when';
import {EVENTS_URL, CREATE_EVENT_URL, GET_EVENT_URL} from '../constants/AppConstants';
import EventActions from '../actions/EventActions';
import LoginStore from '../stores/LoginStore.js';
import EventStore from '../stores/EventStore.js';
import ga from 'react-ga';

class EventService {

  allEvents() {
    request.request({
      url: EVENTS_URL,
      data:{page:EventStore.page},
      method: 'GET'
    })
    .then(function(response) {
      EventActions.allEvents(response);
    });
  }

  createEvent(event, errorHandler){
    ga.event({ category: 'Event', action: 'Created',label:event.tag } );
    return request.request({
      url: CREATE_EVENT_URL,
      method: 'POST',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(event)
    })
    .then(function(response) {
      EventActions.createEvent(response);
    })
    .catch(function(error){
      errorHandler(JSON.parse(error.responseText))
    });
  }


  removeEvent(event, errorHandler){
    ga.event({ category: 'Event', action: 'Removed',label:event.tag } );
    return request.request({
      url: CREATE_EVENT_URL,
      method: 'DELETE',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify({tag:event.tag})
    })
    .then(function(response) {
      EventActions.removeEvent();
    })
  }

  updateEvent(event, errorHandler){
    ga.event({ category: 'Event', action: 'Updated',label:event.tag } );
    return request.request({
      url: CREATE_EVENT_URL,
      method: 'PUT',
      type: 'json',
      contentType: "application/json",
      data: JSON.stringify(event)
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
