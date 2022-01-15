import { createAsyncThunk } from '@reduxjs/toolkit';
import { addStoreService, deleteStoreService, getAllStoresService, getStoreByIdService, updateStoreService } from '../../services/store';
import { notify } from '../../utils/utils';

export const addStoreAction = createAsyncThunk(
  'store/addStoreAction',
  async (storeData) => {
    return addStoreService(storeData).then(res => {
      notify('success', 'Store added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding store', ex));
  }
);

export const getAllStoresAction = createAsyncThunk(
  'store/getAllStoresAction',
  async (reqFilters) => {
    return getAllStoresService().then(res => {
      notify('success', 'Store fetched successfully', res.message);
      return { stores: res?.stores, totalStores: res?.totalStores };
    }).catch(ex => notify('error', 'Error in fetching store', ex));
  }
);

export const getStoreByIdAction = createAsyncThunk(
  'store/getStoreByIdAction',
  async (id) => {
    return getStoreByIdService(id).then(res => {
      notify('success', 'Store fetched successfully', res.message);
      return res.store;
    }).catch(ex => notify('error', 'Error in fetching store', ex));
  }
);

export const updateStoreAction = createAsyncThunk(
  'store/updateStoreAction',
  async (updatedStore) => {
    return updateStoreService(updatedStore).then(res => {
      notify('success', 'Store updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating store', ex));
  }
);

export const deleteStoreAction = createAsyncThunk(
  'store/deleteStoreAction',
  async (id) => {
    return deleteStoreService(id).then(res => {
      notify('success', 'Store deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting store', ex));
  }
);