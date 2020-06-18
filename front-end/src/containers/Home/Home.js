import React, { Component } from "react";
import Aux from "../../hoc/Aux/aux";
import classes from "./Home.module.css";
import Slideshow from "./SlideShow/SlideShow";

class Home extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.Home}>
          <h1>Shopping? No Worry! OnGo Shopping</h1>
        </div>
        <div>
          <Slideshow />
        </div>
  
      </Aux>
    );
  }
}

export default Home;
