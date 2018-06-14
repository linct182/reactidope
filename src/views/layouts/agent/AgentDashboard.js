import React, { Component } from 'react';
import _ from 'lodash';
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
import AgentHeader from './AgentHeader';
import AgentOpenCase from './AgentOpenCase';
import AgentActiveCaseSummary from './AgentActiveCaseSummary';
import AgentCaseHistory from './AgentCaseHistory';
import HeaderBanner from '../../component/HeaderBanner';
import Footer from '../../layouts/Footer';
import Loading from '../../component/Loading';

// utils
import {
  actionGetActiveCaseDetails,
  actionGetAvailableCasesCount,
  actionOpenCase
} from '../../../actionReducers/Agent'

import { actionFetchWebsites } from '../../../actionReducers/Cases';

import { DEFAULT_BG } from '../../../assets/constants';

const AgentDashboardContainer = styled('div')({
  position: 'relative',
  minHeight: '100%',
  backgroundColor: DEFAULT_BG,
  fontFamily: 'Raleway'
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

  componentWillMount = async () => {
    await this.props.actionGetActiveCaseDetails();
    this.props.actionGetAvailableCasesCount();
    if (_.isEmpty(this.props.activeCaseDetails.caseDetails) == false) {
      this.props.actionFetchWebsites(this.props.activeCaseDetails.caseDetails.case_uuid);
    }
    
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
        closeOnClick: true
      });
    }

    await this.props.actionGetActiveCaseDetails();
    if (_.isEmpty(this.props.activeCaseDetails.caseDetails) == false) {
      this.props.actionFetchWebsites(this.props.activeCaseDetails.caseDetails.case_uuid);
    }
  }

  renderActiveCaseSection = () => {
    if (this.props.isActiveCasePending) {
      return <Loading />
    } else {
      if (this.props.activeCaseDetails.caseDetails == null) {
        const caseCount = this.props.iscasesCountPending ? '...' : this.props.casesCount;
        // if agent has no active case
        return <AgentOpenCase caseCount={caseCount} toggleOpenCaseModal={this.toggleOpenCaseModal}/>
      } else {
        // if agent has an active case
        return <AgentActiveCaseSummary details={this.props.activeCaseDetails.caseDetails} websites={this.props.caseWebsites} websitePending={this.props.isCaseWebsitesFetching} />
      }
    }
  }

  renderOpenCaseModal = () => {
    return (
      <OpenCaseModal isOpen={this.state.openCaseModal} toggle={this.toggleOpenCaseModal} size={'sm'}>
        <ModalHeader toggle={this.toggleOpenCaseModal}>Confirm Open Case</ModalHeader>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={this.openCaseAction}>Confirm</Button>
          <Button color="scondary" size="sm" onClick={this.toggleOpenCaseModal}>Cancel</Button>
        </ModalFooter>
      </OpenCaseModal>
    );
  }

  render() {
    const activeCase = this.props.activeCaseDetails.caseDetails;
    console.log('ACTIVE CASE', activeCase);
    return (
      <AgentDashboardContainer>
        <AgentHeader />
        {this.renderOpenCaseModal()}
        <HeaderBanner title="Agent Dashboard" />
        {this.renderActiveCaseSection()}
        <AgentCaseHistory />
        <Footer />
      </AgentDashboardContainer>
    );
  }
}

export default connect(state => ({
  iscasesCountPending: state.agent.isAvailableCasesCountPending,
  isActiveCasePending: state.agent.isActiveCasePending,
  casesCount: state.agent.availableCasesCount,
  activeCaseDetails: state.agent.activeCaseDetails,
  openCaseMessage: state.agent.openCaseMessage,
  isCaseWebsitesFetching: state.cases.isCaseWebsitesFetching,
  caseWebsites: state.cases.caseWebsites,
}), {
  actionGetActiveCaseDetails,
  actionGetAvailableCasesCount,
  actionOpenCase,
  actionFetchWebsites,
})(AgentDashboard);