import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Search from "../../../containers/Search/Search";
import CustomerCategory from "../../../containers/Customer/Category/CustomerCategory";
import SideDrawer from "../SideDrawer/SideDrawer";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />

    <div className={classes.Logo}>
      <Logo />
    </div>
    <div>
      {props.isAuth && localStorage.getItem("role") === "cust" ? (
        <CustomerCategory />
      ) : (
        <button className="btn btn-secondary" disabled style={{cursor:"pointer"}}>
          ViewCategories
        </button>
      )}
    </div>
    <nav className={classes.DesktopOnly}>
      <Search />
    </nav>

    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>

  </header>
);

export default toolbar;
