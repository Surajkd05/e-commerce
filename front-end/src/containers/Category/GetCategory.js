import React, { useEffect, useState } from "react"
import axios from "../../axios-ecommerce"
import { connect } from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"
import * as actions from "../../store/actions/index"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import CategoryView from "../../components/category/CategoriesView"

const GetCategory = (props) => {
    const { onFetchCategories } = props
    const [categoriesFetched, setCategoriesFetched] = useState()
    const [loading, setLoading] = useState(true)
    console.log("Token is : ",localStorage.getItem("token"))
    useEffect(() => {
      //onFetchCategories(localStorage.getItem("token"));
      axios
      .get("http://localhost:8080/ecommerce/admin/category", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          console.log("Fetched category is : ", res.data);
          setCategoriesFetched(res.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log("ERROR is : ", error);
          console.log("ERROR is : ", error.response);
         alert(error.response.data.message)
        });
    }, []);

    console.log("Category come in props is : ",props.categories)
  
    let categories = <Spinner />;
    if (!loading) {
      //categories = <CategoryView passedCategories = {props.categories}/>
     // const categories = props.categories
      props.history.push({
        pathname: "/allCategories",
        state: { categories: categoriesFetched  },
      });
    }
    return <div>{categories}</div>;
  };
  
  const mapStateToProps = (state) => {
    return {
      categories: state.category.categories,
      loading: state.category.loading,
      token: state.auth.token
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchCategories: (token) =>
        dispatch(actions.fetchCategories(token)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(GetCategory, axios));
  