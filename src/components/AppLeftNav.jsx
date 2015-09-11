import React from 'react';
import Router from 'react-router';
import MaterialComponent from './MaterialComponent';
import { MenuItem, LeftNav, Styles } from 'material-ui';
let { Colors, Spacing, Typography } = Styles;

let menuItems = [
    { route: 'login', text: 'Login' },
    { route: 'signup', text: 'Signup' },
    { route: 'home', text: 'Events' },
    { type: MenuItem.Types.SUBHEADER, text: 'Extras' },
    { type: MenuItem.Types.LINK, payload: 'https://github.com/arq1nnySu', text: 'GitHub' },
    { type: MenuItem.Types.LINK, payload: 'https://travis-ci.org/arq1nnySu/enjoy-events-front', text: 'Travis' },
    { type: MenuItem.Types.LINK, payload: 'https://www.pivotaltracker.com/n/projects/1420300', text: 'Pivotal' }
  ];


export default class AppLeftNav extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  getStyles() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }

  render() {
    let header = (
      <div style={this.getStyles()} onTouchTap={this._onHeaderClick}>
        Enjoy-Events
      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={true}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  }

}

