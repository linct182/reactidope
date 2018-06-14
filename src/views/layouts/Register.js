import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Recaptcha from 'react-recaptcha';
import { toast } from 'react-toastify';
import { Container, Row, Col, Input, Tooltip, Button } from 'reactstrap';

// Components
import MainMenu from '../component/MainMenu';
import Form from '../component/FormNew';
import Footer from './Footer';

//utils
import { actionSignupUser } from '../../actionReducers/Auth';
import config from '../../utils/config';

import breakpoints from '../../styles/breakpoints';
import loading from '../../assets/icons/loading.gif';
import bg from '../../assets/img/Customer_register_bg.jpg';
import { ORANGE } from '../../assets/constants';


const RegisterSection = styled('section')({
  position: 'relative',
  background: `url(${bg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  textAlign: 'center',
  paddingBottom: '50px'
});

const LoadingIcon = styled('img')({
  width: 30,
  position: 'absolute',
  margin: 20 
});

const RegisterForm = styled('div')({
  maxWidth: '900px',
  height: 'auto',
  textAlign: 'center',
  margin: '0 auto',
}, (breakpoints({
  padding: ['24px 0', '32px 0', '48px 0'],
})));

const RegisterHeader = styled('h3')({
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: '300',
  fontSize: '24px',
  marginBottom: '24px'
});

const RegisterInput = styled(Input)({
  backgroundColor: 'transparent',
  borderRadius: '0px',
  borderColor: '#0d90ef',
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: '200',
  marginBottom: '24px',
  ':focus': {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '200',
  },
  '::placeholder': {
    color: '#eaeaea',
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
  width: '100%',
  color: '#fff',
  maxWidth: '320px'
});

const ErrorTooltip = styled(Tooltip)({
  '& .tooltip-inner': {
    backgroundColor: ORANGE,
    color: '#fff',
    border: `1px solid ${ORANGE}`
  },
  '&.bs-tooltip-top .arrow::before': {
    borderTopColor: ORANGE
  }
});

const Captcha = styled('div')({
  textAlign: 'center',
  margin: '0 auto 12px auto',
  '& div': {
    width: '100%',
    margin: 'auto'
  }
});

class Register extends Component {
  state = {
    captcha_key: '',
    forename: '',
    surname:'',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    verified: false,
    forenameError: '',
    surnameError: '',
    emailError: '',
    phoneError: '',
    passwordError: '',
    confirmError: '',
    rules: {
      forename: [
        { 
          rule: /^[a-zA-Z0-9.\s]{2,30}$/,
          message: 'Must be alphanumeric and between 2 and 30 characters long.'
        }
      ],
      surname: [
        { 
          rule: /^[a-zA-Z0-9.\s]{2,30}$/,
          message: 'Forename must be alphanumeric and between 2 and 30 characters long.'
        }
      ],
      password: [
        { 
          rule: /^[a-zA-Z0-9.\s]{2,30}$/,
          message: 'Must be alphanumeric and between 2 and 30 characters long.',
        }, 
        {
          rule: (value, _this) => {
            if (_this.state.confirm.length !== 0) {
              let isValid = (_this.state.confirm === value);
              if (isValid) {
                _this.setState({
                  confirmError: ''
                })
              }
              return isValid;
            }
            return true;
          },
          message: 'Password mismatch.',
          
        }        
      ],
      confirm: [
        { 
          rule: /^[a-zA-Z0-9.\s]{2,30}$/,
          message: 'Must be alphanumeric and between 2 and 30 characters long.',
        }, 
        {
          rule: (value, _this) => {
              let isValid = (_this.state.password === value);
              if (isValid) {
                _this.setState({
                  passwordError: ''
                });
              }
              return isValid;
          },
          message: 'Password mismatch.',
        }
      ],
      email: [
        {
          rule: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          message: 'Please enter a valid email'
        }
      ],
      phone: [
        {
          rule: /^[0-9.\s\-+]{2,30}$/,
          message: 'Please enter a valid phone number'
        }
      ]
    }
  }

  checkIfValid = () => {
    let isOk = true;
    for (let i = 0; i < Object.keys(this.state.rules).length; i++) {
      let fieldName = Object.keys(this.state.rules)[i];
      let singleField = this.state.rules[fieldName];
      
      for (let i = 0; i < singleField.length; i++) {
        let field = singleField[i];
        if (typeof field.rule === 'function') {
          if (field.rule(this.state[fieldName], this) === false) {
            // message = field.message;
            isOk = false;
            this.setState({
              [fieldName+'Error']: field.message
            });
            break;
          }
          continue;
        }

        if (field.rule.test(this.state[fieldName]) === false) {
          isOk = false;
          this.setState({
            [fieldName+'Error']: field.message
          });
          break;
        }
      }      
    }
    return isOk;
  }

  inputChangeHandler = (event, errorist) => {
    let message = '';
    
    for (let i = 0; i < this.state.rules[event.target.name].length; i++) {
      let field = this.state.rules[event.target.name][i];
      if (typeof field.rule === 'function') {
        if (field.rule(event.target.value, this) === false) {
           message = field.message;
           break;
        }
        continue;
      }

      if (field.rule.test(event.target.value) === false) {
        message = field.message;
        break;
      }

    }

    this.setState({
      [event.target.name]: event.target.value,
      [errorist]: message,
    });
  }

  submitHandler = () => {
    // VERIFICATION OF INPUT FIELDS
    const isValid = this.checkIfValid();
    if (isValid) {
      console.log("is VERIFIED", this.state.verified);
      // VERIFICATION FOR RECAPTCHA
      if(this.state.verified === true) {
        const user = {
          forename: this.state.forename,
          surname: this.state.surname,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
          captcha_key: this.state.captcha_key,
        }
        this.props.actionSignupUser(user, false);
      } else {
        toast.error('🤖 Please avoid being a robot!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true
        });
      }
    }
  }

  verifyCallback = (e) => {
    this.setState({ verified: true, captcha_key: e });
    console.log("nice verified!");
    console.log(e);
  }

  callback = () => {
    console.log('Done!');
  }

  toastMessage = message => {
    return (
      <span><i className="fas fa-exclamation-triangle"></i> {message}</span>
    );
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.errorSignupMessage !== '') {
      toast.error(this.toastMessage(nextProps.errorSignupMessage), {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true
      });
    }
  }

  render() { 
    return (
      <RegisterSection id='customer-registration' ref='register'>
        <MainMenu />
        <Container>
          <RegisterForm>
            <RegisterHeader>Register here...</RegisterHeader>
            <Form onSubmit={this.submitHandler}>  
              <Row >
                <Col xs="12" sm="6">
                    <RegisterInput
                      type='text'
                      id='forename'
                      name='forename'
                      placeholder='First Name'
                      value={this.state.forename}
                      onChange={e => this.inputChangeHandler(e, 'forenameError')}/>
                    <ErrorTooltip className="danger" placement="top" isOpen={this.state.forenameError !== '' ? true : false} target="forename">
                      {this.state.forenameError}
                    </ErrorTooltip>
                </Col>

                <Col xs="12" sm="6">
                    <RegisterInput
                      type='text'
                      id='surname'
                      name='surname'
                      placeholder='Last Name'
                      value={this.state.surname}
                      onChange={e => this.inputChangeHandler(e, 'surnameError')}/>
                    <ErrorTooltip className="danger" placement="top" isOpen={this.state.surnameError !== '' ? true : false} target="surname">
                      {this.state.surnameError}
                    </ErrorTooltip>
                </Col>
                
                <Col xs="12" sm="6">
                  <RegisterInput
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={e => this.inputChangeHandler(e, 'emailError')}/>
                  <ErrorTooltip className="danger" placement="top" isOpen={this.state.emailError !== '' ? true : false} target="email">
                      {this.state.emailError}
                    </ErrorTooltip>
                </Col>

                <Col xs="12" sm="6">
                  <RegisterInput
                    type='text'
                    id='phone'
                    name='phone'
                    placeholder='Phone'
                    value={this.state.phone}
                    onChange={e => this.inputChangeHandler(e, 'phoneError')}/>
                  <ErrorTooltip className="danger" placement="top" isOpen={this.state.phoneError !== '' ? true : false} target="phone">
                      {this.state.phoneError}
                    </ErrorTooltip>
                </Col>

                <Col xs="12" sm="6">
                  <RegisterInput
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={e => this.inputChangeHandler(e, 'passwordError')}/>
                    <ErrorTooltip className="danger" placement="top" isOpen={this.state.passwordError !== '' ? true : false} target="password">
                      {this.state.passwordError}
                    </ErrorTooltip>
                </Col>

                <Col xs="12" sm="6">
                  <RegisterInput
                    type='password'
                    id='confirm'
                    name='confirm'
                    placeholder='Confirm Password'
                    value={this.state.confirm}
                    onChange={e => this.inputChangeHandler(e, 'confirmError')}/>
                    <ErrorTooltip className="danger" placement="top" isOpen={this.state.confirmError !== '' ? true : false} target="confirm">
                      {this.state.confirmError}
                    </ErrorTooltip>
                </Col>

                <Col xs="12">
                  <Captcha>
                    <Recaptcha
                      sitekey={config.RECAPTCHA_KEY}
                      theme="dark"
                      size="normal"
                      render="explicit"
                      verifyCallback={this.verifyCallback}
                      onloadCallback={this.callback}
                    />
                  </Captcha>
                </Col>

                <Col xs="12">
                  {this.props.isSignUpFetching ? <LoadingIcon src={loading} /> : ''}
                  {/* <LoadingIcon /> */}
                  <SubmitButton actionn='submit' color={ORANGE}>SUBMIT</SubmitButton>
                </Col>

              </Row>
            </Form>         
          </RegisterForm>
        </Container>
        <Footer />
      </RegisterSection>
     )
  }
}
 
export default connect(
  state => ({
    isSignUpFetching: state.auth.isSignUpFetching,
    errorSignupMessage: state.auth.errorSignupMessage
  }),
{  
  actionSignupUser
  })(Register); 