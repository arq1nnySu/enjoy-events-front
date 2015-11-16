import React from 'react';
import MaterialComponent from '../MaterialComponent';
import {RaisedButton} from  'material-ui';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';

export default MaterialComponent(class Venue extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.event;
  }

  render() {
    var mapLink = "https://www.google.com/maps/dir/Current+Location/"+this.state.venue.street+","+this.state.venue.city+","+this.state.venue.country;
    var mapImage = "https://maps.googleapis.com/maps/api/staticmap?center="+this.state.venue.street+","+this.state.venue.city+","+this.state.venue.country+"&zoom=15&size=450x200&maptype=roadmap"
    return (
      <div>
        <div className="col-xs-12 location">
          {this.state.venue.name}
          <strong>{this.state.venue.street + ", "+ this.state.venue.city}</strong>
          <img src={mapImage}/>
        </div>
        <div style={{"text-align": "center"}} className="col-xs-12">
          <RaisedButton label="How to arrive to event" secondary={true} linkButton={true} href={mapLink} target="_blank" style={{margin:10, width:"100%"}} labelStyle={{"font-size":20}}>
            <MapsPlace style={this.getButtonIcon()} />
          </RaisedButton>
        </div>
      </div>
    )
  }

  getButtonIcon() {
    return {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px'
      }
    }
});
