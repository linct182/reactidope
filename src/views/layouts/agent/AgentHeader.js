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
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button
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
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Raleway',
    '& .nav-item:first-child': {
      borderRight: '2px solid #16253c',
    },
    '& .nav-link': {
      color: '#16253c !important',
      cursor: 'pointer'
    },
    '& button': {
      cursor: 'pointer'
    },
});

const Logo = styled('img')(breakpoints({
  height: '30px'
}));

const DropdownToggleCustome = styled(DropdownToggle)({
  cursor: 'pointer'
});

const BtnLogo = styled('img')({
  width: 15,
  margin: 5,
  cursor: 'pointer'
});

const PayoutButton = styled(Button)({
  backgroundColor: '#f2531c',
  borderRadius: '0px',
  padding: '0px 5px'
});


class AgentHeader extends Component {
  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  displayName = ()=>{
    if(this.props.user !== ''){
      return this.user
    }
    return 'JOHN DOE';
  }

  render() {
    return (
      <div>
        <UserNav color="light" light expand="md">
          <NavbarBrand href="/"><Logo src={dpr_logo} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.dropdownOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to={`/agent/payout`}><PayoutButton color="danger" size="sm">PAYOUT</PayoutButton></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.user !== '' ? this.props.user: ''}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/profile`}>
                    <DropdownItem>
                      <BtnLogo src={icon_profile} />
                      My Profile
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=> this.props.actionLogoutUser()}>
                    <BtnLogo src={icon_logout} />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </UserNav>
      </div>

      // <HeaderContainer>
      //   <UserNav expand="md">
      //     <Container>
      //       <NavbarBrand href="/"><Logo src={dpr_logo} /></NavbarBrand>
      //       <Nav navbar>
      //         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      //           <UserName>
      //             <DropdownToggleCustome
      //               tag="span"
      //               onClick={this.toggle}
      //               data-toggle="dropdown"
      //               aria-expanded={this.state.dropdownOpen}
      //               caret
      //             >
      //               {this.props.user !== '' ? this.props.user: ''}
      //             </DropdownToggleCustome>
      //           </UserName>

      //           <DropdownMenu right>
      //             <DropdownItem>
      //               <BtnLogo src={icon_profile} />
      //               My Profile
      //             </DropdownItem>

      //             <DropdownItem>
      //               <BtnLogo src={icon_setting} />
      //               Settings
      //             </DropdownItem>

      //             <DropdownItem onClick={()=> this.props.actionLogoutUser()}>
      //               <BtnLogo src={icon_logout} />
      //               Logout
      //             </DropdownItem>
      //           </DropdownMenu>
      //         </Dropdown>
      //       </Nav>
      //     </Container>
      //   </UserNav>
      // </HeaderContainer>
    );
  }
}


export default connect(state => ({
  user: state.auth.userName
}), {
  actionLogoutUser
})(AgentHeader);