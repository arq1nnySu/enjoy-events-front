import reqwest from 'reqwest';


class Request {

	request(conf){
		conf.headers =  {
        'Authorization': 'Bearer ' + localStorage.jwt
      	}
		return reqwest(conf) .fail(function(err) {
	        if(err.status == 401){

	        }else if(err.status < 500){

	        }else{

	        }
	      }
	    )
	}
}

export default new Request()
