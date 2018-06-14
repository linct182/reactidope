import React from 'react';
import styled from 'react-emotion';

const FormComponent = styled('form')({
  backgroundColor: 'transparent',
});

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
