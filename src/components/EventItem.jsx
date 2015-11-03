import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Card, CardMedia, CardTitle, CardText, RaisedButton, CardActions} from  'material-ui';

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
            {event.venue.name}
          </CardText>
           <CardActions className="col-sm-12 event_item_button">
              <RaisedButton label="Mas info" route="event/" linkButton={true}  href={"/#/event/"+event.tag} secondary={true}/>
          </CardActions>
        </Card>
        </div>
    );
  }
});
