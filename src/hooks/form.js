import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let id in state.inputs) {
        if (id == action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        formIsValid: formIsValid,
      };
    case "UPDATE_DATA":
      return {
        inputs: action.inputs,
        formIsValid: action.validity,
      };
    default:
      return state;
  }
};

export const useForm = (inputs, validity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: inputs,
    formIsValid: validity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const updateFormData = useCallback((updatedInputs, updatedValidity) => {
    dispatch({
      type: "UPDATE_DATA",
      inputs: updatedInputs,
      validity: updatedValidity,
    });
  }, []);

  return [formState, inputHandler, updateFormData];
};
