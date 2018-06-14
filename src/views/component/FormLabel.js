import styled from 'react-emotion';

import breakpoints from '../../styles/breakpoints';
import { INPUT_COLOR } from '../../assets/constants';

const Label = styled('label')(breakpoints({
  fontSize: [14, 16, 20]
})); 

export default Label;