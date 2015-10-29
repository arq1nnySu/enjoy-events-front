import React from 'react';
import AssistanceItem  from './AssistanceItem';
import AuthenticatedComponent  from './AuthenticatedComponent';
import AssistanceStore from '../stores/AssistanceStore'
import AssistanceService from '../services/AssistanceService.js';
import {CardActions, Card, CardMedia, CardTitle} from 'material-ui';
import RouterContainer from '../services/RouterContainer';

import {Menu, MainButton, ChildButton} from 'react-mfb';

export default AuthenticatedComponent(class Assistances extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getAssistancesState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.assistances) {
      this.listAssistances();
    }

    AssistanceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AssistanceStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getAssistancesState());
  }

  listAssistances() {
    AssistanceService.allAssistances();
  }

  getAssistancesState() {
    return {
      assistances: AssistanceStore.assistances
    };
  }

  render() {
    var assistances = [];

    for (var key in this.state.assistances) {
      assistances.push(<AssistanceItem key={key} assistance={this.state.assistances[key]} />);
    }

    if(assistances.length <=0){
        assistances.push(
          <div style={{"text-align": "center"}}>
            <CardMedia overlay={<CardTitle title="No tienes asistencias"/>}>
              <img src="https://www.allaccess.com.ar/img/ico_purchase_no.png" style={{"max-width": "30%", "min-width":"30%"}}/>
            </CardMedia>
          </div>
        );
    }

    return (
    	<div className="login">
          {assistances}
      </div>
    );
  }

});
