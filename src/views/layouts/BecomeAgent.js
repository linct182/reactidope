import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Container, Button } from 'reactstrap';

// utils
import { actionSignupUser } from '../../actionReducers/Auth';
import breakpoints from '../../styles/breakpoints';
import bg from '../../assets/img/agent_section_background.jpg';

const AgentSection = styled('section')({
  background: `url(${bg})`,
  backgroundPosition: 'center bottom',
  backgroundSize: 'cover',
  minHeight: '200px',
  fontFamily: 'Raleway',
  color: '#fff',
}, (breakpoints({
  padding: ['48px 0px', '64px 0px', '98px 0px'],
})));

const AgentWrapper = styled('div')({
  width: '100%',
  maxWidth: '600px',
  textAlign: 'left'
});

const AgentHeader = styled('h3')({
  fontWeight: '300',
  fontSize: '24px',
  marginBottom: '24px'
});

const AgentText = styled('p')({
  fontWeight: '300',
  fontSize: '18px',
  marginBottom: '24px'
});

const SubmitButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#f2531c',
  borderRadius: '0',
  padding: '5px',
  fontWeight: '500',
  fontSize: '14px',
  width: '100%',
  maxWidth: '240px'
});

class AgentRegister extends Component {
  state = {};

  render() { 
  
    return ( 
      <AgentSection id="become-an-agent" ref='agentRegister'>
        <Container>
          <AgentWrapper>
            <AgentHeader>Become An Agent</AgentHeader>
            <AgentText>Want to become and Agent? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sapien at elit varius mattis. Aenean sem mauris, aliquet nec facilisis nec, auctor et lectus.</AgentText>
            <SubmitButton href="#agentRegister" >APPLY NOW</SubmitButton>
          </AgentWrapper>
        </Container>
      </AgentSection>
     )
  }
}
 
export default connect(
  null,
  {
    actionSignupUser
  })(AgentRegister);