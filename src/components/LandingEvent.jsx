import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton} from  'material-ui';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';

export default MaterialComponent(class EventItem extends React.Component {

  constructor(props) {
    super(props);
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
    this.setState(this.getEventState());
  }

  getEvent() {
    EventService.getEvent(this.props.params.event);
  }

  getEventState() {
    return {
      event: EventStore.event
    };
  }


  render() {
    var event = this.state.event;
    if(event != undefined){
      event.venue = {name:event.venue, 
      latitude:"-34.60370190000",
      longitude:"-58.381872999999985",
      address:{street:"Roque Sáens Peña 352", city: "Bernal, Buenos Aires"}};
      var mapLink = "https://maps.google.com?saddr=My+Location&daddr="+event.venue.latitude+","+event.venue.longitude;
      var mapImage = "https://maps.googleapis.com/maps/api/staticmap?center="+event.venue.latitude+","+event.venue.longitude+"&zoom=15&size=120x84&maptype=roadmap"
      return (
        <div >
          <Card >
             <CardMedia  className="landing_event_image" overlay={<CardTitle title={event.name}/>}>
               <img src={event.image}/>
            </CardMedia>
            <CardTitle />
            <CardText className="col-sm-7" >
              <div dangerouslySetInnerHTML={ {__html: event.description}} />
            </CardText>
            <div className="col-sm-4 col-xs-12 pg_sidebar pull-right">
            <div className="addon">
              <div className="con location clearfix">
                <div className="col-xs-7"> {event.venue.name}<a href="#">{event.venue.street}</a> <span><strong>{event.venue.address.street}</strong></span>{event.venue.address.city}</div>
                <div className="col-xs-4 pull-right"> <img src={mapImage}/>  </div>
              </div >
                <RaisedButton label="Como llegar al evento" secondary={true} linkButton={true} href={mapLink}  target="_blank">
                  <MapsPlace style={this.getButtonIcon()} />
                </RaisedButton>
               </div>
              <div className="addon">
                  <h2>Más información</h2>
                  <div className="clearfix">
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Facebook"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Youtube"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="GitHub"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Pinterest"/>
                  </div>
                </div>
              </div>
          </Card>
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

  getButtonIcon() {
    return {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px'
      }
    }
});
