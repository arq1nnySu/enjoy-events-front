import React from 'react/addons';
import ReactMixin from 'react-mixin';
import EventService from '../services/EventService';
import VenueService from '../services/VenueService';
import UserService from '../services/UserService';
import RouterContainer from '../services/RouterContainer';
import EventStore from '../stores/EventStore'
import UserStore from '../stores/UserStore'
import VenueStore from '../stores/VenueStore'
import Multiselect from 'react-widgets/lib/Multiselect'
import DropdownList from 'react-widgets/lib/DropdownList'
import {RaisedButton, DatePicker, TimePicker, TextField, SelectField, 
  Card,CardTitle, CardActions,ClearFix, Avatar} from  'material-ui';
import MaterialComponent from './MaterialComponent';
import RedirectAuthenticatedComponent from './RedirectAuthenticatedComponent';
import ImageImage from 'material-ui/lib/svg-icons/image/image';
import TimerImage from 'material-ui/lib/svg-icons/av/av-timer';
import LocationImage from 'material-ui/lib/svg-icons/communication/location-on';
import GroupImage from 'material-ui/lib/svg-icons/social/group-add';
import DateImage from 'material-ui/lib/svg-icons/action/event';
import DescriptionImage from 'material-ui/lib/svg-icons/action/description';
import NameImage from 'material-ui/lib/svg-icons/action/book';
import moment from 'moment'
import Gravatar from 'react-gravatar';


class MultiSelectItem extends React.Component {

  render(){
    var user = this.props.item;
    var size = 20;
    var gravatarStyle = {
      borderRadius: 10,
      display: 'inline-block',
      marginRight: 2,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    }
    return (
      <span>
        <Gravatar email={user.email} size={size} style={gravatarStyle} />
        {user.firstName} {user.lastName}
      </span>
    )
  }
}

class DropdownItem extends React.Component {
  render(){
    var venue = this.props.item;
    return (
      <span>
        {venue.name}, {venue.city}
      </span>
    )
  }
}

class EventForm extends React.Component {

  constructor() {
    super()
    this.state = {extra:{error:{message:{}}}, time:"", gests:[]};
    this._onChange = this._onChange.bind(this);
    this._onChangeVenue = this._onChangeVenue.bind(this);
    this.loadGetsUsers()
    this.loadVenues()
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
    VenueStore.addChangeListener(this._onChangeVenue);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange)
    VenueStore.removeChangeListener(this._onChangeVenue)
  }

  _onChange() {
    RouterContainer.get().transitionTo('/event/'+ EventStore.event.tag);
  }

  _onChangeVenue(){
      this.state.extra.venues = VenueStore.venues
      this.setState(this.state)
  }

  setTime(time){
    this.state.time = time;
  }

  createEvent(e) {
    e.preventDefault();
    this.state.extra.error = {}
    this.state.date = moment(this.state.date).format("YYYY-MM-DD")
    EventService.createEvent(this.state, this._handlerError.bind(this));
  }

  _handlerError(errors){
    this.state.extra.error = errors
    this.setState(this.state)
  }

  comeBackHome(e){
   e.preventDefault()
   RouterContainer.get().transitionTo('/')
  }


  render() {
    let inputStyle = {width:"100%"}
    let visibilities = [
       { id: 'Public', name: 'Público' },
       { id: 'Private', name: 'Privado' },
    ]
    return (
      <ClearFix className="container content col-md-12" name="Crear Evento">
        <CardTitle title="Crear Evento" subtitle=""/>
        <form className="form-horizontal" role="form">
          <ClearFix className="event-form-panel col-md-6">
            <Card style={{height:"100%"}}>
              <CardTitle title="Datos" subtitle="primarios"/>
              
              <div className="form-group">
                <span className="control-label col-sm-1">
                  <NameImage/>
                </span>
                <span className="col-sm-10">
                  <TextField style={inputStyle} errorText={this.state.extra.error.message.tag} floatingLabelText="Tag" valueLink={this.linkState('tag')}  />
                </span>
              </div>

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <NameImage/>
                </span>
                <span className="col-sm-10">
                  <TextField style={inputStyle} errorText={this.state.extra.error.message.name} floatingLabelText="Name" valueLink={this.linkState('name')}  />
                </span>
              </div>

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <ImageImage/>
                </span>
                <span className="col-sm-10">
                  <SelectField floatingLabelText="Visibilidad" valueMember="id" displayMember="name" menuItems={visibilities}  style={inputStyle} valueLink={this.linkState('visibility')} />
                </span>
              </div> 

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <DescriptionImage/>
                </span>
                <span className="col-sm-10">
                  <TextField style={inputStyle} floatingLabelText="Description"  errorText={this.state.extra.error.message.description} valueLink={this.linkState('description')}  multiLine={true}/>
                </span>
              </div>

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <LocationImage/>
                </span>
                <span className="col-sm-10">
                  <CardTitle subtitle="Venue"/>
                  <DropdownList
                      placeholder="Select venue"
                      valueComponent={DropdownItem}
                      itemComponent={DropdownItem}
                      data={this.state.extra.venues} 
                      onChange={this.selectVenue.bind(this)}
                  />
                </span>
              </div>

            </Card>
          </ClearFix>


          <ClearFix className="event-form-panel col-md-6">
            <Card style={{height:"100%"}}>
              <CardTitle title="Datos" subtitle="secundarios"/>

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <ImageImage/>
                </span>
                <span className="col-sm-10">
                  <TextField  style={inputStyle}  errorText={this.state.extra.error.message.capacity} floatingLabelText="Capacity" valueLink={this.linkState('capacity')}  />
                </span>
              </div>               

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <ImageImage/>
                </span>
                <span className="col-sm-10">
                  <TextField  style={inputStyle}  errorText={this.state.extra.error.message.image} floatingLabelText="Image url" valueLink={this.linkState('image')}  />
                </span>
              </div> 

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <DateImage/>
                </span>
                <span className="col-sm-10">
                  <DatePicker textFieldStyle={inputStyle}  errorText={this.state.extra.error.message.date} floatingLabelText="Date"  valueLink={this.linkState('date')} autoOk={true} minDate={new Date()}/>
                </span>
              </div> 

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <TimerImage/>
                </span>
                <span className="col-sm-10">
                  <TimePicker style={inputStyle}  format="ampm"  floatingLabelText="Hour" autoOk={true}/> 
                </span>
              </div>

              <div className="form-group">
                <span className="control-label col-sm-1">
                  <GroupImage/>
                </span>
                <span className="col-sm-10" >
                  <CardTitle subtitle="Gests"/>
                  <Multiselect
                      placeholder="Select users"
                      itemComponent={MultiSelectItem}
                      tagComponent={MultiSelectItem}
                      data={this.state.extra.users} 
                      onChange={this.selectUsers.bind(this)}
                  />
                </span>
              </div>

              <div className="form-group">
                <span className="control-label col-sm-1">
                </span>
                <span className="col-sm-10">
                </span>
              </div>

            </Card>
          </ClearFix>
          
           <CardActions className="col-sm-7 col-sm-offset-2">
            <RaisedButton style={{margin:10}} label="Cancel" onClick={this.comeBackHome.bind(this)}/>
            <RaisedButton style={{margin:10}} secondary={true} label="Create" onClick={this.createEvent.bind(this)}/>
          </CardActions>
        </form>
      </ClearFix>
    );
  }

  loadGetsUsers (){
    UserStore.addChangeListener(()=>{
      let users = UserStore.users.map(user=> {
        user.value = user.username
        return user
      }) 
      this.state.extra.users = users
      this.setState(this.state)
      // callback(null, {options:users, complete:true})
    })
    UserService.allUsers()
  }

  loadVenues(){
    if(!VenueService.venues){
      VenueService.allVenues()
    }
  }

  selectUsers(users){
    this.state.gests = users.map(user => user.username)
  }

  selectVenue(venue){
      this.state.venue = venue.name
  }

}

ReactMixin(EventForm.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(EventForm)