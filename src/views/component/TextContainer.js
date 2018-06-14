import styled from 'react-emotion';
import breakpoints from '../../styles/breakpoints';

const TextContainer = styled('div')({
  color: 'white',
  position: 'relative',
}, (breakpoints({
  paddingTop: [15, 20, 10],
  paddingLeft: [0, 5, 10]
}))); 

export default TextContainer;