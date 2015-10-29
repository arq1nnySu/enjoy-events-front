import React from 'react/addons';
import ReactMixin from 'react-mixin';
import UserService from '../services/UserService'
import MaterialComponent from './MaterialComponent';
import {RaisedButton, Card, CardMedia, CardTitle, CardText, FlatButton, 
  CardActions, CardHeader, TextField} from  'material-ui';

class Signup extends React.Component {

  constructor() {
    super()
    this.state = {};
  }

  signup(e) {
    e.preventDefault();
    UserService.signup(this.state)
      .catch(function(err) {
        this.state.error = "Invalid username or password"
        this.setState(this.state)
      }.bind(this));
  }

  render() {
    let inputStyle = {width:"100%"}
    return (
      <div  >
        <CardMedia overlay={<CardTitle title="Signup" subtitle=""/>}>
          <img className="header_section"/>
        </CardMedia>
        <div className="container col-lg-6 login_container">
          <CardActions style={{margin: "-120px auto auto auto"}} >
            <Card className="login  jumbotron center-block">
              <h1>Signup</h1>
              <form role="form">
                <div className="form-group">
                  <TextField style={inputStyle} floatingLabelText="Username" valueLink={this.linkState('username')}  />
                </div>
                <div className="form-group">
                  <TextField floatingLabelText="Password" style={inputStyle} type="password" valueLink={this.linkState('password')}  />
                </div>
                <div className="form-group">
                  <TextField style={inputStyle} floatingLabelText="Email" valueLink={this.linkState('email')}  />
                </div>
                <div className="form-group">
                  <TextField style={inputStyle} floatingLabelText="First Name" valueLink={this.linkState('firstName')}  />
                </div>
                <div className="form-group">
                  <TextField style={inputStyle} floatingLabelText="Last Name" valueLink={this.linkState('lastName')}  />
                </div>
                <div className="form-group">
                  <TextField style={inputStyle} floatingLabelText="Phone" valueLink={this.linkState('phone')}  />
                </div>
                <CardActions>
                  <RaisedButton type="submit" className="btn btn-default" label="Save" onClick={this.signup.bind(this)} secondary={true}/>
                </CardActions>
               </form>
            </Card>
          </CardActions>
        </div>
      </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(Signup)