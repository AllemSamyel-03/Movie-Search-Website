import { Link } from "react-router";
import { FiFilm, FiMail, FiPhone } from "react-icons/fi";
import "./index.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <Link to="/" className="footer-logo" onClick={scrollToTop}>
          <FiFilm />
          MovieHub
        </Link>
        <div className="footer-contact">
          <p>
            <FiMail /> moviehub@gmail.com
          </p>
          <p>
            <FiPhone /> +91 98765 43210
          </p>
        </div>
        <div className="footer-links">
          <Link to="/" onClick={scrollToTop}>
            Home
          </Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
      <p className="copyright">Copyright 2026 MovieHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
