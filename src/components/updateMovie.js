import React, { Component } from 'react';
import '../App.css';
import todayDate from './todayDate';

class UpdateMovie extends Component {
  constructor(props){
    super(props);
    this.state=
    {
      movie: {
        id: props.movie.id,
        name: props.movie.name,
        date: props.movie.date,
        description: props.movie.description
      },
      clicked: false
    };
  }

  componentWillMount(){
    this.setState({clicked:false});
  }

  handleNameChange = (event) => {
    this.setState(
      {
        movie:{
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
        movie:{
          name:this.state.movie.name,
          date: this.state.movie.date,
          description: event.target.value
        }
      }
    )
  }

  handleDateChange = (event) => {
    this.setState(
      {
        movie:{
          name:this.state.movie.name,
          date: event.target.value,
          description: this.state.movie.description
        }
      }
    )
  }

  updateMovie = (event) => {
    event.preventDefault();
    let id = this.props.movie.id;
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let releaseDate = this.refs.dateRelease.value;

    if (name !== '' && description !== '' && releaseDate !== ''){
      this.props.onUpdate(id,name,releaseDate,description);
      this.refs.name.value= '';
      this.refs.description.value = '';
      this.refs.dateRelease.value = '';
    }
  }

  handleClick = () => {
    this.setState({clicked:true});
  }

  render () {
    return (
      <div>
        <button className="btn btn-primary margin margin-left" onClick={this.handleClick}>Edit this movie</button>
        <div className={this.state.clicked===false? "hid update-block": "update-block"}>
          <h4 className="text-success text-center"><u>Edit Movie</u></h4>
          <form onSubmit={this.updateMovie}>
            <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" value={this.state.movie.name} onChange={this.handleNameChange} required/></label><br/>
            <label>Date Of Release :<input type="date" className="form-control" ref="dateRelease" value={this.state.movie.date}  max={todayDate()} onChange={this.handleDateChange} required /></label><br />
            <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" value={this.state.movie.description} onChange={this.handleDescriptionChange} required/></label><br />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>

    )
  }

}

export default UpdateMovie ;
