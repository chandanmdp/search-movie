import React, { Component } from 'react';
import '../App.css';
import UpdateMovie from './updateMovie';

class ShowMovie extends Component {

  handleUpdate = (id,name,date,description) => {
    this.props.onUpdate(id,name,date,description);
  }

  btnClick = () => {
    this.props.clickButton();
  }

  render () {
    return (
      <div className = "block">
        <li className = "margin margin-left margin-right" >
          <span className = "back-link text-primary" onClick = {this.btnClick}>Back</span>
          <h2 className = "text-info">{this.props.movie.name}</h2>
          <p>{this.props.movie.description}</p>
          <span className = "text-info">Release Date: {this.props.movie.date}</span>
        </li>
      <UpdateMovie onUpdate = {this.handleUpdate} movie = {this.props.movie} />
      </div>
    )
  }
}

export default ShowMovie ;
