import React, { Component } from 'react';
import styled from 'react-emotion';

// Components
import MainMenu from '../../component/MainMenu';
import Footer from '../Footer';
import HeaderBanner from '../../component/HeaderBanner';

// utils
import { DEFAULT_BG } from '../../../assets/constants';

const CustomerPageContainer = styled('div')({
  textAlign: 'center',
  backgroundColor: DEFAULT_BG,
  minHeight: 'calc(100% - 50px)',
  position: 'relative'
});

class CustomerPage extends Component {
  state = {}

  render() {
    return (
      <CustomerPageContainer id="email-verification-page">
        <MainMenu/>
        <HeaderBanner title="Email was sent for verification." />
        <Footer/>
      </CustomerPageContainer>

    )  
  }
}

export default CustomerPage;