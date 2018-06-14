import api from '../../utils/api';

//Types
import {
  CUSTOMER_CLOSE_CASE,
  FETCH_CASE_DETAILS,
  FETCH_CASES,
  FETCH_CASES_PLANS,
  FETCH_FEEDBACKS,
  FETCH_WEBSITES,
  FETCH_ATTACHMENTS,
  SET_PLAN_ID,
  SET_COMMENTS,
  SET_WEBSITES,
  DELETE_WEBSITE,
  SET_NONCE,
  SET_PAYMENT_TYPE,
  SET_FILE_UPLOAD,
  SUMIT_CASES,
  UPLOAD_FILES,
  DELETE_FILE_UPLOAD,
  PENDING,
  PROGRESS,
  SUCCESS,
  FAILED,
  WIZZARD_PREV,
  WIZZARD_NEXT,
  WIZZARD_TOOGLE,
  WIZZARD_WEBSITE_INPUT
} from './index';

import { actionResetPricePlanMsg } from '../Admin';

export const actionCloseCase = (case_uuid) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_CLOSE_CASE + PENDING
    });

    await api({
      method: 'POST',
      url: `/customer/case/confirm`,
      data: {
        caseID: case_uuid
      }
    });

    const message = 'Case closed!';

    dispatch({
      type: CUSTOMER_CLOSE_CASE + SUCCESS,
      payload: message
    });


  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: CUSTOMER_CLOSE_CASE + FAILED,
      payload: message
    });
  }
}

export const actionFetchAttachments = (case_uuid) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ATTACHMENTS + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: `/attachments/${case_uuid}`
      }
    );
    dispatch({ type: FETCH_ATTACHMENTS + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_ATTACHMENTS + FAILED, message: e.message });
  }
}

export const actionFetchWebsites = (case_uuid) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_WEBSITES + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: `/case/websites/${case_uuid}`
      }
    );
    dispatch({ type: FETCH_WEBSITES + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_WEBSITES + FAILED, message: e.message });
  }
}

export const actionFetchFeedbacks = (case_uuid) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FEEDBACKS + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: `/feedbacks/${case_uuid}`
      }
    );
    dispatch({ type: FETCH_FEEDBACKS + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_FEEDBACKS + FAILED, message: e.message });
  }
}

export const actionFetchCaseDetails = (case_uuid) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CASE_DETAILS + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: `/customer/case/${case_uuid}`
      }
    );
    dispatch({ type: FETCH_CASE_DETAILS + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_CASE_DETAILS + FAILED, message: e.message });
  }
}

export const actionFetchCases = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CASES + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: '/customer/cases'
      }
    );
    dispatch({ type: FETCH_CASES + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_CASES + FAILED, message: e.message });
  }
}

export const actionFetchCasesPlans = () => async (dispatch) => {
  try {
    dispatch(actionResetPricePlanMsg());
    dispatch({ type: FETCH_CASES_PLANS + PENDING });

    let { data } = await api(
      {
        method: 'GET',
        url: '/case-plans'
      }
    );
    dispatch({ type: FETCH_CASES_PLANS + SUCCESS, payload: data });

  } catch (e) {
    dispatch({ type: FETCH_CASES_PLANS + FAILED, message: e.message });
  }
}

export const actionSetPlanId = (data) => {
  return ({ type: SET_PLAN_ID, payload: data });
}

export const actionSetWebsites = (data) => { 
  return ({ type: SET_WEBSITES, payload: data });
}

export const actionDeleteWebsite = (data) =>  {
  return ({ type: DELETE_WEBSITE, payload: data });
}

export const actionSetComment = (data) => {
  return ({ type: SET_COMMENTS, payload: data });
}
export const actionSetNonce = (data) => {
  return ({ type: SET_NONCE, payload: data });
}
export const actionSetPaymentType = (data) => {
  return ({ type: SET_PAYMENT_TYPE, payload: data });
}

export const actionSetUploadFiles = (file) =>  {
  return ({ type: SET_FILE_UPLOAD, payload: file });
}

export const actionDeleteFileUpload = (data) => {
  return ({ type: DELETE_FILE_UPLOAD, payload: data });
}

export const actionSubmitCase = (caseData, file) => async (dispatch) => {
  try {
    dispatch({ type: SUMIT_CASES + PENDING });

    const caseSubmitResp = await api(
      {
        method: 'POST',
        url: '/customer/submitcase',
        data: caseData
      }
    );

    dispatch({ type: SUMIT_CASES + SUCCESS });

    dispatch({ type: UPLOAD_FILES + PENDING });

    const formData = new FormData();
    for (let i = 0; i < file.length; i++){
      formData.append('attachments', file[i]);
    }

    const caseUploadsResp = await api(
      {
        method: 'POST',
        url: `/customer/caseuploads/${caseSubmitResp.data.case_uuid}`,
        data: formData,
        onUploadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          console.log('upload progress: ', Math.round(progressEvent.loaded / progressEvent.total * 100));
          dispatch({ type: UPLOAD_FILES + PROGRESS, payload: Math.round(progressEvent.loaded / progressEvent.total * 100)});
        }
      }
    );
    dispatch({ type: UPLOAD_FILES + SUCCESS, payload: caseUploadsResp.data });

    dispatch({ type: FETCH_CASES + PENDING });
    const { data } = await api(
      {
        method: 'GET',
        url: '/customer/cases'
      }
    );
    dispatch({ type: FETCH_CASES + SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: SUMIT_CASES + FAILED, message: e.message });
  }
}

export const actionWizzardPrev = (progress, btnNextStatus) => {
  return({ type: WIZZARD_PREV, progress: progress, btnNextStatus: btnNextStatus});
}

export const actionWizzardNext = (progress, btnNextStatus) => {
  return({ type: WIZZARD_NEXT, progress: progress, btnNextStatus: btnNextStatus});
}

export const actionWizzardToggleWebisteInput = (status) => {
  return({ type: WIZZARD_WEBSITE_INPUT, payload: status});
}

export const actionToggleWizzard = (progress) => {
  return ({ type: WIZZARD_TOOGLE, payload: progress });
}

