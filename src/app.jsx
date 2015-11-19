import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import LandingEvent from './components/LandingEvent';
import EventForm from './components/event/EventForm';
import AssistsEvent from './components/assistance/AssistsEvent';
import MyAccount from './components/MyAccount';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';
import injectTapEventPlugin from "react-tap-event-plugin";
import ga from 'react-ga';
require("./stylesheet/index.css");
require('react-widgets/dist/css/react-widgets.css')

injectTapEventPlugin();

let routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="signin" handler={Signin}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="event" path="/event/:event" handler={LandingEvent}/>
    <Route name="createvent" path="/createEvent" handler={EventForm}/>
    <Route name="editEvent" path="/editEvent/:event" handler={EventForm}/>
    <Route name="myaccount" path="/myaccount" handler={MyAccount}/>
    <Route name="assistsEvent" path="/assistsEvent/:event" handler={AssistsEvent}/>
  </Route>
);

let router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}

router.run(function (Handler, state) {
  ga.initialize('UA-68486131-1'/*, { debug: true }*/);
  React.render(<Handler />, document.getElementById('content'));
  ga.pageview(state.pathname);
});

