import React, { Component } from 'react';
import '../App.css';

class SearchMovie extends Component {

  onSearch(){
    this.props.onSearchMovie();
  }

  updateSearchName(event){
    this.props.updateName(event);
  }

  updateSearchYear(event){
    this.props.updateYear(event);
  }
  render () {
    return (
      <div className="text-center">
        <span className="text-biggest margin-right">Search movies :</span>
        <input type="text" className="search-box-1 margin-right" placeholder="Movie name" value={this.props.search_name} onChange={this.updateSearchName.bind(this)} onClick={this.onSearch.bind(this)} />
        <input type="text" className="search-box-2" placeholder="Release year" value={this.props.search_year} onChange={this.updateSearchYear.bind(this)} onClick={this.onSearch.bind(this)}/>
      </div>
    )
  }
}

export default SearchMovie ;
