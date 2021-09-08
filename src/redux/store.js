import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

// const initialState = {
//   user: {},
//   totalOffers: 0,
//   offers: [],
//   mobileSidenav: false
// };

const store = configureStore({
  reducer: {
    user: userReducer
  },
 // preloadedState: initialState,
  devTools: process.env.state !== 'production'
})

export default store;