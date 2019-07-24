import React, { Component } from 'react';

export default class Searcher extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Enter some letters of country's name and the desired population: </p>
        <form onSubmit={this.props.submit}>
          <label>
            Country Name:
            <input type="text" onChange={this.props.nameChange} />
          </label>
          <br />
          <label>
            Population:
            <input type="text" onChange={this.props.popChange} />
          </label>
          <br/>
          <input type="checkbox" onChange={this.props.capCheck} />
          Show capital info
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}