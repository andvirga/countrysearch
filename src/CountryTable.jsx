import React, { Component } from 'react';

class CountryTable extends Component {

    mapCountriesData = () => {
        console.log(this.props.capitalInfo);
        const list = this.props.countries.map((c) => {
            return (<div>
                        <li>{c.name}</li>
                        <p>Population: {c.population}</p>
                        {this.props.capitalInfo && <p>Capital: {c.capital}</p>}
                    </div>
                    )
        });

        return list;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.mapCountriesData()}
                </ul>
             </div>
        );
    }
}

export default CountryTable;