//Types
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_DISPLAY
} from './index';

const INITIAL_STATE = {
  isOpenModal: false,
  modalDisplay: {}
};

const modals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Fetch case details
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpenModal: false
      }
    case SET_MODAL_DISPLAY:
      return {
        ...state,
        modalDisplay: action.payload,
      }

    default:
      return state
  }
}

export default modals;