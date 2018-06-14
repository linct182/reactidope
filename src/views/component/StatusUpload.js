import React, { Fragment } from 'react';
import styled, { keyframes } from 'react-emotion';
import Loading from './Loading';

const Overlay = styled('div')({
  backgroundColor: '#00000021',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0

});

const StatusContainer = styled('div')({
  position: 'fixed',
  border: '1px solid #e0dbdb',
  fontSize: 22,
  fontFamily: 'Raleway',
  borderRadius: 3,
  backgroundColor: '#ffff',
  padding: '12px 32px',
  zIndex: 9999,
  top: '50%',
  left: '50%',
  marginTop: -50,
  marginLeft: -100
}); 

const StatusText = styled('div')({
}); 

const Status = () =>{
  return (
    <Overlay>
      <StatusContainer>
        <Loading/>
        <StatusText> Submitting Case </StatusText>
      </StatusContainer>
    </Overlay>
  )
}

export default Status;