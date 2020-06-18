import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import authReducer from "./store/reducers/auth";
import redirectReducer from "./store/reducers/redirect";
import categoryReducer from "./store/reducers/category";
import sellerRegisterReducer from "./store/reducers/sellerRegister";
import categoryByIdReducer from "./store/reducers/viewCategory";
import customerReducer from "./store/reducers/customer";
import sellerReducer from "./store/reducers/seller";
import thunk from "redux-thunk";
import productReducer from "./store/reducers/product"

const rootReducer = combineReducers({
  auth: authReducer,
  redirect: redirectReducer,
  category: categoryReducer,
  sellerRegister: sellerRegisterReducer,
  categoryById: categoryByIdReducer,
  customer: customerReducer,
  seller: sellerReducer,
  product: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
