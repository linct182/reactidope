import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Container, Row, Col, Input, Button, Alert } from 'reactstrap';

// Components
import Form from '../component/FormNew';

// utils
import { actionLoginUser } from '../../actionReducers/Auth';
import loading from '../../assets/icons/loading.gif';
import breakpoints from '../../styles/breakpoints';
import { ORANGE, GREY, BLUE } from '../../assets/constants';
import bg from '../../assets/img/Homepage_4thSec_img.jpg';

const LoginSection = styled('section')({
  backgroundColor: '#f4f4f4',
  minHeight: '300px',
  textAlign: 'left',
  padding: '0px'
});

const LoginOpposite = styled('div')({
  width: '100%',
  height: '100%',
  minHeight: '300px',
  background: `url(${bg}) no-repeat`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

const LoginForm = styled('div')({
  width: '100%',
  minHeight: '500px',
  maxWidth: '400px',
  boxShadow: '-72px -30px 204px 57px rgba(244,244,244,1);',
  textAlign: 'left',
}, (breakpoints({
  padding: ['24px 24px', '32px 24px', '48px 0'],
})));

const ContactHeader = styled('h3')({
  fontFamily: 'Raleway',
  color: BLUE,
  fontWeight: '300',
  fontSize: '24px',
  marginBottom: '24px'
});

const LoginInput = styled(Input)({
  backgroundColor: '#fff',
  borderRadius: '0px',
  borderColor: '#fff',
  fontFamily: 'Raleway',
  color: '#000',
  fontWeight: '200',
  marginBottom: '12px',
  ':focus': {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: '200',
  },
  '::placeholder': {
    color: '#aaa',
    fontWeight: '100',
  }
});

const SubmitButton = styled(Button)({
  backgroundColor: '#f2531c',
  borderRadius: '0',
  padding: '5px',
  fontFamily: 'Raleway',
  fontWeight: '300',
  fontSize: '16px',
  width: '100%'
});

const LoginNotes = styled('p')({
  color: GREY,
  fontFamily: 'Raleway',
  fontWeight: '200',
  fontSize: '16px',
  marginTop: '24px',
  '& a' : {
    color: ORANGE,
    fontFamily: 'Raleway',
    fontWeight: '400'
  }
}, (breakpoints({
  fontSize: ['14px', '16px', '16px'],
}))); 

const LoadingIcon = styled('img')({
  width: 30,
  position: 'absolute',
  margin: '20px 35px' 
});

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  submitHandler = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      const user = {
        email: this.state.email,
        password: this.state.password
      }
      console.log('login...');
      this.props.actionLoginUser(user);
    }
  }

  render() {
    return ( 
      <LoginSection id='login' ref='login'>
         <Container fluid> 
          <Row style={{overflow: 'hidden', padding: '0px'}}>
            <Col md="6" style={{ padding: '0px'}}>
              <LoginOpposite />
            </Col>
            <Col md="6" style={{ padding: '0px', paddingLeft: '15px'}}>
              <LoginForm>
                  <ContactHeader>Already A Member?<br />Login Here...</ContactHeader>
                  {this.props.errorLoginMessage !== '' ? <Alert color="danger">{this.props.errorLoginMessage}</Alert> : ''}
                  <Form onSubmit={this.submitHandler} >  
                    <LoginInput
                      type='text'
                      name='email'
                      placeholder="Email"
                      value={this.state.email} onChange={e => this.setState({ email: e.target.value })}
                    required/>
                    <LoginInput
                      type='password'
                      name='password'
                      placeholder="Password"
                      value={this.state.password} onChange={e => this.setState({ password: e.target.value })}
                    required/>
                  {this.props.isLoginFetching ? <LoadingIcon src={loading} /> : ''}
                    <SubmitButton type='submit' color="danger" {...this.props.isLoginFetching}>LOGIN</SubmitButton>
                    <LoginNotes>Not a member yet? <a href="#register">Sign Up</a></LoginNotes>
                  </Form>  
              </LoginForm>
            </Col>
          </Row>
        </Container>
      </LoginSection>
     )
  }
}

 
export default connect(state => ({
  isLoginFetching: state.auth.isLoginFetching,
  errorLoginMessage: state.auth.errorLoginMessage
}),
  { actionLoginUser }
)(Login);