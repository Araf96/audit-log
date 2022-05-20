import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <div className="nav-box">
      <div className="nav-item">
        <NavLink
          to="/"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/users"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Users
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          className="link"
          to="/addsite"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Add Site
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/login"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default NavLinks;
