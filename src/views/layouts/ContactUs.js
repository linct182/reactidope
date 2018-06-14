import React, { Component } from 'react';
import styled from 'react-emotion';
import { Container, Row, Col, Input, Button } from 'reactstrap';

import Form from '../component/FormNew';
import breakpoints from '../../styles/breakpoints';
import bg from '../../assets/img/Homepage_6thSec_img.jpg';

const ContactUsSection = styled('section')({
  background: `url(${bg})`,
  backgroundPosition: 'right top',
  backgroundSize: 'cover',
  minHeight: '300px',
  textAlign: 'left'
}, (breakpoints({
  padding: ['24px 0 72px 0', '32px 0 64px 0', '48px 0 48px 0'],
})));

const ContactForm = styled('div')({
  maxWidth: '500px',
  height: 'auto'
});

const ContactHeader = styled('h3')({
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: '300',
  fontSize: '24px',
  marginBottom: '24px'
});

const ContactInput = styled(Input)({
  backgroundColor: 'transparent',
  borderRadius: '0px',
  borderColor: '#0d90ef',
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: '200',
  marginBottom: '12px',
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
  width: '100%'
});

class Home extends Component {
  state = {}
  render() {
    
    return ( 
      <ContactUsSection id='contactUs' ref='contactUs'>
        <Container>
          <ContactForm>
            <ContactHeader>Contact Us</ContactHeader>
            <Form onSubmit={() => {}}>
              <Row>
                {/* <Col sm="6">
                  <ContactInput type="text" name="forename" placeholder="Forename" required/>
                </Col>
                <Col sm="6">
                  <ContactInput type="text" name="surname" placeholder="Surname" />
                </Col> */}
                <Col sm="12">
                  <ContactInput type="text" name="name" placeholder="Name" required/>
                </Col>
                <Col sm="12">
                  <ContactInput type="email" name="email" placeholder="Email Address" required/>
                </Col>
                <Col sm="12">
                  <ContactInput type="text" name="subject" placeholder="Subject" required/>
                </Col>
                <Col sm="12">
                  <ContactInput type="textarea" name="message" placeholder="Message" rows="8" required/>
                </Col>
                <Col sm="12">
                  <SubmitButton  color="danger">SUBMIT</SubmitButton>
                </Col>
              </Row>
            </Form>
          </ContactForm>
        </Container>
        {/* <TextContainer>
          <TextHeader>Contact Us</TextHeader>
        </TextContainer>

        <Form >    
          <Row >
            <Field>
              <Label for='forename'>Forename</Label>
              <Input type='text' name='forename' />
            </Field>

            <Field>
              <Label for='surename'>Surename</Label>
              <Input type='text' name='surename' />
            </Field>
          </Row>
            <Label for='email'>Email Address</Label>
            <Input type='text' name='email' />

          <TextArea type='text' name='subject' rows="10" cols="50" />

          <ButtonContainer>
            <Button color={GREEN}>Submit</Button>
          </ButtonContainer>
        </Form> */}
      </ContactUsSection>
     )
  }
}
 
export default Home;