import React, { Component } from 'react';
import styled from 'react-emotion';
import { Container, Row, Col } from 'reactstrap';

import breakpoints from '../../styles/breakpoints';
import { GREY, DARK_BLUE } from '../../assets/constants';

import step1 from '../../assets/icons/icon_signup.svg';
import step2 from '../../assets/icons/icon_tellus.svg';
import step3 from '../../assets/icons/icon_contact.svg';
import step4 from '../../assets/icons/icon_confirm.svg';


const HowItWorksSection = styled('section')({
  position: 'relative',
  minHeight: '300px',
  textAlign: 'center'
}, (breakpoints({
  padding: ['24px 0px', '32px 0px', '48px 0px'],
})));

const TextHeader = styled('h4')({
  color: DARK_BLUE,
  fontFamily: 'Raleway',
  fontWeight: '300',
  fontSize: '24px'
}, (breakpoints({
  fontSize: ['18px', '24px', '32px'],
})));

const TextBody = styled('h4')({
  color: GREY,
  fontFamily: 'Raleway',
  fontWeight: '200',
  fontSize: '24px',
  marginBottom: '32px'
}, (breakpoints({
  fontSize: ['16px', '18px', '18px'],
}))); 

const Card = styled('div')({
  position: 'relative',
  backgroundColor: '#edf0fa',
  color: GREY,
  fontFamily: 'Raleway',
  fontWeight: '100',
  fontSize: '24px',
  minHeight: '100px',
  marginBottom: '12px',
  height: 'calc(100% - 12px)'
}, (breakpoints({
  padding: ['12px', '12px', ' 12px']
})));

const CardText = styled('p')({
  color: '#000',
  fontFamily: 'Raleway',
  fontWeight: '200',
  fontSize: '16px'
}, (breakpoints({
  fontSize: ['14px', '16px', '16px'],
}))); 

const StepIcon = styled('img')(props => ({
  width: '100%',
  margin: '0 auto',
  marginBottom: '12px',
  maxWidth: '130px',
  marginTop: '28px'
}));

const StepNumber = styled('p')({
  position: 'absolute',
  top: '0px',
  left: '0px',
  fontSize: '18px',
  fontWeight: '300',
  color: '#ffffff',
  background: '#116092',
  padding: '0px 4px 0px 12px',
});

class Home extends Component {
  state = {}
  render() { 
    return ( 
      <HowItWorksSection id='howItWorks' ref='howItWorks'> 
        <Container>
          <TextHeader> How does Data Privacy Rights work?</TextHeader>
          <TextBody>It’s as easy as ABC. You tell, we act.</TextBody>
          <Row>
            <Col md="3" sm="6" xs="6">
              <Card>
                <StepNumber>Step 1</StepNumber>
                <StepIcon src={step1}/>
                <CardText>You <strong>signup</strong> and become a member</CardText>
              </Card>
            </Col>
            <Col md="3" sm="6" xs="6">
              <Card>
                <StepNumber>Step 2</StepNumber>
                <StepIcon src={step2}/>
                <CardText>You <strong>tell us</strong> which companies you think are holding your personal data</CardText>
              </Card>
            </Col>
            <Col md="3" sm="6" xs="6">
              <Card>
                <StepNumber>Step 3</StepNumber>
                <StepIcon src={step3}/>
                <CardText>We <strong>contact them</strong> directly and ask them to confirm what data they hold and request them to remove it</CardText>
              </Card>
            </Col>
            <Col md="3" sm="6" xs="6">
              <Card>
                <StepNumber>Step 4</StepNumber>
                <StepIcon src={step4}/>
                <CardText>We <strong>confirm with you</strong> that the data has been deleted and your privacy has been secured!</CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      </HowItWorksSection>
     )
  }
}
 
export default Home;