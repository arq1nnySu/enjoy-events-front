import React from 'react';
import MaterialComponent from 'MaterialComponent';
import mui from  'material-ui';
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;

export default MaterialComponent(class EventItem extends React.Component {
  render() {
    var event = this.props.event;
    return (
        <Card >
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
