import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import breakpoints from '../../styles/breakpoints';
import spinner from '../../assets/icons/spinner.svg';


const ButtonStyle = styled('button')({
  color: 'white',
  margin: '10px',
  width: '200px'
},(props) => ({

  backgroundImage: `url(${spinner})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  backgroundSize: props.isLoading? 50: 0,
  borderColor: props.color,
  backgroundColor: props.color
}), breakpoints({
  fontSize: [14, 19, 20],
  fontWeight: [400, 500, 500],
  padding: [0, 0, 10],
  width: [120, 150, 200],
  height: [30, 40, 50]
}));




const Button = ({ children, ...props }) => {
  return (
    <ButtonStyle {...props}>
      { children }
    </ButtonStyle>

  )
}
 
export default Button;

