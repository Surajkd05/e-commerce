import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import EditCategory from "../../containers/Category/EditCategory"
import classes from "./FieldView.module.css";
import Aux from "../../hoc/Aux/aux";
import ViewCategory from "../../containers/Category/ViewCategory";
import { Route } from "react-router";

const CategoryView = React.memo((props) => {
  console.log("Categories are in category view: ", props);

  const categories = props.history.location.state.categories
  const [viewId, setViewId] = useState();
  const [editId, setEditId] = useState();

  const onViewCategoryHandler = (id) => {
    console.log("Category id in edit is : ", id);
    setViewId(id);
  };

  const onEditCategoryHandler = (id) => {
    console.log("Category id in edit is : ", id);
    setEditId(id);
  };

  const onViewProductsHandler = (id) => {
    props.history.push({
      pathname: "/viewProductsByCategoryId",
      state: { categoryId: id  },
    });
  }

  if(viewId){
  
    return <ViewCategory passedViewId = {viewId} />;
  }

  if(editId){
    return <EditCategory passedEditId = {editId} />
  }

  return (
    <Aux>
      <section className={classes.FieldData}>
        <h4>Fetched Categories</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Category Name</Th>
              <Th>View Category</Th>
              <Th>Edit Category</Th>
              <Th>View Products</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((categories, count) =>
              categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{count + 1}</Td>
                  <Td>{category.categoryName}</Td>
                  <Td>
                    <Button
                      clicked={() => onViewCategoryHandler(category.id)}
                      btnType="Success"
                    >
                      View
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      clicked={() => onEditCategoryHandler(category.id)}
                      btnType="Success"
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      clicked={() => onViewProductsHandler(category.id)}
                      btnType="Success"
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </section>
    </Aux>
  );
});

export default CategoryView;
