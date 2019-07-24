import React, { Component } from 'react';
import axios from 'axios';
import CountryTable from './CountryTable';
import Searcher from './Searcher';
import Paginator from './Paginator';
import '../styles/App.css';

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      country: "",
      population: "",
      countryList: [],
      capitalInfo: false,
      currentPage: 0,
      resultsPerPage: 0,
      totalPages: 0,
      totalResults: 0
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

  handleGoToSpecificPage = (i) => {
    console.log('Go To page: ', i);
  }

  getCountryList = (results) => {
    console.log(results);
    var countries = [];
    var countriesData = results.data.data;
    for (var i = 0; i < countriesData.length; i++) {
        if (countriesData[i].population > this.state.population) {
          countries.push(countriesData[i]);
        }
    }
    this.setState({
      countryList: countries,
      currentPage: results.data.page,
      resultsPerPage: results.data.per_page,
      totalPages: results.data.total_pages,
      totalResults:results.data.total,
    });
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
        <Paginator
          currentPage={this.state.currentPage}
          resultsPerPage={this.state.resultsPerPage}
          totalPages={this.state.totalPages}
          totalResults={this.state.totalResults}
          goToPage={this.handleGoToSpecificPage} 
        />
      </div>
    );
  }
}