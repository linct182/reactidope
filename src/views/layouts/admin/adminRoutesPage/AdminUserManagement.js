import React, { Component } from 'react';
import styled from 'react-emotion';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container, Row, Col, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//components
import Loading from '../../../component/Loading';

// utils
import 'react-table/react-table.css';
import { actionFetchUserList, actionUserVerification } from '../../../../actionReducers/Admin';
import { dateTimeConverter } from '../../../../utils/datetime';

const UserManagementSection = styled('section')({
  paddingBottom: '50px',
  '& h3': {
    fontSize: '24px',
    fontWeight: '200',
    margin: '0px',
    marginBottom: '24px'
  },
})

const UserTable = styled(ReactTable)({
  background: '#fff',
});

const VerifyModal = styled(Modal)({
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

const VerifyLoader = styled('div')({
  position: 'fixed',
  right: '50px',
  zIndex: 99,
  top: '64px',
});

class AdminUserManagement extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: 'Email',
          accessor: 'email',
          width: 'auto'
        },
        {
          Header: 'Name',
          accessor: 'fullname',
          width: 'auto'
        },
        {
          Header: 'Phone #',
          accessor: 'phone_number',
          width: 'auto'
        },
        {
          Header: 'Joined',
          accessor: 'createdAt',
          width: 'auto',
          Cell: props => {
            return dateTimeConverter(props.value, true)
          }
        },
        {
          Header: 'Action',
          width: 'auto',
          Cell: props => {
            const { is_verified, email, id} = props.original
            return (
              <div style={{ textAlign: 'center' }}>
                <Button outline size="sm"
                  color={is_verified ? 'danger' : 'success'}
                  style={{ fontSize: 12, borderRadius: 0 }}
                  onClick={() => this.openVerifyModal(id, email, is_verified)}
                >
                  {is_verified ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            )
          },
        },
      ],
      data: [],
      pages: 0,
      loading: false,
      userData : {
        user_type_id: '',
        is_verified: '',
        search_key: '',
        page: 1,
        items_per_page: 10,
        order: 'id',
        sort_dir: "DESC"
      },
      verifyModal: false,
      verId: 0,
      verEmail: '',
      verBool: false
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ loading: nextProps.isUserListFetching });
    this.setState({ pages: nextProps.userList.pages });
  }

  fetchData = (state, instance) => {
    this.setState({
      ...this.state,
      userData: {
        ...this.state.userData,
        page: parseInt(state.page) + 1,
        items_per_page: state.pageSize,
        order: state.sorted.length > 0 ? state.sorted[0].id != 'fullname' ? state.sorted[0].id : 'forename' : '',
        sort_dir: state.sorted.length > 0 ? state.sorted[0].desc ? 'desc' : 'asc' : '',
      }
    }, () => this.props.actionFetchUserList(this.state.userData));
  }

  openVerifyModal = (verId, verEmail, verBool) => {
    this.setState({
      verifyModal: true,
      verId,
      verEmail,
      verBool,
    });
  }

  toggleVerifyModal = () => {
    this.setState({
      verifyModal: !this.state.verifyModal
    });
  }

  renderVerifyModal = () => {
    return (
      <VerifyModal isOpen={this.state.verifyModal} toggle={this.toggleVerifyModal} size={'sm'}>
        <ModalHeader toggle={this.toggleVerifyModal}>{this.state.verBool ? 'Deactivate' : 'Activate' } User</ModalHeader>
        <ModalBody>
          {this.state.verEmail}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm" onClick={this.updateUserVerification}>Confirm</Button>
          <Button color="scondary" size="sm" onClick={this.toggleVerifyModal}>Cancel</Button>
        </ModalFooter>
      </VerifyModal>
    );
  }

  updateUserVerification = async () => {
    await this.toggleVerifyModal();
    await this.props.actionUserVerification(this.state.verId, this.state.verEmail, this.state.verBool);

    if (this.props.verificationMessage != '') {
      toast.success(this.props.verificationMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });
    }

    this.props.actionFetchUserList(this.state.userData)
  }

  render() {
    const result = this.props.userList.result.map((user, i) => {
      user.fullname = `${user.forename} ${user.surname}`;
      user.verfication = {
        is_verified: user.is_verified,
        id: user.id
      };
      return user;
    });
    const data = result;
    // // console.log('USER LIST', this.props.userList);
    // console.log('USER STATE', this.state);
    return (
      <UserManagementSection>
        <Container>
          {this.renderVerifyModal()}
          {this.props.isUserVerifying ? <VerifyLoader><Loading /></VerifyLoader> : ''}
          <h3>User Management</h3>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Input
                  type="text"
                  placeholder="search for email..."
                  value={this.state.userData.search_key}
                  onChange={(e) => this.setState({ userData: { ...this.state.userData, search_key: e.target.value } }, () => this.props.actionFetchUserList(this.state.userData))}
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="3">
              <FormGroup>
                <Input
                  type="select"
                  name="select_type"
                  id="select-type"
                  value={this.state.userData.user_type_id}
                  onChange={(e) => this.setState({ userData: { ...this.state.userData, user_type_id: e.target.value } }, () => this.props.actionFetchUserList(this.state.userData))}
                >
                  <option value={''}>Type (ALL)</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Customers</option>
                  <option value={3}>Agent</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6" md="3">
              <FormGroup>
                <Input
                  type="select"
                  name="select_verified"
                  id="select-verified"
                  value={this.state.userData.is_verified}
                  onChange={(e) => this.setState({ userData: { ...this.state.userData, is_verified: e.target.value } }, () => this.props.actionFetchUserList(this.state.userData))}
                >
                  <option value={''}>Verification (ALL)</option>
                  <option value={true}>Verified</option>
                  <option value={false}>Not Verified</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <UserTable
            manual
            data={data}
            pages={this.state.pages}
            columns={this.state.columns}
            loading={this.state.loading}
            onFetchData={this.fetchData}
            defaultPageSize={this.state.userData.items_per_page}
          />
        </Container>
      </UserManagementSection>
    );
  }
}

export default connect(state => ({
  isUserListFetching: state.admin.isUserListFetching,
  userList: state.admin.userList,
  isUserVerifying: state.admin.isUserVerifying,
  verificationMessage: state.admin.verificationMessage,
}), { actionFetchUserList, actionUserVerification })(AdminUserManagement);