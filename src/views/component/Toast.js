import styled, { keyframes } from 'react-emotion';
const fadeOut = keyframes` 
{
  0% {opacity: 1;}
  100% {opacity: 0;}
}
`
const Toast = styled('div')({
  position: 'fixed',
  color: 'white',
  border:'1px solid red',
  fontSize: '16px',
  borderRadius: '3px',
  backgroundColor: '#ff0000a6',
  bottom: '20px',
  right: '20px',
  padding: '12px 32px',
  zIndex: '9999',
  opacity: 0,
  animation: `${fadeOut} 5s ease`
}); 

export default Toast;