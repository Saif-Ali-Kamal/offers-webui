import { createSlice } from '@reduxjs/toolkit';
import { success } from '../../utils/constant';

const initialState = {
  mobileSidenav: false,
  status: null
}

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    toggleMobileSidenav: (state, action) => {
      state.status = success;
      state.mobileSidenav = action.payload;
    }
  }
});

export const { toggleMobileSidenav } = utilsSlice.actions;

export default utilsSlice.reducer;