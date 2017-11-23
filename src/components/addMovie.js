import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-datepicker/dist/react-datepicker.css';

class AddMovie extends Component {
  constructor(props){
    super(props);
    this.state={
      dateOfRelease: moment(),
      clicked: false,
      defaultMovieName: '',
      movieDescription: ''
    }
  }

  handleChange = (value) => {
    this.setState(
      {
        dateOfRelease: value
      }
    )
  }

  handleNameChange = (event) => {
    this.setState(
      {
        defaultMovieName: event.target.value
      }
    )
  }

  handleDescriptionChange = (event) => {
    this.setState(
      {
        movieDescription: event.target.value
      }
    )
  }

  addMovie = (event) => {
    event.preventDefault();
    let year = (new Date(event.target[1].value)).getFullYear();
    let month = (new Date(event.target[1].value)).getMonth();
    month = month + 1;
    if(month<10){
      month = '0'+month
    }
    let date = (new Date(event.target[1].value)).getDate();
    if(date<10){
      date='0'+date
    }
    let Name = this.refs.name.value;
    let Description = this.refs.description.value;
    let releaseDate = year +'-'+month +'-'+date;
    if (Name !== '' && Description !== '' && releaseDate !== ''){
      this.props.onAddMovie(Name,Description,releaseDate);
    }
  }

  handleClick = () => {
    this.setState(
      {
        clicked:true,
        defaultMovieName: this.props.searchName
      }
    );
  }

  btnClick = () => {
    if(this.state.defaultMovieName === '' && this.state.movieDescription === ''){
      this.props.clickButton();
    }else{
      confirmAlert({
      title: 'Movie not added',
      message: 'Do you want to leave ? ',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => {this.props.clickButton();},
    })
    }


  }

  render () {
    return (
      <li className = "new-movie">
        <span className="back-link text-primary margin-left" onClick={this.btnClick}>Back</span><br/>
        <p className="text-danger text-center">Your search did not match any movies.</p>
        <p className="margin-left">Do you want to add a new one? </p>
        <button className={this.state.clicked===false? "text-primary margin-left margin-right": "text-primary margin-left margin-right hid"} onClick={this.handleClick}>Add new movie</button>
        <div className={this.state.clicked===false? "hid add-block": "add-block"}>
          <h4 className="text-info">Add a new movie</h4>
          <form onSubmit={this.addMovie} >
            <label>Movie name :<input type="text" ref="name" className="form-control input-width" value = {this.state.defaultMovieName} onChange={this.handleNameChange} required/></label><br/>
            <label>Date of release :<DatePicker selected={this.state.dateOfRelease} ref="dateOfRelease" onChange={this.handleChange} className="form-control" required/></label>
            <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" onChange={this.handleDescriptionChange} required/></label><br />
            <button type="submit">Add new movie</button>
          </form>
        </div>
      </li>
    )
  }
}

export default AddMovie ;
