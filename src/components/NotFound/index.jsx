import { Link } from "react-router";
import "./index.css";
import Error404 from "../../assets/images/Error404.png";
import Header from "../Header";

const NotFound = (props) => (
  <div className="not-found-bg-container">
    {props.user !== null && <Header />}
    <div className="not-found-container">
      <img src={Error404} alt="not found" className="not-found-img" />
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-button">
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
