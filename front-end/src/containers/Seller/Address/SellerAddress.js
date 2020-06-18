import React, { useState } from "react";
import classes from "./SellerAddress.module.css";
import Button from "../../../components/UI/Button/Button";
import SellerAddressUpdate from "../../../components/seller/SellerAddressUpdate";
import Aux from "../../../hoc/Aux/aux";

const SellerAddress = (props) => {
  console.log("Passed address is : ", props.passedAddress);
  const [isEdit, setIsEdit] = useState(false);

  const [address] = props.passedAddress;

  console.log("Address is : ", address);

  const editAddressHandler = () => {
    setIsEdit(!isEdit);
  };

  let updateAddress = null;
  if (isEdit) {
    updateAddress = (
      <SellerAddressUpdate passedAddress={address} passedId={address.id} />
    );
  }

  let addressView = null;
  if (address !== null) {
    addressView = (
      <div className={classes.SellerAddress}>
        <h3> SELLER ADDRESS </h3>
        <p>
          <strong>Block : {address.block}</strong>
        </p>
        <p>
          <strong>Plot Number : {address.plotNumber}</strong>
        </p>
        <p>
          <strong>Sector Number : {address.sectorNumber}</strong>
        </p>
        <p>
          <strong>Street Name : {address.streetName}</strong>
        </p>
        <p>
          <strong>City : {address.city}</strong>
        </p>
        <p>
          <strong>District : {address.district}</strong>
        </p>
        <p>
          <strong>State : {address.state}</strong>
        </p>
        <p>
          <strong>Country : {address.country}</strong>
        </p>
        <p>
          <strong>Label : {address.label}</strong>
        </p>
        <p>
          <strong>ZipCode : {address.zipCode}</strong>
        </p>
        <p>
          {!isEdit ? (
            <Button clicked={editAddressHandler} btnType="Success">
              Edit Address
            </Button>
          ) : (
            <Button clicked={editAddressHandler} btnType="Success">
              Hide
            </Button>
          )}
        </p>
      </div>
    );
  }

  return (
    <Aux>
      <div>{addressView}</div>
      <div>{updateAddress}</div>
    </Aux>
  );
};

export default SellerAddress;
