import React, { useEffect, useState, useCallback } from "react";
import classes from "./Products.module.css";
import axios from "axios";
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";

const ProductVariation = (props) => {
  const [loading, setLoading] = useState(true);

  console.log("In product variation 1 main", props);
  const variation = props.passedVariation;

  const [primaryImage, setPrimaryImage] = useState();

  const productName = props.passedName;

  const variationId = variation.id;

  const productId = props.passedId;

  const receivedProps = props.passedProps;

  const description = props.description;

  const brand = props.brand

  const [nullValue, setNullValue] = useState(false);

  useEffect(() => {
    const query = "?productId=" + productId + "&variationId=" + variationId;
    axios
      .get(
        "http://localhost:8080/ecommerce/customer/productImagesVar" + query,
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
        setNullValue(true);
      });
  }, []);

  const onProductVariationHandler = () => {
    receivedProps.history.push({
      pathname: "/productVariationsById",
      state: { variation: variation, name: productName, id: productId, image: primaryImage, description : description, brand: brand },
    });
  };

  let allProducts = null;

  if (!loading) {
    allProducts = (
      <div className={classes.View} key={variation.id}>
        <div className={classes.Pic}>
          <img src={primaryImage} alt="product data" />
        </div>

        <div className={classes.Data}>
          <p>
            <strong>{productName}</strong>
          </p>
          <p>
            <strong>Price:</strong> USD:{" "}
            {Number.parseFloat(variation.price).toFixed(2)}
          </p>
          <Button clicked={onProductVariationHandler} btnType="Success">
            Click To See
          </Button>
        </div>
      </div>
    );
  }
  return <div>{allProducts}</div>;
};

export default withRouter(ProductVariation);
