import React, { Component } from 'react';
import '../App.css';
import todayDate from './todayDate';

class AddMovie extends Component {
  constructor(){
    super();
    this.state={
      dateOfRelease: '',
      clicked: false
    }
  }
  handleChange(event){
    this.setState(
      {
        dateOfRelease: event.target.value
      }
    )
  }

  addMovie(event){
    event.preventDefault();
    let Name = this.refs.name.value;
    let Year = this.refs.year.value;
    let Description = this.refs.description.value;
    let releaseDate = this.refs.dateOfRelease.value;
    if (Name !== '' && Year !== '' && Description !== '' && releaseDate !== ''){
      this.props.onAddMovie(Name,Year,Description,releaseDate);
      this.refs.name.value= '';
      this.refs.year.value = '';
      this.refs.description.value = '';
      this.refs.dateOfRelease.value = '';
    }
  }

  handleClick(){
    this.setState({clicked:true});
  }

  render () {
    return (
      <li className = "new-movie">
        <p className="text-danger text-center">No movies found.</p>
        <p className="margin-left">Do you want to add a new movie? </p>
        <button className="btn btn-primary margin margin-left btn-sm" onClick={this.handleClick.bind(this)}>Add new movie</button>
        <div className={this.state.clicked===false? "hid add-block": "add-block"}>
        <h4 className="text-info margin-left">Add a new movie</h4>
        <form onSubmit={this.addMovie.bind(this)} className="margin-left" >
          <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" required/></label><br/>
          <label>Release year :<input type="number" ref="year" placeholder="Year" className="form-control input-width" required/></label><br />
          <label>Date Of Release :<input type="date" className="form-control" ref="dateOfRelease" value={this.state.dateOfRelease}  max={todayDate()} onChange={this.handleChange.bind(this)} required /></label><br />
          <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" required/></label><br />
          <button type="submit">Add new movie</button>
        </form>
        </div>
      </li>
    )
  }
}

export default AddMovie ;
