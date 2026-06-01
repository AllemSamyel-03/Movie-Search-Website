import { use } from "react";
import Header from "../Header";
import MovieList from "../MovieList";
import Footer from "../Footer";
import MovieContext from "../../context/MovieContext";
import "./index.css";

const Favorites = () => {
  const { favoritesList } = use(MovieContext);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="favorites-header">
          <h1 className="section-heading">Favorites Watchlist</h1>
          <p className="favorites-count">{favoritesList.length} saved</p>
        </div>
        {favoritesList.length > 0 ? (
          <MovieList moviesList={favoritesList} />
        ) : (
          <div className="empty-container">
            <h1>No favorites yet</h1>
            <p>
              Add movies to your watchlist from the home page or details page.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
