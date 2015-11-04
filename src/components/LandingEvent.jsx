import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton, Snackbar, Dialog, FlatButton} from  'material-ui';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import WeatherService from '../services/WeatherService.js';
import AssistanceService from '../services/AssistanceService.js';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';
import AuthenticatedComponent  from './AuthenticatedComponent';
import moment  from 'moment';

class LandingEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getEventState();
    this._onChange = this._onChange.bind(this);
    this._createAssistance = this.createAssistance.bind(this);
    this._cancelButtonDialog = this.cancelButtonDialog.bind(this);
    this._finishButtonDialog = this.finishButtonDialog.bind(this);
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
    this.loadWeather()
  }

  getEvent() {
    EventService.getEvent(this.props.params.event);
  }

  getEventState() {
    return {
      modal: false,
      event: EventStore.event,
      weather: {weather:{}, coord:{}, data:{}}
    };
  }

  createAssistance(){
    if (this.state.event.requirement != []){
      this.refs.requirementsDialog.show();
    }
    AssistanceService.createAssistance({event:this.state.event.tag}).then( resp => {
        this.state.event.hasAssistance = true
        this.setState(this.state)
        this.refs.successBar.show()
      });
  }

  cancelButtonDialog(){
    // dismiss dialog y que siga normal
  }

  finishButtonDialog(){
    // crear los requerimientos, guardarlos en la assistencia.
  }

  loadWeather(){
    WeatherService.weatherFor(this.state.event.tag).then(response => {
        this.state.weather = response
        this.setState(this.state)
    })
  }


  render() {
    var event = this.state.event;
    if(event != undefined){
      var mapLink = "https://www.google.com/maps/dir/Current+Location/"+event.venue.street+","+event.venue.city+","+event.venue.country;
      var mapImage = "https://maps.googleapis.com/maps/api/staticmap?center="+event.venue.street+","+event.venue.city+","+event.venue.country+"&zoom=15&size=150x100&maptype=roadmap"
      return (
        <div >
          <Card >
             <CardMedia  className="landing_event_image" overlay={<CardTitle title={event.name}/>}>
               <img src={event.image}/>
            </CardMedia>
            <CardTitle />
            <CardText className="col-sm-8" >
              <div dangerouslySetInnerHTML={ {__html: event.description}} />
            </CardText>
            <div className="col-sm-4 col-xs-12 pg_sidebar pull-right">
            <div className="addon clearfix" style={{"text-align": "center"}}>
                {this.getAssistanceComponent()}
            </div>
            <div className="addon">
              <div className="clearfix">
                <div className="col-xs-12"> 
                  {this.weatherComponent()}
                  <div className="col-xs-6">
                    {event.venue.city}
                    {event.venue.name}
                    <span><strong>{event.venue.street}</strong></span> 
                    <img src={mapImage}/>
                  </div>
                    <RaisedButton label="How to arrive to event" secondary={true} linkButton={true} href={mapLink}  target="_blank">
                      <MapsPlace style={this.getButtonIcon()} />
                    </RaisedButton>
                </div>
              </div >
               </div>
                <div className="addon">
                  <h2>More information</h2>
                  <div className="clearfix">
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Facebook"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Youtube"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="GitHub"/>
                    <IconButton iconClassName="btn-social icon-custom-github" tooltip="Pinterest"/>
                  </div>
                </div>
              </div>
              {this.getDialogChooseRequirements()}
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

  weatherComponent(){
    if(this.state.weather.data){
      return <div className="col-xs-6 location">
              <span className="col-xs-12 temp_detail"><div>{moment(this.state.event.date +" "+this.state.event.time).format("dddd, MMMM Do YYYY, h:mm a")}</div></span>
              <span className="col-xs-6"><img src={this.getWeatherImage()}/></span>
              <div className="col-xs-3 temperature"> {this.state.weather.data.temperature} </div>
              <span className="temperature_symbol">°C.</span>
              <p className="col-xs-12 temp_detail">Humidity: {this.state.weather.data.humidity}%.</p>
              <p className="col-xs-12 temp_detail">Pressure: {this.state.weather.data.pressure}%.</p>
              <p className="col-xs-12 temp_detail">Wind: {this.state.weather.data.wind} km/h.</p>
            </div> 
    }else{
      return <div className="col-xs-6 location">
              <span className="col-xs-12 temp_detail"><div>{moment(this.state.event.date +" "+this.state.event.time).format("dddd, MMMM Do YYYY, h:mm a")}</div></span>
              <span className="temp_detail forecast" style={{display:"inline-block"}}><h1>Forecast not available</h1></span>
            </div> 
    }
  }

  getWeatherImage(){
    return "http://openweathermap.org/img/w/" + this.state.weather.weather.icon + ".png"
  }


  getDialogChooseRequirements(){

    let requirementsActions = [
      <FlatButton
        key={1}
        label="Cancel"
        secondary={true}
        onTouchTap={this._cancelButtonDialog} />,
      <FlatButton
        key={2}
        label="Finish"
        primary={true}
        onTouchTap={this._finishButtonDialog} />,
    ];

    return <Dialog
              ref="requirementsDialog"
              title="You want help with the Requirements???"
              actions={requirementsActions}
              modal={this.state.modal}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <div style={{height: '1000px'}}>
              Really long content
              </div>
            </Dialog>
  }

  getAssistanceComponent(){
    if(this.props.userLoggedIn){
      if(this.state.event.hasAssistance){
        return <div>
                <span className="col-xs-4"><img src="https://www.allaccess.com.ar/img/ico_purchase_ok.png" style={{"max-width": "100%", "min-width":"100%"}}/></span>
                <span className="col-xs-8 assistance_event"><h1>You have an assistance for this event.</h1></span>  
              </div>
      }else{
        return <span className="col-xs-12">
                  <RaisedButton className="assistance_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Attending" onClick={this._createAssistance} />
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