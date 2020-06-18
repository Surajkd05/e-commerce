import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button/Button";
import AllProduct from "./AllProduct";
import { withRouter } from "react-router-dom";

const AllProductsCustomer = (props) => {
  const categoryId = props.history.location.state.id;
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  console.log("In products : ",props)

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/ecommerce/customer/category/" +
          categoryId +
          "/product",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response);
        setProducts(response.data.productList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let allProducts = null;

  if (!loading) {
    allProducts = products.map((product) => (
      <div key={product.id}><AllProduct passedProduct={product} passedProps = {props}/></div>
      
    ));
  }

  return <div className="card-columns">{allProducts}</div>;
};

export default withRouter(AllProductsCustomer);
