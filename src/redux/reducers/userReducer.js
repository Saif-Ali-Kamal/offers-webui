import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { userSigninAction, userSignupAction } from '../actions/userActions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    status: null
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
      state.data = action.payload;
    }
  }
})

export default userSlice.reducer;