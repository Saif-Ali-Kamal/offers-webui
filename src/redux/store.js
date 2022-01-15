import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import offerReducer from './reducers/offerReducer';
import utilsReducer from './reducers/utilsReducer';
import categoryReducer from './reducers/categoryReducer';
import storeReducer from './reducers/storeReducer';
import countryReducer from './reducers/countryReducer';
import tagsReducer from './reducers/tagsReducer';
import carouselReducer from './reducers/carouselReducer';

// const initialState = {
//   user: {},
//   totalOffers: 0,
//   offers: [],
//   mobileSidenav: false
// };

const store = configureStore({
  reducer: {
    user: userReducer,
    offers: offerReducer,
    categories: categoryReducer,
    stores: storeReducer,
    countries: countryReducer,
    tags: tagsReducer,
    carousels: carouselReducer,
    utils: utilsReducer
  },
 // preloadedState: initialState,
  devTools: process.env.state !== 'production'
})

export default store;