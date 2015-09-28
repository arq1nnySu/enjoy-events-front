import React from 'react';
import LoginStore from '../stores/LoginStore';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class RedirectAuthenticatedComponent extends React.Component {
    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super()
    }
});
