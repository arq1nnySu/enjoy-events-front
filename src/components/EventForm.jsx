import React from 'react/addons';
import ReactMixin from 'react-mixin';
import EventService from '../services/EventService';
import RouterContainer from '../services/RouterContainer';
import EventStore from '../stores/EventStore'
import {RaisedButton, DatePicker, TimePicker} from  'material-ui';
import MaterialComponent from './MaterialComponent';

// TODO : Tiene que estar doblemente rapeado de Auth y MaterialComponent

class EventForm extends React.Component {

  constructor() {
    super()
    this.state = {};
    this._onChange = this._onChange.bind(this);
  }

   componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    RouterContainer.get().transitionTo('/event/'+ EventStore.event.id);
    //this.context.router.transitionTo('/event/'+ EventStore.event.id);
  }

  setTime(time){
    this.state.time = time;
  }

   createEvent(e) {
    e.preventDefault();
    EventService.createEvent(this.state);
  }
  comeBackHome(e){
   e.preventDefault();
   RouterContainer.get().transitionTo('/');
  }


  render() {
    return (
      <div className="container">
        <div className="my_event col-md-4">
          <h2>Crear Evento</h2>
          <form role="form">
          <div className="form-group">
            <label htmlFor="eventname">Nombre</label>
            <input type="text" valueLink={this.linkState('name')} className="form-control" id="eventname" placeholder="Eventname" />
          </div>
          <div className="form-group">
            <label htmlFor="eventimage">Imagen</label>
            <input type="text" valueLink={this.linkState('image')} className="form-control" id="eventimage" placeholder="EventImage" />
          </div> 
          <div className="form-group">
            <label htmlFor="eventdate">Fecha</label>
            <DatePicker hintText="Landscape Dialog" mode="landscape" valueLink={this.linkState('date')} />
          </div> 
          <div className="form-group">
            <label htmlFor="eventtime">Hora</label>
            <TimePicker format="ampm" hintText="12hr Format" /> 
          </div>
          <div className="form-group">
            <label htmlFor="eventvenue">Lugar</label>
            <input type="text" valueLink={this.linkState('venue')} className="form-control" id="eventvenue" ref="eventvenue" placeholder="Eventvenue" />
          </div>
          <div className="form-group">
            <label htmlFor="eventdescription">Descripcion</label>
            <input type="text" valueLink={this.linkState('description')} className="form-control" id="eventdescription" ref="eventdescription" placeholder="Eventdescription" />
          </div>
          <RaisedButton type="submit" className="btn btn-default" label="Cancel" onClick={this.comeBackHome.bind(this)}/>
          <RaisedButton type="submit" className="btn btn-default" label="Create" onClick={this.createEvent.bind(this)}/>
        </form>
      </div>
    </div>
    );
  }
}

ReactMixin(EventForm.prototype, React.addons.LinkedStateMixin);

export default MaterialComponent(EventForm)