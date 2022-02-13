import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCarouselService, deleteCarouselService, getAllCarouselsService, getCarouselByIdService, updateCarouselService } from '../../services/carousel';
import { notify } from '../../utils/utils';

export const addCarouselAction = createAsyncThunk(
  'carousel/addCarouselAction',
  async (carouselData) => {
    return addCarouselService(carouselData).then(res => {
      notify('success', 'Carousel added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding carousel', ex));
  }
);

export const getAllCarouselsAction = createAsyncThunk(
  'carousel/getAllCarouselsAction',
  async (reqFilters) => {
    return getAllCarouselsService().then(res => {
      notify('success', 'Carousel fetched successfully', res.message);
      return { carousels: res?.carousels, totalCarousels: res?.totalCarousels };
    }).catch(ex => notify('error', 'Error in fetching carousel', ex));
  }
);

export const getCarouselByIdAction = createAsyncThunk(
  'carousel/getCarouselByIdAction',
  async (id) => {
    return getCarouselByIdService(id).then(res => {
      notify('success', 'Carousel fetched successfully', res.message);
      return res.carousel;
    }).catch(ex => notify('error', 'Error in fetching carousel', ex));
  }
);

export const updateCarouselAction = createAsyncThunk(
  'carousel/updateCarouselAction',
  async (updatedCarousel) => {
    return updateCarouselService(updatedCarousel).then(res => {
      notify('success', 'Carousel updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating carousel', ex));
  }
);

export const deleteCarouselAction = createAsyncThunk(
  'carousel/deleteCarouselAction',
  async (id) => {
    return deleteCarouselService(id).then(res => {
      notify('success', 'Carousel deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting carousel', ex));
  }
);