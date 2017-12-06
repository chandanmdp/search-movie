import React, { Component } from 'react';
import ShowMovie from './showMovie';
import AddMovie from './addMovie';
import SearchMovie from './searchMovie';
import MyJson from '../json/movies.json';

class IndexMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_name: '',
      movies: MyJson.movies,
      movie: {
        id: 0,
        name: '',
        date: new Date(),
        description: ''
      },
      movies_list: false,
      update_message: false,
      add_message: false
    };
  }

  updateSearchName = (event) => {
    this.setState(
      {
        search_name: event.target.value
      }
    )
  }

  addMovie = (name,description,date) => {
    let Id = this.state.movies.length
    this.setState(
      {
        movies: this.state.movies.concat({id:Id+1,name,date,description}),
        search_name: '',
        add_message: true
      }
    )
    window.setTimeout(() => {
      this.setState({
        add_message: false
      });
    }, 2000);
  }

  showThisMovie = (name) => () => {
    let movies = this.state.movies;
    let found_movie = movies.findIndex(x => x.name === name)
    this.setState({
      movie: movies[found_movie],
      movies_list: true
    })
  }

  updateDetails = (id,name,date,description) => {
    let Id = this.state.movie.id;
    let copied_movies = [...this.state.movies];
    copied_movies[Id-1] = {
      id,
      name,
      date,
      description
    }
    this.setState({
      movies: copied_movies,
      movies_list: false,
      search_name: '',
      update_message: true
    })
    window.setTimeout(() => {
      this.setState({
        update_message: false
      });
    }, 1000);
  }

  backButton = () => {
    this.setState({
      movies_list: false
    })
  }
  backButtonFromAddMovie = () => {
    this.setState({
      movies_list: false,
      search_name: ''
    })
  }

  onSearch = () => {
    this.setState({
      movies_list: false
    })
  }

  render () {
    let element, flash_message_element, filteredMovieNames;
    filteredMovieNames = this.state.movies.filter(
      (movie) => {
        let counter = 0;
        let movies_array = movie.name.split(' ');
        movies_array.map(item =>
          {
            if (item.toLowerCase().indexOf(this.state.search_name.toLowerCase()) === 0) {
              counter = 1;
            }
            return false;
          })
          if ( counter === 1 )
          {
            return true;
          }else{
            return false;
          }
        }
      )

      if (filteredMovieNames.length > 0){
         element = filteredMovieNames.map(movie => {
          return (
            <div className = "block" key = {movie.name}>
              <li className = " text-info text-center margin">
                <span className = "text-bigger movie-link" onClick = {this.showThisMovie(movie.name)}>{movie.name} </span><br />
                <span>({(new Date(movie.date)).getFullYear()})</span>
              </li>
            </div>
          )
        })
      }
      else {
        element = <AddMovie onAddMovie = {this.addMovie} clickButton = {this.backButtonFromAddMovie} searchName = {this.state.search_name} />
      }

      if(this.state.movies_list !== false){
        element = <ShowMovie movie = {this.state.movie} onUpdate = {this.updateDetails} clickButton = {this.backButton} />
      }

      if (this.state.add_message === true){
        flash_message_element = <div className="flash-message-block bg-success text-center"><span>Movie added successfully</span></div>
      }else if (this.state.update_message === true){
         flash_message_element = <div className="flash-message-block bg-success text-center"><span>Movie updated successfully</span></div>
      }

      return (
          <div className = "container-fluid">
            <div className = "row bg-blue">
              <div className = "col-sm-8 col-sm-offset-2">
                <SearchMovie search_name = {this.state.search_name} onSearchMovie = {this.onSearch} updateName = {this.updateSearchName} />
              </div>
            </div>
            {flash_message_element}
            <div className = "row margin">
              <div className = "col-sm-6 col-sm-offset-3">
                <ul className = "list-unstyled">
                  {element}
                </ul>
              </div>
            </div>
          </div>
      )
    }
  }

  export default IndexMovie;
