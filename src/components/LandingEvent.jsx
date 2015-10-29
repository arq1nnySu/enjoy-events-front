import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton, Snackbar} from  'material-ui';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import AssistanceService from '../services/AssistanceService.js';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';
import AuthenticatedComponent  from './AuthenticatedComponent';

class LandingEvent extends React.Component {

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

  createAssistance(){
    AssistanceService.createAssistance({event:this.state.event.tag}).then( resp => {
        this.state.event.hasAssistance = true
        this.setState(this.state)
        this.refs.successBar.show()
      }
    );
  }

  render() {
    var event = this.state.event;
    if(event != undefined){
      event.fakeVenue = {name:event.venue, 
      latitude:"-34.60370190000",
      longitude:"-58.381872999999985",
      address:{street:"Roque Sáens Peña 352", city: "Bernal, Buenos Aires"}};
      var mapLink = "https://maps.google.com?saddr=My+Location&daddr="+event.fakeVenue.latitude+","+event.fakeVenue.longitude;
      var mapImage = "https://maps.googleapis.com/maps/api/staticmap?center="+event.fakeVenue.latitude+","+event.fakeVenue.longitude+"&zoom=15&size=120x84&maptype=roadmap"
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
            <div className="addon clearfix" style={{"text-align": "center"}}>
                {this.getAssistanceComponent()}
            </div>
            <div className="addon">
              <div className="con location clearfix">
                <div className="col-xs-7"> {event.fakeVenue.name}<a href="#">{event.fakeVenue.street}</a> <span><strong>{event.fakeVenue.address.street}</strong></span>{event.fakeVenue.address.city}
                    <RaisedButton label="Como llegar al evento" secondary={true} linkButton={true} href={mapLink}  target="_blank">
                      <MapsPlace style={this.getButtonIcon()} />
                    </RaisedButton>
                </div>
                <div className="col-xs-4 pull-right"> <img src={mapImage}/>  </div>
              </div >
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
           <Snackbar ref="successBar" message="Assistance to event successfully"/>
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


  getAssistanceComponent(){
    if(this.props.userLoggedIn){
      if(this.state.event.hasAssistance){
        return <div>
                <span className="col-xs-4"><img src="https://www.allaccess.com.ar/img/ico_purchase_ok.png" style={{"max-width": "100%", "min-width":"100%"}}/></span>
                <span className="col-xs-8 assistance_event"><h1>Ta tenes una asistencia para este evento.</h1></span>  
              </div>
      }else{
        return <span className="col-xs-12">
                  <RaisedButton className="assistance_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Attending" onClick={this.createAssistance.bind(this)} />
                </span>
      }
    }else{
        return <span className="col-xs-12 login_required"><h3>You have to login to attend the event.</h3></span>
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
};
export default MaterialComponent(AuthenticatedComponent(LandingEvent))