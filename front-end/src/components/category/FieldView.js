import React from "react";
import classes from "./FieldView.module.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const FieldView = (props) => {

  console.log("fields in field view : ",props.fetchedFields)

  return (
    <section className={classes.FieldData}>
      <h4>Fetched Fields</h4>
      <Table>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Field Id</Th>
            <Th>Field Name</Th>
            <Th>Date Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.fetchedFields.map((field,count) => (
            <Tr key={field.id}>
              <Td>{count+1}</Td>

              <Td>{field.id}</Td>
              <Td>{field.name}</Td>
              <Td>{field.dateCreated}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </section>
  );
};

export default FieldView;
