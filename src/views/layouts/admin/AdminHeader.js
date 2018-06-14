import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import styled from 'react-emotion';

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
import { actionLogoutUser } from '../../../actionReducers/Auth';

const HeaderContainer = styled('div')({
  padding: '0',
  backgroundColor: '#ffff'
});

const UserNav = styled(Navbar)({
    backgroundColor: '#ffff',
    zIndex: '5'
});

const Logo = styled('img')(breakpoints({
  height: '30px'
}));

const UserName = styled('div')({
  fontFamily: 'Raleway',
  fontWeight: 500,
  margin: 15
});

const DropdownToggleCustome = styled(DropdownToggle)({
  cursor: 'pointer'
});

const BtnLogo = styled('img')({
  width: 15,
  margin: 5
});


class AgentHeader extends Component {
  state = {
    dropdownOp: false
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  displayName = ()=>{
    console.log('user: ', this.props.user );
    if(this.props.user !== ''){
      return this.user
    }
    return 'JONH DOE';
  }

  render() {
    return (
      <HeaderContainer>
        <UserNav expand="md">
          <Container>
            <NavbarBrand href="/"><Logo src={dpr_logo} /></NavbarBrand>
            <Nav navbar>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <UserName>
                  <DropdownToggleCustome
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    caret
                  >
                    {this.props.user !== '' ? this.props.user: ''}
                  </DropdownToggleCustome>
                </UserName>

                <DropdownMenu right>
                  <Link to={`/profile`}>
                    <DropdownItem>
                        <BtnLogo src={icon_profile} />
                        My Profile
                    </DropdownItem>
                  </Link>

                  <DropdownItem onClick={()=> this.props.actionLogoutUser()}>
                    <BtnLogo src={icon_logout} />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Container>
        </UserNav>
      </HeaderContainer>
    );
  }
}


export default connect(state => ({
  user: state.auth.userName
}), {
  actionLogoutUser
})(AgentHeader);