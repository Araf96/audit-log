import React from "react";

import UserDetails from "./UserDetails";

import "./UserList.css"

const UserList = (props) => {
  if (props.users.length == 0) {
    return <h2 className="center">No user found.</h2>;
  }

  return (
    <ul>
      {props.users.map((user) => (
        <UserDetails
          key={user.id}
          image={user.image}
          id={user.id}
          name={user.name}
          formCount = {user.formCount}
        />
      ))}
    </ul>
  );
};

export default UserList;
