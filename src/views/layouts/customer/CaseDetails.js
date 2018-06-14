import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';

import { Container, Row, Col, Progress } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardText, CardImg, CardImgOverlay } from 'reactstrap';

import breakpoints from '../../../styles/breakpoints';
import { ORANGE } from '../../../assets/constants';


const SubmitCaseContainer = styled('div')({
  margin: '10px 50px 10px 0px'
});

const Center = styled('div')({
  textAlign: 'center',

});

const ModalFooterCustome = styled('div')({
  padding: '1rem',
  borderTop: '1px solid #e9ecef',
})

const BtnSubmit = styled(Button)({
  borderRadius: 0,
  backgroundColor: ORANGE,
  borderColor: ORANGE,
  width: 200,

});

const BtnWizard = styled(Button)({
  borderRadius: 0,
  backgroundColor: ORANGE,
  borderColor: ORANGE,
  width: 120,
  fontFamily: 'Raleway',
  margin: '10px 20px',
});

const ProgressContainer = styled('div')({
  backgroundColor: '#e6e6e6',
  height: '1.6rem',
  padding: 5,
  borderRadius: 40,
  margin: '10px 20px',
});

const ProcessTitle = styled('div')({
  margin: '0px 20px',
  fontFamily: 'Raleway',
  color: '#9b9b9d'
});

const ProgressCustom = styled(Progress)({
  backgroundColor: '#cfcfcf',
  borderRadius: 40,
});

class CaseDetails extends Component {
  state = {
    modal: false,
    progress: 25,
    isDisablePrevBtn: true,
    isDisableNextBtn: false
  };
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return (
      <Modal isOpen={true} toggle={this.toggle} className={this.props.className} size={'lg'}>
        <ModalHeader toggle={this.toggle}>Case Detail</ModalHeader>
        <ModalBody>
              <ProcessTitle>
            <Row>
                <Col sm="3" md={3}>
                  <div className="text-center">Choose Plan </div>
                </Col>
                <Col sm="3" md={3}>
                  <div className="text-center">Add Websites </div>
                </Col>
                <Col sm="3" md={3}>
                  <div className="text-center">Support Case </div>
                </Col>
                <Col sm="3" md={3}>
                  <div className="text-center">Finish</div>
                </Col>
            </Row>
              </ProcessTitle>
            <ProgressContainer>
              <ProgressCustom  value={this.state.progress} >
                <Progress style={{ "backgroundColor": "#146ea3" }}/>
              </ProgressCustom>
            </ProgressContainer>
            { this.displayCurrentStage() }

        </ModalBody>
        <ModalFooterCustome>
          <Row>
            <Col sm="3" md={6} >
              <BtnWizard disabled={this.state.isDisablePrevBtn} onClick={this.prev}> Prev</BtnWizard>{' '}
            </Col>
            <Col sm="3" md={6} style={{ 'textAlign': 'right' }}>
                <BtnWizard disabled={this.state.isDisableNextBtn} onClick={this.next}>Next >></BtnWizard>
            </Col>
          </Row>
        </ModalFooterCustome>
    </Modal>
    
  )}
}
 
export default CaseDetails; 
