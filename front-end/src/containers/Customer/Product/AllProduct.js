import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import classes from "./Products.module.css";
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";


const AllProduct = (props) => {
  const [loading, setLoading] = useState(true);
  const [primaryImage, setPrimaryImage] = useState();
  const receivedProps = props.passedProps


  const product = props.passedProduct;

  console.log("In product props",product);

  const productId = product.id;
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/ecommerce/customer/productImages?productId=" +
          productId,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response);
        setPrimaryImage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onProductVariationHandler = (variations, productName, productId,description, brand) => {
    receivedProps.history.push({
      pathname: "/productVariations",
      state: { variations: variations, name: productName, id: productId , description: description, brand: brand },
    });
  };

  let product1 = null;

  if (!loading) {
    product1 = (
      <div className={classes.View} key={product.id}>
        {console.log("Product Id is : ", product.id)}
        <div className={classes.Pic}>
          <img src={primaryImage} alt="product data" />
        </div>

        <div className={classes.Data}>
          <p>
            <strong>{product.productName}</strong>
          </p>
          <Button
            clicked={() =>
              onProductVariationHandler(
                product.productVariations,
                product.productName,
                product.id,
                product.description,
                product.brand
              )
            }
            btnType="Success"
          >
            View Product
          </Button>
        </div>
      </div>
    );
  }

  return <div>{product1}</div>;
};

export default withRouter(AllProduct);
