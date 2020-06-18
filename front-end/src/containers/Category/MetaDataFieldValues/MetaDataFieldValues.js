import React, { useState } from "react";
import classes from "../Form.module.css";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

const MetaDataFieldValue = React.memo((props) => {
  const [data, setData] = useState({
    fieldId: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter field id",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    categoryId: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter Category Id",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },

    value: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Value",
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

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true)
    props.onAddValues({
      categoryId: data.categoryId,
      fieldId: data.fieldId,
      value: data.value
    });
    setLoading(false)
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

  
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.FormData}>
      <h4>Create Values</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">Add Value</button>
      </form>
    </div>
  );
});

export default MetaDataFieldValue;
