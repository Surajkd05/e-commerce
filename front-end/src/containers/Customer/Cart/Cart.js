import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/UI/Button/Button";
import CartView from "./CartView";
import classes from "./CartView.module.css";
import Aux from "../../../hoc/Aux/aux";
import Modal from "../../../components/UI/Modal/Modal"
import OrderSummary from "../Checkout/OrderSummary";
import navigationItems from "../../../components/Navigations/NavigationItems/NavigationItems";
const Cart = (props) => {
  const [cart, setCart] = useState();

  const [loaded, setLoaded] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ecommerce/customer/cart", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setCart(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  localStorage.setItem("quantity",0);

  let carts = null;

  const purchaseContinued = () => {
    props.history.push("/checkout");
  };

  let orderSummary = null;
  const onCheckoutHandler = () => {
    setPurchasing(true);

    console.log("Checkout button clicked")
  };

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  };

  if (loaded) {
    carts = cart.cartItemDtos.map((item) => <CartView passedItem={item} />);
  }

  let view = null;
  if (carts !== null) {
    view = (
      <div>
        <h4>MyCart : ({cart.cartItemDtos.length})</h4>
        <div className="col-md-8">
          <div className="card-columns">{carts}</div>
        </div>
        <div className="col-md-4">
          {" "}
          <div className={classes.View}>
            <div className={classes.Data}>
              <p>
                <strong>Total Quantity : </strong> {cart.quantity}
              </p>
              <p>
                <strong>Total Price : </strong> USD{" "}
                {Number.parseFloat(cart.totalAmount).toFixed(2)}
              </p>
              <Button btnType="Success" clicked={() => onCheckoutHandler()}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

    orderSummary = (
      <OrderSummary
        purchaseCancelled={cancelPurchaseHandler}
        purchaseContinued={purchaseContinued}
        price={cart.totalAmount}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
        {orderSummary}
      </Modal>
      <div>{view}</div>
    </Aux>
  );
};

export default Cart;
