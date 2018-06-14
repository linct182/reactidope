import React, { Component } from 'react';
import styled from 'react-emotion';
import { Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,  NavLink, Collapse } from 'reactstrap';

//Components

//utils
import icon_home from '../../assets/icons/icon_home.svg';
import dpr_logo from '../../assets/icons/dpr_logo.svg';

const MainNav = styled(Navbar)({
    backgroundColor: '#fff',
    '& .nav-item .nav-link': {
      color: '#26202c',
      fontFamily: 'Raleway',
      fontWeight: '300',
      fontSize: '14px'
    }
});

const Logo = styled('img')({
  height: '30px',
  width: 'auto'
});

const IconHome = styled('img')({
  height: '24px',
});

class MainMenu extends Component {
  state = {}
  constructor(props) {
    super(props);
    // this.scrollToTop = this.scrollToTop.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <MainNav id="main-menu" expand="md" light>
        <Container>
        <NavbarBrand href="#home"><Logo src={dpr_logo} /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem active={true}>
                <NavLink href="#home"><IconHome src={icon_home}/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#howItWorks">HOW IT WORKS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#become-an-agent">AGENT</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contactUs">CONTACT US</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#login">LOGIN</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </MainNav>
    )
  }
}
 
export default MainMenu;