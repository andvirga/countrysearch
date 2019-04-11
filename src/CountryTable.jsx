import React, { Component } from 'react';

class CountryTable extends Component {
    constructor(props)  {
        super(props);
    }

    render() {
        const list = this.props.countries.map(function(name) {
            return (<li>{name}</li>)
        });
        return (
            <div>
                <ul>
                    {list}
                </ul>
             </div>
        );
    }
}

export default CountryTable;