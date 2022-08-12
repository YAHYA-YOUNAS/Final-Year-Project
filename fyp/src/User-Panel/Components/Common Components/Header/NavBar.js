import React from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

function NavBar({ classes, loginState }) {
  return (
    <nav className={classes}>
      <NavLink className="nav-link" exact to="/" style={{ padding: "5px" }}>
        Home
      </NavLink>

      <NavHashLink
        className="nav-link"
        to="/#featured-section"
        activeClassName="selected"
        smooth
      >
        Featured
      </NavHashLink>

      <NavLink className="nav-link" to="/trending" style={{ padding: "5px" }}>
        Trending
      </NavLink>

      {loginState && (
        <NavLink
          className="nav-link"
          to="/recommendations"
          style={{ padding: "5px" }}
        >
          Recommended
        </NavLink>
      )}

      <NavHashLink
        className="nav-link"
        to="/#video-section"
        smooth
        activeClassName="selected"
      >
        Videos
      </NavHashLink>

      <NavLink className="nav-link" to="/about" style={{ padding: "5px" }}>
        About
      </NavLink>

      <NavLink className="nav-link" to="/contact" style={{ padding: "5px" }}>
        Contact
      </NavLink>
    </nav>
  );
}

export default NavBar;
