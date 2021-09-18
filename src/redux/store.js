import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import offerReducer from './reducers/offerReducer';

// const initialState = {
//   user: {},
//   totalOffers: 0,
//   offers: [],
//   mobileSidenav: false
// };

const store = configureStore({
  reducer: {
    user: userReducer,
    offers: offerReducer
  },
 // preloadedState: initialState,
  devTools: process.env.state !== 'production'
})

export default store;