import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Button from "../../Shared/Components/ActionElements/Button";
import Input from "../../Shared/Components/ActionElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/validator";
import { useForm } from "../../hooks/form";
import Modal from "../../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";
import { useModal } from "../../hooks/modal-hook";
import { AuthContext } from "../../Context/authCTX";
import Log from "../../Logs/Pages/Log";

import "./Sites.css";

const UpdateSite = (props) => {
  const siteId = useParams().siteid;
  const auth = useContext(AuthContext);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteLogs, setSiteLogs] = useState([]);

  const [formState, inputHandler, updateFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      region: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      latitude: {
        value: "",
        isValid: false,
      },
      longitude: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/sites/site/${siteId}`,
          { headers: { "x-auth": auth.uToken } }
        );
        const logResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/logs/${siteId}`,
          { headers: { "x-auth": auth.uToken } }
        );
        let tempSite = response.data.site;
        let tempSiteLogs = logResponse.data.logs;
        setSelectedSite(tempSite);
        setSiteLogs(tempSiteLogs);

        updateFormData(
          {
            name: {
              value: tempSite.name,
              isValid: true,
            },
            region: {
              value: tempSite.region,
              isValid: true,
            },
            description: {
              value: tempSite.description,
              isValid: true,
            },
            latitude: {
              value: tempSite.coordinates.lat,
              isValid: true,
            },
            longitude: {
              value: tempSite.coordinates.lng,
              isValid: true,
            },
          },
          true
        );

        setIsLoading(false);
      } catch (e) {
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
    };
    sendRequest();
  }, [updateFormData]);

  const formUpdateHandler = async (event) => {
    event.preventDefault();
    const body = {
      name: formState.inputs.name.value,
      region: formState.inputs.region.value,
      description: formState.inputs.description.value,
    };
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/sites/${siteId}`,
        body,
        { headers: { "x-auth": auth.uToken } }
      );
      setIsLoading(false);
      if (response.status == 200) {
        modalOpenHandler("Site updated successfully.", "SUCCESS");
      } else {
        throw new Error();
      }
    } catch (e) {
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
  };

  return (
    <React.Fragment>
      <Modal
        show={modal.isOpen}
        header={modal.type == "ERROR" ? "ERROR" : "SUCCESS"}
        footer={
          <Button danger={modal.type == "ERROR" ? true: false} onClick={modalCloseHandler}>CLOSE</Button>
        }
        contentClass="site-details__modal-content"
        footerClass="site-details__actions"
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && !selectedSite && <h3 className="center">No site found</h3>}
      {selectedSite && (
        <form className="site-form" onSubmit={formUpdateHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            placeholder="Site name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Name is required"
            value={formState.inputs.name.value}
            isValid={formState.inputs.name.isValid}
          />
          <Input
            id="region"
            element="input"
            type="text"
            placeholder="Region"
            label="Region"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Region is required"
            value={formState.inputs.region.value}
            isValid={formState.inputs.region.isValid}
          />
          <Input
            id="description"
            placeholder="Write a description here"
            label="Site Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            errorText="Description must be at least 5 letters"
            value={formState.inputs.description.value}
            isValid={formState.inputs.description.isValid}
          />
          <Input
            id="latitude"
            element="input"
            type="number"
            placeholder="0.00"
            label="Latitude"
            validators={[]}
            onInput={inputHandler}
            value={formState.inputs.latitude.value}
            isValid={formState.inputs.latitude.isValid}
            disabled={true}
          />
          <Input
            id="longitude"
            element="input"
            type="number"
            placeholder="0.00"
            label="Longitude"
            validators={[]}
            onInput={inputHandler}
            value={formState.inputs.longitude.value}
            isValid={formState.inputs.longitude.isValid}
            disabled={true}
          />
          <Button inverse type="submit" disabled={!formState.formIsValid}>
            Save
          </Button>
          <Button danger to="/">
            Cancel
          </Button>
          {siteLogs.length !==0 && <div>
            <h3>Audit Log</h3>
            <Log logs={siteLogs}/>
          </div>}
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateSite;
