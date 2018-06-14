import React, { Component } from 'react';
import styled from 'react-emotion';
import { Container, Row, Col } from 'reactstrap';

// utils
import breakpoints from '../../styles/breakpoints';
import { ORANGE, GREY } from '../../assets/constants';
import cloudImg from '../../assets/img/coud-digital.png';


const DescSection = styled('section')({
  position: 'relative',
  background: 'linear-gradient(to left, #dde4f6, #f9fafe)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  minHeight: '300px'
}, (breakpoints({
    padding: ['24px 0px', '32px 0px', '48px 0px'],
})));

const TextHeader = styled('h4')({
  color: ORANGE,
  fontFamily: 'Raleway',
  fontWeight: '300',
  fontSize: '24px',
  marginBottom: '24px'
}, (breakpoints({
    fontSize: ['18px', '24px', '32px'],
}))); 

const TextBody = styled('h4')({
  color: GREY,
  fontFamily: 'Raleway',
  fontWeight: '200',
  fontSize: '24px'
}, (breakpoints({
    fontSize: ['16px', '18px', '18px'],
}))); 

class Description extends Component {
  state = {}
  render() { 
    return ( 
      <DescSection id='description' >
        <Container>
          <Row>
            <Col sm="7">
              <TextHeader>What are the risks of companies storing your personal data?</TextHeader>
              <TextBody>These days companies know way too much about you, and in the 
              event of a data breach your details could be at risk to fraud, identity theft and more.</TextBody>
            </Col>
            <Col sm="5">
              <img src={cloudImg} width="100%" alt="cloud" />
            </Col>
          </Row>
        </Container>
      </DescSection>
     )
  }
}
 
export default Description;