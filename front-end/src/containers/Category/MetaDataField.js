import React, { useState } from "react";
import classes from "./Form.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios";

const MetaDataField = React.memo((props) => {
  const [data, setData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter metadata field name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (event, eventData) => {
    const updatedData = updateObject(data, {
      [eventData]: updateObject(data[eventData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, data[eventData].validation),
        touched: true,
      }),
    });
    setData(updatedData);
  };

  const formElementsArray = [];
  for (let key in data) {
    formElementsArray.push({
      id: key,
      config: data[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {};

    for (let key in data) {
      formData[key] = data[key].value;
    }

    console.log("In meta data token : ", localStorage.getItem("token"));

    axios({
      method: "POST",
      url: "http://localhost:8080/ecommerce/admin/metaDataField",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("metadata : ", response.data);
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(" error is : ", error);
        alert(error);
        setLoading(false);
      });
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.FormData}>
      <h4>Create MetaDataField</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">Create</button>
      </form>
    </div>
  );
});

export default MetaDataField;
