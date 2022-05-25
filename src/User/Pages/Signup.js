import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSpinner } from "@coreui/react";

import { useForm } from "../../hooks/form";
import { useModal } from "../../hooks/modal-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MATCH,
  validate,
} from "../../Shared/Util/validator";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";

import "./Auth.css";
import axios from "axios";

const Signup = (props) => {
  // const [modal, setModal] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [modal, modalOpenHandler, modalCloseHandler] = useModal();

  // const modalOpenHandler = (text, type) =>{
  //   console.log(type);
  //   setModal({ isOpen: true, message: text, type: type });
  // }
    
  // const modalCloseHandler = () =>
  //   setModal({ isOpen: false, message: "", type: "" });

  const [formState, inputHandler] = useForm(
    {
      firstName: { value: "", isValid: false },
      lastName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
    },
    false
  );

  const signupHandler = async (event) => {
    event.preventDefault();
    let passwordCheck = validate(
      {
        value_1: formState.inputs.password.value,
        value_2: formState.inputs.confirmPassword.value,
      },
      [VALIDATOR_MATCH()]
    );

    if (!passwordCheck) {
      modalOpenHandler("Password and confirm password didn't match", "ERROR");
      return;
    }
    try {
      const body = {
        firstName: formState.inputs.firstName.value,
        lastName: formState.inputs.lastName.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/signup`,
        body
      );
      setIsLoading(false);
      if(response.status==201){
        modalOpenHandler("Congratulations! You've succesfully signed up. Please login to continue.", "SUCCESS");
      }
    } catch (e) {
      var message = "";
      if(!e.response.data){
        message = e.message || "Something went wrong.";
      }else{
        message = e.response.data.message || "Something went wrong.";
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
            <Button to="/login">
              LOGIN
            </Button>
          )
        }
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay/>}
      <form className="auth-form" onSubmit={signupHandler}>
        <h2>Signup</h2>
        <hr />
        <Input
          element="input"
          id="firstName"
          type="text"
          label="First Name"
          onInput={inputHandler}
          placeholder=""
          validators={[VALIDATOR_REQUIRE()]}
          errorText="First name is required"
        />
        <Input
          element="input"
          id="lastName"
          type="text"
          label="Last Name"
          onInput={inputHandler}
          placeholder="Last Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Last name is required"
        />
        <Input
          element="input"
          id="email"
          type="email"
          label="Email"
          onInput={inputHandler}
          placeholder="your@email.com"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Invalid Email"
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          onInput={inputHandler}
          placeholder="password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorText="Password must be at least 6 characters"
        />
        <Input
          element="input"
          id="confirmPassword"
          type="password"
          label="Confirm password"
          onInput={inputHandler}
          placeholder=""
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Password did not match"
        />
        <Button type="submit" disabled={!formState.formIsValid}>
          Signup
        </Button>
        <p>
          Already have an account? <NavLink to="/login">Click here</NavLink> to
          login.
        </p>
      </form>
    </React.Fragment>
  );
};

export default Signup;
