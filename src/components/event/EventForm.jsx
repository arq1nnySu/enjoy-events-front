import React from 'react/addons';
import ReactMixin from 'react-mixin';
import EventService from '../../services/EventService';
import VenueService from '../../services/VenueService';
import UserService from '../../services/UserService';
import RouterContainer from '../../services/RouterContainer';
import EventStore from '../../stores/EventStore'
import UserStore from '../../stores/UserStore'
import VenueStore from '../../stores/VenueStore'
import Multiselect from 'react-widgets/lib/Multiselect'
import DropdownList from 'react-widgets/lib/DropdownList'
import {RaisedButton, DatePicker, TimePicker, TextField, SelectField, 
  CardTitle, CardActions, Avatar, CardMedia} from  'material-ui';
import MaterialComponent from '../MaterialComponent';
import RedirectAuthenticatedComponent from '../RedirectAuthenticatedComponent';
import RequirementForm from './RequirementForm';
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
    this.isNew = "/createEvent" == RouterContainer.get().getCurrentPathname()
    this.visibilities = [{ name: 'Public'}, { name: 'Private'}]
    this.error = {message:{}}

    if(this.isNew){
      this.createModel()
    }else{
      this.editModel()
    }
    this._onChange = this._onChange.bind(this)
    this._onChangeVenue = this._onChangeVenue.bind(this)
    this._updateGets = this.updateGets.bind(this)

    if(UserStore.users == null){
      UserService.allUsers()
    }else{
      this.updateGets()
    }
    this.loadVenues()
  }

  editModel(){
    this.state = EventStore.event
    this.state.date = moment(this.state.date).toDate()
  }

  createModel(){
    this.state = {time:"", gests:[], requirement:[], visibility:this.visibilities[0].name}
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
    VenueStore.addChangeListener(this._onChangeVenue);
    UserStore.addChangeListener(this._updateGets)
    CKEDITOR.replace( 'description' )
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange)
    VenueStore.removeChangeListener(this._onChangeVenue)
    UserStore.removeChangeListener(this._updateGets)
  }

  _onChange() {
    RouterContainer.get().transitionTo('/event/'+ EventStore.event.tag);
  }

  _onChangeVenue(){
      this.venues = VenueStore.venues
      this.setState(this.state)
  }

  onAccept(e){
    e.preventDefault();
    this.state.description = CKEDITOR.instances.description.getData()
    this.error = {message:{}}
    this.isNew? this.createEvent(): this.updateEvent()
  }

  createEvent() {
    if(!this.state.name){
      this.error.message.name = "Name is required"
    }
    
    if(!this.state.date){
      this.error.message.date = "Date is required"
    }

    if(!this.error.message){
      this.state.date = moment(this.state.date).format("YYYY-MM-DD")
      EventService.createEvent(this.state, this._handlerError.bind(this));
    }else{
      this.updateState()
    }
  }

  updateEvent() {
    this.state.date = moment(this.state.date).format("YYYY-MM-DD")
    EventService.updateEvent(this.state, this._handlerError.bind(this));
  }

  _handlerError(errors){
    this.error = errors
    this.setState(this.state)
  }

  comeBackHome(e){                                                                                                                                                                                                                                    
   e.preventDefault()                                                                         
   RouterContainer.get().transitionTo('/')
  }

  replaceRequirement(req){
    this.state.requirement.splice(req.index,1);
    this.state.requirement.splice(req.index,0, req);
  }

  addRequirement(req){
    if (req.index > -1) { 
      this.replaceRequirement(req);
    } else {
      this.state.requirement.push(req);
    }
    this.setState(this.state) 
  }
    

  takeOffRequirement(requirement){
    var index = this.state.requirement.indexOf(requirement);
    this.state.requirement.splice(index, 1);
    this.setState(this.state)
  }

  render() {
    let inputStyle = {width:"100%"}
    return (
      <div className="container content card col-md-12" name="Crear Evento" style={{height:"100%", "padding-bottom":"80px"}}>
        <CardMedia >
          <div className="event-header margin_header" >
            <img src={"http://biodiv.org.ar/wp-content/themes/fearless/images/missing-image-640x360.png"} className="image-header"/>
            <img src={this.state.image} className="image-header"/>
           </div>
        </CardMedia>
        <CardTitle title="Crear Evento" subtitle="" />
        <form className="form-horizontal" role="form">
          <div className="event-form-panel col-md-12">
            <div className="card col-md-12" >

              <div className="col-md-12" >
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <TextField style={inputStyle} errorText={this.error.message.tag} floatingLabelText="Tag" valueLink={this.linkState('tag')}  />
                  </span>
                </div>
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <TextField style={inputStyle} errorText={this.error.message.name} floatingLabelText="Name" valueLink={this.linkState('name')}  />
                  </span>
                </div>
              </div>

              <div className="col-md-12" >
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <TextField  style={inputStyle}  errorText={this.error.message.capacity} floatingLabelText="Capacity" valueLink={this.linkState('capacity')}  />
                  </span>
                </div>   

               <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <TextField  style={inputStyle}  errorText={this.error.message.image} floatingLabelText="Image url" valueLink={this.linkState('image')}  />
                  </span>
                </div> 
              </div>

              <div className="col-md-12" >
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <DatePicker textFieldStyle={inputStyle}  errorText={this.error.message.date} floatingLabelText="Date"  valueLink={this.linkState('date')} autoOk={true} minDate={new Date()} valueLink={this.linkState('date')} formatDate={this.formatDate}/>
                  </span>
                </div> 

                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <TimePicker style={inputStyle}  format="ampm"  floatingLabelText="Hour" autoOk={true} onChange={this.updateTime.bind(this)}/> 
                  </span>
                </div>
              </div>

              <div className="col-md-12" >
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <SelectField floatingLabelText="Visibilidad" valueMember="name" displayMember="name" menuItems={this.visibilities}  style={inputStyle} valueLink={this.linkState('visibility')}/>
                  </span>
                </div> 

                <div className="col-sm-6 form-group">
                  <span className="col-sm-10">
                    <CardTitle subtitle="Venue"/>
                    <DropdownList
                        placeholder="Select venue"
                        valueComponent={DropdownItem}
                        itemComponent={DropdownItem}
                        data={this.venues} 
                        onChange={this.selectVenue.bind(this)}
                        value={this.state.venue}
                    />
                  </span>
                </div>
              </div>

              <div className="col-md-12" >
                <div className="col-sm-6 form-group">
                  <span className="col-sm-10" >
                    <CardTitle subtitle="Gests"/>
                    <Multiselect
                        placeholder="Select users"
                        itemComponent={MultiSelectItem}
                        tagComponent={MultiSelectItem}
                        data={this.users} 
                        onChange={this.selectUsers.bind(this)}
                        value={this.state.gests}/>
                  </span>
                </div>

                <div className="col-sm-6 form-group">
                  <span className="col-sm-10" >
                    <CardTitle subtitle="Requirements"/>
                    <RequirementForm requirements={this.state.requirement} onAccept={this.addRequirement.bind(this)} onDelete={this.takeOffRequirement.bind(this)} />
                  </span>
                </div>
              </div>

            <div className="col-md-12" style={{"padding-top":"50px"}}>
                <textarea id="description" name="description" valueLink={this.linkState('description')}>{this.state.description}</textarea>
            </div>
            
             <div className="col-sm-12" style={{position:"fixed", bottom:"0px", "background-color":"#e0e0e0"}}>
                <div className="col-sm-4 col-sm-offset-8">
                  <div className="col-sm-6">
                      <RaisedButton style={{margin:20, width:"100%"}} labelStyle={{"font-size":20}} label="Cancel" onClick={this.comeBackHome.bind(this)}/>
                  </div>
                  <div className="col-sm-6">
                    <RaisedButton style={{margin:20, width:"100%"}} labelStyle={{"font-size":20}} secondary={true} label={this.isNew? "Create" : "Update"} onClick={this.onAccept.bind(this)}/>
                  </div>
              </div>  
            </div>
            </div>
          </div>

        </form>
      </div>
    );
  }

  formatDate(date){
    return moment(date).format("YYYY-MM-DD")
  }

   updateGets(){
      let users = UserStore.users.map(user=> {
          user.value = user.username
          return user
        }) 
        this.users = users
        this.state.gests = users.filter((user =>{
          return this.state.gests.indexOf(user.username) >=0  || this.state.gests.indexOf(user) >=0 
        }))
        this.setState(this.state)
    }

  loadVenues(){
    if(!VenueService.venues){
      VenueService.allVenues()
    }
  }

  selectUsers(users){
    this.state.gests = users
    this.updateState()
  }

  selectVenue(venue){
      this.state.venue = venue
      this.setState(this.state)
  }

  updateTime(unknow, time){
    this.state.time = time
  }

  updateState(){
    this.setState(this.state)
  }

}

ReactMixin(EventForm.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(EventForm)