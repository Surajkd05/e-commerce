import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  categoriesById: [],
  loading: false,
};

const fetchCategoriesByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCategoriesByIdSuccess = (state, action) => {
  console.log("Category by id in reducer : ", action.categoriesById);
  return updateObject(state, {
    categoriesById: action.categoriesById,
    loading: false,
  });
};

const fetchCategoriesByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIESBYID_START:
      return fetchCategoriesByIdStart(state, action);
    case actionTypes.FETCH_CATEGORIESBYID_SUCCESS:
      return fetchCategoriesByIdSuccess(state, action);
    case actionTypes.FETCH_CATEGORIESBYID_FAIL:
      return fetchCategoriesByIdFail(state, action);
    default:
      return state;
  }
};

export default reducer;
