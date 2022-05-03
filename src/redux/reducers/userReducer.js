import { createSlice } from '@reduxjs/toolkit';
import { failed, loading, success } from '../../utils/constant';
import { deleteUserAction, getAllUsersAction, getUserByIdAction, refreshUserTokenAction, updateUserAction, userSigninAction, userSignoutAction, userSignupAction } from '../actions/userActions';

const initialState = {
  userData: {},
  userList: [],
  totalUsers: 0,
  selectedUser: {},
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
    [getAllUsersAction.pending]: (state) => {
      state.status = loading;
    },
    [getAllUsersAction.fulfilled]: (state, action) => {
      state.status = success;
      state.userList = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },
    [getAllUsersAction.rejected]: (state) => {
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
    },
    [updateUserAction.pending]: (state) => {
      state.status = loading;
    },
    [updateUserAction.fulfilled]: (state) => {
      state.status = success;
      state.selectedUser = {};
    },
    [updateUserAction.rejected]: (state) => {
      state.status = failed;
    },
    [deleteUserAction.pending]: (state) => {
      state.status = loading;
    },
    [deleteUserAction.fulfilled]: (state) => {
      state.status = success;
    },
    [deleteUserAction.rejected]: (state) => {
      state.status = failed;
    },
    [refreshUserTokenAction.pending]: (state) => {
      state.status = loading;
    },
    [refreshUserTokenAction.fulfilled]: (state, action) => {
      state.status = success;
      state.userData = action.payload;
    },
    [refreshUserTokenAction.rejected]: (state) => {
      state.status = failed;
    },
    [userSignoutAction.pending]: (state) => {
      state.status = loading;
    },
    [userSignoutAction.fulfilled]: (state) => {
      state.status = success;
      state.userData = {};
    },
    [userSignoutAction.rejected]: (state) => {
      state.status = failed;
    },
  }
});

export const { onPageLoad } = userSlice.actions;

export default userSlice.reducer;