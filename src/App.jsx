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
  const storedFavorites = localStorage.getItem("movie_app_favorites");
  return storedFavorites !== null ? JSON.parse(storedFavorites) : [];
};

const App = () => {
  const [user, setUser] = useState(getStoredUser());
  const [favoritesList, setFavoritesList] = useState(getStoredFavorites());

  useEffect(() => {
    localStorage.setItem("movie_app_favorites", JSON.stringify(favoritesList));
  }, [favoritesList]);

  const signupUser = (userDetails) => {
    const usersList = JSON.parse(localStorage.getItem("movie_app_users")) || [];
    const isUserExists = usersList.some(
      (eachUser) => eachUser.email === userDetails.email,
    );

    if (isUserExists) {
      return { isSuccess: false, errorMsg: "User already exists" };
    }

    const updatedUsersList = [...usersList, userDetails];
    localStorage.setItem("movie_app_users", JSON.stringify(updatedUsersList));
    localStorage.setItem("movie_app_logged_user", JSON.stringify(userDetails));
    setUser(userDetails);
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
    return { isSuccess: true };
  };

  const logoutUser = () => {
    localStorage.removeItem("movie_app_logged_user");
    setUser(null);
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

  return (
    <MovieContext.Provider
      value={{
        user,
        favoritesList,
        loginUser,
        signupUser,
        logoutUser,
        toggleFavorite,
        isFavoriteMovie,
      }}
    >
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
          <Route path="*" element={<NotFound user={user} />} />
        </Routes>
      </HashRouter>
    </MovieContext.Provider>
  );
};

export default App;
