import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton} from  'material-ui';
import EventStore from '../stores/EventStore'
import EventActions from '../actions/EventActions';
import RouterContainer from '../services/RouterContainer';
import EventService from '../services/EventService.js';
import AuthenticatedComponent  from './AuthenticatedComponent';
import Weather from './event/Weather'
import CreateAssistance from './event/CreateAssistance'
import Venue from './event/Venue'
import ConfirmComponent from './ConfirmComponent';
import {Menu, MainButton, ChildButton} from 'react-mfb';

class LandingEvent extends React.Component {

  constructor(props) {
    super(props);
    EventActions.clearEvent();
    this.state = this.getEventState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.getEvent();
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getEventState())
  }

  getEvent() {
    EventService.getEvent(this.props.params.event);
  }

  getEventState() {
    return {
      event: EventStore.event,
    };
  }

  render() {
    let event = this.state.event
    if(event != undefined){
      return (
        <div >
          <Card >
             <CardMedia  overlay={<CardTitle title={event.name}/>}>
               <div className="event-header" style={{"background":"url('"+event.image+"') no-repeat center center; background-size:cover;"}}/>
            </CardMedia>
            <CardTitle/>
            <CardText className="col-sm-8" >
              <div dangerouslySetInnerHTML={ {__html: event.description}} />
            </CardText>
            <div className="col-sm-4 pg_sidebar pull-right">
              <div className="addon clearfix" style={{"text-align": "center"}}>
                <CreateAssistance event={this.state.event} userLoggedIn={this.props.userLoggedIn}/>
              </div>
              <div className="addon">
                <div className="col-xs-12"> 
                  <Weather event={this.state.event}/>
                  <Venue event={this.state.event} />
                </div>
              </div>
              {this.createMenuButton()}
              <div className="col-sm-12 addon">
                <h2>More information</h2>
                <div className="clearfix">
                  <IconButton iconClassName="btn-social icon-custom-github" tooltip="Facebook"/>
                  <IconButton iconClassName="btn-social icon-custom-github" tooltip="Youtube"/>
                  <IconButton iconClassName="btn-social icon-custom-github" tooltip="GitHub"/>
                  <IconButton iconClassName="btn-social icon-custom-github" tooltip="Pinterest"/>
                </div>
              </div>
            </div>
          </Card>
          <ConfirmComponent title={"Are you sure?"} onAccept={this.doRemoveEvent.bind(this)} ref="confirm"/>
        </div>
      )
    }else{
       return (
        <div className="centered">
          <RefreshIndicator size={100} left={400} top={200} status="loading" />
        </div>
      )
    }
  }

  createMenuButton(){
    if(this.state.event.isOwner){
      return(
        <Menu effect={"slidein"} method={"hover"} position={"br"}>
          <MainButton iconResting="ion-plus-round" iconActive="ion-plus-round" />
             <ChildButton
              onClick={this.editEvent.bind(this)}
              icon="ion-edit"
              label="Edit Event"/>
            <ChildButton
              onClick={this.assistsEvent.bind(this)}
              icon="ion-clipboard"
              label="Assists Event"/>
             <ChildButton
              onClick={this.removeEvent.bind(this)}
              icon="ion-trash-a"
              label="Rremove Event"/>
        </Menu>
        )
    }
  }

  editEvent(){
    RouterContainer.get().transitionTo('/editEvent/'+this.state.event.tag)
  }

  assistsEvent(){
    RouterContainer.get().transitionTo('/assistsEvent/'+this.state.event.tag)
  }

  removeEvent(){
    this.refs.confirm.open()
  }

  doRemoveEvent(){
    EventService.removeEvent(this.state.event).then(()=>RouterContainer.get().transitionTo('/'))
  }

};
export default MaterialComponent(AuthenticatedComponent(LandingEvent))