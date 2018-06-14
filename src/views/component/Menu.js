import React, { Component } from 'react';
import styled from 'react-emotion';
import breakpoints from '../../styles/breakpoints';


const MenuContainer = styled('div')({
  display: 'inline-block',
  cursor: 'pointer',
  margin: '20px',
  position: 'absolute',
}, (breakpoints({
    display: ['inline-block', 'inline-block', 'none'],
    right: ['-5px', '0px','10px']

})));

const bars = {
  backgroundColor: '#ffffff',
  transition: '0.4s'
};

const barSize = {
  margin: ['4px 0', '5px 0','6px 0'],
  width: ['25px', '30px', '35px'],
  height: ['2px', '3px', '5px']
}

const Bar1 = styled('div')({
  ...bars,
}, ({ isOpen}) => (
  breakpoints({
    ...barSize,
    transform: (isOpen) ? ['rotate(-45deg) translate(-5px, 3px)', 'rotate(-45deg) translate(-6px, 6px)'] : ''
  })
));

const Bar2 = styled('div')({
  ...bars,
}, ({ isOpen }) => ({
  opacity: (isOpen) ? 0 : 1
}), (breakpoints({
  ...barSize
})));

const Bar3 = styled('div')({
  ...bars
}, ({ isOpen }) => (
  breakpoints({
    ...barSize,
    transform: (isOpen) ? ['rotate(45deg) translate(-5px, -4px)', 'rotate(45deg) translate(-5px, -5px)'] : ''
  })
));


class Menu extends Component {
  state = { isOpen: false}

  toggleMenu = () =>{
    console.log(this.state.isOpen);
    return (!this.state.isOpen) ? this.setState({ isOpen: true }) : this.setState({ isOpen: false })
  }

  render() { 
    return ( 
      <MenuContainer onClick={ this.toggleMenu }>
        <Bar1 isOpen={this.state.isOpen} ></Bar1>
        <Bar2 isOpen={this.state.isOpen}></Bar2>
        <Bar3 isOpen={this.state.isOpen}></Bar3>
      </MenuContainer>
     )
  }
}
  
export default Menu;