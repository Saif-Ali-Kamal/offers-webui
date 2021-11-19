import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOfferService, deleteOfferService, getAllOffersService, getOfferByIdService, updateOfferService } from '../../services/offers';
import { notify } from '../../utils/utils';

export const addOfferAction = createAsyncThunk(
  'offer/addOfferAction',
  async (offerData) => {
    return addOfferService(offerData).then(res => {
      notify('success', 'Offer added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding offer', ex));
  }
);

export const getAllOffersAction = createAsyncThunk(
  'offer/getAllOffersAction',
  async () => {
    return getAllOffersService().then(res => {
      notify('success', 'Offer fetched successfully', res.message);
      return { offers: res?.offers, totalOffers: res?.totalOffers };
    }).catch(ex => notify('error', 'Error in fetching offer', ex));
  }
);

export const getOfferByIdAction = createAsyncThunk(
  'offer/getOfferByIdAction',
  async (id) => {
    return getOfferByIdService(id).then(res => {
      notify('success', 'Offer fetched successfully', res.message);
      return res.offer;
    }).catch(ex => notify('error', 'Error in fetching offer', ex));
  }
);

export const updateOfferAction = createAsyncThunk(
  'offer/updateOfferAction',
  async (updatedOffer) => {
    return updateOfferService(updatedOffer).then(res => {
      notify('success', 'Offer updated successfully', res.message);
      return updatedOffer;
    }).catch(ex => notify('error', 'Error in updating offer', ex));
  }
);

export const deleteOfferAction = createAsyncThunk(
  'offer/deleteOfferAction',
  async (id) => {
    return deleteOfferService(id).then(res => {
      notify('success', 'Offer deleted successfully', res.message);
      return id;
    }).catch(ex => notify('error', 'Error in deleting offer', ex));
  }
);