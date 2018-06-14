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

const INITIAL_STATE = {
  pricingPlan: {
    selectedPlanId: null,
    isCreatePlanPending: false,
    isDeletePlanPending: false,
    isUpdatePlanPending: false,   
    isCreatePlanMsg: '',
    isUpdatePlanMsg: '',
    isDeletePlanMsg: ''
  },
  isUserListFetching: false,
  userList: {
    count: 0,
    pages: 0,
    result: []
  },
  isUserVerifying: false,
  verificationMessage: '',
};

const admin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //ADMIN USER VERIFICATION
    case USER_VERIFICATION + PENDING:
      return {
        ...state,
        isUserVerifying: true
      }
    case USER_VERIFICATION + SUCCESS:
      return {
        ...state,
        isUserVerifying: false,
        verificationMessage: action.payload
      }
    case USER_VERIFICATION + FAILED:
      return {
        ...state,
        isUserVerifying: false,
        verificationMessage: action.payload
      }
    // GET_USER_LIST
    case GET_USER_LIST + PENDING:
      return {
        ...state,
        isUserListFetching: true,
      }
    case GET_USER_LIST + SUCCESS:
      return {
        ...state,
        isUserListFetching: false,
        userList: action.payload,
        verificationMessage: ''
      }
    case GET_USER_LIST + FAILED:
      return {
        ...state,
        isUserListFetching: false,
      }

    // [PRICING PLAN] CREATE_PLAN
    case CREATE_PLAN + PENDING:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isCreatePlanPending: true,
          isCreatePlanMsg: ''
        }
      }
    case CREATE_PLAN + SUCCESS:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isCreatePlanPending: false,
          isCreatePlanMsg: action.payload
        }
      }
    case CREATE_PLAN + FAILED:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isCreatePlanPending: false,
          isCreatePlanMsg: action.payload
        }
      }

    // [PRICING PLAN] SET_SELECTED_PLAN
    case SET_SELECTED_PLAN:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          selectedPlanId: action.payload
        }
      }
    // [PRICING PLAN] UPDATE_PLAN
    case UPDATE_PLAN + PENDING:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isUpdatePlanPending: true,
          isUpdatePlanMsg: ''
        }
      }
    case UPDATE_PLAN + SUCCESS:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isUpdatePlanPending: false,
          isUpdatePlanMsg: action.payload
        }
      }
    case UPDATE_PLAN + FAILED:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isUpdatePlanPending: false,
          isUpdatePlanMsg: action.payload
        }
      }

    // [PRICING PLAN] DELETE_PLAN
    case DELETE_PLAN + PENDING:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isDeletePlanPending: true,
          isDeletePlanMsg: ''
        }
      }
    case DELETE_PLAN + SUCCESS:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          selectedPlanId: null,
          isDeletePlanPending: false,
          isDeletePlanMsg: action.payload
        }
      }
    case DELETE_PLAN + FAILED:
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isDeletePlanPending: false,
          isDeletePlanMsg: action.payload
        }
      }

    case PRICING_PLAN_RESET_MSG:
      console.log('PRICING_PLAN_RESET_MSG');
      return {
        ...state,
        pricingPlan: {
          ...state.pricingPlan,
          isCreatePlanMsg: '',
          isUpdatePlanMsg: '',
          isDeletePlanMsg: ''
        }
      }

    default:
      return state
  }
}

export default admin;