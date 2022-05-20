import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

import Modal from "../../Shared/Components/UIElements/Modal";
import Button from "../../Shared/Components/ActionElements/Button";

const SiteDetails = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const detailOpenHandler = () => setShowDetails(true);

  const detailCloseHandler = () => setShowDetails(false);

  const deleteSiteOpenHandler = () => setShowDeleteWarning(true);

  const deleteSiteCloseHandler = () => setShowDeleteWarning(false);

  const deleteSiteHandler = () =>{
    deleteSiteCloseHandler();
    console.log("Deleting...");
  }

  const detailsModalFooter = (
    <React.Fragment>
      <NavLink to={`/updateSite/${props.id}`}>
        <Button inverse>Edit</Button>
      </NavLink>

      <Button danger onClick={detailCloseHandler}>
        Close
      </Button>
    </React.Fragment>
  );

  const deleteModalFooter = (
    <React.Fragment>
      <Button danger onClick={deleteSiteHandler}>
        YES
      </Button>

      <Button inverse onClick={deleteSiteCloseHandler}>
        NO
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Modal
        show={showDetails}
        onCancel={detailCloseHandler}
        header="Site Details"
        footer={detailsModalFooter}
        contentClass="site-details__modal-content"
        footerClass="site-details__actions"
      >
        <div>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <div>MAP</div>
        </div>
      </Modal>
      <Modal
        show={showDeleteWarning}
        onCancel={deleteSiteCloseHandler}
        header="Are you sure?"
        footer={deleteModalFooter}
        contentClass="site-details__modal-content"
        footerClass="site-details__actions"
      >
        <p>You're about to delete a site. Are you sure you want to proceed?</p>
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
            <Button danger onClick={deleteSiteOpenHandler}>
              Delete
            </Button>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default SiteDetails;
