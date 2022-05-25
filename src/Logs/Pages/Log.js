import React from "react";

import LogList from "../Components/LogList";

const Log = (props) => {
  return (
    <ul>
      {props.logs.map((log) => {
        return <LogList key={log._id} description={log.logDescription} date={log.logTime} />;
      })}
    </ul>
  );
};

export default Log;
