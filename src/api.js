const get = url => fetch(url).then(response => response.json());

export const getMovieList = () => get('https://ghibliapi.herokuapp.com/films');
