'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService';
import MaterialComponent from './MaterialComponent';


import mui from  'material-ui';
var AppBar = mui.AppBar;
var IconButton = mui.IconButton;
var Avatar = mui.Avatar;
var FlatButton = mui.FlatButton;


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
            iconElementRight={this.headerItems}/>
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
        <FlatButton route="home" label="Home" linkButton={true} href="/#"/>
        <FlatButton route="login" label="Login" linkButton={true} href="/#/login" />
        <FlatButton route="signup" label="Signup" linkButton={true}  href="/#/signup"/>
      </div>)
    } else {
      return (
      <div >
          <FlatButton route="home" label="Home" linkButton={true} href="/#"/>
          <Avatar src="http://material-ui.com/images/uxceo-128.jpg" />
          <FlatButton onClick={this.logout} linkButton={true}  label="Logout" />
      </div>)
    }
  }
})
