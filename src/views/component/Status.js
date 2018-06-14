import React from 'react';
import styled from 'react-emotion';

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
  padding: '12px 20px',
  zIndex: 9999,
  top: '50%',
  left: '50%',
  width: 300,
  marginTop: -50,
  marginLeft: -150
});

const Status = ({ children }) =>{
  return (
    <Overlay>
      <StatusContainer>
        {/* <Loading/>
        <StatusText> Submitting Case </StatusText> */}
        {children}
      </StatusContainer>
    </Overlay>
  )
}

export default Status;