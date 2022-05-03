import axios from 'axios';
import { refreshUserTokenAction, userSignoutAction } from '../redux/actions/userActions';
import store from '../redux/store';
import { getToken } from '../utils/utils';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// api.interceptors.request.use(req => {
//   console.log(req)
//   req.headers['x-access-token'] = getToken()
//   return req;
// }, err => {
//   return Promise.reject(err)
// });

api.interceptors.response.use(res => {
  console.log(res)
  return res;
}, err => {
  const ogReq = err.config;
  const status = err.response ? err.response.status : null;
  if(status === 401) {
    console.log('haha')
    store.dispatch(refreshUserTokenAction()).then(() => {
      return api(ogReq);
    }).catch(() => {
      store.dispatch(userSignoutAction());
    })
  }
  return Promise.reject(err);
});

export default api;
