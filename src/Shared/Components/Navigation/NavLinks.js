import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../Context/authCTX";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div className="nav-box">
      {auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && (
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
      )}
      {auth.isLoggedIn && (
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
      )}
      <div className="nav-item">
          <NavLink
            to="/about"
            className="link"
            activeclassname="active"
            style={{ textDecoration: "none" }}
          >
            About
          </NavLink>
        </div>
      {auth.isLoggedIn && (
        <div className="nav-item">
          <button className="link-button"
            onClick={auth.logout}
          >
            Logout
          </button>
        </div>
      )}
      {!auth.isLoggedIn && (
        <div className="nav-item">
          <NavLink
            to="/signup"
            className="link"
            activeclassname="active"
            style={{ textDecoration: "none" }}
          >
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
