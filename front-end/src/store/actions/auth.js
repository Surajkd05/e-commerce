import * as actionTypes from "./actionTypes";
import axios from "axios";
import qs from "qs";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  if (localStorage.getItem("token") !== null) {
    axios
      .get("http://localhost:8080/ecommerce/logout/doLogout", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("role");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (login) => {
  return (dispatch) => {
    dispatch(authStart());

    const loginData = {
      grant_type: "password",
      client_id: "live-test",
      client_secret: "abcde",
    };

    for (let key in login) {
      if (key !== "role") {
        loginData[key] = login[key].value;
      }
    }

    axios
      .post(
        "http://localhost:8080/ecommerce/oauth/token",
        qs.stringify(loginData)
      )
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expires_in * 1000
        );
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expirationDate", expirationDate);
        //dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authSuccess(response.data.access_token));
        dispatch(checkAuthTimeout(response.data.expires_in));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authRedirect = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        //const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
