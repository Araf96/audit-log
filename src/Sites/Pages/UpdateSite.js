import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../Shared/Components/ActionElements/Button";
import Input from "../../Shared/Components/ActionElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/Util/validator";
import { useForm } from "../../hooks/form";

import "./Sites.css";

let siteList = [
  {
    id: 1,
    name: "Hospital site",
    region: "Dhaka, Bangladesh",
    description: "A place to build a hospital",
    longitude: 100.0,
    latitude: 100.0,
    createdBy: 1,
  },
  {
    id: 2,
    name: "Power plant site",
    region: "Barisal, Bangladesh",
    description: "A place to build a power plant",
    longitude: 200.0,
    latitude: 100.0,
    createdBy: 2,
  },
];

const UpdateSite = (props) => {
  const siteId = useParams().siteid;
  const [isLoading, setIsLoading] = useState(true);

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

  let selectedSite = siteList.find((site) => site.id == siteId);

  useEffect(() => {
      if(selectedSite){
        updateFormData(
            {
              name: {
                value: selectedSite.name,
                isValid: true,
              },
              region: {
                value: selectedSite.region,
                isValid: true,
              },
              description: {
                value: selectedSite.description,
                isValid: true,
              },
              latitude: {
                value: selectedSite.latitude,
                isValid: true,
              },
              longitude: {
                value: selectedSite.longitude,
                isValid: true,
              },
            },
            true
          );
      }
    
    setIsLoading(false);
  }, [selectedSite, updateFormData]);

  if (isLoading) {
    return <h3 className="center">Loading...</h3>;
  }

  if (!selectedSite) {
    return <h3 className="center">No site found.</h3>;
  }

  const formUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
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
      />
      <Button inverse type="submit" disabled={!formState.formIsValid}>
        Save
      </Button>
      <Button danger to="/">Cancel</Button>
    </form>
  );
};

export default UpdateSite;
