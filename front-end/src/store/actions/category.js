import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories: categories,
  };
};

export const fetchCategoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAIL,
    error: error,
  };
};

export const fetchCategoriesStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_START,
  };
};

export const fetchCategories = (token) => {
  return (dispatch) => {

    dispatch(fetchCategoriesStart());
    axios
    .get("http://localhost:8080/ecommerce/admin/category", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        console.log("Fetched category is : ", res.data);
        dispatch(fetchCategoriesSuccess(res.data));
      })
      .catch((error) => {
        console.log("ERROR is : ", error);
        console.log("ERROR is : ", error.response);
        dispatch(fetchCategoriesFail(error));
      });
  };
};
