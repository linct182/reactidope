import React from 'react';
import styled, { keyframes } from 'react-emotion';
import loading from '../../assets/icons/loading.gif';

const fade = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Loader = styled('div')({
  display: 'block',
  overflow: 'hidden',
  fontSize: '0px',
  '& .loader-item': {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    marginLeft: '2px',
    backgroundColor: '#186fa4',
    color: '#186fa4',
    animationDuration: '2s',
    animationTimingFunction: 'cubic-bezier(.645, .045, .355, 1)',
    animationIterationCount: 'infinite',
    animationName: `${fade}`,
    animationDuration: '1s',
    '&:nth-child(1)': {
      animationDelay: '.1s'
    },
    '&:nth-child(2)': {
      animationDelay: '.2s'
    },
    '&:nth-child(3)': {
      animationDelay: '.3s'
    },
    '&:nth-child(4)': {
      animationDelay: '.4s'
    },
    '&:nth-child(5)': {
      animationDelay: '.5s'
    },
    '&:nth-child(6)': {
      animationDelay: '.6s'
    },
  }
});

const Loading = () => {
  return (
    <Loader>
      < div class = "sequence" >

        <div class = "seq-preloader" >
        <svg width = "39" height = "16" viewBox = "0 0 39 16" xmlns = "http://www.w3.org/2000/svg" class = "seq-preload-indicator" > 
        <title> Sequence Preloader Icon </title><desc>Three orange dots increasing in size from left to right</desc > 
        <g fill = "#F96D38" > 
        <path class="seq-preload-circle seq-preload-circle-1" d="M3.999 12.012c2.209 0 3.999-1.791 3.999-3.999s-1.79-3.999-3.999-3.999-3.999 1.791-3.999 3.999 1.79 3.999 3.999 3.999z"/> 
        <path class = "seq-preload-circle seq-preload-circle-2" d="M15.996 13.468c3.018 0 5.465-2.447 5.465-5.466 0-3.018-2.447-5.465-5.465-5.465-3.019 0-5.466 2.447-5.466 5.465 0 3.019 2.447 5.466 5.466 5.466z"/> 
        < path class = "seq-preload-circle seq-preload-circle-3"
      d = "M31.322 15.334c4.049 0 7.332-3.282 7.332-7.332 0-4.049-3.282-7.332-7.332-7.332s-7.332 3.283-7.332 7.332c0 4.05 3.283 7.332 7.332 7.332z" / > < /g></svg >
        <
        /div>

        <
        /div>
    </Loader>
  )
}
 
export default Loading;

