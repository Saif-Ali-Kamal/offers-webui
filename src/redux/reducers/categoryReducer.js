import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addCategoryAction, deleteCategoryAction, getAllCategoriesAction, getCategoryByIdAction, updateCategoryAction } from '../actions/categoryActions';

const initialState = {
  categoryList: [],
  totalCategories: 0,
  selectedCategory: {},
  status: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = {};
    }
  },
  extraReducers: {
    [addCategoryAction.pending]: (state) => {
      state.status = loading;
    },
    [addCategoryAction.fulfilled]: (state, action) => {
      state.status = success;
      state.categoryList.push(action.payload);
    },
    [addCategoryAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllCategoriesAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllCategoriesAction.fulfilled]: (state, action) => {
      state.status = success;
      state.categoryList = action.payload.categories;
      state.totalCategories = action.payload.totalCategories;
    },
    [getAllCategoriesAction.rejected]: (state) => {
      state.status = failed;
    },
    [getCategoryByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getCategoryByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedCategory = action.payload; 
    },
    [getCategoryByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateCategoryAction.pending]: (state) => {
      state.status = loading;
    },
    [updateCategoryAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedCategory = {};
    },
    [updateCategoryAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteCategoryAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteCategoryAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteCategoryAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
