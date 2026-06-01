import { useState, use } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FiFilm } from "react-icons/fi";
import MovieContext from "../../context/MovieContext";
import "../Login/index.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user, signupUser } = use(MovieContext);
  const navigate = useNavigate();

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  const onSubmitSignup = (event) => {
    event.preventDefault();
    const result = signupUser({ name, email, password });

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
          <p className="auth-label">Start your watchlist</p>
          <h1 className="auth-title">Create your movie watchlist today</h1>
          <p className="auth-description">
            Sign up to save favorite movies, browse trending releases, and keep
            a simple watchlist ready whenever you want something great to watch.
          </p>
          <p className="auth-description auth-secondary-text">
            MovieHub keeps this beginner project simple with local storage auth,
            protected pages, and a clean streaming platform layout.
          </p>
        </div>
      </div>
      <form className="auth-form" onSubmit={onSubmitSignup}>
        <h1 className="form-heading">Signup</h1>
        <label className="input-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="auth-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter name"
          required
        />
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
          placeholder="Create password"
          required
        />
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="primary-button auth-button">
          Signup
        </button>
        <p className="switch-text">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
