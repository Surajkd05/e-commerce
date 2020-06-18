import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import cart from "../../../assets/images/cart.webp";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Home
    </NavigationItem>
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/admin" active>
        UserInfo
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/addMetaData" active>
        MetaData
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/getMetaData" active>
        MetaDataView
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/addCategory" active>
        AddCategory
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/value" active>
        AddValue
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/getCategory" active>
        GetCategory
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "admin" ? (
      <NavigationItem link="/updateValue" active>
        Update MetaData Value
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/profileImage" active>
        UploadImage
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "cust" ? (
      <NavigationItem link="/customer/profile" active>
        Profile
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "cust" ? (
      <NavigationItem link="/updatePassword" active>
        Update Password
      </NavigationItem>
    ) : null}

    <NavigationItem link="/cart">
      Cart
      <i className="material-icons">
        <img src={cart} alt="" style={{ width: "30px", height: "30px" }} />
      </i>
    </NavigationItem>

    {props.isAuthenticated && localStorage.getItem("role") === "sell" ? (
      <NavigationItem link="/seller/profile" active>
        Seller Profile
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "sell" ? (
      <NavigationItem link="/updateSellerPassword" active>
        Update Password
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "sell" ? (
      <NavigationItem link="/sellerCategory" active>
        Get Category
      </NavigationItem>
    ) : null}
    {props.isAuthenticated && localStorage.getItem("role") === "sell" ? (
      <NavigationItem link="/sellerProducts" active>
        Get Product
      </NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/forgotPassword" active>
        ForgotPassword
      </NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/resetPassword" active>
        ResetPassword
      </NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Auth</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
