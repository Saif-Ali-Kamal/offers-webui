import axios from 'axios';
import { getToken } from '../utils/utils';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export default api;
