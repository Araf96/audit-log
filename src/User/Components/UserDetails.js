import React from "react";
import { NavLink } from "react-router-dom";

const UserDetails = (props) => {
  return (
    <li>
      <NavLink to={`/${props.id}/sites`}>
        <div>
          <img
            src={props.image ? props.image : "https://i.imgur.com/uzNZwwo.png"}
            alt="https://i.imgur.com/uzNZwwo.png"
          ></img>
        </div>
        </NavLink>
        <div>
          <h2>{props.name}</h2>
          <h3>
            {props.formCount} {props.formCount === 1 ? "form" : "forms"}
          </h3>
        </div>

    </li>
  );
};

export default UserDetails;
