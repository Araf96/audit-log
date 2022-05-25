import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useForm } from "../../hooks/form";
import { useModal } from "../../hooks/modal-hook";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validator";
import { AuthContext } from "../../Context/authCTX";
import Modal from "../../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../../Shared/Components/ActionElements/LoadingSpinner";

import "./Auth.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  // const [modal, setModal] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });

  const [modal, modalOpenHandler, modalCloseHandler] = useModal();

  const [isLoading, setIsLoading] = useState(false);

  // const modalOpenHandler = (text, type) => {
  //   setModal({ isOpen: true, message: text, type: type });
  // };

  // const modalCloseHandler = () => {
  //   setModal({ isOpen: false, message: "", type: "" });
  // };

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const body = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        body
      );
      setIsLoading(false);
      if (response.status == 200) {
        const token = response.headers['x-auth'];
        const user = response.data;
        auth.login(user._id, token);
      }
    } catch (e) {
      var message = "";
      if (!e.response.data) {
        message = e.message || "Something went wrong.";
      } else {
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
            <Button to="/login">LOGIN</Button>
          )
        }
      >
        <p>{modal.message}</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}

      <form className="auth-form" onSubmit={loginHandler}>
        <h2>Login required!</h2>
        <hr />
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
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Password is required"
        />
        <Button type="submit" disabled={!formState.formIsValid}>
          Login
        </Button>
        <p>
          Don't have an account? <NavLink to="/signup">Click here</NavLink> to
          register
        </p>
      </form>
    </React.Fragment>
  );
};

export default Login;
