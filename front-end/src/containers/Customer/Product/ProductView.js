import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import ProductVariation from "./ProductVariation";

const ProductView = (props) => {
  const [loading, setLoading] = useState(true);

  const productVariations = props.history.location.state.variations;

  const productName = props.history.location.state.name;

  const productId = props.history.location.state.id;

  const description = props.history.location.state.description

  const brand = props.history.location.state.brand

   let allProducts = null;

  if (loading) {
    allProducts = productVariations.map((variation) => (
      <ProductVariation passedVariation ={variation} passedId ={productId} passedName = {productName} passedProps = {props} description = {description} brand = {brand}/>
    ));
  }
  return <div className="card-columns">{allProducts}</div>;
};

export default withRouter(ProductView);
