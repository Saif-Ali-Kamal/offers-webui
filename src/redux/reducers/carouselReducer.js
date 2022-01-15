import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addCarouselAction, deleteCarouselAction, getAllCarouselsAction, getCarouselByIdAction, updateCarouselAction } from '../actions/carouselActions';

const initialState = {
  carouselList: [],
  totalCarousels: 0,
  selectedCarousel: {},
  status: null
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedCarousel: (state) => {
      state.selectedCarousel = {};
    }
  },
  extraReducers: {
    [addCarouselAction.pending]: (state) => {
      state.status = loading;
    },
    [addCarouselAction.fulfilled]: (state, action) => {
      state.status = success;
      state.carouselList.push(action.payload);
    },
    [addCarouselAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllCarouselsAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllCarouselsAction.fulfilled]: (state, action) => {
      state.status = success;
      state.carouselList = action.payload.carousels;
      state.totalCarousels = action.payload.totalCarousels;
    },
    [getAllCarouselsAction.rejected]: (state) => {
      state.status = failed;
    },
    [getCarouselByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getCarouselByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedCarousel = action.payload; 
    },
    [getCarouselByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateCarouselAction.pending]: (state) => {
      state.status = loading;
    },
    [updateCarouselAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedCarousel = {};
    },
    [updateCarouselAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteCarouselAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteCarouselAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteCarouselAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedCarousel } = carouselSlice.actions;

export default carouselSlice.reducer;
