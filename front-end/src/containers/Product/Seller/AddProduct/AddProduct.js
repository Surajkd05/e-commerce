import React,{useState} from "react"
import Input from "../../../../components/UI/Input/Input"
import axios from "axios"
import Spinner from "../../../../components/UI/Spinner/Spinner"
import { updateObject, checkValidity } from "../../../../shared/utility"
import Button from "../../../../components/UI/Button/Button"
import { Redirect } from "react-router"
import classes from "./AddProduct.module.css"

const AddProduct = props => {

  const categoryId = props.history.location.state.id
  const [params, setParams] = useState({
    brand: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Brand name",
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    productName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Product name",
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
   description: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter description about product",
      },
      value: '',
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
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
      method: "POST",
      url: "http://localhost:8080/ecommerce/seller/category/"+categoryId,
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

  let redirectPage = null;
  if (updated) {
    redirectPage = <Redirect to="/sellerCategory" />;
  }

  return (
    <div className={classes.ProductData}>
      {redirectPage}
      <h4>Add Product</h4>
      <form>{form}</form>
      <Button clicked={submitHandler} btnType="Success">
        AddProduct
      </Button>
    </div>
  );
};

export default AddProduct;