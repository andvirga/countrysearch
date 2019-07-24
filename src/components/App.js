import React, { Component } from 'react';
import axios from 'axios';
import CountryTable from './CountryTable';
import Searcher from './Searcher';
import '../styles/App.css';

export default class App extends Component {

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
        <Searcher 
          nameChange={this.handleChangeName}
          popChange={this.handleChangePop}
          capCheck={this.handleCapitalCheck}
          submit={this.handleSubmit}       
        />
        <CountryTable 
          countries={this.state.countryList} 
          capitalInfo={this.state.capitalInfo} 
        />
      </div>
    );
  }
}