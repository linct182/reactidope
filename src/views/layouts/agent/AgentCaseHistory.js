import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Container } from 'reactstrap';
import ReactTable from "react-table";

import Loading from '../../component/Loading';

// utils
import 'react-table/react-table.css';
import {
  actionGetCaseHistories,
} from '../../../actionReducers/Agent'
import { dateTimeConverter } from '../../../utils/datetime';

const CaseHistorySection = styled('section')({
  padding: '36px 0px',
  paddingBottom: '50px',
  '& h3': {
    fontSize: '24px',
    fontWeight: '200',
    margin: '0px',
    marginBottom: '24px'
  },
})

const CaseHistoryTable = styled(ReactTable)({
  background: '#fff'
})

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
    Header: 'Closed',
    accessor: 'closedAt',
    width: 'auto',
    Cell: props => {
      return dateTimeConverter(props.value, true)
    }
  }
]

class AgentCaseHistory extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
  }

  componentWillMount() {
    this.props.actionGetCaseHistories();
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ loading: nextProps.isCaseHistoryPending });
  }

  arrangeData = (cases) => {
    let caseHist = cases.map(hist =>{
      return {
        case_uuid: hist.case_uuid,
        websites: hist.websites,
        closedAt: hist.closedAt
      }
    });

    return caseHist;
  }

  render() {
    const data = this.arrangeData(this.props.caseHistories);
    return <CaseHistorySection id="agent-case-history">
      <Container>
        <h3>Case History</h3>
        <CaseHistoryTable
          data={data}
          columns={columns}
          loading={this.state.loading}
          defaultPageSize={5}
        />
      </Container>
    </CaseHistorySection>
  }
}

export default connect(state => ({
  isCaseHistoryPending: state.agent.isCaseHistoryPending,
  caseHistories: state.agent.caseHistories,
}), {
    actionGetCaseHistories
})(AgentCaseHistory);