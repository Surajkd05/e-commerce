import axios from "axios"
import * as actionTypes from "./actionTypes"

//get seller profile
export const fetchSellerProfileSuccess = (seller) => {
    return {
      type: actionTypes.FETCH_SELLER_PROFILE_SUCCESS,
      seller: seller,
    };
  };
  
  export const fetchSellerProfileFail = (error) => {
    return {
      type: actionTypes.FETCH_SELLER_PROFILE_FAIL,
      error: error,
    };
  };
  
  export const fetchSellerProfileStart = () => {
    return {
      type: actionTypes.FETCH_SELLER_PROFILE_START,
    };
  };
  
  export const fetchSellerProfile = () => {
    return (dispatch) => {
      dispatch(fetchSellerProfileStart());
      axios
        .get("http://localhost:8080/ecommerce/seller/", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          console.log("Fetched user is : ", response.data);
          dispatch(fetchSellerProfileSuccess(response.data));
        })
        .catch((error) => {
          console.log("ERROR is : ", error.response.data.message);
          dispatch(fetchSellerProfileFail(error.response.data.message));
        });
    };
  };
  
//update seller address
export const updateSellerAddressSuccess = (response) => {
  return {
    type: actionTypes.UPDATE_SELLER_ADDRESS_SUCCESS,
    response: response,
  };
};

export const updateSellerAddressFail = (error) => {
  return {
    type: actionTypes.UPDATE_SELLER_ADDRESS_FAIL,
    error: error,
  };
};

export const updateSellerAddressStart = () => {
  return {
    type: actionTypes.UPDATE_SELLER_ADDRESS_START,
  };
};

export const onUpdateSellerAddress = (addressData,addressId) => {
  return (dispatch) => {
    dispatch(updateSellerAddressStart());
    axios({
      method: "PUT",
      url: "http://localhost:8080/ecommerce/seller/"+addressId,
      data: addressData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("metadata : ", response.data);
        alert(response.data);
        dispatch(updateSellerAddressSuccess(response.data));
      })
      .catch((error) => {
        console.log(" error is : ", error.response.data.message);
        alert(error.response.data.message);
        dispatch(updateSellerAddressFail(error.response.data.message));
      });
  };
};
