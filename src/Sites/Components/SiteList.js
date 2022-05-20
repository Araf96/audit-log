import React from "react";

import SiteDetails from "./SiteDetails";

const SiteList = (props) => {
  if (props.sites.length === 0) {
    return <h2 className="center">No sites found.</h2>;
  }

  return (
    <ul>
      {props.sites.map((site) => (
        <SiteDetails
          key={site.id}
          id={site.id}
          name={site.name}
          region={site.region}
          description={site.description}
          latitude={site.latitude}
          longitude={site.longitude}
        />
      ))}
    </ul>
  );
};

export default SiteList;
