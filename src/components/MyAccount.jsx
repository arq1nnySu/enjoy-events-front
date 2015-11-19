import React from 'react';
import MaterialComponent from './MaterialComponent';
import Assistances from './assistance/Assistances';
import PersonalData from './PersonalData';
import {Card, CardMedia, CardTitle, CardText, FlatButton, CardActions, CardHeader, Tabs, Tab} from  'material-ui';

export default MaterialComponent(class MyAccount extends React.Component {
  render() {
    return (
      <div  >
        <CardMedia overlay={<CardTitle title="My Account" subtitle=""/>}>
          <img className="header_section"/>
        </CardMedia>
        <div className="container">
          <CardActions style={{margin: "-120px auto auto auto"}} >
            <Tabs className="shadow" tabItemContainerStyle={{background:"white"}} >
              <Tab label="Personal data" style={{color:"rgb(255, 64, 129)"}}>
                <PersonalData style={{minHeight:"600px"}} />
              </Tab>
              <Tab label="Assistances" style={{color:"rgb(255, 64, 129)"}} >
                <Assistances style={{minHeight:"600px"}}/>
              </Tab>
            </Tabs>
          </CardActions>
        </div>
      </div>
    );
  }
});
