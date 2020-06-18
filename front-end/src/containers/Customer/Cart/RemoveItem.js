import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";

const RemoveItem = (props) => {
  console.log("props are : ", props);

  const [quantity, setQuantity] = useState(0);
  const [quantityAvailable, setQuantityAvailable] = useState(
    props.history.location.state.quantity
  );

  const [removed, setRemoved] = useState(false);

  const quantityChangeHandler = (e) => setQuantity(e.target.value);

  const quantityIncreaseHandler = () => {
    if (quantityAvailable > 0) {
      setQuantity(quantity + 1);
      setQuantityAvailable(quantityAvailable - 1);
    }
  };

  const quantityDecreaseHandler = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setQuantityAvailable(quantityAvailable + 1);
    }
  };

  const removeFromCartHandler = (quantity, productId, variationId) => {
    const formData = {
      quantity: quantity,
      variationId: variationId,
      productId: productId,
    };
    axios({
      method: "DELETE",
      url: "http://localhost:8080/ecommerce/customer/cart",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setRemoved(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  if (removed) {
    return <Redirect to="/cart" />;
  }

  return (
    <div>
      <div className="col-md-6">
        <div className="col-md-12">
          {" "}
          <img
            src={props.history.location.state.primaryImage}
            alt="product data"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      </div>
      <div className="col-md-2"></div>
      <div className="col-md-4">
        <div className="row">
          <div className="col-md-12 bottom-rule">
            <h2 className="product-price">
              Available quantity : {quantityAvailable}
            </h2>
          </div>
        </div>
        <div className="row add-to-cart">
          <div className="col-md-5 product-qty">
            <span className="btn btn-default btn-lg btn-qty">
              <span
                className="glyphicon glyphicon-plus"
                aria-hidden="true"
                onClick={quantityIncreaseHandler}
              ></span>
            </span>
            <input
              type="number"
              onChange={quantityChangeHandler}
              className="btn btn-default btn-lg btn-qty"
              value={quantity}
            />
            <span className="btn btn-default btn-lg btn-qty">
              <span
                className="glyphicon glyphicon-minus"
                aria-hidden="true"
                onClick={quantityDecreaseHandler}
              ></span>
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-lg btn-brand btn-full-width"
            onClick={() =>
              removeFromCartHandler(
                quantity,
                props.history.location.state.productId,
                props.history.location.state.variationId
              )
            }
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RemoveItem);
