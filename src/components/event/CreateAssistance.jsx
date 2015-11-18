import React from 'react';
import MaterialComponent from '../MaterialComponent';
import {Card,RaisedButton, Snackbar, Dialog, Avatar, List, ListItem} from  'material-ui';
import AssistanceService from '../../services/AssistanceService.js';
import MinusImage from 'material-ui/lib/svg-icons/content/remove';
import PlusImage from 'material-ui/lib/svg-icons/content/add';

export default MaterialComponent(class CreateAssistance extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getModelState();
    if(this.state.event.requirementMissing){
      this.state.event.requirementMissing.forEach((req, idx) => {
        req.user = 0
        req.minusDisabled = true
        req.plusDisabled = false
      })
    }else{
      this.state.event.requirementMissing = []
    }
  }

  getModelState() {
    return {
      modal: true,
      event: this.props.event
    };
  }

  attending(){
    if (this.state.event.requirementMissing.length > 0){
      this.refs.requirementsDialog.show();
    }else{
      this.createAssistance()
    }
  }

  createAssistance(){
    let requirements = this.state.event.requirementMissing.map(req => {
      let requirement = {}
      requirement.name = req.name
      requirement.quantity = req.user
      return requirement
    })
    AssistanceService.createAssistance({event:this.state.event.tag, requirements:requirements}).then( resp => {
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
              actions={[<RaisedButton
                          label="Cancel"
                          secondary={true}
                          onTouchTap={this.closeDialog.bind(this)} />,
                        <RaisedButton
                          label="Confirm"
                          primary={true}
                          onTouchTap={this.finishButtonDialog.bind(this)} />]}
              modal={this.state.modal}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <div className="assistance">
              {this.getListRequirements()}
              </div>
            </Dialog>
            <Snackbar ref="successBar" message="Assistance to event successfully"/>
        </div>
      )
  }

  getListRequirements(){
    return <ul id="additional_list">
            {this.state.event.requirementMissing.map(req => 
              <div style={{padding:"5px"}}>
                <Card >
                  <li className="ticket clearfix ">
                    <div className="col-xs-12 col-sm-2 col-md-7 ticket-type"><strong>{req.name}</strong></div>
                      <div className="col-xs-8 col-sm-3 col-md-3">
                          <div className="input-group" style={{"max-width":"95%"}}>
                              <span className="input-group-btn">
                                  <button type="button" className="form-control btn btn-default btn-number minus" onClick={ e => this.minus(req)} disabled={req.minusDisabled}>
                                    <MinusImage/>
                                  </button>
                              </span>
                              <input type="text" id="value_3" style={{"min-width":"70px"}} className="form-control input-number" value={req.user || 0} min="0" max="4"/>
                              <span className="input-group-btn">
                                  <button type="button" className="form-control btn btn-default btn-number plus" onClick={e => this.plus(req)} disabled={req.plusDisabled}>
                                      <PlusImage/>
                                  </button>
                              </span>
                          </div>
                      </div>
                    </li>
                  </Card>
                </div>
              )}
            </ul>
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
                  <RaisedButton className="assistance_button" labelStyle={{"font-size":20}} style={{margin:10, width:"100%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Attending" onClick={this.attending.bind(this)} />
                </span>
      }
    }else{
        return <span className="col-xs-12 login_required"><h3>You have to login to attend the event.</h3></span>
    }
  }

  minus(req){
    if(req.user >0){
      req.user --
      req.plusDisabled = req.user >= req.quantity
    }
    req.minusDisabled = req.user <=0
    this.setState(this.state)
  }

  plus(req){
    if(req.user < req.quantity){
      req.user++
      req.minusDisabled = false
    }
    req.plusDisabled = req.user >= req.quantity
    this.setState(this.state)
  }

});
