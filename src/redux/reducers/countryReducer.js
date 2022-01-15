import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { addCountryAction, deleteCountryAction, getAllCountriesAction, getCountryByIdAction, updateCountryAction } from '../actions/countryActions';

const initialState = {
  countryList: [],
  totalCountries: 0,
  selectedCountry: {},
  status: null
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducer:{},
  reducers: {
    clearSelectedCountry: (state) => {
      state.selectedCountry = {};
    }
  },
  extraReducers: {
    [addCountryAction.pending]: (state) => {
      state.status = loading;
    },
    [addCountryAction.fulfilled]: (state, action) => {
      state.status = success;
      state.countryList.push(action.payload);
    },
    [addCountryAction.rejected]: (state) => {
      state.status = failed;
    },
    [getAllCountriesAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllCountriesAction.fulfilled]: (state, action) => {
      state.status = success;
      state.countryList = action.payload.countries;
      state.totalCountries = action.payload.totalCountries;
    },
    [getAllCountriesAction.rejected]: (state) => {
      state.status = failed;
    },
    [getCountryByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getCountryByIdAction.fulfilled]: (state, action) => {
      state.status = success;
      state.selectedCountry = action.payload; 
    },
    [getCountryByIdAction.rejected]: (state) => {
      state.status = failed;
    },
    [updateCountryAction.pending]: (state) => {
      state.status = loading;
    },
    [updateCountryAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedCountry = {};
    },
    [updateCountryAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteCountryAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteCountryAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteCountryAction.rejected]: (state) => {
      state.status = failed;
    }, 
  }
});

export const { clearSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
