//Reducer
import Modals from './Modals';

//Types
export const OPEN_MODAL = '[MODAL] OPEN_MODAL';
export const CLOSE_MODAL = '[MODAL] CLOSE_MODAL';
export const SET_MODAL_DISPLAY = '[MODAL] SET_MODAL_DISPLAY';

//Status
export const PROGRESS = '_PROGRESS';
export const PENDING = '_PENDING';
export const SUCCESS = '_SUCCESS';
export const FAILED = '_FAILED';

//Actions
export {
  actionOpenModal,
  actionCloseModal,
  actionSetModalDisplay
} from './ModalsActions';

//Selectors

export default Modals;