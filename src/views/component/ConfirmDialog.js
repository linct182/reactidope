import React, { Component } from 'react';
import styled from 'react-emotion';
import breakpoints from '../../styles/breakpoints';
import {
  Container, Row, Col, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';


const MenuContainer = styled('div')({
  display: 'inline-block',
  cursor: 'pointer',
  margin: '20px',
  position: 'absolute',
}, (breakpoints({
    display: ['inline-block', 'inline-block', 'none'],
    right: ['-5px', '0px','10px']

})));

const Dialog = styled(Modal)({
  '& .modal-content': {
    borderRadius: '0px',
    '& .modal-title': {
      fontSize: '16px'
    }
  },
  '& button': {
    borderRadius: '0px'
  }
});

const VerifyLoader = styled('div')({
  position: 'fixed',
  right: '50px',
  zIndex: 99,
  top: '64px',
});
const Title = styled('span')({
  fontWeight: 'bold',
});


const ConfirmDialog = ({
  isOpenDialog,
  dialogTitle,
  planTitle,
  dialogMsg,
  toggleDialog,
  onConfirmDialog
}) => {
  return ( 
    <Dialog isOpen={isOpenDialog} toggle={toggleDialog} size={'sm'}>
      <ModalHeader toggle={toggleDialog}>{dialogTitle}</ModalHeader>
        <ModalBody>
        {dialogMsg} <Title>{planTitle}</Title>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" size="sm" onClick={() => onConfirmDialog()}>Confirm</Button>
        <Button color="scondary" size="sm" onClick={() => toggleDialog()}>Cancel</Button>
        </ModalFooter>
      </Dialog>
     )
  
}
  
export default ConfirmDialog;