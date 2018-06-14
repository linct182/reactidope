import api from '../../utils/api';
import { actionFetchCasesPlans } from '../Cases/CasesActions';
//Types
import {
  USER_VERIFICATION,
  GET_USER_LIST,
  CREATE_PLAN,
  DELETE_PLAN,
  UPDATE_PLAN,
  SET_SELECTED_PLAN,
  PRICING_PLAN_RESET_MSG,
  PENDING,
  SUCCESS,
  FAILED
} from './AdminTypes';

export const actionSetPlanID = (planID) => ({ type: SET_SELECTED_PLAN, payload: planID });
export const actionResetPricePlanMsg = () => ({ type: PRICING_PLAN_RESET_MSG });

export const actionCreatePlan = (planData) => async (dispatch) => {
  try {
    console.log('actionCreatePlan: ', planData);
    dispatch({ type: CREATE_PLAN + PENDING });

    await api({
      method: 'POST',
      url: `/admin/case-plans/new`,
      data: planData
    });

    const message = 'Successfully Created!';
    dispatch({
      type: CREATE_PLAN + SUCCESS,
      payload: message
    });
    
    dispatch(actionFetchCasesPlans());
    
  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: CREATE_PLAN + FAILED,
      payload: message
    });
  }
}

export const actionUpdatePlan = (planData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PLAN + PENDING });

    await api({
      method: 'POST',
      url: `/admin/case-plans/update`,
      data: planData
    });

    const message = 'Successfully Updated!';
    dispatch({
      type: UPDATE_PLAN + SUCCESS,
      payload: message
    });
    
    dispatch(actionFetchCasesPlans());
  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: UPDATE_PLAN + FAILED,
      payload: message
    });
  }
}

export const actionDeletePlan = (planId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PLAN + PENDING });

    await api({
      method: 'POST',
      url: `/admin/case-plans/delete`,
      data: {
        "id": planId
      }
    });

    const message = 'Successfully Deleted!';
    dispatch({
      type: DELETE_PLAN + SUCCESS,
      payload: message
    });
    
    dispatch(actionFetchCasesPlans());
  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: DELETE_PLAN + FAILED,
      payload: message
    });
  }
}

export const actionFetchUserList = (data) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_LIST + PENDING });

    const payload = await api({
      method: 'POST',
      url: `/list/users`,
      data
    });

    dispatch({
      type: GET_USER_LIST + SUCCESS,
      payload: payload.data
    });

  } catch (e) {
    dispatch({
      type: GET_USER_LIST + FAILED
    });
  }
}

export const actionUserVerification = (id, email, is_verified) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFICATION + PENDING });

    const verify = is_verified ? 'deactivate' : 'activate';

    await api({
      method: 'POST',
      url: `/admin/user/${verify}`,
      data: {
        userID: id
      }
    });

    const message = `${email} was ${is_verified ? 'deactivated!' : 'activated!'}`;

    dispatch({
      type: USER_VERIFICATION + SUCCESS,
      payload: message
    });


  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: USER_VERIFICATION + FAILED,
      payload: message
    });
  }
}

