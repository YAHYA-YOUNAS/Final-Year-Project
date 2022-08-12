import React from "react";
import { Link } from "react-router-dom";
import images from "../Common Components/ImportImages";
import "./NotFound.css";

const NotFound = () => {
  document.body.style.background = "whitesmoke";
  return (
    <div className="not-found-section">
      <img src={images.not_found_image} alt="" className="not-found-img" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page you are looking for doesn't exist or you are accessing invalid
        or inaccessible route. Go back, or head over to &nbsp;
        <Link to="/" className="not-found-link">
          HomePage
        </Link>
        &nbsp; to choose a new direction.
      </p>
    </div>
  );
};

export default NotFound;
