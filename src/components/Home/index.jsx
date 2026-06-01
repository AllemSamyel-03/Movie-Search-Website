import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Header from "../Header";
import MovieList from "../MovieList";
import Footer from "../Footer";
import "./index.css";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "756a476404aa04b320d81a7cc767a1d8";

const heroPosterImages = [
  "https://image.tmdb.org/t/p/w342/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/w342/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "https://image.tmdb.org/t/p/w342/rTh4K5uw9HypmpGslcKd4QfHl93.jpg",
  "https://image.tmdb.org/t/p/w342/5weKu49pzJCt06OPpjvT80efnQj.jpg",
  "https://image.tmdb.org/t/p/w342/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  "https://image.tmdb.org/t/p/w342/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
  "https://image.tmdb.org/t/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  "https://image.tmdb.org/t/p/w342/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
  "https://image.tmdb.org/t/p/w342/A7YPhQKdcr6XB1kCUdS4tHifYWd.jpg",
  "https://image.tmdb.org/t/p/w342/wToO8opxkGwKgSfJ1JK8tGvkG6U.jpg",
  "https://image.tmdb.org/t/p/w342/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
  "https://image.tmdb.org/t/p/w342/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
  "https://image.tmdb.org/t/p/w342/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
  "https://image.tmdb.org/t/p/w342/2lUYbD2C3XSuwqMUbDVDQuz9mqz.jpg",
];

const formatMovieData = (eachMovie) => ({
  id: eachMovie.id,
  title: eachMovie.title,
  posterPath: eachMovie.poster_path,
  voteAverage: eachMovie.vote_average,
  releaseDate: eachMovie.release_date,
  overview: eachMovie.overview,
});

const Home = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeGenreId, setActiveGenreId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getGenres = async () => {
    const genresUrl = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(genresUrl);
    const data = await response.json();
    setGenresList(data.genres || []);
  };

  const getTrendingMovies = async () => {
    setIsLoading(true);
    setErrorMsg("");
    const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
    const response = await fetch(trendingUrl);

    if (response.ok) {
      const data = await response.json();
      const formattedData = data.results.map(formatMovieData);
      setMoviesList(formattedData);
    } else {
      setErrorMsg("Unable to load movies. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getGenres();
    getTrendingMovies();
  }, []);

  const onSubmitSearch = async (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") {
      getTrendingMovies();
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchInput}`;
    const response = await fetch(searchUrl);

    if (response.ok) {
      const data = await response.json();
      const formattedData = data.results.map(formatMovieData);
      setMoviesList(formattedData);
    } else {
      setErrorMsg("Search failed. Please try again.");
    }
    setIsLoading(false);
  };

  const getGenreMovies = async (genreId) => {
    setActiveGenreId(genreId);
    setSearchInput("");

    if (genreId === "") {
      getTrendingMovies();
      return;
    }

    setIsLoading(true);
    const genreUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    const response = await fetch(genreUrl);
    const data = await response.json();
    setMoviesList(data.results.map(formatMovieData));
    setIsLoading(false);
  };

  const renderMovies = () => {
    if (isLoading) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      );
    }

    if (errorMsg !== "") {
      return (
        <div className="failure-container">
          <h1>Something went wrong</h1>
          <p>{errorMsg}</p>
          <button
            type="button"
            className="primary-button"
            onClick={getTrendingMovies}
          >
            Retry
          </button>
        </div>
      );
    }

    if (moviesList.length === 0) {
      return (
        <div className="empty-container">
          <h1>No movies found</h1>
          <p>Try another search keyword.</p>
        </div>
      );
    }

    return <MovieList moviesList={moviesList} />;
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content full-hero-content">
        <section className="hero-section">
          <div className="hero-poster-wall">
            {heroPosterImages.map((eachImage) => (
              <img key={eachImage} src={eachImage} alt="movie poster" />
            ))}
          </div>
          <div className="hero-content">
            <p className="hero-label">TMDB Movie Search</p>
            <h1 className="hero-heading">
              Search movies and build your watchlist
            </h1>
            <p className="hero-description">
              Browse trending movies, filter by genre, open rich movie details,
              and discover similar titles in one clean place. Explore popular
              releases, save the stories you love, and come back anytime for
              your next movie night.
            </p>
            <p className="hero-extra-text">
              <strong>
                Action, drama, comedy, thriller, romance, adventure,
              </strong>
              and more are ready with simple search and quick watchlist saving.
            </p>
            <a href="#formSection" className="anchor">
              Search Movies
            </a>
          </div>
        </section>
        <div id="formSection" className="search-movies"></div>

        <section className="controls-section content-section">
          <form className="search-form" onSubmit={onSubmitSearch}>
            <FiSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search movies"
            />
            <button type="submit" className="primary-button">
              Search
            </button>
          </form>
          <select
            className="genre-select"
            value={activeGenreId}
            onChange={(event) => getGenreMovies(event.target.value)}
          >
            <option value="">All Genres</option>
            {genresList.map((eachGenre) => (
              <option key={eachGenre.id} value={eachGenre.id}>
                {eachGenre.name}
              </option>
            ))}
          </select>
        </section>

        <h1 className="searching-heading">
          {searchInput === ""
            ? "Trending Movies"
            : `Search Results for "${searchInput}"`}
        </h1>
        <div className="content-section">{renderMovies()}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
