import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useForm } from "../../hooks/form";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MATCH,
  validate,
} from "../../Shared/Util/validator";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import Modal from "../../Shared/Components/UIElements/Modal"

import "./Auth.css";

const Signup = (props) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const passwordModalOpenHandler = ()=>setPasswordModalOpen(true);
  const passwordModalCloseHandler = ()=>setPasswordModalOpen(false);

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

  const signupHandler = (event) => {
    event.preventDefault();
    let passwordCheck = validate(
      {
        value_1: formState.inputs.password.value,
        value_2: formState.inputs.confirmPassword.value,
      },
      [VALIDATOR_MATCH()]
    );

    if(!passwordCheck){
        passwordModalOpenHandler();
        return;
    }
    console.log(formState.inputs);
  };

  return (
    <React.Fragment>
      <Modal show={passwordModalOpen} header="Error" footer={
          <Button danger onClick={passwordModalCloseHandler}>CLOSE</Button>
      }>
          <p>Password and confirm password didn't match</p>
      </Modal>
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
        <p>Already have an account? <NavLink to="/login">Click here</NavLink> to login.</p>
      </form>
    </React.Fragment>
  );
};

export default Signup;
