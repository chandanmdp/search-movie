import React, { Component } from 'react';
import '../App.css';

class SearchMovie extends Component {

  onSearch = () => {
    this.props.onSearchMovie();
  }

  updateSearchName = (event) => {
    this.props.updateName(event);
  }

  render () {
    return (
      <div className="text-center">
        <span className="text-biggest margin-right">Search movies :</span>
        <input type="text" className="search-box-1" placeholder="Movie name" value={this.props.search_name} onChange={this.updateSearchName} onClick={this.onSearch} />
      </div>
    )
  }
}

export default SearchMovie ;
