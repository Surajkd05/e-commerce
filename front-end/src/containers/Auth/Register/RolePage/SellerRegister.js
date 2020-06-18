import React, { useState } from "react";
import classes from "./Register.module.css";
import { updateObject, checkValidity } from "../../../../shared/utility";
import Input from "../../../../components/UI/Input/Input";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Button from "../../../../components/UI/Button/Button";
import AddressForm from "../../../Address/Form/AddressForm";
import Aux from "../../../../hoc/Aux/aux";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const SellerRegister = (props) => {

  const [register, setRegister] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your UserName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your FirstName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your LastName",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    companyName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Company Name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    companyContact: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Company Contact",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    gst: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your GST number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    email: {
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
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm your Password",
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
    age: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter your Age",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    dateOfBirth: {
      elementType: "input",
      elementConfig: {
        type: "date",
        placeholder: "Enter your Birth date",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    gender: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT GENDER" },
          { value: "male", displayValue: "Male" },
          { value: "female", displayValue: "Female" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const [isAdd, setAdd] = useState(false);

  const inputChangedHandler = (event, registerData) => {
    const updatedSchedules = updateObject(register, {
      [registerData]: updateObject(register[registerData], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          register[registerData].validation
        ),
        touched: true,
      }),
    });
    setRegister(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in register) {
    formElementsArray.push({
      id: key,
      config: register[key],
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
    const registerData = { accountNonLocked: true };

    for (let key in register) {
      registerData[key] = register[key].value;
    }

    props.onSubmitInfo(registerData)
    //setAdd(true);
    setLoading(false)
    props.history.push({
      pathname: "/address"
    })
  };

  if (loading) {
    form = <Spinner />;
  }

  console.log("Seller re ",props)

  if (isAdd) {
    //return <AddressForm />;
  }
  
  return (
    <Aux style={{ textAlign: "center" }}>
      <div className={classes.RegisterData}>
        <h4>Seller Register</h4>
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Continue</Button>
        </form>
      </div>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInfo: (register) => dispatch(actions.addSellerInfo(register)),
  };
};

export default withRouter(connect(null,mapDispatchToProps)(SellerRegister));
