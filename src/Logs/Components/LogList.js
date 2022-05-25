import React from "react";

const LogList = (props)=> {
    return (
        <li>
            {props.description + " on " + new Date(props.date).toLocaleString()}
        </li>
    );
};

export default LogList;