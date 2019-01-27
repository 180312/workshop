import React, { Component } from 'react';
import { getMovieList } from './api';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Ghibli movies</h1>
        <div>
          {movies.map(({ id, title }) => <div key={id} >{title}</div>)}
        </div>
      </div>
    )
  }
}

export default MovieList;
