import React, { Component } from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "6818c8e871447f9fe08578407bf0e40c";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;// corresponding to name attr. and then value
     
    if ( city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
      const data = await api_call.json();
      if ( data.main ) {
        this.setState({
          temperature: Math.floor((data.main.temp - 32) * 5%9)+" °C",
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,    
          description: data.weather[0].description,
          error: undefined
        });
      } else {
        this.setState({
          error: "Please enter a valid Value"
        });
      };
    } else {
      this.setState({
        error: "Please enter a Value"
      });
    }
  };

  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather 
                    temperature = {this.state.temperature}
                    city = {this.state.city}
                    country = {this.state.country}
                    humidity = {this.state.humidity}
                    description = {this.state.description} 
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default App;