import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  redirectPath: "/",
};

const redirectPath = (state, action) => {
  return updateObject(state, { redirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REDIRECT_PATH:
      return redirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
