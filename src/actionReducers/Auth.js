import api from '../utils/api';
import { ACCESS_TOKEN, USER_PROFILE, EXPIRES_IN} from '../constants/localStorage';
import config from '../utils/config';
import { redirect } from 'redux-first-router';

//Types
// export const LOGIN = '[LOGIN] LOGIN';
// export const LOGOUT = '[LOGOUT] LOGOUT';
// export const SIGNUP = '[SIGNUP] SIGNUP';

//Type Notif
export const SIGNUP_REQUEST = '[SIGNUP NOTIF] SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = '[SIGNUP NOTIF] SIGNUP_SUCCESS';
export const SIGNUP_FAILED = '[SIGNUP NOTIF] SIGNUP_FAILED';

export const LOGIN_REQUEST = '[LOGIN NOTIF] LOGIN_REQUEST';
export const LOGIN_SUCCESS = '[LOGIN NOTIF] LOGIN_SUCCESS';
export const LOGIN_FAILED = '[LOGIN NOTIF] LOGIN_FAILED';

export const LOGOUT = '[LOGOUT NOTIF] LOGOUT';


//Actions
export const actionRedirectHome = () => dispatch => {
    const action = redirect({ type: '@route/login' });
    dispatch(action);
}

//Thunks
export const actionSignupUser = (creds,isAgent) => async (dispatch) => {
  try {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_PROFILE);
    dispatch({ type: SIGNUP_REQUEST });
    let resp = {}

    if (isAgent){
      resp = await api({ method: 'POST', url: '/agent/registration',  data: creds });
    }else{
      resp = await api({ method: 'POST', url: '/customer/registration', data: creds });
    }
    
    if (resp.data.token){
      localStorage.setItem(ACCESS_TOKEN, resp.data.token.key);
      localStorage.setItem(EXPIRES_IN, Date.parse(new Date()) + resp.data.token.offset);
      // localStorage.setItem(USER_PROFILE, resp.data.user.forename + " " + resp.data.user.surname);
      dispatch({ type: SIGNUP_SUCCESS, payload: resp.data });
      switch (parseInt(resp.data.user.user_type, 10)) {
        case parseInt(config.ADMIN_ID, 10):
          dispatch({ type: '@route/adminPage' });
          break;
        case parseInt(config.CUSTOMER_ID, 10):
          dispatch({ type: '@route/customerPage' });
          break;
        case parseInt(config.AGENT_ID, 10):
          dispatch({ type: '@route/agentPage' });
          break;
        default:
          break;
      }
    }else{
      dispatch({ type: SIGNUP_FAILED, message: resp.data.message });
    }

  } catch (e) {

    dispatch({ type: SIGNUP_FAILED, message: e.message});
  }
}

export const actionVerifyUser = (userkey, somekey) => async (dispatch) => {
  try {
    await api({ method: 'GET', url: `/users/verify/${userkey}/${somekey}` });
  } catch (e) {
  }
}

export const actionLoginUser = (creds) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const body = {
      "email": creds.email,
      "password": creds.password
    }

    const { data } = await api({ method: 'POST', url: '/users/signin',  data: body });
    
    if (data.user){
      localStorage.setItem(ACCESS_TOKEN, data.token.key);
      localStorage.setItem(EXPIRES_IN, Date.parse(new Date()) + data.token.offset);
      localStorage.setItem(USER_PROFILE, JSON.stringify(data.user));
      dispatch({ type: LOGIN_SUCCESS, payload: data });

      switch (parseInt(data.user.user_type, 10)) {
        case parseInt(config.ADMIN_ID, 10):
          dispatch({ type: '@route/adminDashboard' });
          break;
        case parseInt(config.CUSTOMER_ID, 10):
          dispatch({ type: '@route/customerDashboard' });
          break;
        case parseInt(config.AGENT_ID, 10):
          dispatch({ type: '@route/agentDashboard' });
          break;
        default:
          break;
      }
    } else {
      dispatch({ type: LOGIN_FAILED, message: data.message });
    }

  } catch (e) {
    dispatch({ type: LOGIN_FAILED, message: "Invalid user email/password" });
  }
}

export const actionLogoutUser = () => async (dispatch) => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER_PROFILE);
  dispatch({ type: LOGOUT });
  dispatch({type: '@route/login'});

}

const user = localStorage.getItem(USER_PROFILE) ? JSON.parse(localStorage.getItem(USER_PROFILE)) : '';

//Reducers
const INITIAL_STATE = {
  isLoginFetching: false,
  isLogin: localStorage.getItem(ACCESS_TOKEN) ? true : false,
  userName: `${user.forename} ${user.surname}`,
  user: {
    id: user.id,
    user_type: user.user_type,
    forename: user.forename,
    surname: user.surname,
    email: user.email,
    phone_number: user.phone_number,
    city: (user.city === null) ? '' : user.city,
    country: (user.country === null) ? '': user.country,
    bank_no: (user.bank_no === null) ? '' : user.bank_no
  },
  errorLoginMessage: '',
  isSignUpFetching: false,
  errorSignupMessage: ''
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginFetching: true,
        isLogin: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginFetching: false,
        isLogin: true,
        userName: action.payload.user.forename + " " + action.payload.user.surname,
        user: {
          id: action.payload.user.id,
          user_type: action.payload.user.user_type,
          forename: action.payload.user.forename,
          surname: action.payload.user.surname,
          email: action.payload.user.email,
          phone_number: action.payload.user.phone_number,
          city: (action.payload.user.city === null) ? '' : action.payload.user.city,
          country: (action.payload.user.country === null) ? '' : action.payload.user.country,
          bank_no: (action.payload.user.bank_no === null) ? '' : action.payload.user.bank_no        
        }
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoginFetching: false,
        isLogin: false,
        errorLoginMessage: action.message,
        user: {}
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSignUpFetching: true,
        isLogin: false,
        errorSignupMessage: ''
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignUpFetching: false,
        isLogin: true,
        errorSignupMessage: '',
        userName: action.payload.user.forename + " " + action.payload.user.surname,
        user: action.payload.user
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        isSignUpFetching: false,
        isLogin: false,
        errorSignupMessage: action.message
      }
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default auth;