import { useEffect, useState, use } from "react";
import { Link, useParams } from "react-router";
import { FiArrowLeft, FiHeart, FiPlay, FiStar } from "react-icons/fi";
import Header from "../Header";
import MovieList from "../MovieList";
import Footer from "../Footer";
import MovieContext from "../../context/MovieContext";
import "./index.css";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "756a476404aa04b320d81a7cc767a1d8";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
const fallbackPoster =
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80";

const formatMovieData = (eachMovie) => ({
  id: eachMovie.id,
  title: eachMovie.title,
  posterPath: eachMovie.poster_path,
  voteAverage: eachMovie.vote_average,
  releaseDate: eachMovie.release_date,
  overview: eachMovie.overview,
});

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { toggleFavorite, isFavoriteMovie } = use(MovieContext);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setErrorMsg("");

      const detailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
      const similarMoviesUrl = `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;
      const videosUrl = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
      const detailsResponse = await fetch(detailsUrl);
      const similarResponse = await fetch(similarMoviesUrl);
      const videosResponse = await fetch(videosUrl);

      if (detailsResponse.ok && similarResponse.ok) {
        const detailsData = await detailsResponse.json();
        const similarData = await similarResponse.json();
        setMovieDetails({
          id: detailsData.id,
          title: detailsData.title,
          posterPath: detailsData.poster_path,
          backdropPath: detailsData.backdrop_path,
          voteAverage: detailsData.vote_average,
          releaseDate: detailsData.release_date,
          overview: detailsData.overview,
          runtime: detailsData.runtime,
          genres: detailsData.genres || [],
        });
        setSimilarMoviesList(
          similarData.results.slice(0, 10).map(formatMovieData),
        );

        if (videosResponse.ok) {
          const videosData = await videosResponse.json();
          const trailerDetails = videosData.results.find(
            (eachVideo) =>
              eachVideo.site === "YouTube" && eachVideo.type === "Trailer",
          );
          setTrailerUrl(
            trailerDetails
              ? `https://www.youtube.com/watch?v=${trailerDetails.key}`
              : "",
          );
        } else {
          setTrailerUrl("");
        }
      } else {
        setErrorMsg("Unable to load movie details.");
      }
      setIsLoading(false);
    };

    getMovieDetails();
  }, [id]);

  const onClickFavorite = () => {
    toggleFavorite(
      formatMovieData({
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.posterPath,
        vote_average: movieDetails.voteAverage,
        release_date: movieDetails.releaseDate,
        overview: movieDetails.overview,
      }),
    );
  };

  const renderDetails = () => {
    if (isLoading) {
      return (
        <div className="loader-container details-loading-container">
          <div className="loader" />
          <p className="loading-text">Loading movie details...</p>
        </div>
      );
    }

    if (errorMsg !== "") {
      return (
        <div className="failure-container">
          <h1>Something went wrong</h1>
          <p>{errorMsg}</p>
          <Link to="/" className="primary-button">
            Go Home
          </Link>
        </div>
      );
    }

    const posterUrl = movieDetails.posterPath
      ? `${imageBaseUrl}${movieDetails.posterPath}`
      : fallbackPoster;
    const backdropUrl = movieDetails.backdropPath
      ? `${backdropBaseUrl}${movieDetails.backdropPath}`
      : fallbackPoster;
    const isFavorite = isFavoriteMovie(movieDetails.id);

    return (
      <>
        <section
          className="details-hero"
          style={{
            "--backdrop-image": `url(${backdropUrl})`,
          }}
        >
          <div className="details-inner-container">
            <img
              src={posterUrl}
              alt={movieDetails.title}
              className="details-poster"
            />
            <div className="details-content">
              <Link to="/" className="back-link">
                <FiArrowLeft /> Back
              </Link>
              <h1 className="details-title">{movieDetails.title}</h1>
              <div className="details-meta">
                <span className="rating-text">
                  <FiStar />{" "}
                  {movieDetails.voteAverage
                    ? movieDetails.voteAverage.toFixed(1)
                    : "0.0"}
                </span>
                <span>{movieDetails.releaseDate}</span>
                <span>{movieDetails.runtime} min</span>
              </div>
              <div className="genres-container">
                {movieDetails.genres.map((eachGenre) => (
                  <span key={eachGenre.id} className="genre-badge">
                    {eachGenre.name}
                  </span>
                ))}
              </div>
              <p className="details-overview">{movieDetails.overview}</p>
              <button
                type="button"
                className={isFavorite ? "primary-button" : "secondary-button"}
                onClick={onClickFavorite}
              >
                <FiHeart /> {isFavorite ? "Remove Favorite" : "Add Watchlist"}
              </button>
              {trailerUrl !== "" && (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="trailer-button"
                >
                  <FiPlay /> Watch Trailer
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="similar-section">
          <h1 className="section-heading">Similar Movies</h1>
          {similarMoviesList.length > 0 ? (
            <MovieList moviesList={similarMoviesList} />
          ) : (
            <p className="no-similar-text">No similar movies found.</p>
          )}
        </section>
      </>
    );
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content full-hero-content">{renderDetails()}</main>
      <Footer />
    </div>
  );
};

export default MovieDetails;
