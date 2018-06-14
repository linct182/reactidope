import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

// import {
//   Container,
//   Dropdown,
//   DropdownMenu,
//   DropdownToggle,
//   DropdownItem,
//   Nav,
//   Navbar,
//   NavbarBrand,
// } from 'reactstrap';
// import breakpoints from '../../../styles/breakpoints';

import {
  ADMIN_DASHBOARD,
  ADMIN_USER_MANAGEMENT,
  ADMIN_CASES,
  ADMIN_PLAN_PRICING
} from '../../../constants/routes';

import AdminPricingPlan from './adminRoutesPage/AdminPricingPlan';
import AdminUserManagement from './adminRoutesPage/AdminUserManagement';

const AdminRoutesViews = ({
  location
}) => {

  switch (location.type) {
    case ADMIN_DASHBOARD:
      return 'ADMIN_DASHBOARD';
    case ADMIN_USER_MANAGEMENT:
      return <AdminUserManagement />;
    case ADMIN_CASES:
      return 'ADMIN_CASES';
    case ADMIN_PLAN_PRICING:
      return <AdminPricingPlan /> ;
    default:
    return 'default'
  }
}

export default connect(state => ({
  location: state.location
}))(AdminRoutesViews);