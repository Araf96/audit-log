import React, { useReducer, useEffect } from "react";

import { validate } from "../../Util/validator";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  let element =
    props.element == "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        style={props.style}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={inputChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      <div className="form-control--invalid">
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
