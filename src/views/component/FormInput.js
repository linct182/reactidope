import styled from 'react-emotion';

import breakpoints from '../../styles/breakpoints';
import { INPUT_COLOR } from '../../assets/constants';

const Input = styled('input')({
  backgroundColor: INPUT_COLOR,
  width: '93%',
  margin: '10px 0px 10px 0px',
  padding: '10px'
}, (breakpoints({
  fontSize: [12, 14, 18],
  width: ['100%', '100%', '93%']
}))); 

export default Input;