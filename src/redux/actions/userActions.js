import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSigninService, userSignupService } from '../../services/users';
import history from '../../utils/history';
import { notify } from '../../utils/utils';
import { adminRoles } from '../../utils/constant';

export const userSignupAction = createAsyncThunk(
  'user/userSignupAction',
  async (userData) => {
    return userSignupService(userData).then(res =>{
      if(userData.roles === adminRoles){
        history.push('/admin/signin');
      }
      notify('success', 'Signup success', res.message);
    }).catch(error => notify('error', 'Signup Error', error.message))
  }
);

export const userSigninAction = createAsyncThunk(
  'user/userSigninAction',
  async (userData) => {
    return userSigninService(userData).then(res =>{
      if(userData.roles === adminRoles){
        history.push('/admin/dashboard');
      }
      notify('success', 'Signup success', res.message);
    }).catch(error => notify('error', 'Signup Error', error.message))
  }
);

