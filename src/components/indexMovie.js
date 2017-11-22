import React, { Component } from 'react';
import ShowMovie from './showMovie';
import AddMovie from './addMovie';
import SearchMovie from './searchMovie';
import MyJson from '../json/movies.json';

class IndexMovie extends Component {
  constructor(props){
    super(props);
    this.state={
      search_name: '',
      movies: MyJson.movies,
      movie: {
        id: 0,
        name: '',
        date: new Date(),
        description: ''
      },
      movies_list: false
    };
  }

  updateSearchName = (event) => {
    this.setState(
      {
        search_name: event.target.value
      }
    )
  }

  addMovie = (Name,Description,releaseDate) => {
    let Id = this.state.movies.length
    this.setState(
      {
        movies: this.state.movies.concat({id:Id+1,name:Name,date:releaseDate,description:Description}),
        search_name: ''
      }
    )
  }

  showThisMovie=(name)=> () => {
    let movies = this.state.movies;
    let found_movie = movies.findIndex(x => x.name === name)
    this.setState({
      movie: movies[found_movie],
      movies_list: true
    })
  }

  updateDetails = (Id,Name,ReleaseDate,Description) => {
    this.setState({
      movie:{
        id: Id,
        name: Name,
        date: ReleaseDate,
        description: Description
      }
    },function(){
      let id = this.state.movie.id;
      let copied_movies = this.state.movies;
      copied_movies[id-1] = this.state.movie;
      this.setState({
        movies: copied_movies,
        movies_list: false,
        search_name: ''
      })
    })
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
    let filteredMovieNames = this.state.movies.filter(
      (movie) => {
        var counter = 0;
        let movies_array = movie.name.split(' ');
        movies_array.map(item =>
          {
            if (item.toLowerCase().indexOf(this.state.search_name.toLowerCase()) === 0) {
              counter = 1;
            }
            return false;
          })
          if ( counter === 1)
          {
            return true;
          }else{
            return false;
          }
        }
      )

      if (filteredMovieNames.length > 0){
        var element =  filteredMovieNames.map((movie) => {
          return (
            <div className="block" key={movie.name}>
              <li className=" text-info text-center margin">
              <span className="text-bigger movie-link" onClick={this.showThisMovie(movie.name)}>{movie.name} </span><br/>
              <span>({(new Date(movie.date)).getFullYear()})</span>
              </li>
            </div>
          )
        })
      }
      else {
        element = <AddMovie onAddMovie={this.addMovie} clickButton={this.backButtonFromAddMovie}/>
      }

      if(this.state.movies_list !== false){
        element = <ShowMovie movie={this.state.movie} onUpdate={this.updateDetails} clickButton={this.backButton} />
      }

      return (
        <div>
          <div className="container-fluid">
            <div className="row bg-blue">
              <div className="col-sm-8 col-sm-offset-2">
                <SearchMovie search_name={this.state.search_name} onSearchMovie={this.onSearch} updateName={this.updateSearchName} />
              </div>
            </div>
            <div className="row margin">
              <div className="col-sm-6 col-sm-offset-3">
                <ul className="list-unstyled">
                  {element}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default IndexMovie;
