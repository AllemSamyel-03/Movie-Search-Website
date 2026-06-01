import React from "react";

const MovieContext = React.createContext({
  user: null,
  favoritesList: [],
  loginUser: () => {},
  signupUser: () => {},
  logoutUser: () => {},
  toggleFavorite: () => {},
  isFavoriteMovie: () => false,
});

export default MovieContext;
