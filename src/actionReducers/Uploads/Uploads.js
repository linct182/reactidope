//Types
import {
  SET_FILE_UPLOAD,
  DELETE_FILE_UPLOAD,
  UPLOAD_FILES,
  PROGRESS,
  PENDING,
  SUCCESS,
  FAILED
} from './index';

const INITIAL_STATE = {
  isFileUploadPending: false,
  fileUploadProgress: 0,
  fileUpload: []
};

const uploads = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Fetch case details
    case SET_FILE_UPLOAD:
      return {
        ...state,
        fileUpload: [
          ...state.fileUpload,
          action.payload
        ]
      }

    case DELETE_FILE_UPLOAD:
      return {
        ...state,
        fileUpload: state.fileUpload.filter((data, index) => index !== action.payload)
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
        fileUploadProgress: 0,
        fileUpload: []
      }

    case UPLOAD_FILES + FAILED:
      return {
        ...state,
        isFileUploadPending: false,
        fileUpload: []
      }

    default:
      return state
  }
}

export default uploads;