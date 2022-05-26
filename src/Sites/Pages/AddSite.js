import React, { useContext, useState } from "react";
import axios from "axios";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/validator";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";
import { useForm } from "../../hooks/form";
import { useModal } from "../../hooks/modal-hook";
import { AuthContext } from "../../Context/authCTX";

import "./Sites.css";

const AddSite = (props) => {
  const auth = useContext(AuthContext);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(
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
      }
    },
    false
  );

  const formSubmitHandler = async(event) => {
    event.preventDefault();
    const body = {
      name: formState.inputs.name.value,
      region: formState.inputs.region.value,
      description: formState.inputs.description.value,
      createdBy: auth.loggedUid,
    };
    setIsLoading(true);
    try{
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/sites`,
        body,
        {headers: {'x-auth': auth.uToken}}
      );
      setIsLoading(false);
      if (response.status == 201) {
        modalOpenHandler("Site created successfully.", "SUCCESS");
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

  };

  return (
    <React.Fragment>
      <Modal
        show={modal.isOpen}
        header={modal.type == "ERROR" ? "ERROR" : "SUCCESS"}
        footer={
          modal.type == "ERROR" ? (
            <Button danger onClick={modalCloseHandler}>
              CLOSE
            </Button>
          ) : (
            <Button to="/">CLOSE</Button>
          )
        }
        contentClass="site-details__modal-content"
        footerClass="site-details__actions"
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay/>}
      <form className="site-form" onSubmit={formSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          placeholder="Site name"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Name is required"
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
        />
        <Input
          id="description"
          placeholder="Write a description here"
          label="Site Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Description must be at least 5 letters"
        />
        {/* <Input
          id="latitude"
          element="input"
          type="number"
          placeholder="0.00"
          label="Latitude"
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          id="longitude"
          element="input"
          type="number"
          placeholder="0.00"
          label="Longitude"
          validators={[]}
          onInput={inputHandler}
        /> */}
        <Button type="submit" inverse disabled={!formState.formIsValid}>
          Save
        </Button>
        <Button danger to="/">Cancel</Button>
      </form>
    </React.Fragment>
  );
};

export default AddSite;
