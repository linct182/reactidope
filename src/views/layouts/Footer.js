import React, { Component } from 'react';
import styled from 'react-emotion';
import { Container } from 'reactstrap';

const FooterSection = styled('section')({
  backgroundColor: '#fff',
  position: 'absolute',
  width: '100%',
  padding: '26px 0px',
  fontFamily: 'Raleway',
  bottom: 0,
  '& .copyright': {
    float: 'left',
    display: 'inline',
    margin: '0px',
    marginRight: '12px'
  },
  '& .address': {
    float: 'right',
    display: 'inline',
    margin: '0px',
  }
});

class Footer extends Component {
  state = {}

  render() { 
    return ( 
      <FooterSection id='footer' ref='footer'>
        <Container className="clearfix">
          <p className="copyright">Privacy Policy ©Copyright {new Date().getFullYear()} Data Privacy Rights</p>
          <p className="address">1220 19th St NW, Washington, DC 20036 | <a href="info@dataprivacyrights.com">info@dataprivacyrights.com</a></p>
        </Container>
      </FooterSection>
     )
  }
}
 
export default Footer;