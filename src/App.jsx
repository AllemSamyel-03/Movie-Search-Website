import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import MovieContext from "./context/MovieContext";
import "./App.css";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("movie_app_logged_user");
  return storedUser !== null ? JSON.parse(storedUser) : null;
};

const getStoredFavorites = () => {
  const storedUser = getStoredUser();

  if (storedUser === null) {
    return [];
  }

  const storedFavoritesMap = localStorage.getItem("movie_app_user_favorites");
  const favoritesMap =
    storedFavoritesMap !== null ? JSON.parse(storedFavoritesMap) : {};

  return favoritesMap[storedUser.email] || [];
};

const App = () => {
  const [user, setUser] = useState(getStoredUser());
  const [favoritesList, setFavoritesList] = useState(getStoredFavorites());

  useEffect(() => {
    if (user !== null) {
      const storedFavoritesMap = localStorage.getItem(
        "movie_app_user_favorites",
      );
      const favoritesMap =
        storedFavoritesMap !== null ? JSON.parse(storedFavoritesMap) : {};
      const updatedFavoritesMap = {
        ...favoritesMap,
        [user.email]: favoritesList,
      };
      localStorage.setItem(
        "movie_app_user_favorites",
        JSON.stringify(updatedFavoritesMap),
      );
    }
  }, [favoritesList, user]);

  const signupUser = (userDetails) => {
    const usersList = JSON.parse(localStorage.getItem("movie_app_users")) || [];
    const isUserExists = usersList.some(
      (eachUser) => eachUser.email === userDetails.email,
    );

    if (isUserExists) {
      return { isSuccess: false, errorMsg: "User already exists" };
    }

    const updatedUsersList = [...usersList, userDetails];
    const storedFavoritesMap = localStorage.getItem("movie_app_user_favorites");
    const favoritesMap =
      storedFavoritesMap !== null ? JSON.parse(storedFavoritesMap) : {};
    const updatedFavoritesMap = { ...favoritesMap, [userDetails.email]: [] };
    localStorage.setItem("movie_app_users", JSON.stringify(updatedUsersList));
    localStorage.setItem(
      "movie_app_user_favorites",
      JSON.stringify(updatedFavoritesMap),
    );
    localStorage.setItem("movie_app_logged_user", JSON.stringify(userDetails));
    setUser(userDetails);
    setFavoritesList([]);
    return { isSuccess: true };
  };

  const loginUser = (userDetails) => {
    const usersList = JSON.parse(localStorage.getItem("movie_app_users")) || [];
    const matchedUser = usersList.find(
      (eachUser) =>
        eachUser.email === userDetails.email &&
        eachUser.password === userDetails.password,
    );

    if (matchedUser === undefined) {
      return { isSuccess: false, errorMsg: "Invalid email or password" };
    }

    localStorage.setItem("movie_app_logged_user", JSON.stringify(matchedUser));
    setUser(matchedUser);
    const storedFavoritesMap = localStorage.getItem("movie_app_user_favorites");
    const favoritesMap =
      storedFavoritesMap !== null ? JSON.parse(storedFavoritesMap) : {};
    setFavoritesList(favoritesMap[matchedUser.email] || []);
    return { isSuccess: true };
  };

  const logoutUser = () => {
    if (user !== null) {
      const storedFavoritesMap = localStorage.getItem(
        "movie_app_user_favorites",
      );
      const favoritesMap =
        storedFavoritesMap !== null ? JSON.parse(storedFavoritesMap) : {};
      const updatedFavoritesMap = {
        ...favoritesMap,
        [user.email]: favoritesList,
      };
      localStorage.setItem(
        "movie_app_user_favorites",
        JSON.stringify(updatedFavoritesMap),
      );
    }
    localStorage.removeItem("movie_app_logged_user");
    setUser(null);
    setFavoritesList([]);
  };

  const toggleFavorite = (movieDetails) => {
    const isMovieFavorite = favoritesList.some(
      (eachMovie) => eachMovie.id === movieDetails.id,
    );

    if (isMovieFavorite) {
      setFavoritesList((prevList) =>
        prevList.filter((eachMovie) => eachMovie.id !== movieDetails.id),
      );
    } else {
      setFavoritesList((prevList) => [...prevList, movieDetails]);
    }
  };

  const isFavoriteMovie = (movieId) =>
    favoritesList.some((eachMovie) => eachMovie.id === movieId);

  const contextvalue = {
    user,
    favoritesList,
    loginUser,
    signupUser,
    logoutUser,
    toggleFavorite,
    isFavoriteMovie,
  };

  return (
    <MovieContext.Provider value={contextvalue}>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </MovieContext.Provider>
  );
};

export default App;
