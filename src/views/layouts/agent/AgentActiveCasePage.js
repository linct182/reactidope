import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

// Components
import AgentHeader from './AgentHeader';
import HeaderBanner from '../../component/HeaderBanner';
import UploadProgress from '../../component/UploadProgress';
import WebsiteSection from './agentActiveCase/WebsiteSection';
import CommentSection from './agentActiveCase/CommentSection';
import AttachmentSection from './agentActiveCase/AttachmentSection';
import FeedbacksSection from './agentActiveCase/FeedbacksSection';
import Footer from '../../layouts/Footer';
import Loading from '../../component/Loading';
import Status from '../../component/Status';


// utils
import { actionGetActiveCaseDetails } from '../../../actionReducers/Agent/AgentActions';
import { actionFetchFeedbacks, actionFetchWebsites, actionFetchAttachments } from '../../../actionReducers/Cases/CasesActions';
import { DEFAULT_BG } from '../../../assets/constants';


const AgentActivePageContainer = styled('div')({
  position: 'relative',
  minHeight: '100%',
  backgroundColor: DEFAULT_BG,
  fontFamily: 'Raleway'
});

const StatusMessage = styled('div')({
  fontSize: 20,
  textAlign: 'center',
  margin: '10px 5px'
});

class AgentActiveCasePage extends Component {
  state = {};

  componentWillMount() {
    const { case_uuid } = this.props.location.payload;
    this.refreshActiveCaseDetails(case_uuid);
  }

  renderUpdateWebsiteStatusProgress = () => {
    return (this.props.isCaseResolving) ?
    (<Status >
      <Loading />
      <StatusMessage> Resolving Case </StatusMessage> 
    </Status>) : null;
  }

  renderResolveCaseProgress = () => {
    return (this.props.isUpdateWebsiteStatusPending) ?
      (<Status >
        <Loading />
        <StatusMessage> Updating Websites Status </StatusMessage>
      </Status>) : null;
  }

  renderSendingFeedbackProgress = () => {
    return (this.props.isSendingFeedback) ?
    (<Status >
      <Loading />
      <StatusMessage> Sending Feedbacks </StatusMessage> 
    </Status>) : null;
  }

  refreshActiveCaseDetails = (case_uuid) => {
    this.props.actionGetActiveCaseDetails();
    this.props.actionFetchFeedbacks(case_uuid);
    this.props.actionFetchWebsites(case_uuid);
    this.props.actionFetchAttachments(case_uuid);
  }

  render() {
    const activeCase = this.props.activeCaseDetails.caseDetails;
    const feedbacks = this.props.caseFeedbacks;
    const websites = this.props.caseWebsites;
    const attachments = this.props.caseAttachments;

    return (
      <AgentActivePageContainer>
        <AgentHeader />
        <HeaderBanner title="Active Case Details" />
        <WebsiteSection refreshActiveCaseDetails={this.refreshActiveCaseDetails} isActiveCasePending={this.props.isActiveCasePending} isWebsitesPending={this.props.isCaseWebsitesFetching} activeCase={activeCase} websites={websites} />
        <CommentSection isActiveCasePending={this.props.isActiveCasePending} comments={activeCase.comments} />
        <AttachmentSection isActiveCasePending={this.props.isCaseAttachmentsFetching} attachments={activeCase.attachments} case_uuid={this.props.location.payload.case_uuid} />
        <FeedbacksSection isActiveCasePending={this.props.isCaseFeedbacksFetching} feedbacks={feedbacks} />
        <UploadProgress isFileUploadPending={this.props.isFileUploadPending} fileUploadProgress={this.props.fileUploadProgress} />
        { this.renderUpdateWebsiteStatusProgress() }
        { this.renderSendingFeedbackProgress() }
        { this.renderResolveCaseProgress() }
        <Footer />
      </AgentActivePageContainer>
    );
  }
}

export default connect(state => ({
  location: state.location,
  isActiveCasePending: state.agent.isActiveCasePending,
  isFileUploadPending: state.uploads.isFileUploadPending,
  fileUploadProgress: state.uploads.fileUploadProgress,
  activeCaseDetails: state.agent.activeCaseDetails,
  isUpdateWebsiteStatusPending: state.agent.isUpdateWebsiteStatusPending,
  isSendingFeedback: state.agent.isSendingFeedback,
  isCaseResolving: state.uploads.isCaseResolving,
  caseFeedbacks: state.cases.caseFeedbacks,
  isCaseFeedbacksFetching: state.cases.isCaseFeedbacksFetching,
  isCaseWebsitesFetching: state.cases.isCaseWebsitesFetching,
  caseWebsites: state.cases.caseWebsites,
  isCaseAttachmentsFetching: state.cases.isCaseAttachmentsFetching,
  caseAttachments: state.cases.caseAttachments,
}), { actionGetActiveCaseDetails, actionFetchFeedbacks, actionFetchWebsites, actionFetchAttachments })(AgentActiveCasePage);
