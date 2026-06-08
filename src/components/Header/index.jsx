import { Link, useLocation, useNavigate } from "react-router";
import { use } from "react";
import { FiFilm, FiHeart, FiHome, FiLogOut } from "react-icons/fi";
import MovieContext from "../../context/MovieContext";
import "./index.css";

const Header = () => {
  const { user, logoutUser, favoritesList } = use(MovieContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const onClickLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const homeLinkClassName =
    pathname === "/" ? "nav-link active-nav-link" : "nav-link";
  const favoritesLinkClassName =
    pathname === "/favorites" ? "nav-link active-nav-link" : "nav-link";

  return (
    <nav className="nav-header">
      <Link to="/" className="app-logo" onClick={scrollToTop}>
        <FiFilm className="logo-icon" />
        MovieHub
      </Link>
      <div className="nav-right-section">
        <div className="nav-links-container">
          <Link to="/" className={homeLinkClassName} onClick={scrollToTop}>
            <FiHome />
            <span>Home</span>
          </Link>
          <Link
            to="/favorites"
            className={favoritesLinkClassName}
            onClick={scrollToTop}
          >
            <FiHeart />
            <span>Favorites</span>
            <span className="favorites-nav-count">{favoritesList.length}</span>
          </Link>
        </div>
        <div className="profile-container">
          <p className="user-name">{user?.name}</p>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
