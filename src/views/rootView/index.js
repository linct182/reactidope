import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import HomeSection from '../layouts/Home';
import DescSection from '../layouts/Description';
import HowItWorks from '../layouts/HowItWorks';
import Login from '../layouts/Login';
import AgentSection from '../layouts/BecomeAgent';
import ContactUs from '../layouts/ContactUs';
import Footer from '../layouts/Footer';

// ADMIN COMPONENTS
import AdminPage from '../layouts/admin/AdminPage';
import ProfilePage from '../layouts/ProfilePage';
// import AgentPage from '../layouts/agent/AgentPage';
// import AgentDashboard from '../layouts/agent/AgentDashboard'; 
// import AgentActiveCasePage from '../layouts/agent/AgentActiveCasePage';
// AGENT COMPONENTS
import AgentRegister from '../layouts/AgentRegister';
import AgentPage from '../layouts/agent/AgentPage';
import AgentDashboard from '../layouts/agent/AgentDashboard'; 
import AgentActiveCasePage from '../layouts/agent/AgentActiveCasePage';
import AgentPayoutPage from '../layouts/agent/AgentPayoutPage';
// CUSTOMER COMPONENTS
import Register from '../layouts/Register';
import CustomerDashboard from '../layouts/customer/CustomerDashboard';
import CustomerCaseDetails from '../layouts/customer/CustomerCaseDetails';
import CustomerPage from '../layouts/customer/CustomerPage';
import EmailVerification from '../layouts/EmailVerification';
import { actionRedirectHome } from '../../actionReducers/Auth';
import {
  AGENT_REGISTER,
  AGENT_PAGE,
  AGENT_DASHBOARD,
  AGENT_ACTIVE_CASE,
  AGENT_PAYOUT,
  CUSTOMER_PAGE,
  CUSTOMER_DASHBOARD,
  VERIFY_CUSTOMER,
  REGISTER,
  CUSTOMER_CASE_DETAILS,
  ADMIN_DASHBOARD,
  ADMIN_USER_MANAGEMENT,
  ADMIN_CASES,
  ADMIN_PLAN_PRICING,
  PROFILE
}
from '../../constants/routes';

const Article = styled('article')({
  position: 'relative',
  minHeight: '100%',
}, (props) => ({
  fontSize: 12
}))

const View = () => {
  return (
  <Article>
    <HomeSection />
    <DescSection />
    <HowItWorks />
    <Login />
    <AgentSection />
    <ContactUs />
    <Footer />
  </Article>
  );
}

const RootView = ({ location, user, actionRedirectHome}) => {
  // Redirect if token is expired
  // TODO: add condition for page that don't need authentications
  // if (Date.parse(new Date) > localStorage.getItem(ACCESS_TOKEN)){
  //     actionRedirectHome();
  // }
  switch (location.type) {
    case AGENT_REGISTER:
      return <AgentRegister />
    case AGENT_PAGE:
      return <AgentPage />
    case AGENT_DASHBOARD:
      return <AgentDashboard />
    case AGENT_ACTIVE_CASE:
      return <AgentActiveCasePage />
    case AGENT_PAYOUT:
      return <AgentPayoutPage />
      
    case REGISTER:
      return <Register />
    case CUSTOMER_PAGE:
      return <CustomerPage />
    case CUSTOMER_DASHBOARD:
      return <CustomerDashboard />
    case CUSTOMER_CASE_DETAILS:
      return <CustomerCaseDetails />
    case VERIFY_CUSTOMER:
      return <EmailVerification />

    case ADMIN_DASHBOARD:
    case ADMIN_USER_MANAGEMENT:
    case ADMIN_CASES:
    case ADMIN_PLAN_PRICING:
      return <AdminPage />
    case PROFILE:
      return <ProfilePage />
    // case ADMIN_USER_MANAGEMENT:
    //   return <EmailVerification />
    // case ADMIN_PLAN_PRICING:
    //   return <EmailVerification />
    default:
      return <View/>
  }
}
export default compose(
  connect( state => ({
    location: state.location,
    user: state.auth.user
  }),
  {
    actionRedirectHome
  }
))(RootView);