import React, { useState } from "react";
import classes from "./UpdateVariation.module.css";
import { updateObject, checkValidity } from "../../../../shared/utility";
import Input from "../../../../components/UI/Input/Input";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import axios from "axios";

const UpdateVariation = React.memo((props) => {
  const variationId = props.history.location.state.id;
  const [info, setInfo] = useState({
    quantity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter product quantity",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },

    price: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter product price",
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

  const inputChangedHandler = (event, infoData) => {
    const updatedSchedules = updateObject(info, {
      [infoData]: updateObject(info[infoData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, info[infoData].validation),
        touched: true,
      }),
    });
    setInfo(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in info) {
    formElementsArray.push({
      id: key,
      config: info[key],
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

    let formData = {};

    for (let key in info) {
      formData[key] = info[key].value;
    }

    axios
      .put(
        "http://localhost:8080/ecommerce/seller/variation/" + variationId,
        formData,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Login error is : ", error);
        alert(error.response.data.message);
        setLoading(false);
      });
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.PasswordData}>
      <h4>Update Variation</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
});

export default UpdateVariation;
