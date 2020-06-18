import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Aux from "../../../hoc/Aux/aux";
import classes from "./AllProducts.module.css"
import Button from "../../../components/UI/Button/Button"
import * as actions from "../../../store/actions/index"
import { connect } from "react-redux";

const AllProducts = (props) => {
  console.log("In products : ", props);
  const [products, setProducts] = useState();
  const categoryId = props.history.location.state.categoryId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ecommerce/admin/" + categoryId + "/product", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const activateProductHandler = (id) => {
    setLoading(true)
    props.activateProduct(id)
    setLoading(false)
  }

  const deActivateProductHandler = (id) => {
    setLoading(true)
    props.deActivateProduct(id)
    setLoading(false)
  }

  console.log("All products byid is : ",products)

  let allProducts = null

  if(loading){
    allProducts = <Spinner />
  }

  if (!loading) {
    allProducts = (
      <section className={classes.AllProducts}>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Product Name</Th>
              <Th>Brand</Th>
              <Th>Description</Th>
              <Th>Is Active</Th>
              <Th>Is Deleted</Th>
              <Th>Is Cancellable</Th>
              <Th>Is Returnable</Th>
              <Th>Activate</Th>
              <Th>Deactivate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.productList.map((product, count) => (
              <Tr key={product.id}>
                <Td key={product.id}>{count + 1}</Td>

                <Td>{product.productName}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.description}</Td>
                <Td>{String(product.active)}</Td>
                <Td>{String(product.deleted)}</Td>
                <Td>{String(product.cancellable)}</Td>
                <Td>{String(product.returnable)}</Td>
                <Td>
                <Button
                  clicked={() => activateProductHandler(product.id)}
                  btnType="Success"
                >
                  Activate
                </Button>
              </Td>
              <Td>
                <Button
                  clicked={() => deActivateProductHandler(product.id)}
                  btnType="Danger"
                >
                  DeActivate
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
      <div className={classes.AllProducts}>
        <h4>All Products</h4>
      </div>
      <div>{allProducts}</div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.product.error,
    loading: state.product.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    activateProduct: (id) => dispatch(actions.onActivateProduct(id)),
    deActivateProduct: (id) => dispatch(actions.onDeActivateProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
