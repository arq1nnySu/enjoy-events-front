'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService';
import MaterialComponent from './MaterialComponent';
import {AppBar, Avatar, FlatButton} from  'material-ui';


export default MaterialComponent(class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn(),
       user: LoginStore.user,
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div >
           <AppBar
            title="Enjoy Events"
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            iconElementRight={this.headerItems}
            style={{position: 'absolute', top: 0}}/>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
      <div >
        <FlatButton route="home" label="Home"  secondary={true} linkButton={true} href="/#"/>
        <FlatButton route="login" label="Login"  secondary={true} linkButton={true} href="/#/login" />
        <FlatButton route="signup" label="Signup" secondary={true} linkButton={true}  href="/#/signup"/>
      </div>)
    } else {
      return (
      <div >
          <FlatButton route="home" label="Home" secondary={true} linkButton={true} href="/#"/>
          <Avatar src="http://material-ui.com/images/uxceo-128.jpg" />
          <FlatButton onClick={this.logout} secondary={true} linkButton={true}  label="Logout" />
      </div>)
    }
  }
})
