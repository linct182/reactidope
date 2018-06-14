// Types
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_DISPLAY
} from './index';

export const actionOpenModal  = () => {
  return ({ type: OPEN_MODAL });
}
export const actionCloseModal = () => {
  return ({ type: CLOSE_MODAL });
}
export const actionSetModalDisplay = (display) => {
  return ({ type: SET_MODAL_DISPLAY, payload: display });
}

