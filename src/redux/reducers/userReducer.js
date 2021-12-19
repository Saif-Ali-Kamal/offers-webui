import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { getUserByIdAction, userSigninAction, userSignupAction } from '../actions/userActions';

const initialState = {
  userData: {},
  status: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onPageLoad: (state, action) => {
      state.status = success;
      state.userData = action.payload;
    },
    userLogout: (state) => {
      state.status = success;
      state.userData = {};
    }
  },
  extraReducers: {
    [userSignupAction.pending]: (state) => {
      state.status = loading;
    },
    [userSignupAction.fulfilled]: (state) => {
      state.status = success;
    },
    [userSignupAction.rejected]: (state) => {
      state.status = failed;
    },
    [userSigninAction.pending]: (state) => {
      state.status = loading;
    },
    [userSigninAction.fulfilled]: (state, action) => {
      state.status = success;
      state.userData = action.payload;
    },
    [userSigninAction.rejected]: (state) => {
      state.status = failed;
    },
    [getUserByIdAction.pending]: (state) => {
      state.status = loading;
    },
    [getUserByIdAction.fulfilled]: (state) => {
      state.status = success;
    },
    [getUserByIdAction.rejected]: (state) => {
      state.status = failed;
    }
  }
});

export const { onPageLoad } = userSlice.actions;

export default userSlice.reducer;