import React, { useState } from "react";
import { updateObject, checkValidity } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Admin.module.css";
import CustomerView from "../../components/admin/CustomerView";
import SellerView from "../../components/admin/SellerView";
import axios from "axios";
import Aux from "../../hoc/Aux/aux";

const Admin = React.memo((props) => {
  const [params, setParams] = useState({
    role: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT USER TYPE" },
          { value: "cust", displayValue: "Customer" },
          { value: "sell", displayValue: "Seller" },
        ],
      },
      validation: {},
      value: "none",
      isValid: true,
    },
    SortBy: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "none", displayValue: "SELECT SORT BY" },
          { value: "userId", displayValue: "UserId" },
        ],
      },
      validation: {},
      value: "userId",
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
  });

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Param in submit : ", params);
    setLoading(true);
    let result = null;
    let query = "?";
    const paramData = {};

    for (let key in params) {
      if (key !== "role") {
        if (key !== "SortBy") {
          query = query + "&" + key + "=" + params[key].value;
        } else {
          query = query + key + "=" + params[key].value;
        }
      }
    }

    setQueries(query);

    console.log("Query passed is", query);

    for (let key in params) {
      paramData[key] = params[key].value;
    }

    console.log("Role is", paramData.role);

    let fetchedData = null;

    if (paramData.role === "cust") {
      fetchedData = axios.get(
        "http://localhost:8080/ecommerce/admin/customers" + query,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setLoading(false);
    } else {
      fetchedData = axios.get(
        "http://localhost:8080/ecommerce/admin/sellers" + query,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setLoading(false);
    }

    fetchedData
      .then((response) => {
        result = response.data;
        setUsers(result);
        console.log("Data received is: ", response);
        console.log("Data fetched is", response.data);
      })
      .catch((error) => {
        console.log("Error is", error.response.data.message);
      });
  };

  const inputChangedHandler = (event, paramName) => {
    const updatedSchedules = updateObject(params, {
      [paramName]: updateObject(params[paramName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, params[paramName].validation),
        touched: true,
      }),
    });
    setParams(updatedSchedules);
  };

  const userListHandler = (l) => {
    if (params.role.value === "cust") {
      if (l > 0) {
        return <CustomerView fetchedUsers={users} />;
      }
    } else {
      if (l > 0) {
        return <SellerView fetchedUsers={users} />;
      }
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
      <div className={classes.AdminData}>
        <form onSubmit={submitHandler}>
          <h4>Enter User Type</h4>
          {form}
          <Button btnType="Success">Get Users</Button>
        </form>
      </div>
      <div>
        <section>{userListHandler(users.length)}</section>
      </div>
    </Aux>
  );
});

export default Admin;
