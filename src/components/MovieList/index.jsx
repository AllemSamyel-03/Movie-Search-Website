import MovieCard from "../MovieCard";
import "./index.css";

const MovieList = (props) => {
  const { moviesList } = props;

  return (
    <ul className="movies-list">
      {moviesList.map((eachMovie) => (
        <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
