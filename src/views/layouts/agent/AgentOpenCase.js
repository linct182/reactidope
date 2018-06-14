import React from 'react';
import styled from 'react-emotion';
import { Container, Row, Col, Button } from 'reactstrap';

import folderIcon from '../../../assets/icons/folder.svg';
import breakpoints from '../../../styles/breakpoints';

const OpenCase = styled('div')({
  backgroundColor: '#fff',
  padding: '12px',
  maxWidth: '600px',
  '& p': {
    fontWeight: '400',
    fontSize: '16px',
    margin: '5px 0px',
    '& span': {
      color: '#007bff'
    }
  }
}, (breakpoints({
  margin: ['24px auto 24px auto', '36px auto 24px auto', '48px auto 24px auto'],
}))); 

const StartCaseButton = styled(Button)({
  height: '30px',
  width: '100%',
  borderRadius: '0px',
  color: '#f2531c',
  borderColor: '#f2531c',
  fontSize: '12px',
  lineHeight: '0px',
  margin: '5px auto',
});

const FolderIcon = styled('img')({
  width: '30px',
  marginRight: '15px'
});

const AgentOpenCase = ({ caseCount, toggleOpenCaseModal}) => {
  return <Container >
    <OpenCase>
      <Row className="justify-content-between">
        <Col sm="8">
          <p><FolderIcon src={folderIcon} />Cases Available: <span>{caseCount}</span></p>
        </Col>
        <Col sm="4">
          <StartCaseButton outline color="danger" className="align-self-center" onClick={toggleOpenCaseModal}>OPEN A CASE</StartCaseButton>
        </Col>
      </Row>
    </OpenCase>
  </Container>
};

export default AgentOpenCase;