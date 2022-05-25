import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";

import Avatar from "../../Shared/Components/UIElements/Avatar";
import Card from "../../Shared/Components/UIElements/Card";

import "./UserDetails.css";

const UserDetails = (props) => {
  return (
    // <li className="user-detail">
    //   <NavLink to={`/sites/${props.id}`}>
    //       <Avatar
    //         image={props.image ? props.image : "https://i.imgur.com/uzNZwwo.png"}
    //         alt="https://i.imgur.com/uzNZwwo.png"
    //         height="50px"
    //         width="50px"
    //       ></Avatar>
    //     </NavLink>
    //     <div>
    //       <h2>{props.name}</h2>
    //       <h3>
    //         {props.formCount} {props.formCount === 1 ? "form" : "forms"}
    //       </h3>
    //     </div>

    // </li>
    <li className="user-detail">
      <Card className="user-detail__content">
        <NavLink to={`/sites/${props.id}`}>
          <div className="user-detail__image">
            <Avatar
              image={`https://i.imgur.com/uzNZwwo.png`}
              alt={props.name}
            />
          </div>
          <div className="user-detail__info">
            <h2>{props.firstName + " " + props.lastName}</h2>
          </div>
        </NavLink>
      </Card>
    </li>
  );
};

export default UserDetails;
