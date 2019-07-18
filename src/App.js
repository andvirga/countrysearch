import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import CountryTable from './CountryTable';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      country: "",
      population: "",
      countryList: [],
      capitalInfo: false,
    }
  }

  handleChangeName = (event) => {
    this.setState({country: event.target.value});
  }

  handleChangePop = (event) => {
    this.setState({population: event.target.value});
  }

  handleCapitalCheck = (event) => {
    this.setState({capitalInfo: event.target.checked});  
  }

  handleSubmit = (event) => {
    axios.get('https://jsonmock.hackerrank.com/api/countries/search?name=' + this.state.country)
    .then((response) => this.getCountryList(response));
    event.preventDefault();
  }

  getCountryList = (results) => {
    var countries = [];
    var countriesData = results.data.data;
    for (var i = 0; i < countriesData.length; i++) {
        console.log(countriesData[i]);
        if (countriesData[i].population > this.state.population) {
          countries.push(countriesData[i]);
        }
    }
    this.setState({countryList: countries});
  }

  render() {
    return (
      <div className="App">
          <p>Enter some letters of country's name and the desired population: </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Country Name:
              <input type="text" value={this.state.country} onChange={this.handleChangeName} />
            </label>
            <br />
            <label>
              Population:
              <input type="text" value={this.state.population} onChange={this.handleChangePop} />
            </label>
            <br/ >
            <input type="checkbox" value={this.state.capitalInfo} onChange={this.handleCapitalCheck} />
            Show capital info
            <input type="submit" value="Submit" />
          </form>
          <CountryTable 
            countries={this.state.countryList} 
            capitalInfo={this.state.capitalInfo} 
          />
      </div>
    );
  }
}

export default App;
