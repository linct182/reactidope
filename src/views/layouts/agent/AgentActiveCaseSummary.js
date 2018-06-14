import React from 'react';
import styled from 'react-emotion';
import { Container, Row, Col, Button } from 'reactstrap';
import Link from 'redux-first-router-link';

// utils
import { dateTimeConverter } from '../../../utils/datetime';

import pendingIcon from '../../../assets/icons/icon_pending.svg';
import ongoingIcon from '../../../assets/icons/icon_ongoing.svg';
import doneIcon from '../../../assets/icons/status_verified.svg';

import Loading from '../../component/Loading';

// Case
// 1 - queued
// 2 - verified
// 3 - active
// 4 - resolved
// 5 - closed

// Website
// 1 - pending(queued)
// 2 - ongoing(active)
// 3 - done(verified)

const CaseSummarySection = styled('section')({
  backgroundColor: '#fff',
  padding: '36px 0px',
  '& h3': {
    fontSize: '24px',
    fontWeight: '200',
    margin: '0px'
  },
  '& .summary-refid': {
    color: '#007bff',
    fontSize: '14px',
    margin: '5px 0px'
  },
  '& .row:first-child': {
    borderBottom: '1px solid #d1d1d1',
    paddingBottom: '5px',
    marginBottom: '36px'
  },
  '& .summary-details': {
    fontSize: '12px',
    '&.bordered': {
      borderBottom: '1px solid #e5e5e5',
      marginBottom: '6px',
      paddingBottom: '6px'
    }
  },
});

const WebSummary = styled('div')(props => ({
  backgroundColor: '#f4f4f4',
  padding: '5px 18px',
  width: '100%',
  marginBottom: '3px',
  '& img': {
    width: '18px',
    marginRight: '10px'
  },
  '& p': {
    fontSize: '12px',
    margin: '0px'
  },
  '&:last-child': {
    marginBottom: '24px'
  }
}));

const OpenCaseButton = styled(Button)({
  height: '30px',
  width: '100%',
  borderRadius: '0px',
  color: '#f2531c',
  borderColor: '#f2531c',
  fontSize: '12px',
  lineHeight: '0px',
  margin: '5px auto',
});

const renderWebsites = (websites, websitePending) => {
  if(websitePending) {
    return <Loading />
  }
  return websites.map((data, i) => {
    let webIcon = pendingIcon;
    switch (data.status.id) {
      case 1:
        webIcon = pendingIcon;
        break;
      case 2:
        webIcon = ongoingIcon;
        break;
      case 3:
        webIcon = doneIcon;
        break;
      default:
        webIcon = pendingIcon;
    }

    return <WebSummary key={i}>
      <p title={data.status.description} ><img alt='' src={webIcon}/> {data.name}</p>
          </WebSummary>
  });
}

const AgentActiveCaseSummary = ({ details, websites, websitePending}) => {
  return <CaseSummarySection id="case-summary">
    <Container>
      <div className="summary-title">
        <Row>
          <Col sm="4">
            <h3>Active Case</h3>
          </Col>
          <Col sm="8">
            <p className="summary-refid text-left text-sm-right">Ref ID: {details.case_uuid}</p>
          </Col>
        </Row>
      </div>
      <Row>
        <Col xs={{ size: 12, order: 2 }} sm={{ size: 6, order: 1 }}>
          <p className="summary-details bordered">DATE SUBMITTED: <span className="float-right">{dateTimeConverter(details.createdAt, true)}</span></p>
          <p className="summary-details bordered">DATE STARTED: <span className="float-right">{dateTimeConverter(details.openedAt, true)}</span></p>
          <p className="summary-details bordered">LAST UPDATED: <span className="float-right">{dateTimeConverter(details.updatedAt, true)}</span></p>
          <Link to={`/agent/active/${details.case_uuid}`}><OpenCaseButton outline color="danger" className="align-self-center" >OPEN CASE</OpenCaseButton></Link>
        </Col>
        <Col xs={{ size: 12, order: 1 }} sm={{ size: 6, order: 2 }}>
          <p className="summary-details">WEBSITES</p>
          {renderWebsites(websites, websitePending)}
        </Col>
      </Row>
    </Container>
  </CaseSummarySection>
}

export default AgentActiveCaseSummary;