import request from './Request';
import when from 'when';
import {VENUES_URL} from '../constants/AppConstants';
import VenueStore from '../stores/LoginStore.js';
import VenueActions from '../actions/VenueActions';

class VenueService {

  allVenues() {
    request.request({
      url: VENUES_URL,
      method: 'GET'
    })
    .then(function(response) {
      VenueActions.allVenues(response);
    });
  }

}

export default new VenueService()
