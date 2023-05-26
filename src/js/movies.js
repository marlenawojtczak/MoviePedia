import { API_KEY } from './api-key';
import { getGenres } from './genres';
const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const moviesEL = document.querySelector('.movies-list');

async function fetchMovies() {
  try {
    const response = await fetch(`${trendingUrl}&api_key=${API_KEY}&page=1`);
    const data = await response.json();

    const movies = data.results;

    const genrePromises = movies.map(movie => getGenres(movie.id));
    const genres = await Promise.all(genrePromises);

    const markup = movies
      .map((movie, index) => {
        movie.genres = genres[index];
        return `<div class="movie__card">
        <a href="#"> <img class="movie__poster" src="https://image.tmdb.org/t/p/original${
          movie.poster_path
        }" /></a>
        <ul class="movie__short-descr">
          <li class="movie__title">${movie.original_title}</li>
          <li class="movie__genre">${movie.genres} | ${movie.release_date.slice(0, 4)}</li>
        </ul>
      </div>`;
      })
      .join('');

    moviesEL.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error(error);
  }
}

fetchMovies();

export { fetchMovies };
