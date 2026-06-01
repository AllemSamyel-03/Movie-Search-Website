import { Link } from "react-router";
import { use } from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import MovieContext from "../../context/MovieContext";
import "./index.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const fallbackPoster =
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80";

const MovieCard = (props) => {
  const { movieDetails } = props;
  const { toggleFavorite, isFavoriteMovie } = use(MovieContext);
  const { id, title, posterPath, voteAverage, releaseDate } = movieDetails;
  const posterUrl = posterPath
    ? `${imageBaseUrl}${posterPath}`
    : fallbackPoster;
  const isFavorite = isFavoriteMovie(id);

  const onClickFavorite = (event) => {
    event.preventDefault();
    toggleFavorite(movieDetails);
  };

  return (
    <li className="movie-card">
      <Link to={`/movies/${id}`} className="movie-link">
        <div className="poster-container">
          <img src={posterUrl} alt={title} className="movie-poster" />
          <button
            type="button"
            className={
              isFavorite ? "favorite-button active" : "favorite-button"
            }
            onClick={onClickFavorite}
            aria-label="favorite"
          >
            <FiHeart />
          </button>
        </div>
        <div className="movie-card-content">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-meta">
            <span className="rating">
              <FiStar /> {voteAverage ? voteAverage.toFixed(1) : "0.0"}
            </span>
            <span>{releaseDate ? releaseDate.slice(0, 4) : "NA"}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
