import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ProfileImage from "../../assets/images/Profile.jpg";
import classes from "./SellerProfile.module.css";
import axios from "axios";
import SellerAddress from "./Address/SellerAddress";
import Button from "../../components/UI/Button/Button";
import Aux from "../../hoc/Aux/aux";
import UpdateSellerProfile from "./UpdateProfile/UpdateSellerProfile";

const SellerProfile = (props) => {
  const { onFetchSellerProfile } = props;

  const [seller, setSeller] = useState();
  const [loading, setLoading] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    //onFetchSellerProfile();
    axios
      .get("http://localhost:8080/ecommerce/seller/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Fetched user is : ", response.data);
        setSeller(response.data);
        setIsFetched(true);

      })
      .catch((error) => {
        console.log("Error is : ", error.response);
        console.log("ERROR is : ", error.response.data.message);
      });

      fetch("http://localhost:8080/ecommerce/image/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.blob())
      .then((image) => {
        let outside = URL.createObjectURL(image);
        setProfileImage(outside);
        console.log()
      })
      .catch((err) => console.error(err));
  }, []);
  
  const switchAddressHandler = () => {
    setIsView(!isView);
  };

  const editProfileHandler = () => {
    setIsEdit(!isEdit);
  };

  let addressView = null;

  if (isView) {
    addressView = <SellerAddress passedAddress={seller.addresses} />;
  }

  let updateProfile = null;
  if(isEdit){
    updateProfile = <UpdateSellerProfile passedProfile = {seller} />
  }

  let sellerProfile = null;
  if (isFetched) {
    sellerProfile = (
      <div className={classes.SellerProfile}>
        <h3> USER PROFILE </h3>
        <img alt="Profile" src={profileImage} />
        <p>
          <strong>Username : {seller.username}</strong>
        </p>
        <p>
          <strong>First Name : {seller.firstName}</strong>
        </p>
        <p>
          <strong>Last Name : {seller.lastName}</strong>
        </p>
        <p>
          <strong>Company Name : {seller.companyName}</strong>
        </p>
        <p>
          <strong>Company Contact : {seller.companyContact}</strong>
        </p>
        <p>
          <strong>GST Number : {seller.gst}</strong>
        </p>
        <p>
          {!isView ? (
            <Button clicked={switchAddressHandler} btnType="Success">
              Show Address
            </Button>
          ) : (
            <Button clicked={switchAddressHandler} btnType="Success">
              Hide
            </Button>
          )}
          {!isEdit ? (
            <Button clicked={editProfileHandler} btnType="Success">
              Edit Profile
            </Button>
          ) : (
            <Button clicked={editProfileHandler} btnType="Success">
              Hide
            </Button>
          )}
        </p>
      </div>
    );
  }

  return (
    <Aux>
      <div>{sellerProfile}</div>
      <div>{addressView}</div>
      <div>{updateProfile}</div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.seller.loading,
    seller: state.seller.seller,
    error: state.seller.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSellerProfile: () => dispatch(actions.fetchSellerProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfile);
