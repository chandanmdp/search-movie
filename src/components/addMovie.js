import React, { Component } from 'react';
import '../App.css';

class AddMovie extends Component {


    addMovie(event){
      event.preventDefault();
      let Name = this.refs.name.value;
      let Year = this.refs.year.value;
      let Description = this.refs.description.value;
      if (Name !== '' && Year !== '' && Description !== ''){
        this.props.onAddMovie(Name,Year,Description);
        alert('movie added');
        this.refs.name.value= '';
        this.refs.year.value = '';
        this.refs.description.value = '';
      }else{
        alert('Please fill up all fields');
      }
    }

    render () {
      return (
        <li className = "new-movie">
          <div>
            <p className="text-danger text-center">No movies found.</p>
            <h4 className="text-info margin-left">Add a new movie</h4>
            <form onSubmit={this.addMovie.bind(this)} className="margin-left" >
              <label>Movie name :<input type="text" ref="name" placeholder="Name" className="form-control input-width" required/></label><br/>
              <label>Release year :<input type="number" ref="year" placeholder="Year" className="form-control input-width" required/></label><br />
              <label>Movie description :<textarea ref="description" placeholder="Write movie description" className="form-control" rows="4" cols="50" required/></label><br />
              <button type="submit">Add new movie</button>
          </form>
          </div>
        </li>

      )
    }
}

export default AddMovie ;
