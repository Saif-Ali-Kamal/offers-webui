import axios from 'axios';
import { getToken } from '../utils/utils';

const api = axios.create({
  baseURL: 'https://offerss.herokuapp.com',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

export default api;
