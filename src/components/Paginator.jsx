import React, { Component } from 'react';

export default class Paginator extends Component {

  renderPaginator = () => {
    var paginator = [];
    for(var i = 1; i < this.props.totalPages; i++) {
      var page = this.props.currentPage !== i ? 
        <button onClick={console.log('CLICKED')}>{i}</button> : 
        <button disabled='disabled'>{i}</button>;
      paginator.push(page);
    }
    return paginator;
  }
  
  render() {
    return (
      <div>
        {this.renderPaginator()}
      </div>
    );
  }
}