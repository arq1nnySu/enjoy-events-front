import React from 'react';
import MaterialComponent from './MaterialComponent';
import mui from  'material-ui';
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;

export default MaterialComponent(class EventItem extends React.Component {
  render() {

    var event = this.props.event;
    var divStyle = {
      background: "url('http://clasiparya.paraguay.com/imagenes/2014/arma-el-asado-con-amigos-a-donde-vayas-parrilla-barbecue-portatil-_560_320-1278_1.jpg') no-repeat center center",
      backgroundSize: 'cover !important'
    };
    return (
        <Card className="my_event col-sm-6 col-md-3 type_f">
           <CardMedia overlay={<CardTitle title={event.name}/>}>
            <img src="http://clasiparya.paraguay.com/imagenes/2014/arma-el-asado-con-amigos-a-donde-vayas-parrilla-barbecue-portatil-_560_320-1278_1.jpg"/>
          </CardMedia>
           <CardText>
            Blah
          </CardText>
        </Card>
    );
  }
});


 // <span key={event.id} className="my_event col-sm-6 col-md-3 type_f" >
 //          <div className="event_show" style={divStyle}></div>
 //          <div className="color"></div>
 //          <div className="event_options"> 
 //              <span className="event_artits">{event.name}</span> 
 //              <span className="event_venue"><i className="fa fa-map-marker"></i> 
 //                  Esmeralda
 //              </span> 
 //          </div>
 //      </span>  
