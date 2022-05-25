import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SiteList from "../Components/SiteList";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";
import { AuthContext } from "../../Context/authCTX";
import { useModal } from "../../hooks/modal-hook";
import Modal from "../../Shared/Components/UIElements/Modal";
import Button from "../../Shared/Components/ActionElements/Button";

const Sites = (props) => {
  const userid = useParams().userid;

  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();
  const auth = useContext(AuthContext);

  const reqFunction = useCallback(async () => {
    try {
      var url = `${process.env.REACT_APP_SERVER_URL}/sites`;
      
      if(userid){
        var url = `${process.env.REACT_APP_SERVER_URL}/sites/${userid}`;
      }

      const response = await axios.get(url, {
        headers: { "x-auth": auth.uToken },
      });
      setSites(response.data.sites);
      setIsLoading(false);
    } catch (e) {
      var message = "";
      if (e.response) {
        if (!e.response.data) {
          message = e.message || "Something went wrong.";
        } else {
          message = e.response.data.message || "Something went wrong.";
        }
        if (e.response.status !== 404) {
          modalOpenHandler(message, "ERROR");
        }
      } else {
        message = "Something went wrong.";
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reqFunction();
  }, []);

  const siteDeleteHandler = (siteid) =>{
    setSites((prevSites)=>{
      const res = prevSites.filter(site=>{
        return site.id!==siteid
      });
      return res;
    });
  };

  return (
    <React.Fragment>
      <Modal
        show={modal.isOpen}
        header="ERROR"
        footer={
          <Button danger onClick={modalCloseHandler}>
            CLOSE
          </Button>
        }
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && sites.length === 0 && (
        <h3 className="center">No site found</h3>
      )}
      {!isLoading && sites.length !== 0 && (
        <SiteList sites={sites} onDelete={siteDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default Sites;
