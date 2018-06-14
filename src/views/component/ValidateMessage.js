import React from 'react';
import styled from 'react-emotion';

import breakpoints from '../../styles/breakpoints';

const ValidateMessage = styled('p')({
  color: 'black',
  margin: '0',
  position: 'absolute'
},(props) =>({
  color: props.valid ? 'green' : 'red' 
}), (breakpoints({
  fontSize: [10, 12, 14],
  top: ['82px', '72px', '90px']
}))); 

export default ValidateMessage;