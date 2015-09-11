import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton} from  'material-ui';
import EventStore from '../stores/EventStore'
import EventService from '../services/EventService.js';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
;
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
    var divStyle = {
      height:400,
      background: "url('http://clasiparya.paraguay.com/imagenes/2014/arma-el-asado-con-amigos-a-donde-vayas-parrilla-barbecue-portatil-_560_320-1278_1.jpg') no-repeat center center",
      backgroundSize: 'cover !important'
    };

    if(event != undefined){
      return (
        <div >
          <Card >
             <CardMedia  overlay={<CardTitle title={event.name}/>}>
             <div className="event_show" style={divStyle}></div>
            </CardMedia>
            <CardTitle />
             <CardText className="col-sm-9">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <div className="col-sm-3 col-xs-12 pg_sidebar pull-right">
            <div className="addon">
              <div className="con location clearfix">
                <div className="col-xs-7"> <a href="#">Hipodromo de San Isidro</a> <span><strong>Av. Marquez 504</strong></span>San Isidro, Buenos Aires</div>
                <div className="col-xs-4 pull-right"> <img src="https://maps.googleapis.com/maps/api/staticmap?center=-34,60370190000,-58,381872999999985&zoom=15&size=120x84&maptype=roadmap"/>  </div>
              </div>
                <RaisedButton label="Como llegar al evento" secondary={true} linkButton={true} href="https://maps.google.com?saddr=Current+Location&amp;daddr=Av. Marquez 504+San Isidro, Buenos Aires"  target="_blank">
                <MapsPlace className="muidocs-icon-custom-github" style={this.getButtonIcon()} />
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
