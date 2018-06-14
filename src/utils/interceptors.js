import axios from 'axios';
import {ACCESS_TOKEN} from '../constants/localStorage';

// Add a request interceptor
axios.interceptors.request.use(config => {
  // Do something before request is sent
  let JWT = localStorage.getItem(ACCESS_TOKEN);
  // let JWT = 'wala';

  // TODO: filter all url that don't need auth headers
  // if there is jwt, use authorization. if there isn't.
  if (JWT && config.url.indexOf('login') === -1) {
    config.headers['Authorization'] = JWT;
    config.headers['Content-Type'] = 'application/json';
  }else if(JWT && config.url.indexOf('customer/caseuploads/') >= -1){
    config.headers['Authorization'] = JWT;
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(response => {
  // Do something with response data
  console.log('response: ', response);

  return response;
}, e => {
  // Catch error 401(invalid user) and redirect to login page
  let aException = [
    '#/',
    '#/login',
    '#/register',
    '#/agentRegister'
  ];

  if (aException.indexOf(window.location.hash) === -1) {
    if (e.response.status === 401){
        window.location.href = '/login';//Todo: try to figure out what is the best practice of redirecting non compnent file
    }
  }
  // Do something with response error
  return Promise.reject(e);
});