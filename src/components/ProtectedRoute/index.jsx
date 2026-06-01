import { Navigate } from "react-router";
import { use } from "react";
import MovieContext from "../../context/MovieContext";

const ProtectedRoute = ({ children }) => {
  const { user } = use(MovieContext);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
