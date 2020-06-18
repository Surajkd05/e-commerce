import React, {  useEffect } from "react";
import Aux from "../../../hoc/Aux/aux";
import Button from "../../../components/UI/Button/Button";

const OrderSummary = props => {
  useEffect(() => {
    console.log('[OrderSummary] DidUpdate')
  },[])

  console.log("In order summary")

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>
          <strong>Total price is: USD {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  };

export default OrderSummary;
