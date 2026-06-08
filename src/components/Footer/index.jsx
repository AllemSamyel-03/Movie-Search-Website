import { Link, useLocation } from "react-router";
import { FiFilm, FiMail, FiPhone } from "react-icons/fi";
import "./index.css";

const Footer = () => {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const homeLinkClassName = pathname === "/" ? "footer-active-link" : undefined;
  const favoritesLinkClassName =
    pathname === "/favorites" ? "footer-active-link" : undefined;

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <Link to="/" className="footer-logo" onClick={scrollToTop}>
          <FiFilm />
          MovieHub
        </Link>
        <div className="footer-links">
          <h1 className="footer-column-heading">Quick Links</h1>
          <Link to="/" onClick={scrollToTop} className={homeLinkClassName}>
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={scrollToTop}
            className={favoritesLinkClassName}
          >
            Favorites
          </Link>
        </div>
        <div className="footer-contact">
          <h1 className="footer-column-heading">Contact</h1>
          <p>
            <FiMail className="mail-icon" /> moviehub@gmail.com
          </p>
          <p>
            <FiPhone className="phone-icon" /> +91 99999 99999
          </p>
        </div>
      </div>
      <p className="copyright">Copyright 2026 MovieHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
