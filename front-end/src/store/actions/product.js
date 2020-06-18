import * as actionTypes from "./actionTypes"
import axios from "axios"

//activate product
export const activateProductSuccess = (response) => {
    return {
      type: actionTypes.ACTIVATE_PRODUCT_SUCCESS,
      response: response,
    };
  };
  
  export const activateProductFail = (error) => {
    return {
      type: actionTypes.ACTIVATE_PRODUCT_FAIL,
      error: error,
    };
  };
  
  export const activateProductStart = () => {
    return {
      type: actionTypes.ACTIVATE_PRODUCT_START,
    };
  };
  
  export const onActivateProduct = (productId) => {
    return (dispatch) => {
      dispatch(activateProductStart());
      axios({
        method: "PUT",
        url: "http://localhost:8080/ecommerce/admin/product/"+productId+"/activate",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log("metadata : ", response.data);
          alert(response.data);
          dispatch(activateProductSuccess(response.data));
        })
        .catch((error) => {
          console.log(" error is : ", error.response.data.message);
          alert(error.response.data.message);
          dispatch(activateProductFail(error.response.data.message));
        });
    };
  };

  //deactivate product

  export const deActivateProductSuccess = (response) => {
    return {
      type: actionTypes.DEACTIVATE_PRODUCT_SUCCESS,
      response: response,
    };
  };
  
  export const deActivateProductFail = (error) => {
    return {
      type: actionTypes.DEACTIVATE_PRODUCT_FAIL,
      error: error,
    };
  };
  
  export const deActivateProductStart = () => {
    return {
      type: actionTypes.DEACTIVATE_PRODUCT_START,
    };
  };
  
  export const onDeActivateProduct = (productId) => {
    return (dispatch) => {
      dispatch(deActivateProductStart());
      axios({
        method: "PUT",
        url: "http://localhost:8080/ecommerce/admin/product/"+productId+"/deActivate",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log("metadata : ", response.data);
          alert(response.data);
          dispatch(deActivateProductSuccess(response.data));
        })
        .catch((error) => {
          console.log(" error is : ", error.response.data.message);
          alert(error.response.data.message);
          dispatch(deActivateProductFail(error.response.data.message));
        });
    };
  };
  
  