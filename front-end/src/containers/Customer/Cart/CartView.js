import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./CartView.module.css";
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";

const CartView = (props) => {

  const [loading, setLoading] = useState(true);

  const [primaryImage, setPrimaryImage] = useState();

  useEffect(() => {
    const query =
      "?productId=" +
      props.passedItem.productId +
      "&variationId=" +
      props.passedItem.productVariation.id;
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
      });
  }, []);

  const onProductRemoveHandler = (
    quantity,
    primaryImage,
    variationId,
    productId
  ) => {
    props.history.push({
      pathname: "/removeItem",
      state: {
        quantity: quantity,
        primaryImage: primaryImage,
        variationId: variationId,
        productId: productId,
      },
    });
  };

  let itemView = null;

  if (!loading) {
    itemView = (
      <div className={classes.View} key={props.passedItem.productVariation.id}>
        <div className={classes.Pic}>
          <img src={primaryImage} alt="product data" />
        </div>

        <div className={classes.Data}>
          <p>
            <strong>Total quantity: </strong>
            {props.passedItem.quantity}
          </p>
          <p>
            <strong>Price:</strong> USD:
            {Number.parseFloat(props.passedItem.productVariation.price).toFixed(
              2
            )}
          </p>
          <Button
            clicked={() =>
              onProductRemoveHandler(
                props.passedItem.quantity,
                primaryImage,
                props.passedItem.productVariation.id,
                props.passedItem.productId
              )
            }
            btnType="Danger"
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }
  return <div>{itemView}</div>;
};

export default withRouter(CartView);
