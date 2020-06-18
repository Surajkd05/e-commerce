import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Button from "../../../components/UI/Button/Button";
import Aux from "../../../hoc/Aux/aux";
import classes from "./SellerCategory.module.css"

const SellerCategory = (props) => {
  const [categories, setCategories] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ecommerce/seller/category", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Fetched user is : ", response.data);
        setCategories(response.data);
        setIsFetched(true);
      })
      .catch((error) => {
        console.log("Error is : ", error.response);
        console.log("ERROR is : ", error.response.data.message);
      });
  }, []);

  let sellerCategory = null;

  const addProductHandler = (categoryId) => {
    props.history.push({
      pathname: "/addProduct",
      state: { id: categoryId },
    });
  }

  if (isFetched) {
    sellerCategory = (
      <section className={classes.UserView}>
      <Table>
        <Thead>
          <Tr>
            <Th>Category Name</Th>
            <Th>Category Child</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr>
              <Td>{category.categoryName}</Td>
              <Tr>
                {category.categoryChildList.map((child) => (
                  <Td>
                    <p>{child.categoryName}</p>{" "}
                    <p>
                  
                        <Button
                          clicked={() => addProductHandler(child.categoryId)}
                          btnType="Success"
                        >
                          Add Product
                        </Button>
                    </p>
                  </Td>
                ))}
              </Tr>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </section>
    );
  }

  return (
    <Aux>
      <div>{sellerCategory}</div>
      {/* <div>{addProduct}</div> */}
    </Aux>
  );
};

export default SellerCategory;
