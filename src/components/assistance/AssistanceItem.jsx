import React from 'react';
import MaterialComponent from '../MaterialComponent';
import Time from 'react-time'
import {Card, CardMedia, CardTitle, CardText, FlatButton, CardActions, CardHeader, Avatar,
        ListItem, List, ContentInbox, ListDivider, ClearFix} from  'material-ui';

export default MaterialComponent(class AssistanceItem extends React.Component {


  hasRequirement(){
    return this.props.assistance.requirements && this.props.assistance.requirements.length > 0
  }

  render() {
    var assistance = this.props.assistance;
    var date = new Date(assistance.event.date)
    var requirements = <div/>

    if(this.hasRequirement()){
      requirements = 
        <List subheader="Requirements"> 
              {assistance.requirements.map(req => <ListItem primaryText={req.name}  rightAvatar={<Avatar >{req.quantity}</Avatar>}/> )} 
        </List>
    }

    return (
      <ClearFix className="myaccount_assistance_container">
        <Card  initiallyExpanded={false} className="col-md-8 col-md-offset-2 myaccount_assistance">
          <CardHeader
            title={assistance.event.name}
            subtitle={<span>
                <strong>
                  <Time value={date} format="YYYY/MM/DD" /> {" "} 
                  {assistance.event.time} {" "}
                </strong>  
                {assistance.event.venue}
            </span>}
            avatar={<Avatar src={assistance.event.image}/>}
            actAsExpander={this.hasRequirement()}
            showExpandableButton={this.hasRequirement()}>
          </CardHeader>
          <CardActions expandable={this.hasRequirement()}>
            {requirements}
          </CardActions>
        </Card>
      </ClearFix>
    );
  }
});
