import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "../../components/category/FieldView.module.css";
import Aux from "../../hoc/Aux/aux";

const ViewCategory = (props) => {
  return (
    <Aux>
      <section className={classes.FieldData}>
        <h4>Fetched Categories</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Category Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.passedCategories.map((category, count) => (
              <Tr key={category.id}>
                <Td>{count + 1}</Td>
                <Td>{category.categoryName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    </Aux>
  );
};

export default ViewCategory;
