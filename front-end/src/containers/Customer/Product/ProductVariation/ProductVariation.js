import React, { useState, useEffect } from "react";
import classes from "./ProductVariation.module.css";
import axios from "axios";
import Button from "../../../../components/UI/Button/Button";
import { withRouter, Redirect } from "react-router-dom";

const ProductVariation = (props) => {
  const variation = props.history.location.state.variation;
  const productName = props.history.location.state.name;
  const productId = props.history.location.state.id;
  const primaryImage = props.history.location.state.image;
  const description = props.history.location.state.description;
  const brand = props.history.location.state.brand;
  const [quantity, setQuantity] = useState(0);
  const [quantityAvailable, setQuantityAvailable] = useState(
    variation.quantity
  );

  const [secondaryImages, setSecondaryImages] = useState();
  const [images, setImages] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/ecommerce/customer/productImagesSecondary?productId=" +
          productId +
          "&variationId=" +
          variation.id,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSecondaryImages(response.data);
        setImages(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);}

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

  const addToCartHandler = (variationId, quantity, productId) => {
    const formData = {
      quantity: quantity,
      variationId: variationId,
      productId: productId,
    };
    axios({
      method: "POST",
      url: "http://localhost:8080/ecommerce/customer/cart",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        alert(response.data);
        setAdded(true)
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  if(added){
    return <Redirect to = "/cart" />
  }

  return (
    <section className={classes.CustomerProfile}>
      <div className="container" id="product-section">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12">
              {" "}
              <article className={classes.galleryWrap}>
                <div class="img-big-wrap">
                  <div>
                    {/* <a href="#"> */}
                    <img
                      src={primaryImage}
                      alt="product data"
                      style={{ width: "500px", height: "500px" }}
                    />
                    {/* </a> */}
                  </div>
                </div>
                <div className={classes.imgSmallWrap}>
                  {images
                    ? secondaryImages.map((image) => (
                        <div className={classes.itemGallery}>
                          <img src={image} alt="" />
                        </div>
                      ))
                    : null}
                </div>
              </article>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <div>
                <div className="col-md-12">
                  <h1>{productName}</h1>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className="label label-primary">{brand}</span>
                    <span className="monospaced">No. 1960140180</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="description">{description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <span className="sr-only">Four out of Five Stars</span>
                    <span
                      className="glyphicon glyphicon-star"
                      aria-hidden="true"
                    ></span>
                    <span
                      className="glyphicon glyphicon-star"
                      aria-hidden="true"
                    ></span>
                    <span
                      className="glyphicon glyphicon-star"
                      aria-hidden="true"
                    ></span>
                    <span
                      className="glyphicon glyphicon-star"
                      aria-hidden="true"
                    ></span>
                    <span
                      className="glyphicon glyphicon-star-empty"
                      aria-hidden="true"
                    ></span>
                    <span className="label label-success">61</span>
                  </div>
                  <div className="col-md-3">
                    <span className="monospaced">Write a Review</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 bottom-rule">
                    <h2 className="product-price">USD {variation.price}</h2>
                  </div>
                </div>
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
                  <div className="col-md-4">
                    <button
                      className="btn btn-lg btn-brand btn-full-width"
                      onClick={() =>
                        addToCartHandler(variation.id, quantity, productId)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="col-md-12 bottom-rule top-10"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 top-10">
                      <p>
                        To order by telephone,{" "}
                        <a href="tel:18005551212">please call 1-800-555-1212</a>
                      </p>
                    </div>
                  </div>
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                      <a
                        href="#description"
                        aria-controls="description"
                        role="tab"
                        data-toggle="tab"
                      >
                        Description
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        href="#features"
                        aria-controls="features"
                        role="tab"
                        data-toggle="tab"
                      >
                        Features
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        href="#notes"
                        aria-controls="notes"
                        role="tab"
                        data-toggle="tab"
                      >
                        Notes
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        href="#reviews"
                        aria-controls="reviews"
                        role="tab"
                        data-toggle="tab"
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane active"
                      id="description"
                    >
                      Product with best quality and good work is available.
                    </div>
                    <div
                      role="tabpanel"
                      className="tab-pane top-10"
                      id="features"
                    >
                      ...
                    </div>
                    <div role="tabpanel" className="tab-pane" id="notes">
                      ...
                    </div>
                    <div role="tabpanel" className="tab-pane" id="reviews">
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(ProductVariation);
