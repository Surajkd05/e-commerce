import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  seller: null,
  loading: false,
  error: null,
};

//get seller profile
const fetchSellerProfileStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchSellerProfileSuccess = (state, action) => {
  return updateObject(state, {
    seller: action.seller,
    loading: false,
  });
};

const fetchSellerProfileFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//update seller address
const updateSellerAddressStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateSellerAddressSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const updateSellerAddressFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SELLER_PROFILE_START:
      return fetchSellerProfileStart(state, action);
    case actionTypes.FETCH_SELLER_PROFILE_SUCCESS:
      return fetchSellerProfileSuccess(state, action);
    case actionTypes.FETCH_SELLER_PROFILE_FAIL:
      return fetchSellerProfileFail(state, action);
    case actionTypes.UPDATE_SELLER_ADDRESS_START:
      return updateSellerAddressStart(state, action);
    case actionTypes.UPDATE_SELLER_ADDRESS_SUCCESS:
      return updateSellerAddressSuccess(state, action);
    case actionTypes.UPDATE_SELLER_ADDRESS_FAIL:
      return updateSellerAddressFail(state, action);
    default:
      return state;
  }
};

export default reducer;
