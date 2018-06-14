import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'redux-first-router-link';
import {
  Table,
  Container, 
  Row, 
  Col,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

// Components
import Headers from './HeaderInnerPage';
import HeaderBanner from '../../component/HeaderBanner';
import AttachmentsPreview from './../../component/AttachmentsPreview';
import Footer from '../../layouts/Footer';
import Loading from '../../component/Loading';
import StatusCase from '../../component/StatusCase';


// Redux
import { actionFetchCaseDetails, actionFetchFeedbacks, actionFetchWebsites, actionFetchAttachments, actionCloseCase } from '../../../actionReducers/Cases'
import { 
  actionOpenModal, 
  actionCloseModal,
  actionSetModalDisplay
 } from '../../../actionReducers/Modals'

// utils
import config from '../../../utils/config';
import { dateTimeConverter } from '../../../utils/datetime';
import pdfIcon from '../../../assets/icons/innerPage_icn_pdf.svg';
import jpgIcon from '../../../assets/icons/innerPage_icn_jpg.svg';
import userIcon  from '../../../assets/icons/user.svg';


const CaseDetailsSection = styled('article')({
  position: 'relative',
  minhHeight: '100%',
});

const WebsiteSection = styled('section')({
  backgroundColor: '#f0f1f3',
  padding: '24px 48px 48px 48px',
  fontFamily: 'Raleway',
});

const WebsitesContainer = styled('div')({
  backgroundColor: '#ffff',
  padding: '8px',
  boxShadow: '1px 1px 5px -1px #707070',
}); 

const WebsitesTable = styled(Table)({
  '& th': {
    backgroundColor: '#186fa4',
    fontWeight: 400,
    fontSize: 16,
    color: '#ffff',
  },
  '& td': {
    fontWeight: 300,
    fontSize: 16,
    padding: '12px 12px',
    borderColor: '#fff'
  }
});

const WebsitesText = styled('p')({
  fontFamily: 'Raleway',
  fontWeight: 300,
  fontSize: 14,
  color: '#272727',
  '& span': {
    color: '#186fa4'
  }
});

const CommentsSection = styled('section')({
  backgroundColor: '#fff',
  padding: '48px',
  '& h1': {
    fontFamily: 'Raleway',
    fontWeight: 400,
    fontSize: 24,
    color: '#000'
  },
  '& p': {
    fontFamily: 'Raleway',
    fontWeight: 300,
    fontSize: 14,
    color: '#272727'
  }
});

const FilesSection = styled('section')({
  backgroundColor: '#f0f1f3',
  padding: '48px',
  fontFamily: 'Raleway',
  '& h1': {
    fontWeight: 400,
    fontSize: 24,
    color: '#000'
  }
});

const FeedbackSection = styled('section')({
  backgroundColor: '#186fa4',
  padding: '48px',
  fontFamily: 'Raleway',
  color: '#ffffff',
  '& h1': {
    fontWeight: 400,
    fontSize: 24,
  },
  '& p': {
    margin: 'auto'
  }
});

const Feedback = styled('div')({
  padding: 20,
  margin: '10px 20px',
  boxSizing: 'border-box',
  color: '#212529',
  backgroundColor: '#ffffff',
  '& img': {
    width: 50,
    height: 50,
    marginRight: 20
  }
});

const Agent = styled('div')({
  flexDirection: 'column',
  '& div:first-child': {
    color: '#186fa4',
    fontSize: 20
    
  },
  '& div:nth-child(2)': {
    color: '#7c7d7d'
  }
});

const GoBack = styled(Link)({
  marginBottom: '24px',
  display: 'inline-block',
  background: '#fff',
  padding: '5px',
  boxShadow: '1px 1px 5px 0px rgb(155, 154, 154)',
});

const FileContainer = styled('div')(props => ({
  position: 'relative',
  maxWidth: '600px',
  backgroundColor: '#fff',
  padding: '12px',
  marginBottom: '12px',
  height: '50px',
  boxShadow: '1px 1px 5px -1px #707070',
  '& img': {
    height: '30px',
    width: 'auto',
    marginRight: '5px',
    verticalAlign: 'top',
    display: 'inline-block',
  },
  '& p': {
    textOverflow: 'ellipsis',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 'calc(100% - 130px)',
    height: '30px',
    margin: '0px',
    verticalAlign: 'top',
    marginTop: '6px'
  },
  '& .file-actions': {
    position: 'absolute',
    height: '50px',
    width: '50px',
    top: '0px',
    padding: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderLeft: '1px solid #dadada',
    '&:hover': {
      backgroundColor: '#c8c8c8',
    },
    '& i': {
      fontSize: '20px',
      color: '#3c3c3c',
    }
  }
}));

const Notice = styled(Alert)({
  width: '100%'
});

const CloseButton = styled(Button)({
  borderRadius: '0px',
  width: '100%',
  marginButton: '24px'
});

const ConfirmModal = styled(Modal)({
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

class CustomerCaseDetails extends Component {
  state = {
    modal: false,
    confirmModal: false,
    caseNotice: false
  };

  componentWillMount() {
    const { case_uuid } = this.props.location.payload;
    this.refreshCaseDetails(case_uuid);
  }

  refreshCaseDetails = async (case_uuid) => {
    await this.props.actionFetchCaseDetails(case_uuid);
    this.props.actionFetchFeedbacks(case_uuid);
    this.props.actionFetchWebsites(case_uuid);
    this.props.actionFetchAttachments(case_uuid);
  }

  updateCaseToClosed = async () => {
    await this.toggleConfirmModal();
    await this.props.actionCloseCase(this.props.caseDetails.case_uuid);

    if (this.props.closeCaseMessage != '') {
      toast.success(this.props.closeCaseMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });
    }

    this.refreshCaseDetails(this.props.caseDetails.case_uuid);
  }

  toggleModal = () => {
    return (this.props.isOpenModal) ? this.props.actionCloseModal() : this.props.actionOpenModal();
  }

  toggleConfirmModal = () => {
    this.setState({
      confirmModal: !this.state.confirmModal
    });
  }

  onClick = (data) => {
    switch (data.type) {
      case 'pdf':
        console.log('pdf: ', config.BASE_URL + data.link);
        window.open(config.BASE_URL + data.link, '_blank', 'fullscreen=yes');
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
        this.toggleModal();
        this.props.actionSetModalDisplay(data);
        break;
      default:
        break;
    }
  }

  renderWebsites = () => {


    if (this.props.isCaseWebsitesFetching){
      return <tr><td colSpan="2"><Loading /></td></tr>;
    } else {
      let websites = this.props.caseWebsites;
      
      if (websites.length !== 0) {
        return websites.map((data, i) =>
          <tr key={i}>
            <td>
              {data.name}
            </td>
            <td>
              <StatusCase status={data.status} caseId={i} isWebsiteStatus={true}/>
            </td>
          </tr>
        )
      } else if (websites.length === 0) {
        return <tr><td colSpan="2">No Websites Available</td></tr>
      }
    }
  }

  renderFiles = () => {
    if (this.props.isCaseAttachmentsFetching){
      return <Loading />;
    } else {
      let attachments = this.props.caseAttachments;
      
      if (attachments.length !== 0) {
        return attachments.map((data, i) => {
          let fileIcon = pdfIcon;
          switch(data.type) {
              case 'pdf':
                  fileIcon = pdfIcon;
                  break;
              case 'jpg':
              case 'jpeg':
              case 'png':
                  fileIcon = jpgIcon;
                  break;
              default:
                  fileIcon = pdfIcon;
          }

          return <FileContainer key={i}>
              <img alt={data.link} src={fileIcon} />
                  <p title={`${data.file_name}.${data.file_type}`}>{`${data.file_name}`}</p>
                  <div className="file-actions" style={{right:'48px'}}
                    onClick={() => this.onClick(data) } >
                    <i className="fas fa-search"></i>
                  </div>
                  <div className="file-actions" style={{ right: '0px' }} 
                    onClick = {() => window.location.href = `${config.BASE_URL}${data.link}?dl=yes`}>
                    <i className="fas fa-download"></i>
                  </div>
                </FileContainer>
        });
      } else if (attachments.length === 0) {
        return <p>No Attachments Available</p>
      }
    }
  }

  renderFeedbacks = () => {
    
    if (this.props.isCaseFeedbacksFetching) {
      return <Loading />;
    } else {
      let feedbacks = this.props.caseFeedbacks;
      if (feedbacks !== undefined){
        if (feedbacks.length !== 0) {
          return feedbacks.map((data, i) =>
            <Feedback key={i} className="col-sm-5">
              <img src={userIcon} className="float-left"/>
              <Agent className="row">
                <div>{data.user.forename} {data.user.surname}</div>
                <div>{data.feedback}</div>
              </Agent>
            </Feedback>
          )
        } else if (feedbacks.length === 0) {
          return <p>No Feedbacks Available</p>
        }
      }
    }
  }

  isResolved = () => {
    const webArray = this.props.caseWebsites.map((data, i) => {
      return data.status.id;
    });

    return webArray.length > 0 && this.props.caseDetails.status_id != 5 ? webArray.every((val) => val === 3) : false;
  }

  renderCloseButton = () => {
    
    if (this.isResolved() && this.props.caseDetails.status_id != 5) {
      return <CloseButton color="success" onClick={this.toggleConfirmModal}>Close</CloseButton>
    }

    return <CloseButton color="secondary" disabled>Close</CloseButton>;

  }

  renderConfirmModal = () => {
    return <ConfirmModal isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal} size={'sm'}>
      <ModalHeader toggle={this.toggleConfirmModal}>Confirm Close Case</ModalHeader>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={this.updateCaseToClosed}>Confirm</Button>
        <Button color="scondary" size="sm" onClick={this.toggleConfirmModal}>Cancel</Button>
      </ModalFooter>
    </ConfirmModal>
  }


  render() {
    const caseDetails = this.props.caseDetails;

    return (
      <CaseDetailsSection id="customer-case_details">
        <Headers />
        <HeaderBanner title="Case Details" />
        {this.renderConfirmModal()}
        <WebsiteSection>
          <Container>
            <GoBack to={`/customer/dashboard`}>
              <i className="fas fa-angle-double-left"></i>
              <span>  Go back to dashboard</span>
            </GoBack>
            <Row>
              <Col sm="8">
                <WebsitesText>Reference No.: <span>{caseDetails.case_uuid}</span></WebsitesText>
                <WebsitesText>Date Submitted:  <span>{dateTimeConverter(caseDetails.createdAt, true)}</span></WebsitesText>
              </Col>
              <Col sm="4">
                {this.renderCloseButton()}
              </Col>
            </Row>
            {this.isResolved() ? <Notice color="success">Notice: Case was resolved by the Agent, please review and close the case</Notice> : ''}
            {caseDetails.status_id == 5 ? <Notice color="success">Notice: This case is now closed. Thank you!</Notice> : ''}
            <WebsitesContainer>
              <WebsitesTable responsive={true} bordered={true} striped>
                <thead>
                  <tr>
                    <th>Website</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderWebsites()}
                </tbody>
              </WebsitesTable>
            </WebsitesContainer>
          </Container>
        </WebsiteSection>
        <CommentsSection>
          <Container>
            <h1>Comments</h1>
            {this.props.isCaseDetailsFetching ? <Loading /> : <p>{caseDetails.comments}</p>}
          </Container>
        </CommentsSection>
        <FilesSection>
          <Container>
            <h1>File Attachments</h1>
            {this.renderFiles()}
            <AttachmentsPreview
              isOpen={this.props.isOpenModal}
              actionToggle={this.toggleModal}
              baseUrl={config.BASE_URL}
              modalDisplay={this.props.modalDisplay}
            />
          </Container>
        </FilesSection>
        <FeedbackSection>
          <Container>
            <h1>Feedbacks</h1>
            <Row>
              {this.renderFeedbacks()}
            </Row>
          </Container>
        </FeedbackSection>
        <Footer />
      </CaseDetailsSection>
    )  
  }
}

export default connect(state=>({
  modalDisplay: state.modals.modalDisplay,
  isOpenModal: state.modals.isOpenModal,
  caseDetails: state.cases.caseDetails.caseDetails,
  caseFeedbacks: state.cases.caseFeedbacks,
  dlBaseURL: state.cases.caseDetails.base,
  isCaseDetailsFetching: state.cases.isCaseDetailsFetching,
  isCaseFeedbacksFetching: state.cases.isCaseFeedbacksFetching,
  location: state.location,
  isCaseWebsitesFetching: state.cases.isCaseWebsitesFetching,
  caseWebsites: state.cases.caseWebsites,
  isCaseAttachmentsFetching: state.cases.isCaseAttachmentsFetching,
  caseAttachments: state.cases.caseAttachments,
  isCaseClosing: state.cases.isCaseClosing,
  closeCaseMessage: state.cases.closeCaseMessage,
}), { 
  actionOpenModal,
  actionCloseModal,
  actionSetModalDisplay,
  actionFetchCaseDetails,
  actionFetchFeedbacks,
  actionFetchWebsites,
  actionFetchAttachments,
  actionCloseCase,
 })(CustomerCaseDetails);