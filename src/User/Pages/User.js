import React from "react";

import UserList from "../Components/UserList";

const User = (props) => {
  let users = [
    {
      id: 1,
      name: "Arafat",
      formCount: 5,
      image: "https://i.imgur.com/uzNZwwo.png",
    },
    {
      id: 2,
      name: "Hossain",
      formCount: 3,
      image: "https://i.imgur.com/uzNZwwo.png",
    },
  ];

  return <UserList users={users}/>;
};

export default User;
