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
  margin: '24px auto',
  '& .loader-item': {
    display: 'inline-block',
    width: '30px',
    height: '20px',
    marginLeft: '2px',
    backgroundColor: '#17263d',
    color: '#17263d',
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
      <span className="loader-item">1</span>
      <span className="loader-item">2</span>
      <span className="loader-item">3</span>
      <span className="loader-item">4</span>
      <span className="loader-item">5</span>
      <span className="loader-item">6</span>
    </Loader>
  )
}
 
export default Loading;

