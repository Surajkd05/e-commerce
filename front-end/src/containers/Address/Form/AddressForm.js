import React, { useState } from "react";
import classes from "./AddressForm.module.css";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input"
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import { withRouter } from "react-router-dom";

const AddressForm = (props) => {
  const [address, setAddress] = useState({
    block: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Block number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    plotNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter your Plot number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    sectorNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter your Sector number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    streetName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Street Name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    label: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT LABEL" },
          { value: "work", displayValue: "WORK" },
          { value: "home", displayValue: "HOME" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your City",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    district: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your District",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    state: {
      elementType: "input",
      elementConfig: {
        type: "state",
        placeholder: "Enter your State",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter your Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 6,
      },
      isValid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Country Name",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const inputChangedHandler = (event, registerData) => {
    const updatedAddress = updateObject(address, {
      [registerData]: updateObject(address[registerData], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          address[registerData].validation
        ),
        touched: true,
      }),
    });
    setAddress(updatedAddress);
  };

  const formElementsArray = [];
  for (let key in address) {
    formElementsArray.push({
      id: key,
      config: address[key],
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
    
    const addresses = []
    const addressData = {}
    for(let key in address){
      addressData[key] = address[key].value;
    }

    addresses.push(addressData)
    const registeredSeller = {...props.sellerInfo,addresses}

    console.log("Submitted seller info is : ",registeredSeller)
    props.onRegister(registeredSeller)

  };

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.AddressData}>
      <h4>Enter Address Details</h4>
      <form onSubmit={submitHandler}>
        {form}
        {<Button btnType="Success">Register</Button>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.sellerRegister.loading,
    sellerInfo: state.sellerRegister.sellerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (registeredSeller) =>
      dispatch(actions.sellerRegister(registeredSeller)),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddressForm));
