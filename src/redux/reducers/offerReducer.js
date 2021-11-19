import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addOfferAction, deleteOfferAction, getAllOffersAction, getOfferByIdAction, updateOfferAction } from '../actions/offerActions';

const initialState = {
  offerList: [],
  totalOffers: 0,
  selectedOffer: {},
  status: null
}

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedOffer: (state) => {
      state.selectedOffer = {};
    }
  },
  extraReducers: {
    [addOfferAction.pending]: (state) => {
      state.status = loading;
    },
    [addOfferAction.fulfilled]: (state, action) => {
      state.status = success;
      state.offerList.push(action.payload);
    },
    [addOfferAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllOffersAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllOffersAction.fulfilled]: (state, action) => {
      state.status = success;
      state.offerList = action.payload.offers;
      state.totalOffers = action.payload.totalOffers;
    },
    [getAllOffersAction.rejected]: (state) => {
      state.status = failed;
    },
    [getOfferByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getOfferByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedOffer = action.payload; 
    },
    [getOfferByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateOfferAction.pending]: (state) => {
      state.status = loading;
    },
    [updateOfferAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedOffer = {};
    },
    [updateOfferAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteOfferAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteOfferAction.fulfilled]: (state, action) => {
      state.status = success;
      state.offerList = state.offerList.filter(offer => offer.id === action.payload);
    },
    [deleteOfferAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedOffer } = offerSlice.actions;

export default offerSlice.reducer;
