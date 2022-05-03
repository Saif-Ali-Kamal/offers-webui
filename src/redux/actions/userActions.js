import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSigninService, userSignupService, getUserByIdService, getAllUsersService, updateUserService, deleteUserService, userRefreshTokenService, userSignoutService } from '../../services/users';
import { notify, saveToken } from '../../utils/utils';

export const userSignupAction = createAsyncThunk(
  'user/userSignupAction',
  async (userData) => {
    return userSignupService(userData).then(res => {
      return;
    }).catch(error => notify('error', 'Signup Error', error.message))
  }
);

export const userSigninAction = createAsyncThunk(
  'user/userSigninAction',
  async (userData) => {
    return userSigninService(userData).then(res => {
      const saveTokenData = saveToken(res.accessToken);
      return saveTokenData;
    }).catch(error => notify('error', 'Signin Error', error.message))
  }
);

export const getAllUsersAction = createAsyncThunk(
  'user/getAllUsersAction',
  async () => {
    return getAllUsersService().then(res => {
      notify('success', 'User fetched successfully', res.message);
      return { users: res?.users, totalUsers: res?.totalUsers };
    }).catch(ex => notify('error', 'Error in fetching user', ex));
  }
);

export const getUserByIdAction = createAsyncThunk(
  'user/getUserByIdAction',
  async (id) => {
    return getUserByIdService(id).then(res => {
      notify('success', 'User fetched successfully', res.message);
      return res.user;
    }).catch(ex => notify('error', 'Error in fetching user', ex));
  }
);

export const updateUserAction = createAsyncThunk(
  'user/updateUserAction',
  async (updatedUser) => {
    return updateUserService(updatedUser).then(res => {
      notify('success', 'User updated successfully', res.message);
    }).catch(ex => notify('error', 'Error in updating user', ex));
  }
);

export const deleteUserAction = createAsyncThunk(
  'user/deleteUserAction',
  async (id) => {
    return deleteUserService(id).then(res => {
      notify('success', 'User deleted successfully', res.message);
    }).catch(ex => notify('error', 'Error in deleting user', ex));
  }
);

export const refreshUserTokenAction = createAsyncThunk(
  'user/refreshUserTokenAction',
  async () => {
    return userRefreshTokenService().then(res => {
      notify('success', 'User token refreshed successfully', res.message);
      const saveTokenData = saveToken(res.accessToken);
      return saveTokenData;
    }).catch(ex => notify('error', 'Error in refreshing user token', ex));
  }
);

export const userSignoutAction = createAsyncThunk(
  'user/userSignoutAction',
  async () => {
    return userSignoutService().then(res => {
      notify('success', 'User signed out successfully', res.message);
    }).catch(ex => notify('error', 'Error in signing out user', ex));
  }
);