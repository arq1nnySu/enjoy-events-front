import React from 'react/addons';
import ReactMixin from 'react-mixin';
import EventService from '../services/EventService';
import RouterContainer from '../services/RouterContainer';
import EventStore from '../stores/EventStore'
import {RaisedButton, DatePicker, TimePicker, TextField, SelectField} from  'material-ui';
import MaterialComponent from './MaterialComponent';
import RedirectAuthenticatedComponent from './RedirectAuthenticatedComponent';
import ImageImage from 'material-ui/lib/svg-icons/image/image';
import TimerImage from 'material-ui/lib/svg-icons/av/av-timer';
import LocationImage from 'material-ui/lib/svg-icons/communication/location-on';
import DateImage from 'material-ui/lib/svg-icons/action/event';
import DescriptionImage from 'material-ui/lib/svg-icons/action/description';
import NameImage from 'material-ui/lib/svg-icons/action/book';
import moment from 'moment'

class EventForm extends React.Component {

  constructor() {
    super()
    this.state = {error:{message:{}}, time:""};
    this._onChange = this._onChange.bind(this);
  }

   componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    RouterContainer.get().transitionTo('/event/'+ EventStore.event.tag);
  }

  setTime(time){
    this.state.time = time;
  }

  createEvent(e) {
    e.preventDefault();
    this.state.error = {}
    this.state.date = moment(this.state.date).format("YYYY-MM-DD")
    EventService.createEvent(this.state, this._handlerError.bind(this));
  }

  _handlerError(errors){
    this.state.error = errors
    this.setState(this.state)
  }

  comeBackHome(e){
   e.preventDefault();
   RouterContainer.get().transitionTo('/');
  }


  render() {
    let inputStyle = {width:"100%"};
    let visibilities = [
       { id: 'Public', name: 'Público' },
       { id: 'Private', name: 'Privado' },
    ];
    return (
      <div className="container content col-md-12">
          <h2>Crear Evento</h2>
          <form className="form-horizontal" role="form">

          <div className="form-group">
            <span className="control-label col-sm-1">
              <NameImage/>
            </span>
            <span className="col-sm-10">
              <TextField style={inputStyle} errorText={this.state.error.message.tag} floatingLabelText="Tag" valueLink={this.linkState('tag')}  />
            </span>
          </div>

          <div className="form-group">
            <span className="control-label col-sm-1">
              <NameImage/>
            </span>
            <span className="col-sm-10">
              <TextField style={inputStyle} errorText={this.state.error.message.name} floatingLabelText="Nombre" valueLink={this.linkState('name')}  />
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
              <ImageImage/>
            </span>
            <span className="col-sm-10">
              <TextField  style={inputStyle}  errorText={this.state.error.message.image} floatingLabelText="Imagen" valueLink={this.linkState('image')}  />
            </span>
          </div> 

          <div className="form-group">
            <span className="control-label col-sm-1">
              <DateImage/>
            </span>
            <span className="col-sm-10">
              <DatePicker textFieldStyle={inputStyle}  errorText={this.state.error.message.date} floatingLabelText="Fecha"  valueLink={this.linkState('date')} />
            </span>
          </div> 

          <div className="form-group">
            <span className="control-label col-sm-1">
              <TimerImage/>
            </span>
            <span className="col-sm-10">
              <TimePicker style={inputStyle}  format="ampm"  floatingLabelText="Hora" /> 
            </span>
          </div>
          
          <div className="form-group">
            <span className="control-label col-sm-1">
              <LocationImage/>
            </span>
            <span className="col-sm-10">
              <TextField style={inputStyle}  floatingLabelText="Lugar"  errorText={this.state.error.message.venue} valueLink={this.linkState('venue')}  />
            </span>
          </div>

          <div className="form-group">
            <span className="control-label col-sm-1">
              <DescriptionImage/>
            </span>
            <span className="col-sm-10">
              <TextField style={inputStyle} floatingLabelText="Descripcion"  errorText={this.state.error.message.description} valueLink={this.linkState('description')}  multiLine={true}/>
            </span>
          </div>

          <div className="col-sm-offset-2">
            <RaisedButton style={{margin:10}} label="Cancel" onClick={this.comeBackHome.bind(this)}/>
            <RaisedButton style={{margin:10}} secondary={true} label="Create" onClick={this.createEvent.bind(this)}/>
          </div>
        </form>
    </div>
    );
  }

}

ReactMixin(EventForm.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(EventForm)