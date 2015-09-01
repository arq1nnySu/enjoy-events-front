import React from 'react';
import EventItem  from './EventItem';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent(class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = this.getHomeState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.events) {
      this.listEvents();
    }

    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getHomeState());
  }

  listEvents() {
    EventService.allEvents();
  }

  getHomeState() {
    return {
      events: EventStore.events
    };
  }

  render() {
    var events = [];

    for (var key in this.state.events) {
      events.push(<EventItem key={key} event={this.state.events[key]} />);
    }
    return (
    	<div >
	    	<h1>Hello {this.props.user ? this.props.user.username : ''}</h1>
	    	<div className="events">{events}</div>
    	</div>
    );
  }
});
