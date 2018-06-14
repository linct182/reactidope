import api from '../../utils/api';

//Types
import {
  GET_AVAILABLE_CASES_COUNT,
  OPEN_CASE,
  GET_ACTIVE_CASE,
  GET_CASE_HISTORIES,
  UPDATE_WEBSITE_STATUS,
  AGENT_SEND_FEEDBACK,
  AGENT_RESOLVE_CASE,
  PENDING,
  SUCCESS,
  FAILED
} from './AgentTypes';

export const actionResolveCase = (case_uuid) => async (dispatch) => {
  try {
    dispatch({
      type: AGENT_RESOLVE_CASE + PENDING
    });

    await api({
      method: 'POST',
      url: `/agent/cases/resolve`,
      data: {
        caseID: case_uuid
      }
    });

    const message = 'Case resolved!';

    dispatch({
      type: AGENT_RESOLVE_CASE + SUCCESS,
      payload: message
    });


  } catch (e) {
    const message = 'Something went wrong!';
    dispatch({
      type: AGENT_RESOLVE_CASE + FAILED,
      payload: message
    });
  }
}

export const actionOpenCase = () => async (dispatch) => {
  try {
    dispatch({
      type: OPEN_CASE + PENDING
    });
    let message = '';

    let { data } = await api({
      method: 'POST',
      url: `/agent/cases/open`
    });

    if (data.case_uuid) {
      message = `You have opened a case with Ref id: ${data.case_uuid}`;
    } else {
      message = 'no cases yet';
    }

    
    dispatch({ type: '@route/agentDashboard' });
    dispatch({
      type: OPEN_CASE + SUCCESS,
      payload: message
    });
    

  } catch (e) {
    dispatch({ type: '@route/agentDashboard' });
    dispatch({
      type: OPEN_CASE + FAILED,
      payload: e.message
    });
  }
}

export const actionGetAvailableCasesCount = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_AVAILABLE_CASES_COUNT + PENDING
    });

    let { data } = await api({
      method: 'GET',
      url: `/agent/cases/count`
    });
    dispatch({
      type: GET_AVAILABLE_CASES_COUNT + SUCCESS,
      payload: data.count
    });
  } catch (e) {
    dispatch({
      type: GET_AVAILABLE_CASES_COUNT + FAILED,
      message: e.message
    });
  }
}

export const actionGetActiveCaseDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACTIVE_CASE + PENDING
    });

    let { data } = await api({
      method: 'GET',
      url: `/agent/case/active`
    });
    
    dispatch({
      type: GET_ACTIVE_CASE + SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: GET_ACTIVE_CASE + FAILED,
      message: e.message
    });
  }
}

export const actionGetCaseHistories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CASE_HISTORIES + PENDING
    });

    let { data } = await api({
      method: 'GET',
      url: `/agent/cases/history`
    });
    dispatch({
      type: GET_CASE_HISTORIES + SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: GET_CASE_HISTORIES + FAILED
    });
  }
}

export const actionUpdateWebsiteStatus = (webData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_WEBSITE_STATUS + PENDING
    });

    await api({
      method: 'POST',
      url: `/agent/websites/set-status`,
      data: webData
    });
    dispatch({
      type: UPDATE_WEBSITE_STATUS + SUCCESS,
      payload: `${webData.website_name} has been update to ${webData.website_status}!`
    });
  } catch (e) {
    dispatch({
      type: UPDATE_WEBSITE_STATUS + FAILED,
      payload: e
    });
  }
}

export const actionAgentSendFeedback = (webData) => async (dispatch) => {
  try {
    dispatch({
      type: AGENT_SEND_FEEDBACK + PENDING
    });

    await api({
      method: 'POST',
      url: `/feedbacks/create`,
      data: {
        caseID: webData.caseID,
        feedback: `[${webData.website_name}] ${webData.feedback}`
      }
    });
    dispatch({
      type: AGENT_SEND_FEEDBACK + SUCCESS,
      payload: `Feedback successfully added for ${webData.website_name}!`
    });
  } catch (e) {
    dispatch({
      type: AGENT_SEND_FEEDBACK + FAILED,
      payload: e
    });
  }
}