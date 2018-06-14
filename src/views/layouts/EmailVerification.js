import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { actionVerifyUser, actionRedirectHome } from '../../actionReducers/Auth';
import { Container, Button } from 'reactstrap';

import dpr_logo from '../../assets/icons/dpr_logo.svg';
import check from '../../assets/icons/innerPage_icn_check.svg';

const EmailVerificationContainer = styled('article')({
  width: '100%'
});

const Header = styled('header')({
  backgroundColor: '#ffffff',
  height: '50px'
});

const SectionBanner = styled('section')({
  backgroundColor: '#14233a',
  height: '260px',
  textAlign: 'center',
  padding: '50px'
});

const SectionMain = styled('section')({
  backgroundColor: '#f0f1f3',
  minHeight: '300px',
  textAlign: 'center',
  padding: '50px'
});

const Logo = styled('img')({
  height: '30px',
  width: 'auto',
  marginTop: '10px'
});

const CheckSvg = styled('img')({
  height: '80px',
  marginBottom: '20px'
});

const Header1 = styled('h1')({
  color: '#d0d8db',
  ffontFamily: 'Raleway',
  fontWeight: 'normal'
});

const Message = styled('p')({
  color: '#828385',
  ffontFamily: 'Raleway',
  fontWeight: 'normal'
});

const GotoButton = styled(Button)({
  borderColor: '#e34a35',
  color: '#e34a35',
  ffontFamily: 'Raleway',
  fontWeight: 'normal',
});

class EmailVerification extends Component {
  state = {}

  componentWillMount(){
    console.log('heyyyyyyy', this.props.location)
    let userkey = this.props.location.payload.userkey;
    let ckey = this.props.location.payload.key;
    this.props.actionVerifyUser(userkey, ckey);
  }

  render() {
    return (
      <EmailVerificationContainer id="email-verification">
        <Header>
          <Container>
            <Logo src={dpr_logo} />
          </Container>
        </Header>
        <SectionBanner>
          <Container>
            <CheckSvg src={check} />
            <Header1>Email Verified</Header1>
          </Container>
        </SectionBanner>
        <SectionMain>
          <Container>
            <Message>Thank you for verifying your email address. You can now receive email updates and alerts from us. <br/>You can now login your customer account.</Message>
            <GotoButton outline color="warning" onClick={() => this.props.actionRedirectHome() }>Go to Homepage ></GotoButton>
          </Container>
        </SectionMain>
      </EmailVerificationContainer>

    )
  }
}

export default connect(state=> ({
    location: state.location
  }), 
  {actionVerifyUser, actionRedirectHome})(EmailVerification);