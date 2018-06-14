import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import ReactTable from 'react-table';
import { Container, Row, Col, Button } from 'reactstrap';

// Component
import AgentHeader from './AgentHeader';
import HeaderBanner from '../../component/HeaderBanner';
import Footer from '../../layouts/Footer';

// utils
import 'react-table/react-table.css';
import { dateTimeConverter } from '../../../utils/datetime';

const PayoutPageContainer = styled('div')({
  textAlign: 'center',
  position: 'relative',
  fontFamily: 'Raleway'
});

const MainContent = styled('div')({
  position: 'relative',
  padding: '24px'
});

const ReqeuestRow = styled(Row)({
  '& p': {
    textAlign: 'left',
    fontSize: '18px'
  },
  '& button': {
    borderRadius: '0px',
    width: '100%',
    marginButton: '24px'
  }
});

const columns = [
  {
    Header: 'Reference ID',
    accessor: 'case_uuid',
    width: 'auto'
  },
  {
    Header: 'Websites',
    accessor: 'websites',
    width: 'auto',
    Cell: props => {
      return props.value.map((hist, i) => {
        return <p key={i}>{hist.name}</p>
      });
    },
  },
  {
    Header: 'Amount',
    accessor: 'closedAt',
    width: 'auto',
    Cell: props => {
      return dateTimeConverter(props.value, true)
    }
  },
  {
    Header: 'Action',
    accessor: 'closedAt',
    width: 'auto',
    Cell: props => {
      return dateTimeConverter(props.value, true)
    }
  }
]

class AgentPayoutPage extends Component {
  render() {
    return (
      <PayoutPageContainer>
        <AgentHeader />
        <HeaderBanner title="Agent Payout" />
        <MainContent>
          <Container>
            <ReqeuestRow>
              <Col sm="8">
                <p>Amount: $0</p>
              </Col>
              <Col sm="4">
                <Button color="success">Request Payout</Button>
              </Col>
            </ReqeuestRow>
            <ReactTable
              columns={columns}
              defaultPageSize={10}
            />
          </Container>
        </MainContent>
        <Footer />
      </PayoutPageContainer>
    );
  }
}

export default connect()(AgentPayoutPage);