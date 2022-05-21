import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useForm } from "../../hooks/form";
import Input from "../../Shared/Components/ActionElements/Input";
import Button from "../../Shared/Components/ActionElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../Shared/Util/validator";
import { AuthContext } from "../../Context/authCTX";

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

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
    setTimeout(()=>{console.log("Inside login " + auth.isLoggedIn)},3000);
  };

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
      <Button type="submit" disabled={!formState.formIsValid}>
        Login
      </Button>
      <p>
        Don't have an account? <NavLink to="/signup">Click here</NavLink> to
        register
      </p>
    </form>
  );
};

export default Login;
