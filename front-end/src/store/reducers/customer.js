import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  customer: null,
  loading: false,
  error: null,  
  response: null,
  addresses: []
};

//get customer profile
const fetchCustomerProfileStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCustomerProfileSuccess = (state, action) => {
  return updateObject(state, {
    customer : action.customer,
    loading: false,
  });
};

const fetchCustomerProfileFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//get customer address

const fetchCustomerAddressStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCustomerAddressSuccess = (state, action) => {
  return updateObject(state, {
    addresses : action.addresses,
    loading: false,
  });
};

const fetchCustomerAddressFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//delete customer address
const deleteCustomerAddressStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteCustomerAddressSuccess = (state, action) => {
  return updateObject(state, {
    response : action.response,
    loading: false,
  });
};

const deleteCustomerAddressFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//add customer address
const addCustomerAddressStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addCustomerAddressSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const addCustomerAddressFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//update customer address
const updateCustomerAddressStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateCustomerAddressSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const updateCustomerAddressFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CUSTOMER_PROFILE_START:
      return fetchCustomerProfileStart(state, action);
    case actionTypes.FETCH_CUSTOMER_PROFILE_SUCCESS:
      return fetchCustomerProfileSuccess(state, action);
    case actionTypes.FETCH_CUSTOMER_PROFILE_FAIL:
      return fetchCustomerProfileFail(state, action);
    case actionTypes.FETCH_CUSTOMER_ADDRESS_START:
      return fetchCustomerAddressStart(state, action);
    case actionTypes.FETCH_CUSTOMER_ADDRESS_SUCCESS:
      return fetchCustomerAddressSuccess(state, action);
    case actionTypes.FETCH_CUSTOMER_ADDRESS_FAIL:
      return fetchCustomerAddressFail(state, action);
    case actionTypes.DELETE_CUSTOMER_ADDRESS_START:
      return deleteCustomerAddressStart(state, action);
    case actionTypes.DELETE_CUSTOMER_ADDRESS_SUCCESS:
      return deleteCustomerAddressSuccess(state, action);
    case actionTypes.DELETE_CUSTOMER_ADDRESS_FAIL:
      return deleteCustomerAddressFail(state, action);
    case actionTypes.ADD_CUSTOMER_ADDRESS_START:
      return addCustomerAddressStart(state, action);
    case actionTypes.ADD_CUSTOMER_ADDRESS_SUCCESS:
      return addCustomerAddressSuccess(state, action);
    case actionTypes.ADD_CUSTOMER_ADDRESS_FAIL:
      return addCustomerAddressFail(state, action);
    case actionTypes.UPDATE_CUSTOMER_ADDRESS_START:
      return updateCustomerAddressStart(state, action);
    case actionTypes.UPDATE_CUSTOMER_ADDRESS_SUCCESS:
      return updateCustomerAddressSuccess(state, action);
    case actionTypes.UPDATE_CUSTOMER_ADDRESS_FAIL:
      return updateCustomerAddressFail(state, action);
    default:
      return state;
  }
};

export default reducer;
