import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import {
  Container
} from 'reactstrap';

// Redux
import {
  actionOpenModal,
  actionCloseModal,
  actionSetModalDisplay
} from '../../../../actionReducers/Modals'

// Components
import Loading from '../../../component/Loading';
import StatusCase from '../../../component/StatusCase';
import AttachmentsPreview from '../../../component/AttachmentsPreview';

import pdfIcon from '../../../../assets/icons/innerPage_icn_pdf.svg';
import jpgIcon from '../../../../assets/icons/innerPage_icn_jpg.svg';
import userIcon from '../../../../assets/icons/user.svg';

// utils
import { dateTimeConverter } from '../../../../utils/datetime';
import breakpoints from '../../../../styles/breakpoints';
import config from '../../../../utils/config';

const AttachmentSectionContainer = styled('section')({
  backgroundColor: '#f0f1f3',
  fontFamily: 'Raleway',
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
}, (breakpoints({
  padding: ['12px', '24px', '48px'],
})));

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


class AttachmentSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeWebsite: ''
    };
  }

  openModal = (websiteName) => {
    this.setState({
      modal: true,
      activeWebsite: websiteName,

    });
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  }

  toggleModal = () => {
    return (this.props.isOpenModal) ? this.props.actionCloseModal() : this.props.actionOpenModal();
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
        null;
    }
  }

  renderFiles = () => {
    console.log('caseAttachments: ', this.props.caseAttachments);
    if (this.props.isActiveCasePending) {
      return <Loading />;
    } else {
      let attachments = this.props.caseAttachments;
      if (attachments.length !== 0) {
        return attachments.map((data, i) => {
          let fileIcon = pdfIcon;
          switch (data.type) {
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
          return <FileContainer key={i} >
            <img alt={data.link} src={fileIcon} />
            <p title={`${data.file_name}.${data.file_type}`}>{`${data.file_name}`}</p>
            <div className="file-actions" style={{ right: '48px' }}
              onClick={() => this.onClick(data)} >
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

  render() {
    return <AttachmentSectionContainer>
      <Container>
        <h1>Attachments</h1>
        {this.renderFiles()}
        <AttachmentsPreview
          isOpen={this.props.isOpenModal}
          actionToggle={this.toggleModal}
          baseUrl={config.BASE_URL}
          modalDisplay={this.props.modalDisplay}
        />
      </Container>
    </AttachmentSectionContainer>
  }
};

export default connect(state => ({
  modalDisplay: state.modals.modalDisplay,
  isOpenModal: state.modals.isOpenModal,
  dlBaseURL: state.agent.activeCaseDetails.base,
  caseAttachments: state.cases.caseAttachments,
  location: state.location
}), {
    actionOpenModal,
    actionCloseModal,
    actionSetModalDisplay
})(AttachmentSection);