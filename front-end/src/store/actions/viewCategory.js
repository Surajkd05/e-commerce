import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCategoriesByIdSuccess = (categoriesById) => {
  return {
    type: actionTypes.FETCH_CATEGORIESBYID_SUCCESS,
    categoriesById: categoriesById,
  };
};

export const fetchCategoriesByIdFail = (error) => {
  return {
    type: actionTypes.FETCH_CATEGORIESBYID_FAIL,
    error: error,
  };
};

export const fetchCategoriesByIdStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIESBYID_START,
  };
};

export const fetchCategoriesById = (id) => {
  return (dispatch) => {
    dispatch(fetchCategoriesByIdStart());
    axios
      .get("http://localhost:8080/ecommerce/admin/category/"+id)
      .then((res) => {
        console.log("Fetched category is : ",res.data)
        dispatch(fetchCategoriesByIdSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchCategoriesByIdFail(error));
      });
  };
};

