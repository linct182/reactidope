import styled from 'react-emotion';

import breakpoints from '../../styles/breakpoints';
import { INPUT_COLOR } from '../../assets/constants';

const Field = styled('div')({
  display: 'block',
  position: 'relative'
}, (breakpoints({
  width: ['100%', '93%', '47%'],
  margin: [0, 5, 10]
})));

export default Field;