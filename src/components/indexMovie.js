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
      search_year: '',
      movies: MyJson.movies,
      movie: {
        id: 0,
        name: '',
        year: '',
        date: new Date(),
        description: ''
      },
      movies_list: false
    };
  }

  updateSearchName(event){
    this.setState(
      {
        search_name: event.target.value
      }
    )
  }

  updateSearchYear(event){
    this.setState(
      {
        search_year: event.target.value
      }
    )
  }

  addMovie(Name,Year,Description,releaseDate){
    let Id = this.state.movies.length
    this.setState(
      {
        movies: this.state.movies.concat({id:Id+1,name:Name,year:Year,date:releaseDate,description:Description}),
        search_name: '',
        search_year: ''
      }
    )
  }

  showThisMovie(name){
    let movies = this.state.movies;
    let found_movie = movies.findIndex(x => x.name === name)
    this.setState({
      movie: movies[found_movie],
      movies_list: true
    })
  }

  updateDetails(Id,Name,ReleaseDate,Year,Description){
    this.setState({
      movie:{
        id: Id,
        name: Name,
        year: Year,
        date: ReleaseDate,
        description: Description
      }
    },function(){
      let id = this.state.movie.id;
      let copied_movies = this.state.movies;
      copied_movies[id-1] = this.state.movie;
      this.setState({
        movies: copied_movies,
        movies_list: false
      })
    })
  }

  backButton(){
    this.setState({
      movies_list: false
    })
  }

  onSearch(){
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

      let filteredMovieYears = this.state.movies.filter(
        (movie) => {
          return movie.year.indexOf(this.state.search_year) === 0 ;
        }
      )

      let commonValues = filteredMovieNames.filter(function(value) {
        return filteredMovieYears.indexOf(value) > -1;
      });

      if (commonValues.length > 0){
        var element =  commonValues.map((movie) => {
          return (
            <div className="block" key={movie.name}>
              <li className="text-bigger text-info text-center margin" key={movie.name}>
              <span className="movie-link" onClick={this.showThisMovie.bind(this,movie.name)}>{movie.name} </span>
              </li>
            </div>
          )
        })
      }
      else {
        element = <AddMovie onAddMovie={this.addMovie.bind(this)} />
      }

      if(this.state.movies_list !== false){
        element = <ShowMovie movie={this.state.movie} onUpdate={this.updateDetails.bind(this)} clickButton={this.backButton.bind(this)} />
      }

      return (
        <div>
          <div className="bg-info">
            <div className="container">
              <SearchMovie search_name={this.state.search_name} search_year={this.state.search_year} onSearchMovie={this.onSearch.bind(this)} updateName={this.updateSearchName.bind(this)} updateYear={this.updateSearchYear.bind(this)} />
            </div>
          </div>
          <div className="container margin">
            <ul className="list-unstyled">
              {element}
            </ul>
          </div>
        </div>
      )
    }
  }

  export default IndexMovie;
