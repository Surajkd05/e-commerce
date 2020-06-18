import * as actionTypes from "./actionTypes";
import axios from "axios";

export const registerSuccess = () => {
    return {
      type: actionTypes.SELLER_REGISTER_SUCCESS,
    };
  };
  
  export const registerFailed = (error) => {
    return {
      type: actionTypes.SELLER_REGISTER_FAIL,
      error: error,
    };
  };
  
  export const registerStart = () => {
    return {
      type: actionTypes.SELLER_REGISTER_START,
    };
  };
  
// console.log("Registered as,", register.registerAs.value);
    // let responseData = null;
    // if (register.registerAs.value === "emp") {
    //   console.log("In employe block");
    //   responseData = axios.post(
    //     "http://localhost:8080/ecommerce/auth/customer",
    //     registerData
    //   );
    // } else {
    //   responseData = axios.post(
    //     "http://localhost:8080/college/auth/seller",
    //     registerData
    //   );
    // }
    // responseData
    //   .then((response) => {
    //     setLoading(false);
    //     console.log("Registered data response is", response);
    //     alert(response.data);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log("Error is", error);
    //   });

export const addSellerInfo = (register) => {
  return {
    type: actionTypes.ADD_SELLER_INFO,
    register: register,
  };
};

export const sellerRegister = (sellerRegisterData) => {
    console.log("added address is : ", sellerRegisterData)
    console.log("Added seller info is : ",addSellerInfo)
    return (dispatch) => {
        dispatch(registerStart());
        axios
          .post("http://localhost:8080/ecommerce/register/seller", sellerRegisterData)
          .then((response) => {
              console.log("Response in seller is : ",response)
              alert(response.data)
            dispatch(registerSuccess());
          })
          .catch((error) => {
            alert(error.response.data.message +" "+ error.response.data.details)
            dispatch(registerFailed(error));
          });
      };
}