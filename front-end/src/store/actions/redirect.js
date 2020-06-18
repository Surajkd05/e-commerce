import actionTypes from "./actionTypes"

export const redirectPath = (path) => {
    return {
      type: actionTypes.REDIRECT_PATH,
      path: path,
    };
  };