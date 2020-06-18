import React, { useEffect, useState, useMemo } from "react";
import classes from "./AddressView.module.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/aux";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import CustomerAddressUpdate from "../../components/customer/CustomerAddressUpdate";

const AddressView = React.memo((props) => {
  const { onFetchCustomerAddress } = props;

  const [addresses, setAddresses] = useState();
  const [isAddress, setIsAddress] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [address, setAddress] = useState();
  const [addressId, setAddressId] = useState();

  const token = localStorage.getItem("token");
  useEffect(() => {
    //onFetchCustomerAddress(token);
    axios
      .get("http://localhost:8080/ecommerce/customer/address", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log("Addresses are : ", response.data);
        setAddresses(response.data);
        setIsAddress(true);
      })
      .catch((error) => {
        console.log("Error is : ", error.response);
      });
  }, []);

  const deleteAddressHandler = (id) => {
    props.onDeleteCustomerAddress(id);
  };

  const updateAddressHandler = (id, address) => {
    setIsUpdate(!isUpdate);
    setAddressId(id);
    setAddress(address);
  };

  let updateAddress = null;
  if (isUpdate) {
    updateAddress = (
      <CustomerAddressUpdate passedAddress={address} passedId={addressId} />
    );
  }

  let addressView = null;
  if (isAddress) {
    addressView = (
      <section className={classes.AddressView}>
        <h4>User Address</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              {/* <Th>Address Id</Th>
              <Th>User Id</Th> */}
              <Th>Block</Th>
              <Th>Plot Number</Th>
              <Th>Sector Number</Th>
              <Th>Street Name</Th>
              <Th>City</Th>
              <Th>District</Th>
              <Th>State</Th>
              <Th>Country</Th>
              <Th>Label</Th>
              <Th>ZipCode</Th>
              <Th>Delete</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>
          <Tbody>
            {addresses.map((address, count) => (
              <Tr key={address.id}>
                <Td>{count + 1}</Td>
                {/* <Td>{address.id}</Td>
                <Td>{address.userId}</Td> */}
                <Td>{address.block}</Td>
                <Td>{address.plotNumber}</Td>
                <Td>{address.sectorNumber}</Td>
                <Td>{address.streetName}</Td>
                <Td>{address.city}</Td>
                <Td>{address.district}</Td>
                <Td>{address.state}</Td>
                <Td>{address.country}</Td>
                <Td>{address.label}</Td>
                <Td>{address.zipCode}</Td>
                <Td>
                  <Button
                    clicked={() => deleteAddressHandler(address.id)}
                    btnType="Danger"
                  >
                    Delete
                  </Button>
                </Td>
                <Td>
                  {/* <Button
                    clicked={() => updateAddressHandler(address.id, address)}
                    btnType="Success"
                  > */}
                    {!isUpdate ? (
                      <Button clicked={() => updateAddressHandler(address.id, address)} btnType="Success">Update</Button>
                    ) : (
                      <Button clicked={() => updateAddressHandler(address.id, address)} btnType="Danger">Hide Update</Button>
                    )}
                  {/* </Button> */}
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
      <div>{addressView}</div>
      <div>{updateAddress}</div>
    </Aux>
  );
});

const mapStateToProps = (state) => {
  return {
    addresses: state.customer.addresses,
    loading: state.customer.loading,
    error: state.customer.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCustomerAddress: (token) =>
      dispatch(actions.fetchCustomerAddress(token)),
    onDeleteCustomerAddress: (id) =>
      dispatch(actions.onDeleteCustomerAddress(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressView);
