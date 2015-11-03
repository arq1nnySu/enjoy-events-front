import React from 'react';
import MaterialComponent from './MaterialComponent';
import Time from 'react-time'
import {Card, CardMedia, CardTitle, CardText, FlatButton, CardActions, CardHeader, Avatar,
        ListItem, List, ContentInbox, ListDivider} from  'material-ui';

export default MaterialComponent(class AssistanceItem extends React.Component {
  render() {
    var assistance = this.props.assistance;
    var date = new Date(assistance.event.date)
    var requirements = <div/>

    if(assistance.requirements){

      requirements = 
        <List subheader="Requirements"> 
              {assistance.requirements.map(req => <ListItem primaryText={req.name}  rightAvatar={<Avatar >{req.quantity}</Avatar>}/> )} 
        </List>
    }

    return (
      <Card initiallyExpanded={false} className="col-md-8 col-md-offset-2">
        <CardHeader
          title={assistance.event.name}
          subtitle={<span>
              <Time value={date} format="YYYY/MM/DD" />
              {assistance.event.time}
              {assistance.event.venue}
          </span>}
          avatar={<Avatar src={assistance.event.image}/>}
          actAsExpander={true}
          showExpandableButton={true}>
        </CardHeader>
        <CardActions expandable={true}>
          {requirements}
        </CardActions>
      </Card>
    );
  }
});
