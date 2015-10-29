import reqwest from 'reqwest';
import LoginActions from '../actions/LoginActions';


class Request {

	request(conf){
		conf.headers =  {
        'Authorization': 'JWT ' + localStorage.jwt
      	}
		return reqwest(conf).fail(function(err) {
	        if(err.status == 401){
	        	LoginActions.logout()
	        }else if(err.status >= 500){

	        }else{

	        }
	      }
	    )
	}
}

export default new Request()
