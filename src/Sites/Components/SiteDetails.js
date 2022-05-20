import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Modal from "../../Shared/Components/UIElements/Modal";
import Button from "../../Shared/Components/ActionElements/Button";

const SiteDetails = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const detailOpenHandler = () => setShowDetails(true);

  const detailCloseHandler = () => setShowDetails(false);

  const footer = (
    <React.Fragment>
      <NavLink to={`/updateSite/${props.id}`}>
        <Button inverse>Edit</Button>
      </NavLink>

      <Button danger onClick={detailCloseHandler}>
        Close
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Modal
        show={showDetails}
        onCancel={detailCloseHandler}
        header="Site Details"
        footer={footer}
        contentClass="site-details__modal-content"
        footerClass="site-details__actions"
      >
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <div>MAP</div>
        </div>
      </Modal>
      <li>
        <div>
          <div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
          </div>
          <div>
            <Button onClick={detailOpenHandler}>Details</Button>
            <NavLink to={`/updateSite/${props.id}`}>
              <Button inverse>Edit</Button>
            </NavLink>
            <Button danger>Delete</Button>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default SiteDetails;
