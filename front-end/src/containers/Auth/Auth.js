import React, { useState } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { Route, Link } from "react-router-dom"
import Login from "./Login/Login";
import Register from "./Register/Register";

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(true);

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className = {classes.Auth}>
      {isSignup ? <Login /> : <Register />}
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? <Link to = {props.match.url + "/sign-up"}>SIGNUP</Link> : <Link to = "/auth">SIGNIN</Link>}
      </Button>
    </div>
  );
};

export default Auth;
