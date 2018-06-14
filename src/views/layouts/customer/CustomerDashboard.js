import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import {
  Container, 
  Row, 
  Col,
  Progress  
} from 'reactstrap';

// import CaseDetails from './CaseDetails';
import TableCases from './TableCases';
import SubmitCase from '../submitCaseModal/SubmitCase';
import Headers from './HeaderInnerPage';
import HeaderBanner from '../../component/HeaderBanner';
import Footer from '../Footer';
import Pagination from '../../component/Pagination';
import SearchInput from '../../component/SearchInput';
import Loading from '../../component/Loading';
import Status from '../../component/Status';
import { DEFAULT_BG } from '../../../assets/constants';
import uploadIcon from '../../../assets/icons/upload.svg';

const CustomerPageContainer = styled('div')({
  position: 'relative',
  backgroundColor: DEFAULT_BG,
  minHeight: '100%',
  textAlign: 'center',
});

const SearchAndBtnContainer = styled('div')({
  width: '100%',
  margin: '32px 0px 12px 0px'
}); 

const TableContainer = styled('div')({
  backgroundColor: '#ffff',
  padding: '8px',
  boxShadow: '1px 1px 5px -1px #707070',
  minHeight: '400px'
}); 

const PaginationContainer = styled('div')({
  paddingTop: 20,
  paddingLeft: 59,
  paddingBottom: 50,
  textAlign: 'right'
})

const ProgressContainer = styled('div')({
  borderRadius: 40,
  margin: '10px 0px'
});

const ProgressCustom = styled(Progress)({
  backgroundColor: '#cfcfcf',
  borderRadius: 40,
  height: 5,
  margin: '15px 0px 5px'
});

const ProgressTitleContainer = styled('div')({
  color: 'gray',
  fontSize: 10,
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center'
});

const IconUpload = styled('img')({
  width: 50,
  height: 50,
  padding: '0px 10px',
  boxSizing: 'border-box',
});

const ProgressTitle = styled('div')({
  fontSize: 25,
  padding: '10px 5px',
  boxSizing: 'border-box',
});
const ProgressLabel = styled('div')({
  color: 'gray',
  fontSize: 12,
  textAlign: 'right'
});

class CustomerDashboard extends Component {
  state = {}

  componentWillReceiveProps(nextProps, nextState) {
    console.log('nextProps: ', nextProps);
    if (!nextProps.isCaseSubmitPending) {
      //todo: how to catch error message
      // toast.error(this.toastMessage(nextProps.errorSignupMessage), {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true
      // });
    }
  }

  //TODO: implement the component for this
  renderUploadProgress = () => {
    return (this.props.isFileUploadPending)? 
      <Status>
        <ProgressContainer>
          <ProgressTitleContainer> 
            <IconUpload src={uploadIcon}/>
            <ProgressTitle>Upload Files</ProgressTitle>
          </ProgressTitleContainer>
          <ProgressCustom value={this.props.fileUploadProgress} >
            <Progress style={{ "backgroundColor": "#66c430" }} />
          </ProgressCustom>
          <ProgressLabel>{this.props.fileUploadProgress}%</ProgressLabel>
        </ProgressContainer>
      </Status>
    : null
  }
  renderCaseSubmitProgress = () => {
    return (this.props.isCaseSubmitPending)? (
      <Status>
        <Loading />
        <div> Submitting Case </div>
      </Status>    
    ): null;
  }

  render() {
    return (
      <CustomerPageContainer id="customer-page">
        <Headers/>
        <HeaderBanner title="Customer Dashboard" />
        {/* <CaseDetails/> */}
        <Container>
          <SearchAndBtnContainer>
            <Row>
              <Col xs="12" sm="8" md="7">
                <SearchInput />
              </Col>
              <Col xs={{ size: 8, offset: 2 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 1 }}>
                <SubmitCase />
              </Col>
            </Row>
          </SearchAndBtnContainer>
          <TableContainer>
            <TableCases />
          </TableContainer>
        </Container>
        <Footer/>
        { this.renderCaseSubmitProgress() }
        { this.renderUploadProgress() }

      </CustomerPageContainer>

    )  
  }
}

export default connect(state => ({
  isCaseSubmitPending: state.cases.isCaseSubmitPending,
  isCaseSubmitStatus: state.cases.isCaseSubmitStatus,
  isFileUploadPending: state.cases.isFileUploadPending,
  fileUploadProgress: state.cases.fileUploadProgress

}))(CustomerDashboard);