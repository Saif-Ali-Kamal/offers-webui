import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import offerReducer from './reducers/offerReducer';
import utilsReducer from './reducers/utilsReducer';

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
    utils: utilsReducer
  },
 // preloadedState: initialState,
  devTools: process.env.state !== 'production'
})

export default store;