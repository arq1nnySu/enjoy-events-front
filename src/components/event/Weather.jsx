import React from 'react';
import MaterialComponent from '../MaterialComponent';
import WeatherService from '../../services/WeatherService.js';
import moment  from 'moment';

export default MaterialComponent(class WeatherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {event:this.props.event};
    this.loadWeather()
  }


  loadWeather(){
    WeatherService.weatherFor(this.state.event.tag).then(response => {
        response.event = this.state.event
        this.setState(response)
    })
  }

  render() {
    if(this.state.data){
      return <div className="col-xs-6 location">
              <span className="col-xs-12 temp_detail"><div>{moment(this.state.event.date +" "+this.state.event.time).format("dddd, MMMM Do YYYY, h:mm a")}</div></span>
              <span className="col-xs-6">
                <img src={"http://openweathermap.org/img/w/" + this.state.weather.icon + ".png"} style={{width:"70px"}}/>
              </span>
              <div className="col-xs-3">
                <span className="temperature_symbol">°C.</span>
                <span className="temperature">{this.state.data.temperature} </span>
              </div>
              <p className="col-xs-12 temp_detail">{this.state.weather.description}</p>
              <p className="col-xs-12 temp_detail">Humidity: {this.state.data.humidity}%.</p>
              <p className="col-xs-12 temp_detail">Pressure: {this.state.data.pressure}%.</p>
              <p className="col-xs-12 temp_detail">Wind: {this.state.data.wind} km/h.</p>
            </div> 
    }else{
      return <div className="col-xs-6 location">
              <span className="col-xs-12 temp_detail"><div>{moment(this.state.event.date +" "+this.state.event.time).format("dddd, MMMM Do YYYY, h:mm a")}</div></span>
              <span className="temp_detail forecast" style={{display:"inline-block"}}><h1>Forecast not available</h1></span>
            </div> 
    }
  }

});
