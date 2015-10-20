import React from 'react';
import MaterialComponent from './MaterialComponent';
import Assistances from './Assistances';
import {Card, CardMedia, CardTitle, CardText, FlatButton, CardActions, CardHeader, Tabs, Tab} from  'material-ui';

export default MaterialComponent(class MyAccount extends React.Component {
  render() {
    return (
      <Card initiallyExpanded={false} >
        <CardMedia overlay={<CardTitle title="My Account" subtitle=""/>}>
          <img src="http://salesportalweb-pre-cpty69a8sw.elasticbeanstalk.com/img/static_header.jpg"/>
        </CardMedia>
        <div className="container">
          <CardActions style={{margin: "-120px auto auto auto"}} >
            <Tabs className="shadow" tabItemContainerStyle={{background:"white"}} >
              <Tab label="Personal data" style={{color:"rgb(255, 64, 129)"}}/>
              <Tab label="Assistances" style={{color:"rgb(255, 64, 129)"}} >
                <Assistances style={{minHeight:"600px"}}/>
              </Tab>
            </Tabs>
          </CardActions>
        </div>
      </Card>
    );
  }
});
