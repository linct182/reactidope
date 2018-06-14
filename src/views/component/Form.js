import React from 'react';
import styled from 'react-emotion';

import breakpoints from '../../styles/breakpoints';
import { INPUT_COLOR } from '../../assets/constants';

const FormComponent = styled('form')({
  backgroundColor: 'white',
  // margin: '50px 180px 50px 180px;',
  // padding: '50px'
}, (breakpoints({
  marginTop: [0, '10px'],
  marginLeft: [10,'10%'],
  marginRight: [10, '10%'],
  marginBottom: [40, '10%'],
  padding: [10,20,30,50]
})));

const submitHandler = (e, submit) => {
  e.preventDefault();
  submit();
}

const Form = (props) => {
  return (
    <FormComponent onSubmit={e => submitHandler(e, props.onSubmit)}>
      {props.children}
    </FormComponent>
  )
}

export default Form;
