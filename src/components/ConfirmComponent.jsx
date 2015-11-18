import React from 'react';
import MaterialComponent from './MaterialComponent';
import {Dialog, RaisedButton} from  'material-ui';

export default class ConfirmComponent extends React.Component {

 constructor(props) {
    super(props);
    this.state = {show: false}
  }

  open(callback){
    if(callback){
      this.props.onAccept = callback
    }
    this.refs.dialog.show()
  }

  close() {
    this.refs.dialog.dismiss()
  }

  accept(){
    this.props.onAccept()
    this.close()
  }

  render() {
    let customActions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.close.bind(this)} />,
      <RaisedButton
        label="Submit"
        secondary={true}
        onTouchTap={this.accept.bind(this)} />
    ];
    return (
     <Dialog
        ref="dialog"
        title={this.props.title}
        actions={customActions}
        actionFocus="submit"
        isOpen={true}
        onRequestClose={this._handleRequestClose}/>
    );
  }
};
