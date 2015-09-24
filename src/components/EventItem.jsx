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
           <div className="event_image">
              <img   src={event.image}/>
           </div>
          </CardMedia>
           <CardText>
            {event.venue}
          </CardText>
           <CardActions className="col-sm-12">
              <FlatButton label="Mas info" route="event/" linkButton={true}  href={"/#/event/"+event.tag}/>
          </CardActions>
        </Card>
        </div>
    );
  }
});
