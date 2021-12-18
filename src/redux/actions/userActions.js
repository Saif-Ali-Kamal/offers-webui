import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSigninService, userSignupService } from '../../services/users';
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
      const saveTokenData = saveToken(res.token);
      return saveTokenData;
    }).catch(error => notify('error', 'Signin Error', error.message))
  }
);