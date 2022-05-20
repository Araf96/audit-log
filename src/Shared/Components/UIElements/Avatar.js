import React from "react";

import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.avatarClass}`}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ height: props.height, width: props.width }}
        onClick={props.click}
      />
    </div>
  );
};

export default Avatar;
