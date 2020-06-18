import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  categories: [],
  categoriesById: [],
  loading: false,
};

const fetchCategoriesByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCategoriesByIdSuccess = (state, action) => {
  return updateObject(state, {
    categoriesById: action.categoriesById,
    loading: false,
  });
};

const fetchCategoriesByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchCategoriesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    loading: false,
  });
};

const fetchCategoriesFail = (state, action) => {
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
    case actionTypes.FETCH_CATEGORIES_START:
      return fetchCategoriesStart(state, action);
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, action);
    case actionTypes.FETCH_CATEGORIES_FAIL:
      return fetchCategoriesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
