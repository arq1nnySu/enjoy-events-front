'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService';


import mui from  'material-ui';
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var IconButton = mui.IconButton;
var Avatar = mui.Avatar;
var FlatButton = mui.FlatButton;


export default class AuthenticatedApp extends React.Component {
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

    getChildContext(){
      return {
          muiTheme: ThemeManager.getCurrentTheme()
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
        <FlatButton linkButton={true}  label="Login" />
        <FlatButton linkButton={true}  label="Signup" />
      </div>)
    } else {
      return (
      <div >
          <FlatButton linkButton={true}  label="Home" />
          {this.state.user.username} <Avatar src="http://material-ui.com/images/uxceo-128.jpg" />
          <FlatButton onClick={this.logout} linkButton={true}  label="Logout" />
      </div>)
    }
  }
}
AuthenticatedApp.childContextTypes = { muiTheme: ThemeManager.getCurrentTheme() };