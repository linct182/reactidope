// import { redirect, NOT_FOUND } from 'redux-first-router';

export default {
  '@route/home': '/home/:verify',
  '@route/howItWorks': '/howItWorks',
  '@route/register': '/register',
  '@route/agentRegister': '/agentRegister',
  '@route/contactUs': '/contactUs',
  '@route/login': '/login',
  '@route/verify': {
    path: '/verify/:userkey/:key'
  },
  // CUSTOMER PAGES
  '@route/customerPage': '/customerPage',
  '@route/customerDashboard': '/customer/dashboard',
  '@route/customerCaseDetails': '/customer/CaseDetails/:case_uuid',
  // AGENT PAGES
  '@route/agentPage': '/agentPage',
  '@route/agentDashboard': '/agent/dashboard',
  '@route/agentActiveCaseDetails': '/agent/active/:case_uuid',
  '@route/agentPayout': '/agent/payout',

  //ADMIN PAGES
  '@route/adminDashboard': '/admin/dashboard',
  '@route/adminUserManagement': '/admin/userManagement',
  '@route/adminPlanPricing': '/admin/planPricing',
  '@route/adminCases': '/admin/cases',

  '@route/profile': '/profile'
  
  // ADMIN: {
  //   path: '/admin', // TRY: visit this path or dispatch ADMIN
  //   role: 'admin' // + change jwToken to 'real' in server/index.js
  // },
  
};

