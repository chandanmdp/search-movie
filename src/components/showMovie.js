import React, { Component } from 'react';
import '../App.css';
import UpdateMovie from './updateMovie';

class ShowMovie extends Component {

  handleUpdate(id,Name,Year,Description){
    this.props.onUpdate(id,Name,Year,Description);
  }

  btnClick(){
    this.props.clickButton();
  }

  render () {
    return (
      <div className="block">
        <li className="margin margin-left margin-right" >
          <span className="back-link text-primary" onClick={this.btnClick.bind(this)}>Back</span><br/><br/>
          <h2 className="text-info">{this.props.movie.name}</h2>
          <p>{this.props.movie.description}</p>
          <span className= "text-info">Release Year: {this.props.movie.year}</span>
        </li>
      <UpdateMovie onUpdate={this.handleUpdate.bind(this)} movie={this.props.movie} />
      </div>
    )
  }
}

export default ShowMovie ;
