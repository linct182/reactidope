import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

// Components
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminRoutesViews from './AdminRoutesViews';
// import AgentActiveCaseSummary from './AgentActiveCaseSummary';
// import AgentCaseHistory from './AgentCaseHistory';
import HeaderBanner from '../../component/HeaderBanner';
import Footer from '../../layouts/Footer';
import Loading from '../../component/Loading';

// utils
import {
  actionGetActiveCaseDetails,
  actionGetAvailableCasesCount,
  actionOpenCase
} from '../../../actionReducers/Agent'

import { DEFAULT_BG } from '../../../assets/constants';

const AdminPageContainer = styled('div')({
  position: 'relative',
  backgroundColor: DEFAULT_BG,
  fontFamily: 'Raleway'
});

const AdminPageView = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  height: 'calc(100vh - 134px)',
});

const AdminPageRoutes = styled('div')({
  flex: 5,
  padding: '20px',
  overflowY: 'auto',
});

const OpenCaseModal = styled(Modal)({
  '& .modal-content': {
    borderRadius: '0px',
    '& .modal-title': {
      fontSize: '16px'
    }
  },
  '& button': {
    borderRadius: '0px'
  }
});

class AgentDashboard extends Component {
  state = {
    activeCase: null,
    openCaseModal: false
  };

  componentWillMount() {
    // this.props.actionGetActiveCaseDetails();
    // this.props.actionGetAvailableCasesCount();
  }

  toastMessage = message => {
    return (
      <span><i className="fas fa-exclamation-triangle"></i> {message}</span>
    );
  }

  toggleOpenCaseModal = () => {
    this.setState({
      openCaseModal: !this.state.openCaseModal
    });
  }

  openCaseAction = async () => {
    await this.toggleOpenCaseModal();
    await this.props.actionOpenCase();
    if (this.props.openCaseMessage !== '') {
      toast.success(this.toastMessage(this.props.openCaseMessage), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    this.props.actionGetActiveCaseDetails();
  }

  render() {
    // const activeCase = this.props.activeCaseDetails.caseDetails;
    // console.log('ACTIVE CASE', activeCase);
    return (
      <AdminPageContainer id='admin-container'>
        <AdminHeader/>
        <AdminPageView id='admin-page-view'>
          <AdminSidebar />
          {/* <HeaderBanner title="Admin Dashboard" /> */}
          <AdminPageRoutes id='admin-main-content'>
            <AdminRoutesViews />
          </AdminPageRoutes>
        </AdminPageView>
        <Footer/>
      </AdminPageContainer>
    );
  }
}

export default connect(state => ({
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