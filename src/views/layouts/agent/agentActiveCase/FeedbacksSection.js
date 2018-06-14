import React from 'react';
import styled from 'react-emotion';
import { Container, Row } from 'reactstrap';

// Components
import Loading from '../../../component/Loading';
import userIcon from '../../../../assets/icons/user.svg';

// utils
import breakpoints from '../../../../styles/breakpoints';


const FeedbackSectionContainer = styled('section')({
  backgroundColor: '#186fa4',
  padding: '48px',
  fontFamily: 'Raleway',
  color: '#ffffff',
  '& h1': {
    fontWeight: 400,
    fontSize: 24,
  },
  '& p': {
    margin: 'auto'
  }
}, (breakpoints({
    padding: ['48px 12px', '48px 24px', '48px'],
})));

const FeedbackSection = styled('section')({
  backgroundColor: '#186fa4',
  padding: '48px',
  fontFamily: 'Raleway',
  color: '#ffffff',
  '& h1': {
    fontWeight: 400,
    fontSize: 24,
  },
  '& p': {
    margin: 'auto'
  }
});

const Feedback = styled('div')({
  padding: 20,
  margin: '10px 20px',
  boxSizing: 'border-box',
  color: '#212529',
  backgroundColor: '#ffffff',
  '& img': {
    width: 50,
    height: 50,
    marginRight: 20
  }
});

const Agent = styled('div')({
  flexDirection: 'column',
  '& div:first-child': {
    color: '#186fa4',
    fontSize: 20

  },
  '& div:nth-child(2)': {
    color: '#7c7d7d'
  }
});
  
const renderFeedbacks = (isActiveCasePending, feedbacks) => {
  if (isActiveCasePending) {
    return <Loading />;
  } else {
    if (feedbacks !== undefined) {
      if (feedbacks.length !== 0) {
        return feedbacks.map((data, i) =>
          <Feedback key={i} className="col-sm-5">
            <img src={userIcon} className="float-left" />
            <Agent className="row">
              <div>{data.user.forename} {data.user.surname}</div>
              <div>{data.feedback}</div>
            </Agent>
          </Feedback>
        )
      } else if (feedbacks.length === 0) {
        return <p>No Feedbacks Available</p>
      }
    }
  }
}


const FeedbacksSection = ({ isActiveCasePending, feedbacks }) => {
  return <FeedbackSectionContainer>
    <Container>
      <h1>Feedbacks</h1>
      <Row>
        {renderFeedbacks(isActiveCasePending, feedbacks)}
      </Row>
    </Container>
  </FeedbackSectionContainer>
}

export default FeedbacksSection;