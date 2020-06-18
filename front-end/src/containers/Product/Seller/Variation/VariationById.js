import React from "react";
import classes from "./VariationById1.module.css";
import Button from "../../../../components/UI/Button/Button";

const VariationById = (props) => {
  const variation = props.history.location.state.variation;
  const productName = props.history.location.state.name;
  const variationId = props.history.location.state.variationId;
  const productId = props.history.location.state.id;
  const primaryImage = props.history.location.state.image;
  const description = props.history.location.state.description;
  const brand = props.history.location.state.brand;

  const onVariationUpdateHandler = () => {
    props.history.push({
      pathname: "/updateVariation",
      state: { id: variationId },
    });
  };

  console.log("Is", variation);

  return (
    <div>
      <div class={classes.CustomerProfile}>
        <div class={classes.Pic}>
          <img src={primaryImage} alt="product data" />
        </div>

        <div class={classes.Data}>
          <p>
            <strong>{productName}</strong>
          </p>
          <p>
            <strong>Price:</strong> USD:{Number.parseFloat(variation.price).toFixed(2)}
          </p>
          <Button clicked={onVariationUpdateHandler} btnType="Success">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VariationById;
