import React, { useState } from "react";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import classes from "./Search.module.css"

const Search = React.memo((props) => {
  const [search, setSearch] = useState({
    search: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Search...",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const inputChangedHandler = (event, searchData) => {
    const updatedSchedules = updateObject(search, {
      [searchData]: updateObject(search[searchData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, search[searchData].validation),
        touched: true,
      }),
    });
    setSearch(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in search) {
    formElementsArray.push({
      id: key,
      config: search[key],
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
  };

  return (
    <div className={classes.SearchData}>
      <form onSubmit={submitHandler}>
        {form}
      </form>
    </div>
  );
});

export default Search;
