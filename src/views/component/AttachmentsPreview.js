import React from 'react';
import styled from 'react-emotion';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalBodyCustome = styled(ModalBody)({
  height: '100vh',
  display: 'flex'
});

const Display = styled('img')({
  margin: 'auto',
  maxWidth: '100%',
  maxHeight: '100%'
});

const FileViewer = ({ isOpen, actionToggle, baseUrl, modalDisplay}) => {
  const displayImg = (modalDisplay) ? modalDisplay.link : null;
  return (
    <Modal isOpen={isOpen} toggle={actionToggle} size={'lg'}>
      <ModalHeader toggle={actionToggle}>File Viewer</ModalHeader>
      <ModalBodyCustome>
        <Display src={baseUrl + displayImg} />
      </ModalBodyCustome>
    </Modal>
  )
}
 
export default FileViewer; 
