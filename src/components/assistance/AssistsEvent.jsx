import React from 'react';
import MaterialComponent from '../MaterialComponent';
import {Card,CardMedia,CardTitle,CardText,RefreshIndicator,IconButton,RaisedButton,
Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn} from  'material-ui';
import EventStore from '../../stores/EventStore'
import EventActions from '../../actions/EventActions'
import EventService from '../../services/EventService.js'
import AssistanceService from '../../services/AssistanceService.js';
import RedirectAuthenticatedComponent  from '../RedirectAuthenticatedComponent';

class AssistsEvent extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = this.getEventState();
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getEventState())
    this.checkAssists()
  }

  getEvent() {
    EventService.getEvent(this.props.params.event);
  }

  getEventState() {
    if(EventStore.event){
      this.checkAssists()
      return {
        event: EventStore.event,
      }
    }else{
      this.getEvent()
      return {event:{}}
    }
  }

  checkAssists(){
    if(!EventStore.event.assists){
      AssistanceService.assistsEvent(EventStore.event.tag)
    }
  }

  render() {
    if(this.state.event.tag){
      return (
          <div >
            <Card >
               <CardMedia  overlay={<CardTitle title={this.state.event.name}/>}>
                 <div className="event-header" style={{"background":"url('"+this.state.event.image+"') no-repeat center center; background-size:cover;"}}/>
              </CardMedia>
              <CardTitle/>
              <div className="col-sm-12 card" >
                <Table
                  fixedHeader={true}
                  fixedFooter={false}
                  selectable={true}
                  multiSelectable={true}>
                  <TableHeader enableSelectAll={true} >
                    <TableRow>
                      <TableHeaderColumn colSpan="3" tooltip='Assistances' style={{textAlign: 'center'}}>
                        Assistances
                      </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                      <TableHeaderColumn tooltip='User'>User</TableHeaderColumn>
                      {this.state.event.requirement.map((req) =>{return <TableHeaderColumn tooltip={req.name}>{req.name}</TableHeaderColumn>})}
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    deselectOnClickaway={true}
                    showRowHover={true}
                    stripedRows={true}>
                             <TableRow>
                              <TableRowColumn>sdfsdfsd</TableRowColumn>
                            </TableRow>
                      {(this.state.event.assists||[]).map((assist) =>{return <TableRow><TableRowColumn>{assist.user}</TableRowColumn>{assist.requirements.map((req) =>{return <TableRowColumn >{req.quantity}</TableRowColumn>})}}</TableRow>})}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        )
      }else{
        return (
        <div className="centered">
          <RefreshIndicator size={100} left={400} top={200} status="loading" />
        </div>
      )
    }
  }

  getTableContent(){
    if(this.state.event.assists){
      return this.state.event.assists.map((assist) =>{
        return 
            <TableRow>
              <TableRowColumn>{assist.user}</TableRowColumn>
            </TableRow>
      })
    }else{
      return (
        <div className="centered">
          <RefreshIndicator size={100} left={400} top={200} status="loading" />
        </div>
      )
    }
  }

};
export default MaterialComponent(AssistsEvent)