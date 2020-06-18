import React, { useState } from "react";
import { updateObject, checkValidity } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Form.module.css";
import FieldView from "../../components/category/FieldView";
import axios from "axios";
import Aux from "../../hoc/Aux/aux";

const MetaDataFields = React.memo((props) => {
  const [params, setParams] = useState({
    sortBy: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT SORT BY" },
          { value: "id", displayValue: "id" },
        ],
      },
      validation: {},
      value: "id",
      isValid: true,
    },
    page: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter Page Number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    size: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter Size",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    order: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT ORDER BY" },
          { value: "ASC", displayValue: "ASCENDING" },
          { value: "DESC", displayValue: "DESCENDING" },
        ],
      },
      validation: {},
      value: "",
      isValid: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Param in submit : ", params);
    setLoading(true);
    let result = null;
    let query = "?";
    const paramData = {};

    for (let key in params) {
      if (key !== "sortBy") {
        query = query + "&" + key + "=" + params[key].value;
      } else {
        query = query + key + "=" + params[key].value;
      }
    }

    console.log("Query passed is", query);

    for (let key in params) {
      paramData[key] = params[key].value;
    }

    axios
      .get("http://localhost:8080/ecommerce/admin/metaDataField" + query, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        result = response.data;
        setFields(result);
        setLoading(false);
        console.log("Data received is: ", response);
        console.log("Data fetched is", response.data);
      })
      .catch((error) => {
        console.log("Error is", error.response);
        alert(error.response.data.error_description);
        setLoading(false);
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

  const fieldListHandler = (l) => {
    if (l > 0) {
      return <FieldView fetchedFields={fields} />;
    }
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
      <div className={classes.FormData}>
        <form onSubmit={submitHandler}>
          <h4>Enter Field Parameters</h4>
          {form}
          <button type="submit">Get Fields</button>
        </form>
      </div>
      <div>
        <section>{fieldListHandler(fields.length)}</section>
      </div>
    </Aux>
  );
});

export default MetaDataFields;
