import React from 'react';
import ReactMixin from 'react-mixin';
import MaterialComponent from '../MaterialComponent';
import {TextField, RaisedButton, IconButton, Styles, Card, Snackbar, Dialog, 
  Avatar, List, ListItem} from  'material-ui';
import MinusImage from 'material-ui/lib/svg-icons/content/remove';
import PlusImage from 'material-ui/lib/svg-icons/content/add';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ActionNoteAdd from 'material-ui/lib/svg-icons/action/note-add';

const { Colors } = Styles;

class RequirementForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getModelState();
    this.state.minusDisabled = true 
    this.state.plusDisabled = false
  }

  getModelState(){
    return {
      data:{
        extra: {error:{message:{}}},
      },
      index: -1,
      name: '',
      quantity: 0
    }
  }

  setRequirementToEdit(req){
    this.state.name = req.name;
    this.state.quantity = req.quantity;
    this.state.index = this.props.requirements.indexOf(req);
    this.setState(this.state);
  }

  cleanRequirement(){
    this.setState(this.getModelState());
  }

  addRequirement(){
    if(this.isValidForm()){
      this.props.onAccept(this.state);
      this.cleanRequirement();
    }else{
      this.makeErrorMessage();
    }
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

  removeRequirement(req){
    this.props.onDelete(req);
  }

  editRequirement(req){
    this.setRequirementToEdit(req);
  }

  isValidForm(){
    return this.state.name != '';
  }

  makeErrorMessage(){
    this.state.data.extra.error.message.name = "Name needs to be defined";
    this.setState(this.state);
  }

  minusReq(){
    if(this.state.quantity > 0){
      this.state.quantity--
      this.state.plusDisabled = this.state.quantity >= 10
    }
    this.state.minusDisabled = this.state.quantity <= 0 
    this.setState(this.state)
  }

  plusReq(){
    if(this.state.quantity < 10){
      this.state.quantity++
      this.state.minusDisabled = false
    }
    this.state.plusDisabled = this.state.quantity >= 10
    this.setState(this.state)
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
              modal={true}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <div className="assistance">
              {this.getRequirementForm()}
              </div>
            </Dialog>
            <Snackbar ref="successBar" message="List of requirement to event successfully"/>
        </div>
      )
  }

  getAddRequirementsComponent() {
      return  <RaisedButton className="requirement_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="You want to add requirements?" onClick={this.getAddRequirement.bind(this)} />
  }

  getRequirementForm() {
    let rightIconMenu = (req) => {
      return  <IconMenu
                iconButtonElement={
                  <IconButton
                    touch={true}
                    tooltipPosition="bottom-left">
                    <MoreVertIcon color={Colors.grey400} />
                  </IconButton>
                }
                openDirection="bottom-left">
                <MenuItem primaryText="Edit" leftIcon={<ActionNoteAdd/>} onClick={()=>this.editRequirement(req)} />
                <MenuItem primaryText="Delete" leftIcon={<Delete/>} onClick={()=>this.removeRequirement(req)} />
              </IconMenu>
       }

    return  <ul id="additional_list">
              <div style={{padding:"5px"}}>
                <div className="card" >
                  <li className="ticket clearfix ">
                    <div className="col-xs-4">
                      <TextField floatingLabelText="Name" style={{width:"50%"}} errorText={this.state.data.extra.error.message.name} valueLink={this.linkState('name')} />
                      </div>
                    <div className="col-xs-6">
                      <div className="input-group" style={{"max-width":"95%"}}>
                        <span className="input-group-btn">
                          <button type="button" className="form-control btn btn-default btn-number minus" onClick={ e => this.minusReq()} disabled={this.state.minusDisabled}> 
                            <MinusImage/>
                          </button>
                        </span>
                        <input type="text" id="value_3" className="form-control input-number" value={this.state.quantity || 0} min="0" max="4"/>
                        <span className="input-group-btn">
                          <button type="button" className="form-control btn btn-default btn-number plus" onClick={e => this.plusReq()} disabled={this.state.plusDisabled}>
                            <PlusImage/>
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="col-xs-2 ticket-type">
                        <RaisedButton className="requirement_button" labelStyle={{"font-size":20}} style={{margin:10, width:"80%"}} backgroundColor={"#00e676"} labelColor={"white"} label="Add" onClick={this.addRequirement.bind(this)} />
                    </div>
                  </li>
                </div>
                <List subheader="List of Requirements" style={{width:"70%", margin: "0 auto"}} className="requirements">
                  {this.props.requirements.map(req => <ListItem className="card" primaryText={req.name} leftAvatar={<Avatar >{req.quantity}</Avatar>}  rightIconButton={rightIconMenu(req)} />)}
                </List>
              </div>
            </ul>
  }

};

ReactMixin(RequirementForm.prototype, React.addons.LinkedStateMixin);
export default MaterialComponent(RequirementForm)



