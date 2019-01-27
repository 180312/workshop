import React, { Component } from 'react';
import { getMovieList } from './api';
import './MovieList.css';
import Filter from './Filter';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filters: {
        title: '',
        description: '',
        director: '',
        producer: '',
      }
    };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  handleFilters = (key, event) => {
    const value = event.target.value;
    this.setState(({ filters }) => ({ filters: { ...filters, [key]: value } }))
  }

  filterMovies = () => {
    const { movies, filters } = this.state;
    const activeFilterKeys = Object.keys(filters).filter(key => filters[key] !== '');
    if (activeFilterKeys.length === 0) {
      return movies;
    }
    return movies.filter((movie) =>
      activeFilterKeys.every(key => movie[key].toLowerCase().includes(filters[key].toLowerCase()))
    )
  }

  render() {
    const { movies, filters } = this.state;
    const filteredMovies = this.filterMovies(movies);
    return (
      <div className="wrapper">
        <h1>Ghibli movies</h1>
        <table>
          <thead>
            <tr>
              <th><Filter placeholder="Filter by title" filterKey="title" value={filters.title} onChange={this.handleFilters} /></th>
              <th><Filter placeholder="Filter by description" filterKey="description" value={filters.description} onChange={this.handleFilters} /></th>
              <th><Filter placeholder="Filter by director" filterKey="director" value={filters.director} onChange={this.handleFilters} /></th>
              <th><Filter placeholder="Filter by producer" filterKey="producer" value={filters.producer} onChange={this.handleFilters} /></th>
              <th /><th />
            </tr>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Director</th>
              <th>Producer</th>
              <th>Release date</th>
              <th>Score (Rotten Tomatos)</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map(({ id, title, description, director, producer, release_date, rt_score }) => <tr key={id} >
              <td>{title}</td>
              <td>{description}</td>
              <td>{director}</td>
              <td>{producer}</td>
              <td className="number">{release_date}</td>
              <td className="number">{rt_score}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieList;
