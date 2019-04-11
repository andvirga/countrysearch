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
      countryList: []
    }
  }

  searchCountries = () => {
    var countryVal = document.getElementsByName("country").text;
    var populationVal = document.getElementsByName("population").text;
    this.setState({
      country: countryVal,
      population: populationVal
    });
    console.log(this.state.country);
    console.log(this.state.population);
  }

  handleChangeName = (event) => {
    this.setState({country: event.target.value});
  }

  handleChangePop = (event) => {
    this.setState({population: event.target.value});
  }

  handleSubmit = (event) => {
    console.log('Country submitted: ' + this.state.country);
    console.log('Population was submitted: ' + this.state.population);
    axios.get('https://jsonmock.hackerrank.com/api/countries/search?name=' + this.state.country)
    .then((response) => this.getCountryList(response));
    event.preventDefault();
  }

  getCountryList = (results) => {
    console.log(results.data.data);
    var countries = [];
    var countriesData = results.data.data;
    for (var i = 0; i < countriesData.length; i++) {
        console.log(countriesData[i]);
        if (countriesData[i].population > this.state.population) {
          countries.push(countriesData[i].name);
        }
    }
    console.log('Countries: ' + countries);
    console.log(typeof(countries));
    this.setState({countryList: countries});
  }

  render() {
    return (
      <div className="App">
          <form onSubmit={this.handleSubmit}>
            <label>
              Country:
              <input type="text" value={this.state.country} onChange={this.handleChangeName} />
            </label>
            <br />
            <label>
              Population:
              <input type="text" value={this.state.population} onChange={this.handleChangePop} />
            </label>
            <br/ >
            <input type="submit" value="Submit" />
          </form>
          <CountryTable countries={this.state.countryList}/>
      </div>

    );
  }
}

export default App;
