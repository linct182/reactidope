//Reducer
import Uploads from './Uploads';

//Types
export const SET_FILE_UPLOAD = '[UPLOADS] SET_FILE_UPLOAD';
export const DELETE_FILE_UPLOAD = '[UPLOADS] DELETE_FILE_UPLOAD';
export const UPLOAD_FILES = '[UPLOADS] UPLOAD_FILES';

//Status
export const PROGRESS = '_PROGRESS';
export const PENDING = '_PENDING';
export const SUCCESS = '_SUCCESS';
export const FAILED = '_FAILED';

//Actions
export {
  actionSetUploadFiles,
  actionDeleteFileUpload,
  actionFileUpload
} from './UploadsActions';

//Selectors

export default Uploads;