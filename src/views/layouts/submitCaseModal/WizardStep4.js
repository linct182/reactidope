import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';


import { Container, Row, Col } from 'reactstrap';

import { 
  actionSetNonce, 
  actionSubmitCase, 
  actionSetPaymentType,
  getPlanSelected 
} from '../../../actionReducers/Cases';

import Braintree from '../../component/BraintreeDropin';

const SubContainer = styled('div')({
  margin: '20px 10px'
});

const PaymentGatewayContainer = styled('div')({
  border: 'dashed 1px #cfcfcf',
  width: '100%',
  height: 400,
  overflowY: 'auto',
  padding: 20
});

class WizardStep4 extends Component {
  state = {};

  componentWillMount(){
    console.log('plan: ',this.props);
  }

  onSubmit = async (e) => {
    console.log('Ok', e);
    await this.props.actionSetNonce(e.nonce);
    await this.props.actionSetPaymentType(e.type);
    // await this.props.actionSubmitCase(this.props.caseSubmitData);

  }

  onNotShifted = (e) => {
    console.log('Not shifted', e);
    this.props.actionSetNonce(e.nonce);
    this.props.actionSetPaymentType(e.type);


  }

  render() {
    return (
      <Container>
        <SubContainer>
          <Row>
            <Col sm="12" md={12}>
              <PaymentGatewayContainer className="text-center">
                <Braintree 
                  amount={this.props.plan.amount || 5}
                  onSubmit={this.onSubmit}
                  onNotShifted={this.onNotShifted}
                />
              </PaymentGatewayContainer>
            </Col>
          </Row>
        </SubContainer>
      </Container>

    )
  }
}

export default connect(state => ({
  nonce: state.cases.nonce,
  plan: getPlanSelected(state)
}),
  {
    actionSetNonce,
    actionSubmitCase,
    actionSetPaymentType
  }
)(WizardStep4); 
