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

const INITIAL_STATE = {
  isActiveCasePending: false,
  isAvailableCasesCountPending: false,
  isOpenCasePending: false,
  isCaseHistoryPending: false,
  isUpdateWebsiteStatusPending: false,
  isSendingFeedback: false,
  isCaseResolving: false,
  activeCaseDetails: {
    base: '',
    caseDetails: {
      comments: '',
      websites: [],
      attachments: [],
      status: {},
      createdAt: '----'
    }
  }, 
  availableCasesCount: 0,
  openCaseMessage: '',
  updateWebsiteMessage: '',
  sendFeedbackMessage: '',
  resolveCaseMessage: '',
  caseHistories: [],
}

const agent = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //AGENT RESOLVE CASE
    case AGENT_RESOLVE_CASE + PENDING:
      return {
        ...state,
        isCaseResolving: true
      }
    case AGENT_RESOLVE_CASE + SUCCESS:
      return {
        ...state,
        isCaseResolving: false,
        resolveCaseMessage: action.payload
      }
    case AGENT_RESOLVE_CASE + FAILED:
      return {
        ...state,
        isCaseResolving: false,
        resolveCaseMessage: action.payload
      }
    //OPEN CASE
    case OPEN_CASE + PENDING:
      return {
        ...state,
        isOpenCasePending: true
      }
    case OPEN_CASE + SUCCESS:
      return {
        ...state,
        isOpenCasePending: false,
        openCaseMessage: action.payload
      }
    case OPEN_CASE + FAILED:
      return {
        ...state,
        isOpenCasePending: false,
        openCaseMessage: action.payload
      }
    //Fetch availableCases
    case GET_AVAILABLE_CASES_COUNT + PENDING:
      return {
        ...state,
        isAvailableCasesCountPending: true
      }
    case GET_AVAILABLE_CASES_COUNT + SUCCESS:
      return {
        ...state,
        isAvailableCasesCountPending: false,
        availableCasesCount: action.payload
      }
    case GET_AVAILABLE_CASES_COUNT + FAILED:
      return {
        ...state,
        isAvailableCasesCountPending: false
      }
    //Fetch case details
    case GET_ACTIVE_CASE + PENDING:
      return {
        ...state,
        isActiveCasePending: true
      }
    case GET_ACTIVE_CASE + SUCCESS:
      return {
        ...state,
        activeCaseDetails: action.payload,
        openCaseMessage: '',
        updateWebsiteMessage: '',
        sendFeedbackMessage: '',
        resolveCaseMessage: '',
        isActiveCasePending: false,
      }
    case GET_ACTIVE_CASE + FAILED:
      return {
        ...state,
        isActiveCasePending: false
      }
    //Fetch case histories
    case GET_CASE_HISTORIES + PENDING:
      return {
        ...state,
        isCaseHistoryPending: true
      }
    case GET_CASE_HISTORIES + SUCCESS:
      return {
        ...state,
        isCaseHistoryPending: false,
        caseHistories: action.payload
      }
    case GET_CASE_HISTORIES + FAILED:
      return {
        ...state,
        isCaseHistoryPending: false
      }
    //Update Website Status
    case UPDATE_WEBSITE_STATUS + PENDING:
      return {
        ...state,
        isUpdateWebsiteStatusPending: true
      }
    case UPDATE_WEBSITE_STATUS + SUCCESS:
      return {
        ...state,
        isUpdateWebsiteStatusPending: false,
        updateWebsiteMessage: action.payload
      }
    case UPDATE_WEBSITE_STATUS + FAILED:
      return {
        ...state,
        isUpdateWebsiteStatusPending: false,
        updateWebsiteMessage: action.payload
      }
    //Agent send feedback
    case AGENT_SEND_FEEDBACK + PENDING:
      return {
        ...state,
        isSendingFeedback: true
      }
    case AGENT_SEND_FEEDBACK + SUCCESS:
      return {
        ...state,
        isSendingFeedback: false,
        sendFeedbackMessage: action.payload
      }
    case AGENT_SEND_FEEDBACK + FAILED:
      return {
        ...state,
        isSendingFeedback: false,
        sendFeedbackMessage: action.payload
      }
    default:
      return state
  }
}

export default agent;