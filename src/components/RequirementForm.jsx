import React from 'react';
import ReactMixin from 'react-mixin';
import MaterialComponent from './MaterialComponent';
import {TextField, RaisedButton, Snackbar, Dialog, Avatar, List, ListItem} from  'material-ui';
import MinusImage from 'material-ui/lib/svg-icons/content/remove';
import PlusImage from 'material-ui/lib/svg-icons/content/add';
import {MainButton} from 'react-mfb';


class RequirementForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getModelState();
  }

  getModelState(){
    return {
      modal: true,
      name: '',
      quantity: ''
    }
  }

  cleanRequirement(){
    this.setState(this.getModelState())
  }

  addRequirement(){
    this.props.onAccept(this.state);
    this.cleanRequirement();
  }

  closeDialog(){
    this.refs.addRequirementDialog.dismiss();
    this.cleanRequirement();
  }

  finishButtonDialog(){
   this.closeDialog(); 
  }

  getAddRequirement(){
    this.refs.addRequirementDialog.show();
  }

  render() {
      return (
        <div className="addon clearfix" style={{"text-align": "center"}}>
            {this.getAddRequirementsComponent()}
            <Dialog
              ref="addRequirementDialog"
              title="Requirements"
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
              <div style={{height: '1000px'}} className="listRequirement">
              {this.getRequirementForm()}
              </div>
            </Dialog>
            <Snackbar ref="successBar" message="List of requirement to event successfully"/>
        </div>
      )
  }

  getAddRequirementsComponent() {
      return  <RaisedButton className="requirement_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Add" onClick={this.getAddRequirement.bind(this)} />
  }

  getRequirementForm() {
    return  <div style={{padding:"5px"}}>
              <TextField floatingLabelText="Name" style={{width:"100%"}} valueLink={this.linkState('name')} />
              <TextField floatingLabelText="Quantity" style={{width:"100%"}} valueLink={this.linkState('quantity')} />
              <RaisedButton className="requirement_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Add" onClick={this.addRequirement.bind(this)} />
            <List subheader="Requirements">
              {this.props.requirements.map(req => <ListItem primaryText={req.name}  rightAvatar={<Avatar >{req.quantity}</Avatar>}/>)}
            </List>
            </div>
            
  }
  
};

ReactMixin(RequirementForm.prototype, React.addons.LinkedStateMixin);
export default MaterialComponent(RequirementForm)



