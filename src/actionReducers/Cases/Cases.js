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
  SUMIT_CASES,
  SET_FILE_UPLOAD,
  DELETE_FILE_UPLOAD,
  UPLOAD_FILES,
  PENDING,
  PROGRESS,
  SUCCESS,
  FAILED,
  WIZZARD_PREV,
  WIZZARD_NEXT,
  WIZZARD_WEBSITE_INPUT
} from './index';

const INITIAL_STATE = {
  isCaseFetching: false,
  isCaseDetailsFetching: false,
  isCasePlanFetching: false,
  isCaseSubmitPending: false,
  isCaseFeedbacksFetching: false,
  isCaseWebsitesFetching: false,
  isCaseAttachmentsFetching: false,
  isCaseSubmitStatus: {},
  caseDetails: {
    base: '',
    caseDetails: {
      websites: [],
      attachments: [],
      status: {},
      createdAt: new Date()
    }
  },  
  isFileUploadPending: false,
  fileUploadProgress: 0,
  caseList: [],
  caseFeedbacks: [],
  caseWebsites: [],
  casePlan: [],
  caseAttachments: [],
  caseWizzard: {
    isOpen: false,
    progress: 25,
    btnNextStatus: 0, //0=disable, 1=enable, 2=finish
    btnPrevStatus: 0, //0=disable, 1=enable, 2=finish
    isDisableWebsiteInput: false
  },
  caseSubmitData: {
    plan_id: null,
    comments: '',
    websites: [],
    nonce: null,
    type: null
  },
  caseFileUpload: [],
  isCaseClosing: false,
  closeCaseMessage: ''
};

const cases = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //CUSTOMER CLOSE CASE
    case CUSTOMER_CLOSE_CASE + PENDING:
      return {
        ...state,
        isCaseClosing: true
      }
    case CUSTOMER_CLOSE_CASE + SUCCESS:
      return {
        ...state,
        isCaseClosing: false,
        closeCaseMessage: action.payload
      }
    case CUSTOMER_CLOSE_CASE + FAILED:
      return {
        ...state,
        isCaseClosing: false,
        closeCaseMessage: action.payload
      }
    //Fetch websites
    case FETCH_ATTACHMENTS + PENDING:
      return {
        ...state,
        isCaseAttachmentsFetching: true
      }
    case FETCH_ATTACHMENTS + SUCCESS:
      return {
        ...state,
        isCaseAttachmentsFetching: false,
        caseAttachments: action.payload
      }
    case FETCH_ATTACHMENTS + FAILED:
      return {
        ...state,
        isCaseAttachmentsFetching: false
      }
    //Fetch websites
    case FETCH_WEBSITES + PENDING:
      return {
        ...state,
        isCaseWebsitesFetching: true
      }
    case FETCH_WEBSITES + SUCCESS:
      return {
        ...state,
        isCaseWebsitesFetching: false,
        caseWebsites: action.payload
      }
    case FETCH_WEBSITES + FAILED:
      return {
        ...state,
        isCaseWebsitesFetching: false
      }
    //Fetch case details
    case FETCH_CASE_DETAILS + PENDING:
      return {
        ...state,
        isCaseDetailsFetching: true
      }
    case FETCH_CASE_DETAILS + SUCCESS:
      return {
        ...state,
        isCaseDetailsFetching: false,
        caseDetails: action.payload,
        closeCaseMessage: ''
      }
    case FETCH_CASE_DETAILS + FAILED:
      return {
        ...state,
        isCaseDetailsFetching: false
      }

    //Fetch feedbacks
    case FETCH_FEEDBACKS + PENDING:
      return {
        ...state,
        isCaseFeedbacksFetching: true
      }
    case FETCH_FEEDBACKS + SUCCESS:
      return {
        ...state,
        isCaseFeedbacksFetching: false,
        caseFeedbacks: action.payload
      }
    case FETCH_FEEDBACKS + FAILED:
      return {
        ...state,
        isCaseFeedbacksFetching: false
      }

    //Fetch cases
    case FETCH_CASES + PENDING:
      return {
        ...state,
        isCaseFetching: true
      }
    case FETCH_CASES + SUCCESS:
      return {
        ...state,
        isCaseFetching: false,
        caseList: action.payload
      }
    case FETCH_CASES + FAILED:
      return {
        ...state,
        isCaseFetching: false
      }

    //Fetch plans
    case FETCH_CASES_PLANS + PENDING:
      return {
        ...state,
        isCasePlanFetching: true
      }
    case FETCH_CASES_PLANS + SUCCESS:
      return {
        ...state,
        isCasePlanFetching: false,
        casePlan: action.payload
      }
    case FETCH_CASES_PLANS + FAILED:
      return {
        ...state,
        isCasePlanFetching: false
      }

    //Set case data
    case SET_PLAN_ID:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          plan_id: action.payload,
          websites: []// clear websites when chnaging plans
        },
        caseWizzard: {
          ...state.caseWizzard,
          btnNextStatus: 1
        }
      }
    case SET_WEBSITES:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          websites: [
            ...state.caseSubmitData.websites,
            {
              url: action.payload
            }
          ]
        }
      }
    case DELETE_WEBSITE:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          websites: state.caseSubmitData.websites.filter(({ url }) => url !== action.payload)
        }
      }
    case SET_COMMENTS:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          comments: action.payload
        }
      }
    case SET_NONCE:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          nonce: action.payload
        }
      }
    case SET_PAYMENT_TYPE:
      return {
        ...state,
        caseSubmitData: {
          ...state.caseSubmitData,
          type: action.payload
        }
      }
    case SET_FILE_UPLOAD:
      return {
        ...state,
        caseFileUpload: [ 
          ...state.caseFileUpload, 
          action.payload 
        ]
      }

    case DELETE_FILE_UPLOAD:
      return {
        ...state,
        caseFileUpload: state.caseFileUpload.filter((data, index) => index !== action.payload) 
      }


    //Set wizzard behaviour
    case WIZZARD_NEXT:
      return {
        ...state,
        caseWizzard: {
          ...state.caseWizzard,
          progress: action.progress,
          btnNextStatus: action.btnNextStatus,
          btnPrevStatus: 1
        }
      }
    case WIZZARD_PREV:
      return {
        ...state,
        caseWizzard: {
          ...state.caseWizzard,
          progress: action.progress,
          btnNextStatus: 1,
          btnPrevStatus: action.btnNextStatus,
        }
      }
    case WIZZARD_WEBSITE_INPUT:
      return {
        ...state,
        caseWizzard: {
          ...state.caseWizzard,
          isDisableWebsiteInput: action.payload,
        }
      }

    case SUMIT_CASES + PENDING:
      return {
        ...state,
        isCaseSubmitPending: true
      }
    case SUMIT_CASES + SUCCESS:
      return {
        ...state,
        isCaseSubmitPending: false,
        isCaseSubmitStatus: action.payload
        // caseSubmitData: { ...INITIAL_STATE.caseSubmitData }
      }
    case SUMIT_CASES + FAILED:
      return {
        ...state,
        isCaseSubmitPending: false,
        cases: action.payload
      }

    case UPLOAD_FILES + PENDING:
      return {
        ...state,
        isFileUploadPending: true,  
      }
    case UPLOAD_FILES + PROGRESS:
      return {
        ...state,
        isFileUploadPending: true,
        fileUploadProgress: action.payload
      }
    case UPLOAD_FILES + SUCCESS:
      return {
        ...state,
        isFileUploadPending: false,
        caseWizzard: {// reset wizzard progress
          isOpen: false,
          progress: 25,
          btnNextStatus: 0, //0=disable, 1=enable, 2=finish
          btnPrevStatus: 0, //0=disable, 1=enable, 2=finish
          isDisableWebsiteInput: false
        },
        caseSubmitData: { // reset case submit data
          plan_id: null,
          comments: '',
          websites: [],
          nonce: null,
          type: null
        }
      }
    case UPLOAD_FILES + FAILED:
      return {
        ...state,
        isFileUploadPending: true
        // fileUploadProgress: action.payload
      }
    default:
      return state
  }
}

export default cases;