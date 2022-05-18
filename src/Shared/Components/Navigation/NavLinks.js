import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <div className="nav-box">
      <div className="nav-item">
        <NavLink
          to="/"
          exact
          className="link"
          activeClassName="active"
          style={{ textDecoration: "none" }}
        >
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          className="link"
          to="/addhistory"
          activeClassName="active"
          style={{ textDecoration: "none" }}
        >
          Add History
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/login"
          className="link"
          activeClassName="active"
          style={{ textDecoration: "none" }}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default NavLinks;
