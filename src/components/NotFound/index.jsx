import { Link } from "react-router";
import { use } from "react";
import Header from "../Header";
import Footer from "../Footer";
import MovieContext from "../../context/MovieContext";
import "./index.css";
import Error404 from "../../assets/images/Error404.png";

const NotFoundContent = () => (
  <div className="not-found-container">
    <img src={Error404} alt="not found" className="not-found-img" />
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" className="primary-button">
      Go Home
    </Link>
  </div>
);

const NotFound = () => {
  const { user } = use(MovieContext);

  if (user === null) {
    return <NotFoundContent />;
  }

  return (
    <div className="page-container">
      <Header />
      <main className="not-found-main">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
