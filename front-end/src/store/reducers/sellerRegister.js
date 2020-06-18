import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  sellerInfo: null,
};

const addSellerInfo = (state, action) => {
    console.log("IN reducer : ",action.register)
  return updateObject(state, { loading: false, sellerInfo: action.register });
};

const registerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const registerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SELLER_INFO:
      return addSellerInfo(state, action);
    case actionTypes.SELLER_REGISTER_START:
      return registerStart(state, action);
    case actionTypes.SELLER_REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.SELLER_REGISTER_FAIL:
      return registerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
