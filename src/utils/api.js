import { request } from 'axios';
import  config  from './config';
// const REQUEST_TIMEOUT = 1800000

const axiosConfig = {
  baseURL: config.BASE_URL
  // timeout: REQUEST_TIMEOUT,
  // headers: {
  //   'Content-Type': 'application/json',
  //   authorization: localStorage.getItem(ACCESS_TOKEN)
  // }
}

console.log('axiosConfig: ',axiosConfig )
const api = (options = {}) => request({ ...axiosConfig, ...options });

export default api;
