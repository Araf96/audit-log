import React from "react";
import { useParams } from "react-router-dom";

import SiteList from "../Components/SiteList";

const Sites = (props) => {
  const userid = useParams().userid;

  let siteList = [
    {
      id: 1,
      name: "Hospital site",
      region: "Dhaka, Bangladesh",
      description: "A place to build a hospital",
      longitude: 100.0,
      latitude: 100.0,
      userid: 1,
    },
    {
      id: 2,
      name: "Power plant site",
      region: "Barisal, Bangladesh",
      description: "A place to build a power plant",
      longitude: 200.0,
      latitude: 100.0,
      userid: 2,
    },
  ];

  if (userid) {
    siteList = siteList.filter((site) => site.userid == userid);
  }

  return <SiteList sites={siteList} />;
};

export default Sites;
