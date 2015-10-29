import React from 'react/addons';
import ReactMixin from 'react-mixin';
import UserStore from '../stores/UserStore'
import UserService from '../services/UserService'
import MaterialComponent from './MaterialComponent';
import {RaisedButton, Card, CardMedia, CardTitle, CardText, FlatButton, 
  CardActions, CardHeader, TextField, Snackbar} from  'material-ui';

class PersonalData extends React.Component {

  constructor() {
    super()
    this.state = this.getUserState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.username) {
      this.loggedUser();
    }

    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getUserState());
  }

  loggedUser() {
    UserService.loggedUser();
  }

  getUserState() {
    return UserStore.loggedUser || {}
  }

  save(e) {
    e.preventDefault();
    UserService.update(this.state)
      .then( resp => 
        this.refs.successBar.show());
  }

  render() {
    let inputStyle = {width:"100%"}
    return (
      <div  style={{"text-align": "center"}} className="col-md-8 col-md-offset-2"  >
        <h1>Personal Data</h1>
        <form role="form">
          <div className="form-group">
            <TextField style={inputStyle} floatingLabelText="Username" valueLink={this.linkState('username')}  disabled={true}/>
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
            <RaisedButton type="submit" className="btn btn-default" label="Save" onClick={this.save.bind(this)} secondary={true}/>
          </CardActions>
         </form>

         <Snackbar ref="successBar" message="User updated successfully"/>
      </div>
    );
  }
}

ReactMixin(PersonalData.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(PersonalData)