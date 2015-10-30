import reqwest from 'reqwest';
import request from './Request';
import {WETHER_URL} from '../constants/AppConstants';

class WeatherService {

    weatherFor(city){
    	return reqwest({
	      url: WETHER_URL,
	      method: 'GET',
	      type: 'json'
	   	})
  	}
}

export default new WeatherService()
