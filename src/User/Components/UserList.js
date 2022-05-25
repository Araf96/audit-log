import React from "react";

import UserDetails from "./UserDetails";

import "./UserList.css"

const UserList = (props) => {
  console.log(props.users);
  if (props.users.length == 0) {
    return <h2 className="center">No user found.</h2>;
  }

  return (
    <div className="users-list">
      {props.users.map((user) => (
        <UserDetails
          key={user._id}
          image={user.image}
          id={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
      </div>
  );
};

export default UserList;
