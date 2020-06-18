import React, { useState, useCallback } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Aux/aux";
import MetaDataFieldValue from "./MetaDataFieldValues";
import axios from "axios"
import classes from "../Form.module.css";

const MetaDataFieldValues = (props) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState([]);

  const addValueHandler = useCallback((value) => {
    console.log("Added Value is", value);
    setValues((prevValues) => [...prevValues, { ...value }]);
  }, []);

  console.log("Values are : ",values)

  const submitHandler = (event) => {
    console.log("In submit block");
    event.preventDefault();
    setLoading(true);
    console.log("Values are: ", values);

    const addedValues = [];

    let categoryId = null

    for (let add in values) {
      const add1 = {};
      const valueData = values[add];
      console.log("Value is", valueData);
      for (let key in values[add]) {
        add1[key] = valueData[key].value;
        if(key === "categoryId"){
          categoryId = valueData[key].value
        }
      }
      addedValues.push(add1);
    }

    console.log("Category Id is : ",categoryId)

    console.log("Added values is", addedValues);

    axios({
      method: "POST",
      url:  "http://localhost:8080/ecommerce/admin/category/"+categoryId,
      data: addedValues,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        alert(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log("Error is", error);
        alert(error.response.data.message)
        setLoading(false)
      });
  };

  let form = <MetaDataFieldValue onAddValues={addValueHandler} />;

  if (loading) {
    form = <Spinner />;
  }

  return (
    <Aux>
      <div>
        {form}
          <div style={{ textAlign: "center" }}>
            <Button clicked={submitHandler} btnType="Success">Submit</Button>
          </div>
      </div>
    </Aux>
  );
};

export default MetaDataFieldValues;
