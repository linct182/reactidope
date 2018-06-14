import React, { Fragment } from 'react';
import styled, { keyframes } from 'react-emotion';
import Loading from './Loading';
import Status from './Status';

import {
  Progress
} from 'reactstrap';

import uploadIcon from '../../assets/icons/upload.svg';


const ProgressContainer = styled('div')({
  borderRadius: 40,
  margin: '10px 0px'
});

const ProgressCustom = styled(Progress)({
  backgroundColor: '#cfcfcf',
  borderRadius: 40,
  height: 5,
  margin: '15px 0px 5px'
});

const ProgressTitleContainer = styled('div')({
  color: 'gray',
  fontSize: 10,
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center'
});

const IconUpload = styled('img')({
  width: 50,
  height: 50,
  padding: '0px 10px',
  boxSizing: 'border-box',
});

const ProgressTitle = styled('div')({
  fontSize: 25,
  padding: '10px 5px',
  boxSizing: 'border-box',
});
const ProgressLabel = styled('div')({
  color: 'gray',
  fontSize: 12,
  textAlign: 'right'
});

const UploadProgress = ({isFileUploadPending, fileUploadProgress}) => {
  return (isFileUploadPending) ?
    <Status>
      <ProgressContainer>
        <ProgressTitleContainer> 
          <IconUpload src={uploadIcon}/>
          <ProgressTitle>Upload Files</ProgressTitle>
        </ProgressTitleContainer>
        <ProgressCustom value={fileUploadProgress} >
          <Progress style={{ "backgroundColor": "#66c430" }} />
        </ProgressCustom>
        <ProgressLabel>{fileUploadProgress}%</ProgressLabel>
      </ProgressContainer>
    </Status>    
  : null
}

export default UploadProgress;