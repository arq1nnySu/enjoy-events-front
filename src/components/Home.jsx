import React from 'react';
import EventItem  from './EventItem';
import AuthenticatedComponent  from './AuthenticatedComponent';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import {CardActions} from 'material-ui';
import RouterContainer from '../services/RouterContainer';
import Infinite from 'react-infinite'
import {Menu, MainButton, ChildButton, RefreshIndicator} from 'react-mfb';

export default AuthenticatedComponent(class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state ={events:[]}
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
    this.loading()
    EventService.allEvents();
  }

  getHomeState() {
    return {
      events: this.state.events.concat(EventStore.events),
      isInfiniteLoading: false
    };
  }

  loading(){
    this.state.isInfiniteLoading = true
    this.setState(this.state)
  }

  createEvent(){
     RouterContainer.get().transitionTo('/createEvent')
  }

   elementInfiniteLoad() {
      return <div className="col-md-12"> 
            <RefreshIndicator size={100} status="loading" />
            </div>
    }

  handleInfiniteLoad() {
    setTimeout(function() {
      EventStore.nextPage()
      this.listEvents()
    }.bind(this), 2000)
  }

  render() {
    var events = [];

    for (var key in this.state.events) {
      events.push(<EventItem key={key} event={this.state.events[key]} />);
    }

    return (
    	<div className="container content">
        <div className="events">
          <Infinite
            containerHeight={800}
            elementHeight={100}
            useWindowAsScrollContainer = {true}
            infiniteLoadBeginEdgeOffset={300}
            onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
            labeloadingSpinnerDelegate={this.elementInfiniteLoad()}
            isInfiniteLoading={this.state.isInfiniteLoading}>
            {events}</Infinite>
        </div>
        <div className="my_event col-md-4" />
        {this.createMenuButton()}
      </div>
    );
  }

  createMenuButton(){
    if(this.props.userLoggedIn){
       var effect = 'slidein',
        pos = 'br',
        method = 'hover';

      return(
        <Menu effect={effect} method={method} position={pos}>
          <MainButton iconResting="ion-plus-round" iconActive="ion-edit" />
             <ChildButton
              onClick={this.createEvent}
              icon="ion-plus-round"
              label="Crear Evento"/>
        </Menu>
        )
    }
  }

});
