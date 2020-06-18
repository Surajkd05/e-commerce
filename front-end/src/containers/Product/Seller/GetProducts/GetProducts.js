import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "./GetProducts.module.css";
import Button from "../../../../components/UI/Button/Button";
import Aux from "../../../../hoc/Aux/aux";

const GetProducts = (props) => {

  const [products, setProducts] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ecommerce/seller/product", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Fetched products are : ", response.data);
        setProducts(response.data);
        setIsFetched(true);
      })
      .catch((error) => {
        console.log("Error is : ", error.response);
        console.log("ERROR is : ", error.response.data.message);
      });
  }, []);

  const addProductVariationHandler = (
    productId,
    fieldValueMap,
    categoryName,
    parentId,
    categoryId
  ) => {
    props.history.push({
      pathname: "/addVariation",
      state: {
        id: productId,
        fieldValues: fieldValueMap,
        categoryName: categoryName,
        parentId: parentId,
        categoryId: categoryId,
      },
    });
  };

  const getProductByIdHandler = (productId) => {
    props.history.push({
      pathname: "/productById",
      state: { id: productId },
    });
  };

  const viewVariationByIdHandler = (productId, productName, description, brand) => {
    props.history.push({
      pathname: "/productVariationById",
      state: { id: productId, productName: productName, description: description, brand: brand },
    });
  };

  const deleteProductByIdHandler = (productId) => {
    axios
      .delete("http://localhost:8080/ecommerce/seller/product/" + productId, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        alert(error.response);
      });
  };

  let productFetched = null;
  if (isFetched) {
    console.log("Products are : ", products);
    productFetched = (
      <section className={classes.UserView}>
        <h4>Fetched Products</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Category Name</Th>
              <Th>Company Name</Th>
              <Th>Product Name</Th>
              <Th>Brand</Th>
              <Th>Description</Th>
              <Th>Deleted</Th>
              <Th>Returnable</Th>
              <Th>Cancellable</Th>
              <Th>AddVariation</Th>
              <Th>ViewVariation</Th>
              <Th>View Details</Th>
              <Th>Delete Product</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, count) => (
              <Tr key={product.id}>
                <Td key={product.id}>{count + 1}</Td>

                <Td>{product.categoryChild.categoryName}</Td>
                <Td>{product.companyName}</Td>
                <Td>{product.productName}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.description}</Td>
                <Td>{product.isDeleted}</Td>
                <Td>{product.isReturnable}</Td>
                <Td>{product.isCancellable}</Td>
                <Td>
                  <Button
                    clicked={() =>
                      addProductVariationHandler(
                        product.id,
                        product.categoryChild.fieldValueMaps,
                        product.categoryChild.categoryName,
                        product.categoryChild.parentId,
                        product.categoryChild.categoryId
                      )
                    }
                    btnType="Success"
                  >
                    Add
                  </Button>
                </Td>
                <Td>
                  <Button
                    clicked={() =>
                      viewVariationByIdHandler(
                        product.id,
                        product.productName,
                        product.description,
                        product.brand
                      )
                    }
                    btnType="Success"
                  >
                    View
                  </Button>
                </Td>
                <Td>
                  <Button
                    clicked={() => getProductByIdHandler(product.id)}
                    btnType="Success"
                  >
                    View
                  </Button>
                </Td>
                <Td>
                  <Button
                    clicked={() => deleteProductByIdHandler(product.id)}
                    btnType="Danger"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    );
  }

  return (
    <Aux>
      <div>{productFetched}</div>
      <div></div>
    </Aux>
  );
};

export default GetProducts;
