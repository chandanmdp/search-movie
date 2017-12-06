import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class UpdateMovie extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {
        id: props.movie.id,
        name: props.movie.name,
        date: moment(props.movie.date+'T00:00:00.000Z'),
        description: props.movie.description
      },
      clicked: false
    };
  }

  componentWillMount() {
    this.setState({clicked:false});
  }

  handleNameChange = (event) => {
    this.setState(
      {
        movie: {
          name:event.target.value,
          date: this.state.movie.date,
          description: this.state.movie.description
        }
      }
    )
  }

  handleDescriptionChange = (event) => {
    this.setState(
      {
        movie: {
          name:this.state.movie.name,
          date: this.state.movie.date,
          description: event.target.value
        }
      }
    )
  }

  handleDateChange = (value) => {
    this.setState(
      {
        movie: {
          name:this.state.movie.name,
          date: value,
          description: this.state.movie.description
        }
      }
    )
  }

  updateMovie = (event) => {
    event.preventDefault();
    let year = (new Date(this.refs.dateRelease.input.value)).getFullYear();
    let month = (new Date(this.refs.dateRelease.input.value)).getMonth();
    month = month + 1;
    if(month < 10) {
      month = '0' + month;
    }
    let date = (new Date(this.refs.dateRelease.input.value)).getDate();
    if(date < 10) {
      date = '0' + date;
    }
    let id = this.props.movie.id;
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let releaseDate = year + '-' + month + '-' + date;
    if (name !== '' && description !== '' && releaseDate !== '') {
      this.props.onUpdate(id,name,releaseDate,description);
    }
  }

  handleClick = () => {
    this.setState({clicked:true});
  }

  render () {
    return (
      <div>
        <button className = {this.state.clicked === false? "btn btn-primary margin margin-left": "btn btn-primary margin margin-left hid"} onClick={this.handleClick}>Edit this movie</button>
        <div className = {this.state.clicked === false? "hid update-block": "update-block"}>
          <h4 className = "text-success text-center"><u>Edit Movie</u></h4>
          <form onSubmit = {this.updateMovie}>
            <label>Movie name :<input type = "text" ref = "name" placeholder = "Name" className = "form-control input-width" value = {this.state.movie.name} onChange = {this.handleNameChange} required/></label><br />
            <label>Date of release :<DatePicker selected = {this.state.movie.date} className = "form-control" ref = "dateRelease" onChange = {this.handleDateChange} required/></label><br />
            <label>Movie description :<textarea ref = "description" placeholder = "Write movie description" className = "form-control" rows = "4" cols = "50" value = {this.state.movie.description} onChange = {this.handleDescriptionChange} required/></label><br />
            <button type = "submit">Update</button>
          </form>
        </div>
      </div>

    )
  }
}

export default UpdateMovie ;
