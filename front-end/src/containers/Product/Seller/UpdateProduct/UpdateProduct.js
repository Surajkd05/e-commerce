import React, { useState } from "react";
import { updateObject, checkValidity } from "../../../../shared/utility";
import Input from "../../../../components/UI/Input/Input";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import { Redirect } from "react-router";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import classes from "./UpdateProduct.module.css";
import Aux from "../../../../hoc/Aux/aux";

const UpdateProduct = (props) => {
  const id = props.history.location.state.id;
  const product = props.history.location.state.product;

  console.log("Product id in update is : ",id)
  console.log("Product is : ",product)

  const [params, setParams] = useState({
    description: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter product description",
      },
      value: product.description,
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    isCancellable: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "none",
            displayValue: "Select Product is cancellable or not",
          },
          { value: "true", displayValue: "True" },
          { value: "false", displayValue: "False" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
    isReturnable: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "none",
            displayValue: "Select Product is returnable or not",
          },
          { value: "true", displayValue: "True" },
          { value: "false", displayValue: "False" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
    isDeleted: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "none",
            displayValue: "Select Product can be deleted or not",
          },
          { value: "true", displayValue: "True" },
          { value: "false", displayValue: "False" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {};

    for (let key in params) {
      formData[key] = params[key].value;
    }

    axios({
      method: "PUT",
      url: "http://localhost:8080/ecommerce/seller/product/" + id,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setLoading(false);
        alert(response.data);
        setUpdated(true);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data.message);
      });
  };

  const inputChangedHandler = (event, paramName) => {
    const updatedData = updateObject(params, {
      [paramName]: updateObject(params[paramName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, params[paramName].validation),
        touched: true,
      }),
    });
    setParams(updatedData);
  };

  const formElementsArray = [];
  for (let key in params) {
    formElementsArray.push({
      id: key,
      config: params[key],
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
    <Aux>
      <div className={classes.Product}>
        <h4>Update Product</h4>
        <form>{form}</form>
        <Button clicked={submitHandler} btnType="Success">
          Update
        </Button>
      </div>
    </Aux>
  );
};

export default UpdateProduct;
