import axios from "axios";
import * as actionTypes from "./actionTypes";

//get customer profile
export const fetchCustomerProfileSuccess = (customer) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_PROFILE_SUCCESS,
    customer: customer,
  };
};

export const fetchCustomerProfileFail = (error) => {
  return {
    type: actionTypes.FETCH_CUSTOMER_PROFILE_FAIL,
    error: error,
  };
};

export const fetchCustomerProfileStart = () => {
  return {
    type: actionTypes.FETCH_CUSTOMER_PROFILE_START,
  };
};

export const fetchCustomerProfile = () => {
  return (dispatch) => {
    dispatch(fetchCustomerProfileStart());
    axios
      .get("http://localhost:8080/ecommerce/customer/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Fetched user is : ", response.data);
        dispatch(fetchCustomerProfileSuccess(response.data));
      })
      .catch((error) => {
        console.log("ERROR is : ", error.response.data.message);
        dispatch(fetchCustomerProfileFail(error.response.data.message));
      });
  };
};

//get customer address
export const fetchCustomerAddressSuccess = (addresses) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_SUCCESS,
    addresses: addresses,
  };
};

export const fetchCustomerAddressFail = (error) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_FAIL,
    error: error,
  };
};

export const fetchCustomerAddressStart = () => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_START,
  };
};

export const fetchCustomerAddress = (token) => {
  return (dispatch) => {
    dispatch(fetchCustomerAddressStart());
    axios
      .get("http://localhost:8080/ecommerce/customer/address", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log("Fetched user address is : ", response.data);
        dispatch(fetchCustomerAddressSuccess(response.data));
      })
      .catch((error) => {
        console.log("ERROR is : ", error.response);
        dispatch(fetchCustomerAddressFail(error.response));
      });
  };
};

//delete customer address
export const deleteCustomerAddressSuccess = (response) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_SUCCESS,
    response: response,
  };
};

export const deleteCustomerAddressFail = (error) => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_FAIL,
    error: error,
  };
};

export const deleteCustomerAddressStart = () => {
  return {
    type: actionTypes.DELETE_CUSTOMER_ADDRESS_START,
  };
};

export const onDeleteCustomerAddress = (addressId) => {
  return (dispatch) => {
    dispatch(deleteCustomerAddressStart());
    axios({
      method: "DELETE",
      url: "http://localhost:8080/ecommerce/customer/" + addressId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("Fetched user address is : ", response.data);
        alert(response.data)
        dispatch(deleteCustomerAddressSuccess(response.data));
      })
      .catch((error) => {
        console.log("ERROR is : ", error.response);
        dispatch(deleteCustomerAddressFail(error.response));
      });
  };
};

// add customer address
export const addCustomerAddressSuccess = (response) => {
  return {
    type: actionTypes.ADD_CUSTOMER_ADDRESS_SUCCESS,
    response: response,
  };
};

export const addCustomerAddressFail = (error) => {
  return {
    type: actionTypes.ADD_CUSTOMER_ADDRESS_FAIL,
    error: error,
  };
};

export const addCustomerAddressStart = () => {
  return {
    type: actionTypes.ADD_CUSTOMER_ADDRESS_START,
  };
};

export const onAddCustomerAddress = (addressData) => {
  return (dispatch) => {
    dispatch(addCustomerAddressStart());
    axios({
      method: "POST",
      url: "http://localhost:8080/ecommerce/customer/",
      data: addressData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("metadata : ", response.data);
        alert(response.data);
        dispatch(addCustomerAddressSuccess(response.data));
      })
      .catch((error) => {
        console.log(" error is : ", error.response.data.message);
        alert(error.response.data.message);
        dispatch(addCustomerAddressFail(error.response.data.message));
      });
  };
};

//update customer address
export const updateCustomerAddressSuccess = (response) => {
  return {
    type: actionTypes.UPDATE_CUSTOMER_ADDRESS_SUCCESS,
    response: response,
  };
};

export const updateCustomerAddressFail = (error) => {
  return {
    type: actionTypes.UPDATE_CUSTOMER_ADDRESS_FAIL,
    error: error,
  };
};

export const updateCustomerAddressStart = () => {
  return {
    type: actionTypes.UPDATE_CUSTOMER_ADDRESS_START,
  };
};

export const onUpdateCustomerAddress = (addressData,addressId) => {
  return (dispatch) => {
    dispatch(updateCustomerAddressStart());
    axios({
      method: "PUT",
      url: "http://localhost:8080/ecommerce/customer/"+addressId,
      data: addressData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("metadata : ", response.data);
        alert(response.data);
        dispatch(updateCustomerAddressSuccess(response.data));
      })
      .catch((error) => {
        console.log(" error is : ", error.response.data.message);
        alert(error.response.data.message);
        dispatch(updateCustomerAddressFail(error.response.data.message));
      });
  };
};
