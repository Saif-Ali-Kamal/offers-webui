import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSigninService, userSignupService } from '../../services/users';
import history from '../../utils/history';
import { notify, saveToken } from '../../utils/utils';
import { adminRoles } from '../../utils/constant';

export const userSignupAction = createAsyncThunk(
  'user/userSignupAction',
  async (userData) => {
    return userSignupService(userData).then(res => {
      notify('success', 'Signup success', res.message);
      if(userData.roles.toString() === adminRoles.toString()){
        history.push('/admin/signin')
      }
    }).catch(error => notify('error', 'Signup Error', error.message))
  }
);

export const userSigninAction = createAsyncThunk(
  'user/userSigninAction',
  async (userData) => {
    return userSigninService(userData).then(res => {
      const saveTokenData = saveToken(res.token);
      notify('success', 'Signin success', res.message);
      if(userData.roles.toString() === adminRoles.toString()){
        history.push('/admin/dashboard');
      }
      return saveTokenData;
    }).catch(error => notify('error', 'Signin Error', error.message))
  }
);