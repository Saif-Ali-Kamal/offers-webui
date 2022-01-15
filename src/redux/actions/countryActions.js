import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCountryService, deleteCountryService, getAllCountriesService, getCountryByIdService, updateCountryService } from '../../services/country';
import { notify } from '../../utils/utils';

export const addCountryAction = createAsyncThunk(
  'country/addCountryAction',
  async (countryData) => {
    return addCountryService(countryData).then(res => {
      notify('success', 'Country added successfully', res.message);
      return res.data;
    }).catch(ex => notify('error', 'Error in adding country', ex));
  }
);

export const getAllCountriesAction = createAsyncThunk(
  'country/getAllCountriesAction',
  async (reqFilters) => {
    return getAllCountriesService().then(res => {
      notify('success', 'Country fetched successfully', res.message);
      return { countries: res?.countries, totalCountries: res?.totalCountries };
    }).catch(ex => notify('error', 'Error in fetching country', ex));
  }
);

export const getCountryByIdAction = createAsyncThunk(
  'country/getCountryByIdAction',
  async (id) => {
    return getCountryByIdService(id).then(res => {
      notify('success', 'Country fetched successfully', res.message);
      return res.country;
    }).catch(ex => notify('error', 'Error in fetching country', ex));
  }
);

export const updateCountryAction = createAsyncThunk(
  'country/updateCountryAction',
  async (updatedCountry) => {
    return updateCountryService(updatedCountry).then(res => {
      notify('success', 'Country updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating country', ex));
  }
);

export const deleteCountryAction = createAsyncThunk(
  'country/deleteCountryAction',
  async (id) => {
    return deleteCountryService(id).then(res => {
      notify('success', 'Country deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting country', ex));
  }
);