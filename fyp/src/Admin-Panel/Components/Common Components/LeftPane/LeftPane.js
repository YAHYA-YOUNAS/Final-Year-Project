import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftPane.css";

export default function LeftPane({ path }) {
  return (
    <div className="left-pane">
      <div className="panel-title">
        <h3>Admin Panel</h3>
      </div>
      <hr />
      <h4>Navigation</h4>
      <nav className="admin-navigation">
        <NavLink className="admin-nav" to={`${path}/dashboard`}>
          <i className="fa fa-tachometer" aria-hidden="true" />
          &nbsp; Dashboard
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/users`}>
          <i className="fa fa-user-o" aria-hidden="true" />
          &nbsp; Users
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/contactsSection`}>
          <i className="fa fa-phone" aria-hidden="true" />
          &nbsp; Contacts
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/feedbacksSection`}>
          <i className="fa fa-comments-o" aria-hidden="true" />
          &nbsp; Feedbacks
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/homeSection`}>
          <i className="fa fa-home" aria-hidden="true" />
          &nbsp; Home Section
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/aboutSection`}>
          <i className="fa fa-info-circle" aria-hidden="true" />
          &nbsp; About Section
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/trendingSection`}>
          <i className="fa fa-line-chart" aria-hidden="true" />
          &nbsp; Trending Section
        </NavLink>

        <NavLink className="admin-nav" to={`${path}/sentimentalStatistics`}>
          <i className="fa fa-bar-chart" aria-hidden="true" />
          &nbsp; Sentimental Statistics
        </NavLink>
      </nav>
    </div>
  );
}
