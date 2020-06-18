import React, { useEffect, useState } from "react";
//import axios from "../../axios-ecommerce";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./CustomerProfile.module.css";
import ProfileImage from "../../assets/images/Profile.jpg";
import Button from "../../components/UI/Button/Button";
import Aux from "../../hoc/Aux/aux";
import AddressView from "./AddressView";
import UpdateCustomerProfile from "./UpdateProfile/UpdateCustomerProfile";
import AddCustomerAddress from "../Address/AddCustomerAddress";
import axios from "axios";

const CustomerProfile = React.memo((props) => {
  const { onFetchCustomerProfile } = props;

  const [view, setView] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [isAdd, setIsAdd] = useState(false);

  const [profileImage, setProfileImage] = useState();

  console.log("Token is : ", localStorage.getItem("token"));

  useEffect(() => {
    onFetchCustomerProfile();
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

  let customerProfile = null;

  let errorMessage = null;

  if (props.error != null) {
    errorMessage = (
      <div className={classes.CustomerProfile}>
        <h4>{props.error}</h4>
      </div>
    );
  }

  const switchAddressHandler = () => {
    console.log("Address view clicked");
    setView(!view);
  };

  const editProfileHandler = () => {
    setIsEdit(!isEdit);
  };

  const addAddressHandler = () => {
    setIsAdd(!isAdd);
  };

  let addressView = null;
  if (view) {
    addressView = <AddressView />;
  }

  let editProfile = null;
  if (isEdit) {
    editProfile = <UpdateCustomerProfile passedProfile={props.profile} />;
  }

  let addAddress = null;
  if (isAdd) {
    addAddress = <AddCustomerAddress />;
  }

  console.log("Address view is : ", addressView);

  if (props.profile !== null) {
    customerProfile = (
      <div className={classes.CustomerProfile}>
        <h1> USER PROFILE </h1>
        <img alt="Profile" src={profileImage} />
        <p>
          <strong>Username : {props.profile.username}</strong>
        </p>
        <p>
          <strong>First Name : {props.profile.firstName}</strong>
        </p>
        <p>
          <strong>Last Name : {props.profile.lastName}</strong>
        </p>
        <p>
          <strong>Mobile Number : {props.profile.mobileNo}</strong>
        </p>
        <p>
          {/* <Button  btnType="Success"> */}
          {!view ? (
            <Button clicked={switchAddressHandler} btnType="Success">
              Show Address
            </Button>
          ) : (
            <Button clicked={switchAddressHandler} btnType="Success">
              Hide
            </Button>
          )}
          {/* </Button> */}

          {/* <Button clicked={editProfileHandler} btnType="Success"> */}
          {!isEdit ? (
            <Button clicked={editProfileHandler} btnType="Success">
              Edit Profile
            </Button>
          ) : (
            <Button clicked={editProfileHandler} btnType="Success">
              Hide
            </Button>
          )}
          {/* </Button> */}
          {!isAdd ? (
            <Button clicked={addAddressHandler} btnType="Success">
              Add Address
            </Button>
          ) : (
            <Button clicked={addAddressHandler} btnType="Success">
              Hide
            </Button>
          )}
        </p>
      </div>
    );
  }

  return (
    <Aux>
      <div>
        {errorMessage}
        {customerProfile}
      </div>
      <div>{addressView}</div>
      <div>{editProfile}</div>
      <div>{addAddress}</div>
    </Aux>
  );
});

const mapStateToProps = (state) => {
  return {
    addresses: state.customer.addresses,
    profile: state.customer.customer,
    loading: state.customer.loading,
    error: state.customer.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCustomerProfile: () => dispatch(actions.fetchCustomerProfile()),
    onFetchCustomerAddress: () => dispatch(actions.fetchCustomerAddress()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(CustomerProfile, axios));
