import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import Button from "../../../components/UI/Button/Button";

const Login = React.memo((props) => {
  const { authRedirectPath, onAuthRedirect } = props;

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onAuthRedirect();
    }
  }, [authRedirectPath, onAuthRedirect]);

  const [login, setLogin] = useState({
    role: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT LOGIN AS" },
          { value: "cust", displayValue: "Customer" },
          { value: "sell", displayValue: "Seller" },
          { value: "admin", displayValue: "Admin" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
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
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Enter your Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 15,
      },
      isValid: false,
      touched: false,
    },
  });

  const [authentication, setAuthentication] = useState(false);

  const [resend, setResend] = useState(false);

  const inputChangedHandler = (event, loginData) => {
    const updatedSchedules = updateObject(login, {
      [loginData]: updateObject(login[loginData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, login[loginData].validation),
        touched: true,
      }),
    });
    setLogin(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in login) {
    formElementsArray.push({
      id: key,
      config: login[key],
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
    localStorage.setItem("role", login.role.value);
    props.onAuth(login);
    setAuthentication(true);
  };

  let resetActivationForm = null;
  const resetCodeHandler = () => {
    setResend(true);
  };

  if (resend) {
    // resetActivationForm = <Redirect to={"/resendActivation"} />;
    return <Redirect to={"/resendActivation"} />
  }

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error}</p>;
  }

  let authRedirect = null;

  console.log("Redirect path is : ", props.authRedirectPath);

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectedPath} />;
  }

  // if (authentication) {
  //   authRedirect = <Redirect to="/" />;
  // }

  return (
    <div className={classes.LoginData}>
      <h4>Login</h4>
      {resetActivationForm}

      {authRedirect}
      {errorMessage}
      <form>{form}</form>
      <Button btnType="Success" clicked={submitHandler}>
        LOGIN
      </Button>
      <Button btnType="Danger" clicked={resetCodeHandler}>
        ResendActivationCode
      </Button>
    </div>
  );
});

const mapStateToProps = (state) => {
  console.log("Token in login is : ",state.auth.token)
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (login) => dispatch(actions.auth(login)),
    onAuthRedirect: () => dispatch(actions.authRedirect("/")),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
