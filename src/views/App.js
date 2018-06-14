import React, { Component } from 'react';
import styled from 'react-emotion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from '../configureStore';
// import logo from '../assets/logo.svg';
import Home from './rootView'

import '../utils/interceptors';

import './App.css';

const RootView = styled('div')({
  height: '100%',
  '& > div:first-child, & > section:first-child, & > article:first-child': {
    paddingBottom: '70px',
    minHeight: '100%'
  }
}, (props) => ({
  fontSize: 12
}))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootView id='main-content'>
          <Home/>
          <ToastContainer />
        </RootView>
      </Provider>
    );
  }
}

export default App;
