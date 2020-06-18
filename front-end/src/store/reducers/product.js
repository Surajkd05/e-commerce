import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  error: null,
};

//activate product
const activateProductStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const activateProductSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const activateProductFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

//deActivate product
const deActivateProductStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deActivateProductSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const deActivateProductFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEACTIVATE_PRODUCT_START:
      return deActivateProductStart(state, action);
    case actionTypes.DEACTIVATE_PRODUCT_SUCCESS:
      return deActivateProductSuccess(state, action);
    case actionTypes.DEACTIVATE_PRODUCT_FAIL:
      return deActivateProductFail(state, action);
    case actionTypes.ACTIVATE_PRODUCT_START:
      return activateProductStart(state, action);
    case actionTypes.ACTIVATE_PRODUCT_SUCCESS:
      return activateProductSuccess(state, action);
    case actionTypes.ACTIVATE_PRODUCT_FAIL:
      return activateProductFail(state, action);
    default:
      return state;
  }
};

export default reducer;
