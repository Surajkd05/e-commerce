import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Admin from "./containers/Admin/Admin";
import ForgotPassword from "./containers/Password/ForgorPassword";
import ResetPassword from "./containers/Password/ResetPassword";
import UserProfile from "./containers/Image/UserProfile";
import MetaDataField from "./containers/Category/MetaDataField";
import MetaDataFields from "./containers/Category/MetaDataView";
import AddCategory from "./containers/Category/AddCategory";
import MetaDataFieldValueMain from "./containers/Category/MetaDataFieldValues/MetaDataFieldValueMain";
import GetCategory from "./containers/Category/GetCategory";
import CustomerRegister from "./containers/Auth/Register/RolePage/CustomerRegister";
import SellerRegister from "./containers/Auth/Register/RolePage/SellerRegister";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import AddressForm from "./containers/Address/Form/AddressForm";
import ViewCategory from "./containers/Category/ViewCategory";
import ResendActivation from "./containers/Auth/Login/ResendActivation";
import CustomerProfile from "./containers/Customer/CustomerProfile";
import UpdateCustomerPassword from "./containers/Password/UpdateCustomerPassword"
import SellerProfile from "./containers/Seller/SellerProfile";
import UpdateSellerPassword from "./containers/Password/UpdateSellerPassword";
import UpdateMetaDataFieldValue from "./containers/Category/MetaDataFieldValues/UpdateValues/UpdateMetaDataFieldValue";
import SellerCategory from "./containers/Category/Seller/SellerCategory";
import ProductById from "./containers/Product/Seller/ProductById";
import AddVariationV2 from "./containers/Product/Seller/Variation/AddVariationV2";
import UpdateProduct from "./containers/Product/Seller/UpdateProduct/UpdateProduct";
import GetProducts from "./containers/Product/Seller/GetProducts/GetProducts"
import CategoryView from "./components/category/CategoriesView";
import AllProducts from "./containers/Product/Admin/AllProducts";
import ImageDownload from "./containers/Image/GetImage";
import * as actions from "./store/actions/index"
import AddProduct from "./containers/Product/Seller/AddProduct/AddProduct";
import CustomerCategory from "./containers/Customer/Category/CustomerCategory";
import AllProductsCustomer from "./containers/Customer/Product/AllProductsCustomer";
import ProductView from "./containers/Customer/Product/ProductView";
import ProductVariation from "./containers/Customer/Product/ProductVariation/ProductVariation";
import ViewVariation from "./containers/Product/Seller/Variation/ViewVariations";
import VariationById from "./containers/Product/Seller/Variation/VariationById";
import UpdateVariation from "./containers/Product/Seller/Variation/UpdateVariation";
import Cart from "./containers/Customer/Cart/Cart";
import RemoveItem from "./containers/Customer/Cart/RemoveItem";


const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncLogin = asyncComponent(() => {
  return import("./containers/Auth/Login/Login")
})

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/sign-up/customer" component={Register} />
      <Route path="/customer" component={CustomerRegister} />
      <Route path="/seller" component={SellerRegister} />
      <Route path="/" exact component={Home} />
      <Route path="/address" component={AddressForm} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/admin" component={Admin} />
      <Route path="/cart" component={Cart} />
      <Route path="/resendActivation" component={ResendActivation} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated && localStorage.getItem("role") === "cust") {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={asyncLogin} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/updatePassword" component={UpdateCustomerPassword} />
        <Route path="/profileImage" component={UserProfile} />
        <Route path="/download" component={ImageDownload} />
        <Route path="/categories" component={CustomerCategory} />
        <Route path="/productById" component={AllProductsCustomer} />
        <Route path="/productVariations" component={ProductView} />
        <Route path="/productVariationsById" component={ProductVariation} />
        <Route path="/removeItem" component={RemoveItem} />
        <Route path="/cart" component={Cart} />
        <Route path="/logout" component={Logout} />
        
      </Switch>
    );
  }

  if(props.isAuthenticated && localStorage.getItem("role") === "sell"){
    routes = (
      <Switch>
        <Route path = "/seller/profile" component = {SellerProfile} />
        <Route path="/auth" component={asyncLogin} />
        <Route path="/updateSellerPassword" component={UpdateSellerPassword} />
        <Route path="/profileImage" component={UserProfile} />
        <Route path="/sellerCategory" component={SellerCategory} />
        <Route path="/sellerProducts" component={GetProducts} />
        <Route path="/productById" component={ProductById} />
        <Route path="/addVariation" component={AddVariationV2} />
        <Route path="/updateProduct" component={UpdateProduct} />
        <Route path="/productVariationById" component={ViewVariation} />
        <Route path="/productVariations1ById" component={VariationById} />
        <Route path="/updateVariation" component={UpdateVariation} />
        <Route path="/addProduct" component = {AddProduct}/>
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Home} />
      </Switch>
    )
  }

  if (props.isAuthenticated && localStorage.getItem("role") === "admin") {
    routes = (
      <Switch>
        <Route path="/auth" component={asyncLogin} />
        <Route path="/admin" component={Admin} />
        <Route path="/viewCategory" component={ViewCategory} />
        <Route path="/logout" component={Logout} />
        <Route path="/viewCategoryById" component={ViewCategory} />
        <Route path="/viewProductsByCategoryId" component={AllProducts} />
        <Route path="/profile" component={CustomerProfile} />
        <Route path="/addMetaData" component={MetaDataField} />
        <Route path="/getMetaData" component={MetaDataFields} />
        <Route path="/profileImage" component={UserProfile} />
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/value" component={MetaDataFieldValueMain} />
        <Route path="/updateValue" component={UpdateMetaDataFieldValue} />
        <Route path="/getCategory" component={GetCategory} />
        <Route path="/allCategories" component={CategoryView} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
      <div className="App">
        <Layout isAuthenticated={props.isAuthenticated} >{routes}</Layout>
      </div>
  );
};

const mapStateToProps = (state) => {
  console.log("Token in app is : ", state.auth.token);
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
