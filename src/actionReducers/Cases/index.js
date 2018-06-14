//Reducer
import Cases from './Cases';

//Types
export const CUSTOMER_CLOSE_CASE = '[CASE] CUSTOMER_CLOSE_CASE';
export const FETCH_CASE_DETAILS = '[CASE] FETCH_CASE_DETAILS';
export const FETCH_CASES = '[CASE] FETCH_CASES';
export const FETCH_CASES_PLANS = '[CASE] FETCH_CASES_PLANS';
export const FETCH_FEEDBACKS = '[CASE] FETCH_FEEDBACKS';
export const FETCH_WEBSITES = '[CASE] FETCH_WEBSITES';
export const FETCH_ATTACHMENTS = '[CASE] FETCH_ATTACHMENTS';
export const SET_PLAN_ID = '[CASE] SET_PLAN_ID';
export const SET_COMMENTS = '[CASE] SET_COMMENTS';
export const SET_WEBSITES = '[CASE] SET_WEBSITES';
export const DELETE_WEBSITE = '[CASE] DELETE_WEBSITE';
export const SET_NONCE = '[CASE] SET_NONCE';
export const SET_PAYMENT_TYPE = '[CASE] SET_PAYMENT_TYPE';
export const SET_FILE_UPLOAD = '[CASE] SET_FILE_UPLOAD';
export const DELETE_FILE_UPLOAD = '[CASE] DELETE_FILE_UPLOAD';
export const SUMIT_CASES = '[CASE] SUBMIT_CASES';
export const UPLOAD_FILES = '[CASE] UPLOAD_FILES';
export const WIZZARD_PREV = '[CASE] WIZZARD_PREV';
export const WIZZARD_NEXT = '[CASE] WIZZARD_NEXT';
export const WIZZARD_TOOGLE = '[CASE] WIZZARD_TOOGLE';
export const WIZZARD_WEBSITE_INPUT = '[CASE] WIZZARD_WEBSITE_INPUT';

//Status
export const PROGRESS = '_PROGRESS';
export const PENDING = '_PENDING';
export const SUCCESS = '_SUCCESS';
export const FAILED = '_FAILED';

//Actions
export {
  actionFetchCaseDetails,
  actionFetchCases,
  actionFetchCasesPlans,
  actionSetPlanId,
  actionSetWebsites,
  actionSetComment,
  actionSetNonce,
  actionSetPaymentType,
  actionSetUploadFiles,
  actionDeleteFileUpload,
  actionDeleteWebsite,
  actionSubmitCase,
  actionWizzardPrev,
  actionWizzardNext,
  actionToggleWizzard,
  actionWizzardToggleWebisteInput,
  actionFetchFeedbacks,
  actionFetchWebsites,
  actionFetchAttachments,
  actionCloseCase,
} from './CasesActions';

//Selectors
export {
  getIsDisabledWebsiteInput,
  getPlanSelected,
  getPlanChange,
  isValidCaseSubmit
} from './CasesSelectors';



export default Cases;