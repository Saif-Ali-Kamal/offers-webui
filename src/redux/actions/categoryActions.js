import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCategoryService, deleteCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from '../../services/category';
import { notify } from '../../utils/utils';

export const addCategoryAction = createAsyncThunk(
  'category/addCategoryAction',
  async (categoryData) => {
    return addCategoryService(categoryData).then(res => {
      notify('success', 'Category added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding category', ex));
  }
);

export const getAllCategoriesAction = createAsyncThunk(
  'category/getAllCategoriesAction',
  async (reqFilters) => {
    return getAllCategoriesService().then(res => {
      notify('success', 'Category fetched successfully', res.message);
      return { categories: res?.categories, totalCategories: res?.totalCategories };
    }).catch(ex => notify('error', 'Error in fetching category', ex));
  }
);

export const getCategoryByIdAction = createAsyncThunk(
  'category/getCategoryByIdAction',
  async (id) => {
    return getCategoryByIdService(id).then(res => {
      notify('success', 'Category fetched successfully', res.message);
      return res.category;
    }).catch(ex => notify('error', 'Error in fetching category', ex));
  }
);

export const updateCategoryAction = createAsyncThunk(
  'category/updateCategoryAction',
  async (updatedCategory) => {
    return updateCategoryService(updatedCategory).then(res => {
      notify('success', 'Category updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating category', ex));
  }
);

export const deleteCategoryAction = createAsyncThunk(
  'category/deleteCategoryAction',
  async (id) => {
    return deleteCategoryService(id).then(res => {
      notify('success', 'Category deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting category', ex));
  }
);