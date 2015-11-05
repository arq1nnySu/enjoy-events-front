import React from 'react';
import MaterialComponent from '../MaterialComponent';
import {RaisedButton, Snackbar, Dialog, FlatButton, Avatar, List, ListItem} from  'material-ui';
import AssistanceService from '../../services/AssistanceService.js';

export default MaterialComponent(class CreateAssistance extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getModelState();
  }

  getModelState() {
    return {
      modal: true,
      event: this.props.event,
      requirement : []
    };
  }

  attending(){
    if (this.state.event.requirement.length > 0){
      this.refs.requirementsDialog.show();
    }else{
      this.createAssistance()
    }
  }

  createAssistance(){
    AssistanceService.createAssistance({event:this.state.event.tag, requirement:this.state.requirement}).then( resp => {
      this.state.event.hasAssistance = true
      this.setState(this.state)
      this.refs.successBar.show()
    });
  }

  closeDialog(){
    this.refs.requirementsDialog.dismiss();
  }

  finishButtonDialog(){
   this.closeDialog(); 
   this.createAssistance()
  }


  render() {
      return (
        <div className="addon clearfix" style={{"text-align": "center"}}>
            {this.getAssistanceComponent()}
            <Dialog
              ref="requirementsDialog"
              title="You want help with the Requirements???"
              actions={[<FlatButton
                          key={1}
                          label="Cancel"
                          secondary={true}
                          onTouchTap={this.closeDialog.bind(this)} />,
                        <FlatButton
                          key={2}
                          label="Finish"
                          primary={true}
                          onTouchTap={this.finishButtonDialog.bind(this)} />]}
              modal={this.state.modal}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <div style={{height: '1000px'}}>
              {this.getListRequirements()}
              </div>
            </Dialog>
            <Snackbar ref="successBar" message="Assistance to event successfully"/>
        </div>
      )
  }

  incrementAmountRequirement(requirement){
    // if (requirement.quantity < this.state.event.getRequirement_by_name(requirement.name).quantity){
    //   requirement.quantity =  requirement.quantity + 1; 
    // }
    3
  }

  decrementAmountRequirement(requirement){
    // if (requirement.quantity > 0 & requirement.quantity =< this.state.event.getRequirement_by_name(requirement.name).quantity){
    //   requirement.quantity =  requirement.quantity - 1; 
    // }
    3
  }


  getListRequirements(){
    return <List subheader="Requirements">
        {this.state.event.requirement.map(req => 
          <ListItem primaryText={req.name}  rightAvatar={<Avatar >{req.quantity}</Avatar>} >
            <RaisedButton className="requirement_amount_minor" labelStyle={{"font-size":5}} style={{margin:10, width:"20%"}} backgroundColor={"#00e676"} labelColor={"white"} label="-" onClick={this.decrementAmountRequirement(req)} /> 
            <RaisedButton className="requirement_amount_major" labelStyle={{"font-size":5}} style={{margin:10, width:"20%"}} backgroundColor={"#00e676"} labelColor={"white"} label="-" onClick={this.incrementAmountRequirement(req)} /> 
          </ListItem> 
        )}
    </List>
  }

  getAssistanceComponent(){
    if(this.props.userLoggedIn){
      if(this.state.event.hasAssistance){
        return <div>
                <span className="col-xs-4"><img src="https://www.allaccess.com.ar/img/ico_purchase_ok.png" style={{"max-width": "100%", "min-width":"100%"}}/></span>
                <span className="col-xs-8 assistance_event"><h1>You have an assistance for this event.</h1></span>  
              </div>
      }else{
        return <span className="col-xs-12">
                  <RaisedButton className="assistance_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Attending" onClick={this.attending.bind(this)} />
                </span>
      }
    }else{
        return <span className="col-xs-12 login_required"><h3>You have to login to attend the event.</h3></span>
    }
  }

});
