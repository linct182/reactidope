import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import scrollToComponent from 'react-scroll-to-component';
import { Button } from 'reactstrap';
import breakpoints from '../../styles/breakpoints';
import MainMenu from '../component/MainMenu';
import bg1 from '../../assets/img/Homepage_mainbanner_img.jpg';

const HomeSection = styled('section')({
  background: `linear-gradient( rgba(14, 18, 31, 0.82), rgba(36, 44, 84, 0.52) ), url(${bg1})`,
  backgroundPosition: 'right top',
  backgroundSize: 'cover',
  position: 'relative'
},(breakpoints({
  height: [ '75vh','90vh','100vh']
})));

const MainContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center'
});

const Heading1 = styled('h1')({
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: 'lighter',
  marginBottom: '20px'
});

const Paragraph = styled('p')({
  fontFamily: 'Raleway',
  color: '#fff',
  fontWeight: '100',
  fontSize: '18px'
});

const orangeButton = css({
  backgroundColor: '#f2531c',
  borderRadius: '0',
  padding: '12px 32px',
  fontFamily: 'Raleway',
  fontWeight: '300',
  fontSize: '16px'
});

class Home extends Component {
  state = {}

  componentDidMount() {

    scrollToComponent(this.home, 
      console.log("scrollToComponent")
    );
  }

  handleScrollToElement = (event) =>{
    console.log('refs: ',this.refs);
    // const tesNode = ReactDOM.findDOMNode(this.refs.howItWorks)
    // // if (some_logic) {
    //   window.scrollTo(0, tesNode.offsetTop);
    // }
  }


  render() { 
    return ( 
      <HomeSection id='home' ref='home'>
        <MainMenu />
        <MainContent>
          <Heading1>Your Privacy Is Important</Heading1>
          <Paragraph>We ensure that companies only need your <br />information for what you consented to..</Paragraph>
          <Button color="danger" href="#register" className={orangeButton}>REGISTER NOW</Button>{' '}
        </MainContent>
      </HomeSection>
     )
  }
}
 
export default Home;