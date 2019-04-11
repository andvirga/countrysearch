import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      country: "",
      population: "",
      countryList: ""
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
    .then((response) => this.printResults(response));
    event.preventDefault();
  }

  printResults = (results) => {
    console.log(JSON.stringify(results.data.data));
    // const countries = results.data.data.keys('name');
    // for (const c in countries) {
    //   console.log(c);
    // }
    
    this.setState({countryList: JSON.stringify(results.data.data)});
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
          <p id="CountryList" className="consolelog"> {this.state.countryList} </p>
      </div>

    );
  }
}

export default App;
