import React from 'react';
import EventItem  from './EventItem';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import {CardActions} from 'material-ui';
import RouterContainer from '../services/RouterContainer';

import {Menu, MainButton, ChildButton} from 'react-mfb';

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

  createEvent(){
     RouterContainer.get().transitionTo('/createEvent')
  }

  render() {
    var events = [];

    for (var key in this.state.events) {
      events.push(<EventItem key={key} event={this.state.events[key]} />);
    }

    var effect = 'slidein',
      pos = 'br',
      method = 'hover';

    return (
    	<div className="container content">
      <div className="events">{events}</div>
      <div className="my_event col-md-4" />

      <Menu effect={effect} method={method} position={pos}>
        <MainButton iconResting="ion-plus-round" iconActive="ion-edit" />
           <ChildButton
            onClick={this.createEvent}
            icon="ion-plus-round"
            label="Crear Evento"/>
      </Menu>
      </div>
    );
  }
};
