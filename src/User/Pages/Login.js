import React from "react";

import { useForm } from "../../hooks/form";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validator";

import "./Auth.css";

const Login = (props) => {
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const loginHandler = event =>{
    event.preventDefault();
  }

  return (
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
      <Button type="submit" disabled={!formState.formIsValid} to="/">Login</Button>
    </form>
  );
};

export default Login;
