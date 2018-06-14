import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import withProps from 'recompose/withProps'
import Link from 'redux-first-router-link';

import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Nav,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import breakpoints from '../../../styles/breakpoints';

import dpr_logo from '../../../assets/icons/dpr_logo.svg';
import icon_profile from '../../../assets/icons/innerPage_icn_myprofile.svg';
import icon_setting from '../../../assets/icons/innerPage_icn_settings.svg';
import icon_logout from '../../../assets/icons/innerPage_icn_logout.svg';

const SidebarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  backgroundColor: '#16253c'
});

const SidebarLink = styled(Link)(({ activelink, location})=>({
  fontSize: 24,
  padding: 20,
  fontFamily: 'Raleway',
  fontWeight: 200,
  color: '#fff',
  fontSize: 18,
  backgroundColor: activelink === location? '#223046' : 'none',
  color: activelink === location? '#149adf' : '#ffffff',
  textDecoration: 'none',
  ':hover': {
    backgroundColor: '#223046',
    color: '#149adf',
    textDecoration: 'none'
  }
}));

class AdminSidebar extends Component {
  state = {
    dropdownOp: false,
    activeModule: null
  }
  // TODO: add active routes highlights
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  displayName = () =>{
    console.log('user: ', this.props.user );
    if(this.props.user !== ''){
      return this.user
    }
    return 'JONH DOE';
  }

  render() {
    return (
      <SidebarContainer id='admin-sidebar' >
        <SidebarLink 
          to='/admin/dashboard'
          activelink='/admin/dashboard'
          location={this.props.location.pathname}
          > Dashboard
        </SidebarLink>
        <SidebarLink 
          to='/admin/userManagement' 
          activelink='/admin/userManagement'
          location={this.props.location.pathname}
          > User Management
        </SidebarLink>
        <SidebarLink 
          to='/admin/cases' 
          activelink='/admin/cases'
          location={this.props.location.pathname}
          > Cases
        </SidebarLink>
        <SidebarLink 
          to='/admin/planPricing' 
          activelink='/admin/planPricing'
          location={this.props.location.pathname}
          > Pricing Plan   
        </SidebarLink>
      </SidebarContainer>
    );
  }
}


export default connect(state => ({
  location: state.location,
  user: state.auth.userName
}))(AdminSidebar);