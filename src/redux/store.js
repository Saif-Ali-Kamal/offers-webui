import { createStore } from 'redux';
import { generateReducers } from 'automate-redux';
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

// export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());