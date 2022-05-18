import React, { useState } from "react";

import useWindowDimensions from "../../../hooks/window-dimension";
import Avatar from "../Elements/Avatar";
import NavLinks from "./NavLinks";
import BackDrop from "../Elements/BackDrop";
import SideDrawer from "../Elements/SideDrawer";

import "./Navigation.css";

const Navigation = (props) => {
  const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  const navDrawerOpenHandler = () => {
    setNavDrawerIsOpen((prevState) => !prevState);
  };

  const navDrawerCloseHandler = () => {
    setNavDrawerIsOpen(false);
  };
  const avatarHandler = () => {};

  return (
    <nav>
      <div className="logo">
        <Avatar
          image="https://i.imgur.com/GP7By3c.jpg"
          height="50px"
          width="50px"
          click={avatarHandler}
        ></Avatar>
      </div>
      {width < 670 && navDrawerIsOpen ? (
        <BackDrop onClick={navDrawerCloseHandler} />
      ) : null}
      {width < 670 ? (
        <SideDrawer show={navDrawerIsOpen} onClick={navDrawerCloseHandler}>
          <NavLinks />
        </SideDrawer>
      ) : (
        <NavLinks />
      )}
      <button className="nav-menu__button" onClick={navDrawerOpenHandler}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navigation;
