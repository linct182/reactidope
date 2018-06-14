// Types
import {
  SET_FILE_UPLOAD,
  DELETE_FILE_UPLOAD,
  UPLOAD_FILES,
  PROGRESS,
  PENDING,
  SUCCESS,
  FAILED
} from './index';

import api from '../../utils/api';

export const actionSetUploadFiles = (file) => {
  return ({
    type: SET_FILE_UPLOAD,
    payload: file
  });
}

export const actionDeleteFileUpload = (data) => {
  return ({
    type: DELETE_FILE_UPLOAD,
    payload: data
  });
}

export const actionFileUpload = (file, case_uuid) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_FILES + PENDING
    });

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('attachments', file[i]);
    }

    const { data } = await api({
      method: 'POST',
      url: `/customer/caseuploads/${case_uuid}`,
      data: formData,
      onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        console.log('upload progress: ', Math.round(progressEvent.loaded / progressEvent.total * 100));
        dispatch({
          type: UPLOAD_FILES + PROGRESS,
          payload: Math.round(progressEvent.loaded / progressEvent.total * 100)
        });
      }
    });
    dispatch({
      type: UPLOAD_FILES + SUCCESS,
      payload: data
    });
  } catch (error) {
    
  }
}

