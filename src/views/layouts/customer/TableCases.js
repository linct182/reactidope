import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Link from 'redux-first-router-link';
import { Table } from 'reactstrap';

// Components
import Loading from '../../component/Loading';
import StatusCase from '../../component/StatusCase';

// utils
import { actionFetchCases } from '../../../actionReducers/Cases';

const CaseTable = styled(Table)({
  fontFamily: 'Raleway',
  '& td': {
    borderColor: '#fff',
    fontWeight: 300,
    fontSize: 14,
    padding: '12px 12px',
  },
  '& th': {
    backgroundColor: '#186fa4',
    fontWeight: 400,
    fontSize: 16,
    color: '#ffff',
  }
});

const CaseId = styled('td')({
  cursor: 'pointer'
});

class TableCase extends Component {
  state = {}

  componentWillMount(){
    this.props.actionFetchCases();
  }

  renderData = () => {
    if (this.props.isCaseFetching){
      return <tr><td colSpan="3"><Loading /></td></tr>
    }else{
      console.log('caseList: ', this.props.caseList.length);
      if (this.props.caseList.length !== 0) {
        console.log('pumasok!');
        return this.props.caseList.map((data, i) =>
          <tr key={i}>
            <CaseId  ><Link to={`/customer/CaseDetails/${data.case_uuid}`}>{data.case_uuid}</Link></CaseId>
            <td>
              {data.websites.map((website, j) => <p key={j} >{website.name}</p>)}
            </td>
            <td>
              <StatusCase status={data.status} caseId={data.case_uuid}/>
            </td>
          </tr>
        )
      } else if (this.props.caseList.length === 0) {
        return <tr><td colSpan="3">No Cases Available</td></tr>
      }

    }
  }

  render() { 
    return (
      <CaseTable responsive={true} bordered={true} striped>
        <thead>
          <tr>
            <th>Reference ID</th>
            <th>Company List</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.renderData() }
        </tbody>
      </CaseTable>)
  }
}

export default connect(state=>({
  caseList: state.cases.caseList,
  isCaseFetching: state.cases.isCaseFetching
}), { actionFetchCases })(TableCase);