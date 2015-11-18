import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/UserService';
import mui from  'material-ui';
import Facebook from './Facebook';
import MaterialComponent from './MaterialComponent';
import {RaisedButton, Card, CardMedia, CardTitle, CardText, FlatButton, 
  CardActions, CardHeader, TextField} from  'material-ui';

class Signin extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.user, this.state.password)
      .catch((err) => {
        this.state.error = "Invalid username or password"
        this.setState(this.state)
      })
  }

  resultFacebookLogin(response) {
    console.log( response );
  }

  render() {
    let inputStyle = {width:"100%"}
    return (
      <div  >
        <CardMedia overlay={<CardTitle title="Sign In" subtitle=""/>}>
          <img className="header_section"/>
        </CardMedia>
        <div className="container col-lg-6 login_container">
          <CardActions style={{margin: "-120px auto auto auto"}} >
            <Card className="login content jumbotron center-block">
              <h1>Login</h1>
              <form role="form">
              <div className="form-group">
                <TextField style={inputStyle} floatingLabelText="Username" valueLink={this.linkState('user')}  />
              </div>
              <div className="form-group">
                <TextField floatingLabelText="Password" style={inputStyle} type="password" valueLink={this.linkState('password')}  />
              </div>

              <div className="has-error">
                <label className="control-label">{this.state.error} </label> 
              </div>

              <CardActions>
                <RaisedButton type="submit" className="btn btn-default" label="Login" secondary={true} onClick={this.login.bind(this)} />
                <span className="hidden">
                  <Facebook
                    appId="687026038097556"
                    class="facebook-login "
                    scope="public_profile, email, user_birthday"
                    loginHandler={ this.resultFacebookLogin } />
                </span>
              </CardActions>
            </form>
          </Card>
          </CardActions>
        </div>
      </div>
    );
  }
}

ReactMixin(Signin.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(Signin)