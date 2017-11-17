import React, { Component } from 'react';
import '../App.css';

class UpdateMovie extends Component {
  constructor(props){
    super(props);
    this.state=
      {
        movie: {
          id: props.movie.id,
          name: props.movie.name,
          year: props.movie.year,
          description: props.movie.description
      },
      clicked: false
    };
  }
  componentWillMount(){
    this.setState({clicked:false});
  }

  handleNameChange(event){
    this.setState(
      {
        movie:{
          name:event.target.value,
          year: this.state.movie.year,
          description: this.state.movie.description
        }
      }
    )
  }
  handleYearChange(event){
    this.setState(
      {
        movie:{
          name:this.state.movie.name,
          year: event.target.value,
          description: this.state.movie.description
        }
      }
    )
  }

  handleDescriptionChange(event){
    this.setState(
      {
        movie:{
          name:this.state.movie.name,
          year: this.state.movie.year,
          description: event.target.value
        }
      }
    )
  }

  updateMovie(event){
    event.preventDefault();
    let id = this.props.movie.id;
    let Name = this.refs.name.value;
    let Year = this.refs.year.value;
    let Description = this.refs.description.value;
    if (Name !== '' && Year !== '' && Description !== ''){
      this.props.onUpdate(id,Name,Year,Description);
      this.refs.name.value= '';
      this.refs.year.value = '';
      this.refs.description.value = '';
    }else{
      alert('Please fill up all fields');
    }
  }

  handleClick(){
    this.setState({clicked:true});
  }

  render () {
    return (
      <div>
        <button className="btn btn-primary margin margin-left" onClick={this.handleClick.bind(this)}>Edit Movie</button>
        <div className={this.state.clicked===false? "hid": ""}>
          <div className="update-block">
            <h4 className="text-success text-center margin-left"><u>Edit Movie</u></h4>
            <form onSubmit={this.updateMovie.bind(this)} className="margin-left" >
              <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" value={this.state.movie.name} onChange={this.handleNameChange.bind(this)} required/></label><br/>
              <label>Release year :<input type="number" ref="year" placeholder="Year" className="form-control input-width" value={this.state.movie.year} onChange={this.handleYearChange.bind(this)} required/></label><br />
              <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" value={this.state.movie.description} onChange={this.handleDescriptionChange.bind(this)} required/></label><br />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>

    )
  }

}

export default UpdateMovie ;
