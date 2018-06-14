import React, { Component } from 'react';
import styled from 'react-emotion';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';

// Components
import Loading from '../../../component/Loading';
import StatusCase from '../../../component/StatusCase';
import UploadAttachment from '../../UploadAttachment'

// utils
import { dateTimeConverter } from '../../../../utils/datetime';
import {
  actionUpdateWebsiteStatus,
  actionAgentSendFeedback,
  actionResolveCase
} from '../../../../actionReducers/Agent';
import breakpoints from '../../../../styles/breakpoints';

import {
  actionFileUpload
} from '../../../../actionReducers/Uploads';


const WebsiteSectionContainer = styled('section')({
  backgroundColor: '#f0f1f3',
  padding: '24px 48px 48px 48px',
  fontFamily: 'Raleway',
}, (breakpoints({
    padding: ['24px 12px 12px 12px', '24px 24px 24px 24px', '24px 48px 48px 48px'],
})));

const WebsitesContainer = styled('div')({
  padding: '8px',
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

const GoBack = styled(Link)({
  marginBottom: '24px',
  display: 'inline-block',
  background: '#fff',
  padding: '5px',
  boxShadow: '1px 1px 5px 0px rgb(155, 154, 154)',
});

const StatusButton = styled(Button)({
  background: '#fff',
  padding: '5px',
  borderRadius: '0px',
  border: '0',
  color: '#000',
  boxShadow: '1px 1px 5px 0px rgb(155, 154, 154)',
  width: '100%'
});

const StatusCaseNew = styled(StatusCase)({
  '& img': {
    padding: '0px',
    width: '30px',
    height: '30px'
  }
});

const WebCard = styled('div')({
  marginBottom: '12px',
  cursor: 'pointer',
  padding: '8px 10px',
  backgroundColor: '#fff',
  color: 'black',
  boxShadow: '1px 1px 2px -1px #707070',
  transition: 'background-color 0.2s',
  '& .web-name': {
    fontSize: '16px',
    fontWeight: '300',
    color: '#000000',
  },
  '& .web-img': {
    width: '30px',
    height: '30px',
    padding: '4px',

  },
  '& .web-desc': {
    margin: 'auto 2px',
    fontSize: '14px',
    color: '#186fa4',
    fontWeight: '300',
  },
  '&:hover': {
    transition: 'background 5s',
    background: '#005AA7',  /* fallback for old browsers */
    background: '-webkit-linear- gradient(to right, #FFFDE4, #005AA7)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #FFFDE4, #005AA7)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
});

const WebsiteModal = styled(Modal)({
  '& .modal-content': {
    borderRadius: '0px'
  },
  '& .modal-header': {
    backgroundColor: '#19283f',
    color: '#fff',
    borderRadius: '0px',
    '& .close': {
      color: '#fff'
    }
  },
  '& button': {
    borderRadius: '0px'
  },
  '& .pending, & .ongoing, & .done': {
    textAlign: 'center',
    border: '1px solid black',
    marginBottom: '5px',
    padding: '5px 0px',
    cursor: 'pointer',
    '&.active': {
      color: '#fff'
    },
    '&:hover': {
      background: '#eee'
    }
  },
  '& .pending': {
    borderColor: '#fdd835',
    color: '#fdd835',
    '&.active': {
      backgroundColor: '#fdd835'
    }
  },
  '& .ongoing': {
    borderColor: '#00b0ff',
    color: '#00b0ff',
    '&.active': {
      backgroundColor: '#00b0ff'
    }
  },
  '& .done': {
    borderColor: '#69c23c',
    color: '#69c23c',
    '&.active': {
      backgroundColor: '#69c23c'
    }
  }
});

const ResolveButton = styled(Button)({
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

const Notice = styled(Alert)({
  width: '100%'
});

class WebsiteSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      confirmModal: false,
      dropdownOpen: false,
      activeWebsite: '',
      activeWebsiteId: 0,
      websiteStatusName: '',
      websiteStatusId: 1,
      websiteFeedback: '',
    };
  }

  openModal = (websiteName, websiteId, websiteStatusName, websiteStatusId) => {
    this.setState({
      modal: true,
      activeWebsite: websiteName,
      activeWebsiteId: websiteId,
      websiteStatusName: websiteStatusName,
      websiteStatusId: websiteStatusId,
    });
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  }

  toggleConfirmModal = () => {
    this.setState({
      confirmModal: !this.state.confirmModal
    });
  }

  webFeedbackHandler = (e) => {
    this.setState({
      websiteFeedback: e.target.value
    });
  }

  toastMessage = message => {
    return (
      <span><i className="fas fa-exclamation-triangle"></i> {message}</span>
    );
  }

  updateCaseToResolve = async () => {
    await this.toggleConfirmModal();
    await this.props.actionResolveCase(this.props.activeCase.case_uuid);

    if (this.props.resolveCaseMessage != '') {
      toast.success(this.props.resolveCaseMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });
    }

    this.props.refreshActiveCaseDetails(this.props.activeCase.case_uuid);
  }

  updateWebsiteStatus = async () => {
    const webData = {
      website_name: this.state.activeWebsite,
      website_status: this.state.websiteStatusName,
      websiteID: this.state.activeWebsiteId,
      status: this.state.websiteStatusId,
      feedback: this.state.websiteFeedback,
      caseID: this.props.activeCase.case_uuid,
    }

    await this.closeModal();
    await this.props.actionUpdateWebsiteStatus(webData);

    if(this.state.websiteFeedback != '') {
      await this.props.actionAgentSendFeedback(webData)
    }
    if (this.props.filesUpload != '') {
      await this.props.actionFileUpload(this.props.filesUpload, this.props.activeCase.case_uuid);
    }
    
    if (this.props.updateWebsiteMessage != '' && this.props.updateWebsiteMessage != '') {
      toast.success("Successfully Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });
    }

    this.props.refreshActiveCaseDetails(this.props.activeCase.case_uuid);
    this.setState({ websiteFeedback: '' });
  }


  renderWebsites = () => {
    if (this.props.isCaseWebsitesFetching) {
      return <Loading />;
    } else {

      if (this.props.websites.length !== 0) {
        return this.props.websites.map((data, i) =>
          <Col sm="6" key={i}>
            <WebCard onClick={() => { this.openModal(data.name, data.id, data.status.name, data.status.id) }}>
              <div className="web-name">{data.name}</div>
              <StatusCaseNew status={data.status} caseId={i} isWebsiteStatus={true} />
            </WebCard>
          </Col>
        )
      } else if (this.props.websites.length === 0) {
        return <Loading />;
      }
    }
  }

  renderConfirmModal = () => {
    return <ConfirmModal isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal} size={'sm'}>
      <ModalHeader toggle={this.toggleConfirmModal}>Confirm Resolve Case</ModalHeader>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={this.updateCaseToResolve}>Confirm</Button>
        <Button color="scondary" size="sm" onClick={this.toggleConfirmModal}>Cancel</Button>
      </ModalFooter>
    </ConfirmModal>
  }

  renderModal = () => {
    return <WebsiteModal isOpen={this.state.modal} toggle={this.closeModal}>
      <ModalHeader toggle={this.closeModal}>{this.state.activeWebsite}</ModalHeader>
      <ModalBody>
        <Row style={{ marginBottom: '12px'}}>
          <Col><div className={`pending ${this.state.websiteStatusId == 1 ? 'active' : ''}`} onClick={() => this.setState({ websiteStatusId: 1 })}>Pending</div></Col>
          <Col><div className={`ongoing ${this.state.websiteStatusId == 2 ? 'active' : ''}`} onClick={() => this.setState({ websiteStatusId: 2 })}>Ongoing</div></Col>
          <Col><div className={`done ${this.state.websiteStatusId == 3 ? 'active' : ''}`} onClick={() => this.setState({ websiteStatusId: 3 })}>Done</div></Col>
        </Row>
        <FormGroup>
          <Label for="web-feedback">Feedback</Label>
          <Input
            type="textarea"
            name="web-feedback"
            id="web-feedback"
            value={this.state.websiteFeedback}
            onChange={this.webFeedbackHandler}
          />
        </FormGroup>
        <UploadAttachment/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.updateWebsiteStatus}>Update</Button>{' '}
        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
      </ModalFooter>
    </WebsiteModal>
  }

  isResolved = () => {
    const webArray = this.props.websites.map((data, i) => {
      return data.status.id;
    });

    return webArray.length > 0 ? webArray.every((val) => val === 3) : false;
  }

  renderResolveButton = () => {
    

    if (this.isResolved() && this.props.activeCase.status_id !== 4 ) {
      return <ResolveButton color="success" onClick={this.toggleConfirmModal}>Resolve</ResolveButton>
    }
  
    return <ResolveButton color="secondary" disabled>Resolve</ResolveButton>;

  }

  render() {
   
    return <WebsiteSectionContainer>
      {this.renderModal()}
      {this.renderConfirmModal()}
      <Container>
        <GoBack to={`/agent/dashboard`}>
          <i className="fas fa-angle-double-left"></i>
          <span>  Go back to dashboard</span>
        </GoBack>
        {this.props.activeCase.status_id == 4 ? <Notice color="success">Notice: Case is now resolved! Please wait for the customer to review and close the case.</Notice> : ''}
        <Row>
          <Col sm="8">
            <WebsitesText>Reference No.: <span>{this.props.activeCase.case_uuid}</span></WebsitesText>
            <WebsitesText>Date Submitted:  <span>{this.props.isActiveCasePending ? '----' : dateTimeConverter(this.props.activeCase.createdAt, true)}</span></WebsitesText>
          </Col>
          <Col sm="4">
          {this.renderResolveButton()}
          </Col>
        </Row>
        <WebsitesContainer>
          <Row>
            {this.renderWebsites()}
          </Row>
        </WebsitesContainer>
      </Container>
    </WebsiteSectionContainer>
  }
};

export default connect(state => ({
  updateWebsiteMessage: state.agent.updateWebsiteMessage,
  filesUpload: state.uploads.fileUpload,
  resolveCaseMessage: state.uploads.resolveCaseMessage,
  isCaseWebsitesFetching: state.cases.isCaseWebsitesFetching,
}), {
  actionUpdateWebsiteStatus,
  actionAgentSendFeedback,
  actionFileUpload,
  actionResolveCase,
})(WebsiteSection);