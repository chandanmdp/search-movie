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
  handleChange = (event) => {
    this.setState(
      {
        dateOfRelease: event.target.value
      }
    )
  }

  addMovie = (event) => {
    event.preventDefault();
    let Name = this.refs.name.value;
    let Description = this.refs.description.value;
    let releaseDate = this.refs.dateOfRelease.value;
    if (Name !== '' && Description !== '' && releaseDate !== ''){
      this.props.onAddMovie(Name,Description,releaseDate);
      this.refs.name.value= '';
      this.refs.description.value = '';
      this.refs.dateOfRelease.value = '';
    }
  }

  handleClick = () => {
    this.setState({clicked:true});
  }

  btnClick = () => {
    this.props.clickButton();
  }

  render () {
    return (
      <li className = "new-movie">
        <span className="back-link text-primary margin-left" onClick={this.btnClick}>Back</span><br/>
        <p className="text-danger text-center">Your search did not match any movies.</p>
        <p className="margin-left">Do you want to add a new one? </p>
        <button className="text-primary margin-left margin-right" onClick={this.handleClick}>Add new movie</button>
        <div className={this.state.clicked===false? "hid add-block": "add-block"}>
          <h4 className="text-info">Add a new movie</h4>
          <form onSubmit={this.addMovie} >
            <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" required/></label><br/>
            <label>Date Of Release :<input type="date" className="form-control" ref="dateOfRelease" value={this.state.dateOfRelease}  max={todayDate()} onChange={this.handleChange} required /></label><br />
            <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" required/></label><br />
            <button type="submit">Add new movie</button>
          </form>
        </div>
      </li>
    )
  }
}

export default AddMovie ;
