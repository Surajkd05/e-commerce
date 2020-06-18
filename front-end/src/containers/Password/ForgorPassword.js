import React, { useState } from "react";
import classes from "./Password.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios"
import { Redirect } from "react-router";

const ForgotPassword = React.memo((props) => {
  const [email, setEmail] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter your E-mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const [loading, setLoading] = useState(false)

  const inputChangedHandler = (event, emailData) => {
    const updatedSchedules = updateObject(email, {
      [emailData]: updateObject(email[emailData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, email[emailData].validation),
        touched: true,
      }),
    });
    setEmail(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in email) {
    formElementsArray.push({
      id: key,
      config: email[key],
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

  let resetPasswordPath = null

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true)

    let formData = ""

    for(let key in email){
      formData = email[key].value
    }

    axios.post("http://localhost:8080/ecommerce/forgotPassword/token/"+formData)
    .then(response => {
        console.log("fP : ",response.data)
      setLoading(false)
     resetPasswordPath = (<Redirect to = "/resetPassword" />)
     console.log("Redirect path is : ",resetPasswordPath)
    }).catch(error => {
      console.log("Login error is : ",error)
      alert(error.response.data.message)
      setLoading(false)
    })
  };

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.PasswordData}>
      <h4>Forgot Password</h4>
      <form onSubmit={submitHandler}>
        {form}
        {resetPasswordPath}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
});

export default ForgotPassword;
