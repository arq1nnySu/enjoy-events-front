import reqwest from 'reqwest';
import request from './Request';
import {WETHER_URL} from '../constants/AppConstants';

class WeatherService {

    weatherFor(eventTag){
    	return reqwest({
	      url: WETHER_URL,
	      method: 'GET',
	      data: {event:eventTag},
	      type: 'json'
	   	})
  	}
}

export default new WeatherService()
