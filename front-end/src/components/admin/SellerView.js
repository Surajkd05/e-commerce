import React, { useState } from "react";
import classes from "./UserView.module.css";
import Button from "../UI/Button/Button";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const SellerView = (props) => {
  console.log("Props in list is", props);
  console.log("In Period list");
  const [loading, setLoading] = useState(false);

  const activateUserHandler = (userId) => {
    setLoading(true);
    console.log("UserId received is ; ", userId);

    axios({
      method: "PATCH",
      url: "http://localhost:8080/ecommerce/admin/activateSeller/" + userId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setLoading(false);
        alert(response.data);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.data);
        console.log("Error is", error.data);
      });
  };

  const deActivateUserHandler = (userId) => {
    setLoading(true);
    console.log("UserId received is ; ", userId);
    axios({
      method: "PATCH",
      url: "http://localhost:8080/ecommerce/admin/deActivateSeller/" + userId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setLoading(false);
        alert(response.data);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error is", error);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={classes.UserView}>
      <h4>Fetched Users</h4>
      <Table>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>User Id</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Company Contact</Th>
            <Th>Company Name</Th>
            <Th>Active</Th>
            <Th>Activate</Th>
            <Th>DeActivate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.fetchedUsers.map((user,count) => (
            <Tr key={user.id}>
              <Td key={user.id}>{count + 1}</Td>

              <Td>{user.id}</Td>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.companyContact}</Td>
              <Td>{user.companyName}</Td>
              <Td>{String(user.active)}</Td>
              <Td>
                <Button
                  clicked={() => activateUserHandler(user.id)}
                  btnType="Success"
                >
                  Activate
                </Button>
              </Td>
              <Td>
                <Button
                  clicked={() => deActivateUserHandler(user.id)}
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
};

export default SellerView;
