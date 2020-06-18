import React, { useState, useEffect } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios";
import ViewCategory from "../../components/category/ViewCategory";

const ViewCategoryById = React.memo((props) => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://localhost:8080/ecommerce/admin/category/" + props.passedViewId,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setLoading(false);
        setCategories(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error is : ", error);
      });
  }, [props.passedViewId]);

  if (loading) {
    return <Spinner />;
  }

  if (categories) {
    return <ViewCategory passedCategories={categories} />;
  }
});

export default ViewCategoryById;
