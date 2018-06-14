import styled from 'react-emotion';
import breakpoints from '../../styles/breakpoints';

const TextHeader = styled('div')({
  
  fontWeight: '500'
  // padding: '10px'
}, (breakpoints({
  fontSize: [16, 28, 46],
  padding: ['10px', '5% 5% 20px 10%']

}))); 

export default TextHeader;