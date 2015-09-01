import React from 'react/addons';
// require('./css/style.css');

export default class Facebook extends React.Component {

    componentDidMount() {

      window.fbAsyncInit = function() {
        FB.init({
          appId      : this.props.appId || '',
          xfbml      : this.props.xfbml || true,
          version    : 'v2.4'
        });

        if ( this.props.autoLoad ) {

          FB.getLoginStatus(function(response) {
            this.checkLoginState(response);
          }.bind(this));

        }

      }.bind(this);

     //  // Load the SDK asynchronously
      (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    }

    responseApi(authResponse) {
      FB.api('/me', function(response) {

        response.status = 'connected';
        response.accessToken = authResponse.accessToken;
        response.expiresIn = authResponse.expiresIn;
        response.signedRequest = authResponse.signedRequest;

        if ( this.props.loginHandler ) {
          this.props.loginHandler( response );
        }


      }.bind(this));
    }

    checkLoginState(response) {
      if (response.authResponse) {

        this.responseApi(response.authResponse);

      } else {

        if ( this.props.loginHandler ) {
          this.props.loginHandler( { status: response.status } );
        }

      }
    }

    handleClick() {
      var valueScope = 'public_profile, email, user_birthday';

      FB.login(this.checkLoginState.bind(this), { scope: valueScope });
    }

  render() {
    return (
        <div>
          <button className='facebook-login' onClick={ this.handleClick.bind(this) }>
              Login with Facebook
          </button>
          <div id="fb-root"></div>
        </div>
      )
    }
}
