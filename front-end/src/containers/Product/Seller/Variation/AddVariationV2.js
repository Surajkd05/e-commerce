import React, { useState } from "react";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";
import classes from "./AddVariation.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";

const AddVariationV2 = (props) => {
  console.log("Props passed are : ", props);
  const fieldValues = props.history.location.state.fieldValues;
  const fieldValuesSet = [];
  fieldValuesSet.push(fieldValues);
  console.log("Field set is : ", fieldValuesSet);
  console.log("Field Values is : ", fieldValues);
  const productId = props.history.location.state.id;
  const [price, setPrice] = useState();
  const [primaryImage, setPrimaryImage] = useState("");
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [fieldValueMap, setFieldValueMap] = useState({});
  const [selectValue, setSelectValue] = useState("");

  const priceChangeHandler = (e) => setPrice(e.target.value);
  const quantityChangeHandler = (e) => setQuantity(e.target.value);

  var metadata1 = {};
  const selectChangeHandler = (e) => {
    console.log("Target name is : ", e.target.name);
    console.log("target value is : ", e.target.value);
    setSelectValue(e.target.value);

    console.log("Select value is : ", selectValue);
    var obj = {};
    obj[e.target.name] = e.target.value.toString();
    console.log("Object is obj: ", obj);
    Object.assign(fieldValueMap, obj);
    console.log("Assigned object is : ", Object.assign(metadata1, obj));
    setFieldValueMap({ ...fieldValueMap, ...metadata1 });
  };

  const primaryImageChangeHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setPrimaryImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  function imageUtility(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      setSecondaryImages((prevData) => prevData.concat(reader.result));
    };
    reader.readAsDataURL(file);
  }
  
  const secondaryImagesChangeHandler = (e) => {
    var filesList = e.target.files;
    for (let i = 0; i < e.target.files.length; i++) {
      imageUtility(filesList[i]);
    }
  };

  console.log("FieldValueMap object is : ", fieldValueMap);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {
      price: price,
      quantity: quantity,
      metadata: {
        parentId: props.history.location.state.parentId,
        categoryName: props.history.location.state.categoryName,
        categoryId: props.history.location.state.categoryId,
        fieldValueMap: fieldValueMap,
      },
      primaryImage: primaryImage,
      secondaryImages: secondaryImages,
    };

    console.log("Form data sent is : ", formData);

    axios({
      method: "POST",
      url: "http://localhost:8080/ecommerce/seller/product/" + productId,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setLoading(true);
        console.log(response.data);
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error.response);
        alert(error.response.data.message);
        setLoading(false);
      });
      setPrice("");
      setQuantity("");
      setPrimaryImage("");
      setSecondaryImages([]);
  };

  let form = null;

  if (loading) {
    form = <Spinner />;
  }

  if (!loading) {
    form = (
      <div className={classes.VariationData}>
        <div>
          <h4>Product Variation Details</h4>
        </div>
        <div>
          <form onSubmit={onSubmitHandler}>
            <p>
              <label>Price</label>
              <p>
                <input
                  type="text"
                  value={price}
                  onChange={priceChangeHandler}
                  required
                />
              </p>
            </p>
            <p>
              <label>Quantity Available</label>
              <p>
                <input
                  className="form-control"
                  type="text"
                  value={quantity}
                  onChange={quantityChangeHandler}
                  required
                />
              </p>
            </p>
            <p>
              <label>Primary Image</label>
              <p>
                <input
                  type="file"
                  onChange={primaryImageChangeHandler}
                  required
                />
              </p>
            </p>
            <p>
              <label>More Images</label>
              <p>
                <input
                  type="file"
                  onChange={secondaryImagesChangeHandler}
                  multiple
                />
              </p>
            </p>
            <p>
              <p>
                {fieldValues.map((fl) => (
                  <div key={Math.random()}>
                    <label>{Object.keys(fl)}</label>
                    <p>
                      <select
                        size="0"
                        style={{ marginLeft: "10%" }}
                        name={Object.keys(fl)}
                        value={selectValue}
                        onChange={selectChangeHandler}
                        required
                      >
                        <option value="default">Choose</option>
                        {Object.values(fl).map((v) =>
                          v
                            .split(",")
                            .map((el, i) => <option key={i}>{el}</option>)
                        )}
                      </select>
                    </p>
                  </div>
                ))}
              </p>
            </p>
            <div>
              <div>
                <Button btnType="Success">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <div>{form}</div>;
};

export default AddVariationV2;
