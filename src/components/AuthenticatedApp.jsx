'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService';
import MaterialComponent from './MaterialComponent';
import AppLeftNav from './AppLeftNav';
import {AppBar, Avatar, FlatButton, AppCanvas} from  'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import Delete from 'material-ui/lib/svg-icons/action/delete'


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
      <AppCanvas >
           <AppBar
            title="Enjoy Events"
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            iconElementRight={this.headerItems}
            style={{position: 'fixed'}}/>
        <RouteHandler/>
        <AppLeftNav ref="leftNav" />
      </AppCanvas>
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
        <FlatButton route="login" label="Login"  secondary={true} linkButton={true} href="/#/login" />
        <FlatButton route="signup" label="Signup" secondary={true} linkButton={true}  href="/#/signup"/>
      </div>)
    } else {
      return (
          <IconMenu
              primaryText="asdfsdf"
              iconButtonElement={<Avatar src="http://material-ui.com/images/uxceo-128.jpg" />}
              openDirection="bottom-left">
              <MenuItem primaryText="Logout" leftIcon={<Delete />} onClick={this.logout} />
            </IconMenu>
      )
    }
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
})
