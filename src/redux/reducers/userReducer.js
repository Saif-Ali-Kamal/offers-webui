import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../constant';
import { userSignupAction } from '../actions/userActions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    status: null
  },
  extraReducers: {
    [userSignupAction.pending]: (state) => {
      state.status = loading
    },
    [userSignupAction.fulfilled]: (state) => {
      state.status = success
    },
    [userSignupAction.rejected]: (state) => {
      state.status = failed
    }
  }
})

export default userSlice.reducer;