import React, { useEffect, useState } from "react";
import classes from "./ProductById.module.css";
import axios from "axios";
import Button from "../../../components/UI/Button/Button";

const ProductById = (props) => {
  const productId = props.history.location.state.id;

  const [product, setProduct] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ecommerce/seller/product/" + productId, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Prouct fetched is : ", response.data);
        setProduct(response.data);
        setIsFetched(true);
      })
      .catch((error) => {
        console.log("Error is : ", error);
      });
  }, []);

  const updateProductByIdHandler = (productId, product) => {
    console.log("Id passed is : ",productId)
    props.history.push({
      pathname: "/updateProduct",
      state: { id: productId, product: product },
    });
  };

  let fieldValues = null;

  let productView = null;
  if (isFetched) {
    productView = (
      <div className={classes.ProductById}>
        <h3>Product Details</h3>
        <p>
          <strong>Category Name : {product.categoryChild.categoryName}</strong>
        </p>
        <p>
          <strong>Company Name : {product.companyName}</strong>
        </p>
        <p>
          <strong>Product Name : {product.productName}</strong>
        </p>
        <p>
          <strong>Description : {product.description}</strong>
        </p>
        <p>
          <strong>Brand : {product.brand}</strong>
        </p>
        <p>
          <strong>IsDeleted : {String(product.deleted)}</strong>
        </p>
        <p>
          <strong>IsReturnable : {String(product.returnable)}</strong>
        </p>
        <p>
          <strong>IsCancellable : {String(product.cancellable)}</strong>
        </p>
        <p>
          <Button
            clicked={() => updateProductByIdHandler(product.id, product)}
            btnType="Success"
          >
            Update
          </Button>
        </p>
      </div>
    );
  }
  return <div>{productView}</div>;
};

export default ProductById;
