import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addStoreAction, deleteStoreAction, getAllStoresAction, getStoreByIdAction, updateStoreAction } from '../actions/storeActions';

const initialState = {
  storeList: [],
  totalStores: 0,
  selectedStore: {},
  status: null
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedStore: (state) => {
      state.selectedStore = {};
    }
  },
  extraReducers: {
    [addStoreAction.pending]: (state) => {
      state.status = loading;
    },
    [addStoreAction.fulfilled]: (state, action) => {
      state.status = success;
      state.storeList.push(action.payload);
    },
    [addStoreAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllStoresAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllStoresAction.fulfilled]: (state, action) => {
      state.status = success;
      state.storeList = action.payload.stores;
      state.totalStores = action.payload.totalStores;
    },
    [getAllStoresAction.rejected]: (state) => {
      state.status = failed;
    },
    [getStoreByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getStoreByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedStore = action.payload; 
    },
    [getStoreByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateStoreAction.pending]: (state) => {
      state.status = loading;
    },
    [updateStoreAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedStore = {};
    },
    [updateStoreAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteStoreAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteStoreAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteStoreAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedStore } = storeSlice.actions;

export default storeSlice.reducer;
