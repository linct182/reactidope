import React from 'react';
import styled from 'react-emotion';
import { Container } from 'reactstrap';

// Components
import Loading from '../../../component/Loading';

// utils
import breakpoints from '../../../../styles/breakpoints';

const CommentsSectionContainer = styled('section')({
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
}, (breakpoints({
  padding: ['12px', '24px', '48px'],
})));

const CommentSection = ({ isActiveCasePending, comments }) => {
  return <CommentsSectionContainer>
    <Container>
      <h1>Comments</h1>
      {isActiveCasePending ? <Loading /> : <p>{comments}</p>}
    </Container>
  </CommentsSectionContainer>
}

export default CommentSection;