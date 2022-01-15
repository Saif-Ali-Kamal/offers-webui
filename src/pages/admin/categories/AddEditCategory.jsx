import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Col, Row } from "antd";
import PageLayout from "../../../components/admin/layout/PageLayout";
import { addCategoryAction, updateCategoryAction } from "../../../redux/actions/categoryActions";
import AddEditCategoryForm from '../../../components/admin/categories/addEditCategory/AddEditCategoryForm';
import { clearSelectedCategory } from '../../../redux/reducers/categoryReducer';

const AddEditCategory = ({ type }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedCategory, status } = useSelector(state => state.categories);
  
  const handleCancelCategory = () => {
    dispatch(clearSelectedCategory());
    history.push('/admin/categories');
  }

  const handleAddCategory = (category) => {
    dispatch(addCategoryAction(category));
  }

  const handleEditCategory = (id, editedCategory) => {
    const updatedCategory = { id, editedCategory };
    dispatch(updateCategoryAction(updatedCategory));
  }

  return (
    <PageLayout 
      selectedNav='categories' 
      crumbs={[{ text: 'Categories', link: '/admin/categories' }, 
        type === 'add' ? 
        { text: 'Add Category' } : { text: 'Edit Category' }]} 
      innerPage
      title={type === 'add' ? 'Add Category' : 'Edit Category'}
      handleClick={handleCancelCategory}
      status={status}
    >
      <Row>
        <Col lg={{ span: 16, offset: 4 }} xs={{ span: 24, offset: 0 }}>
          <AddEditCategoryForm
            formType={type}
            initialvalues={type === 'edit' ? selectedCategory : null}
            handleAddCategory={handleAddCategory}
            handleEditCategory={handleEditCategory}
            handleCancelCategory={handleCancelCategory} 
          />
        </Col>
      </Row>
    </PageLayout>
  );
}

export default AddEditCategory;