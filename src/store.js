import { createStore } from 'redux';
import { generateReducers } from 'automate-redux';

const initialState = {
  user: {},
  totalOffers: 0,
  offers: [],
  mobileSidenav: false
};

export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());