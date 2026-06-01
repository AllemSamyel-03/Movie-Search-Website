import { useState, use } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FiFilm } from "react-icons/fi";
import MovieContext from "../../context/MovieContext";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user, loginUser } = use(MovieContext);
  const navigate = useNavigate();

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  const onSubmitLogin = (event) => {
    event.preventDefault();
    const result = loginUser({ email, password });

    if (result.isSuccess) {
      navigate("/", { replace: true });
    } else {
      setErrorMsg(result.errorMsg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image-container">
        <div className="auth-overlay">
          <div className="auth-brand">
            <FiFilm className="auth-logo-icon" />
            <span>MovieHub</span>
          </div>
          <p className="auth-label">Premium movie discovery</p>
          <h1 className="auth-title">Find your next favorite movie night</h1>
          <p className="auth-description">
            Search trending titles, explore cinematic details, discover similar
            movies, and save every must-watch story in your personal watchlist.
          </p>
          <p className="auth-description auth-secondary-text">
            Login to continue your collection across Home, Favorites, and movie
            detail pages with a smooth streaming-style experience.
          </p>
        </div>
      </div>
      <form className="auth-form" onSubmit={onSubmitLogin}>
        <h1 className="form-heading">Login</h1>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="auth-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
          required
        />
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="auth-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          required
        />
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="primary-button auth-button">
          Login
        </button>
        <p className="switch-text">
          New user? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
