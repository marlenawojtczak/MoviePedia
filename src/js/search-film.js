import { API_KEY } from './api-key';
import { getGenres } from './genres';
import { createPagination } from './pagination';
const resultContainer = document.querySelector('.result__container');
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.header__form');
  const input = document.querySelector('.form__input');

  const searchButton = document.querySelector('.form__button');

  form.addEventListener('submit', handleFormSubmit);
  searchButton.addEventListener('click', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    const searchTerm = input.value.trim();
    if (searchTerm !== '') {
      searchMovies(searchTerm);
    } else {
      resultContainer.innerHTML = '';
      fetchMovies();
    }
  }
});

async function searchMovies(searchTerm) {
  const apiKey = API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    searchTerm,
  )}`;

  (async () => {
    createPagination(url);
  })();
}

function displayMovies(results) {
  resultContainer.innerHTML = '';

  results.forEach(movie => {
    const movieCard = createMovieCard(movie);
    resultContainer.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie__card');

  const movieLink = document.createElement('a');
  movieLink.href = '#';

  const moviePoster = document.createElement('img');
  moviePoster.classList.add('movie__poster');
  moviePoster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  movieLink.appendChild(moviePoster);

  const movieShortDescr = document.createElement('ul');
  movieShortDescr.classList.add('movie__short-descr');

  const movieTitle = document.createElement('li');
  movieTitle.classList.add('movie__title');
  movieTitle.textContent = movie.original_title;
  movieShortDescr.appendChild(movieTitle);

  const movieGenre = document.createElement('li');
  movieGenre.classList.add('movie__genre');
  movieGenre.textContent = `${movie.genres} | ${movie.release_date.slice(0, 4)}`;
  movieShortDescr.appendChild(movieGenre);

  movieCard.appendChild(movieLink);
  movieCard.appendChild(movieShortDescr);

  return movieCard;
}
export { displayMovies };
