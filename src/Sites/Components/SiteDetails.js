import React, { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";

import Modal from "../../Shared/Components/UIElements/Modal";
import Button from "../../Shared/Components/ActionElements/Button";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";
import { useModal } from "../../hooks/modal-hook";
import { AuthContext } from "../../Context/authCTX";


const SiteDetails = (props) => {
  const auth = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const detailOpenHandler = () => setShowDetails(true);

  const detailCloseHandler = () => setShowDetails(false);

  const deleteSiteOpenHandler = () => setShowDeleteWarning(true);

  const deleteSiteCloseHandler = () => setShowDeleteWarning(false);

  const deleteSiteHandler = async () =>{
    try{
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:3001/api/sites/${props.id}`, {headers: {'x-auth': auth.uToken}});
      if(response.status === 200){
        modalOpenHandler("Site was deleted successfully", "SUCCESS");
        props.onDelete(props.id);
      }else{
        throw new Error();
      }
      
    }catch(e){
      var message = "";
      if (e.response) {
        if (!e.response.data) {
          message = e.message || "Something went wrong.";
        } else {
          message = e.response.data.message || "Something went wrong.";
        }
      } else {
        message = "Something went wrong.";
      }
      setIsLoading(false);
      modalOpenHandler(message, "ERROR");
    }

    deleteSiteCloseHandler();
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
      <Modal
        show={modal.isOpen}
        header={modal.type == "ERROR" ? "ERROR" : "SUCCESS"}
        footer={
          <Button danger={modal.type == "ERROR" ? true: false} onClick={modalCloseHandler}>CLOSE</Button>
        }
      >
        <p>{modal.message}</p>
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
