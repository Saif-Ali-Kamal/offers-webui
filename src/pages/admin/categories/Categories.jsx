import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageLayout from '../../../components/admin/layout/PageLayout';
import CategoriesTable from '../../../components/admin/categories/categoriesTable/CategoriesTable';
import { deleteCategoryAction, getAllCategoriesAction, getCategoryByIdAction } from '../../../redux/actions/categoryActions';

const Categories = () => {

  const { categoryList, status } = useSelector(state => state.categories);
  const [reqFilters, setReqFilters] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    handleGetAllCategories(reqFilters);
  }, [reqFilters])

  const handleGetAllCategories = (reqFilters) => {
    dispatch(getAllCategoriesAction(reqFilters));
  }

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategoryAction(id))
      .then(() => handleGetAllCategories());
  }

  const handleOpenAddCategory = () => {
    history.push('/admin/categories/addCategory');
  }

  const handleOpenEditCategory = (id) => {
    dispatch(getCategoryByIdAction(id))
      .then(() => history.push('/admin/categories/editCategory')); 
  }

  return (
    <PageLayout selectedNav='categories' crumbs={[{ text: 'Categories' }]} status={status}> 
      <CategoriesTable 
        categories={categoryList}
        reqFilters={reqFilters}
        setReqFilters={setReqFilters}
        handleAddCategoryVisible={handleOpenAddCategory}
        handleEditCategoryVisible={handleOpenEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </PageLayout>
  );
}

export default Categories;