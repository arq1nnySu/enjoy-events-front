import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card, CardMedia, CardTitle, CardText, FlatButton, CardActions} from  'material-ui';

export default MaterialComponent(class EventItem extends React.Component {
  render() {

    var event = this.props.event;
    return (
      <div className="my_event col-md-4">
        <Card >
           <CardMedia overlay={<CardTitle title={event.name}/>}>
            <img src="http://clasiparya.paraguay.com/imagenes/2014/arma-el-asado-con-amigos-a-donde-vayas-parrilla-barbecue-portatil-_560_320-1278_1.jpg"/>
          </CardMedia>
           <CardText>
            Blah
          </CardText>
           <CardActions className="col-sm-12">
              <FlatButton label="Mas info" route="event/sdf" linkButton={true}  href={"/#/event/"+event.id}/>
          </CardActions>
        </Card>
        </div>
    );
  }
});
