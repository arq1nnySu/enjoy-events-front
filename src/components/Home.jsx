import React from 'react';
import EventItem  from './EventItem';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import {CardActions, FloatingActionButton} from 'material-ui';
//import ToggleStar from 'material-ui/lib/svg-icons/toggle/star';
import EditorModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';

export default class Home extends React.Component {


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
    	<div className="container">
      <div className="events">{events}</div>
      <div className="my_event col-md-4">
      <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} linkButton={true} href={"/#/createEvent"}>
         <EditorModeEdit />
      </FloatingActionButton>
      </div>
      </div>
    );
  }
};
