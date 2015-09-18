import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';
import mui from  'material-ui';
import Facebook from './Facebook';

var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;

export default class Login extends React.Component {

  constructor() {
    super()
    this.context =  {
          muiTheme: ThemeManager.getCurrentTheme()
    };
     this.childContextTypes =  {
          muiTheme: ThemeManager.getCurrentTheme()
    };
    this.state = {
      user: '',
      password: ''
    };
  }

  getChildContext(){
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  }


  login(e) {
    e.preventDefault();
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  resultFacebookLogin(response) {
    console.log( response );
  }

  render() {
    return (
      <div className="login content jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <RaisedButton type="submit" className="btn btn-default" label="Login" onClick={this.login.bind(this)} />
        <Facebook
          appId="687026038097556"
          class="facebook-login"
          scope="public_profile, email, user_birthday"
          loginHandler={ this.resultFacebookLogin } />
      </form>
    </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
