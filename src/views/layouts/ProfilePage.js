import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row, Col,
  Card, CardText, CardImgOverlay
} from 'reactstrap';

// Components
import AdminHeader from './admin/AdminHeader';
import AgentHeader from './agent/AgentHeader';
import CustomerHeader from './customer/HeaderInnerPage';
import HeaderBanner from '../component/HeaderBanner';
import Footer from './Footer';
import Loading from '../component/Loading';

// utils
import {
  actionGetActiveCaseDetails,
  actionGetAvailableCasesCount,
  actionOpenCase
} from './../../actionReducers/Agent'

import { DEFAULT_BG } from './../../assets/constants';

import breakpoints from '../../styles/breakpoints';

const ProfileContainer = styled('div')({
  position: 'relative',
  backgroundColor: DEFAULT_BG,
  fontFamily: 'Raleway'
});

const Title = styled('h4')({
  // color: '#000',
  fontWeight: 300
});

const CustomeForm = styled(Form)({
  margin: 20,
  padding: 20,
  flexGrow: 1,
  backgroundColor: '#ffffff'

});

const CustomeInput = styled(Input)({
  fontSize: 12
});

const UpdateButton = styled(Button)(breakpoints({
  backgroundColor: '#f2531c',
  color: '#fff',
  borderRadius: '0',
  padding: '5px',
  margin: '5px 0px',
  fontWeight: '500',
  fontSize: '14px',
  // width: '100%',
  width: ['100%', '100%', '240px'],
}));

const CancelButton = styled(Button)(breakpoints({
  backgroundColor: '#fff',
  color: '#f2531c',
  borderRadius: '0',
  padding: '5px',
  margin: '5px 0px',
  fontWeight: '500',
  fontSize: '14px',
  // width: '100%',
  width: ['100%', '100%', '150px'],
  float: 'right'
}));


class AgentDashboard extends Component {
  state = {
    user: {
      user_type: null,
      forename: null,
      surname: null
    }
  };

  componentWillMount() {
    this.setState({
      user:{
        ...this.props.user
      }
    });
    // this.props.actionGetActiveCaseDetails();
    // this.props.actionGetAvailableCasesCount();
  }

  renderHeader = () => {
    switch (this.props.user.user_type) {
      case 1:
        return <AdminHeader />
      case 2:
        return <CustomerHeader />
      case 3:
        return <AgentHeader />
      default:
        return <CustomerHeader />
        break;
    }
  }

  backToDashboard = () =>{
    switch (this.props.user.user_type) {
      case 1:
        return '/admin/dashboard'
      case 2:
        return '/customer/dashboard'
      case 3:
        return '/agent/dashboard'
      default:
        return '/customer/dashboard'
        break;
    }
  }

  renderForm = () => {
    return(
      <CustomeForm>
        <Row>
          <Col xs="12" sm="4">
            <Title>My Profile</Title>
          </Col>
          <Col xs="12" sm="8">
            <FormGroup>
              <div>Forename</div>
              <CustomeInput type="text" name="title" id="title"
                value={this.state.user.forename}
                onChange={
                  (e) => this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      forename: e.target.value
                    }
                  })
                }
                placeholder="Forename" />
            </FormGroup>
            <FormGroup>
              <div>Surname</div>
              <CustomeInput type="text" name="surname" id="surname"
                value={this.state.user.surname}
                onChange={
                  (e) => this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      surname: e.target.value
                    }
                  })
                }
                placeholder="Surname" />
            </FormGroup>
            <FormGroup>
              <div>Email</div>
              <CustomeInput type="text" name="email" id="email"
                value={this.state.user.email}
                onChange={
                  (e) => this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      email: e.target.value
                    }
                  })
                }
                placeholder="Email" disabled />
            </FormGroup>
            <FormGroup style={(this.props.user.user_type === 2) ? { display: "none" } : { display: "block" } }>
              <div>City</div>
              <CustomeInput type="text" name="city" id="city"
                value={this.state.user.city}
                onChange={
                  (e) => this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      city: e.target.value
                    }
                  })
                }
                placeholder="City" />
            </FormGroup>
            <FormGroup style={(this.props.user.user_type === 2) ? { display: "none" } : { display: "block" } }>
              <div>Country</div>
              <CustomeInput type="text" name="country" id="country"
                value={this.state.user.country}
                onChange={
                  (e) => this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      country: e.target.value
                    }
                  })
                }
                placeholder="Country" />
            </FormGroup>
            <Row>
              <Col xs="12" sm="6">
                <FormGroup>
                  <div>Phone Number</div>
                  <CustomeInput type="number" name="phone_number" id="phone_number"
                    value={this.state.user.phone_number}
                    onChange={
                      (e) => this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          phone_number: e.target.value
                        }
                      })
                    }
                    placeholder="Phone Number" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="6"
                style={(this.props.user.user_type !== 3) ? { display: "none" } : { display: "block" } }>
                <FormGroup>
                  <div>Bank Number</div>
                  <CustomeInput type="number" name="bank_number" id="bank_number"
                    value={this.state.user.bank_no}
                    onChange={
                      (e) => this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          bank_no: e.target.value
                        }
                      })
                    }
                    placeholder="Bank Number" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6">
                <UpdateButton outline 
                  color="danger" 
                  className="align-self-center" >
                  Update Profile
                </UpdateButton>
              </Col>
              <Col xs="12" sm="6">
                <Link to={this.backToDashboard()}>
                  <CancelButton outline
                    color="danger"
                    className="align-self-center" >
                    Cancel
                  </CancelButton>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomeForm>
    )
  }

  render() {
    return (
      <ProfileContainer id='admin-container'>
        {this.renderHeader()}
        <Container>{this.renderForm()}</Container>
        <Footer />
      </ProfileContainer>
    );
  }
}

export default connect(state => ({
  user: state.auth.user,
  iscasesCountPending: state.agent.isAvailableCasesCountPending,
  isActiveCasePending: state.agent.isActiveCasePending,
  casesCount: state.agent.availableCasesCount,
  activeCaseDetails: state.agent.activeCaseDetails,
  openCaseMessage: state.agent.openCaseMessage,
}), {
    actionGetActiveCaseDetails,
    actionGetAvailableCasesCount,
    actionOpenCase
  })(AgentDashboard);