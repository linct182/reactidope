import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';


import {
  actionSubmitCase,
  actionWizzardPrev,
  actionWizzardNext,
  actionToggleWizzard,
  getPlanSelected,
  isValidCaseSubmit
  
 } from '../../../actionReducers/Cases';

import { Container, Row, Col, Progress } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import Step1 from './WizardStep1';
import Step2 from './WizardStep2';
import Step3 from './WizardStep3';
import Step4 from './WizardStep4';

import breakpoints from '../../../styles/breakpoints';
import { ORANGE } from '../../../assets/constants';




const Center = styled('div')({
  textAlign: 'center',

});

const StepTitle = styled('div')(({isActive})=>({
  fontWeight: isActive ? 500 : 400,
  color: isActive ? 'black' : '#9b9b9d'
}));

const ModalFooterCustome = styled('div')({
  padding: '1rem',
  borderTop: '1px solid #e9ecef',
})

const BtnSubmit = styled(Button)({
  borderRadius: 0,
  backgroundColor: ORANGE,
  borderColor: ORANGE

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

class SubmitCase extends Component {
  state = {
    modal: false,
    progress: 25,
    isDisablePrevBtn: true,
    isDisableNextBtn: true
  };
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  prev = () => {   
    const btnStatus = (this.props.caseWizzard.progress - 25 === 25) ? 0: 1; //0=disable, 1=enable, 2=finish
    this.props.actionWizzardPrev(this.props.caseWizzard.progress - 25, btnStatus);

  }

  next = () => {
    if (this.props.caseWizzard.progress === 25){
      const { min, max } = this.props.plan
      if (this.props.websites.length >= min && this.props.websites.length <= max){
        //enable next
        const btnStatus = (this.props.caseWizzard.progress + 25 >= 100) ? 2 : 1; //0=disable, 1=enable, 2=finish
        this.props.actionWizzardNext(this.props.caseWizzard.progress + 25, btnStatus);
      }else{
        //disable next
        this.props.actionWizzardNext(this.props.caseWizzard.progress + 25, 0);
      }
    }else{

      const btnStatus = (this.props.caseWizzard.progress + 25 >= 100) ? 2 : 1; //0=disable, 1=enable, 2=finish
      this.props.actionWizzardNext(this.props.caseWizzard.progress + 25, btnStatus);
    }

    // if (this.state.progress + 25 === 125){
    //   this.props.actionSubmitCase(this.props.caseSubmitData);
    // }

  }

  submitCase = () => {
    console.log('file=======> ', this.props.fileUpload);
    this.props.actionSubmitCase(this.props.caseSubmitData, this.props.fileUpload);
    this.setState({
      modal: !this.state.modal
    });
  }

  isBtnFinish = () => {
    const { btnNextStatus } = this.props.caseWizzard
    console.log('isValidCaseSubmit: ', this.props.isValidCaseSubmit);
    if (btnNextStatus == 2){
      return <BtnWizard disabled={ this.props.isValidCaseSubmit ? false : true} onClick={this.submitCase}>Submit</BtnWizard>
    }else{
      return <BtnWizard disabled={btnNextStatus === 0 ? true : false} onClick={this.next}>Next <i className="fas fa-angle-double-right"></i></BtnWizard>
    }
  }
  displayCurrentStage = () =>{
    switch (this.props.caseWizzard.progress) {
      case 25:
        return <Step1 />;
      case 50:
        return <Step2 />;
      case 75:
        return <Step3 />;
      case 100:
        return <Step4 />;
    
      default:
        return <Step1 />;
    }
  }

  render(){
    return (
    <div>
      <BtnSubmit onClick={this.toggle} block>Submit Case</BtnSubmit>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size={'lg'}>
        <ModalHeader toggle={this.toggle}>Submit Case</ModalHeader>
        <ModalBody>
              <ProcessTitle>
            <Row>
                <Col sm="3" md={3}>
                  <StepTitle 
                    className="text-center"
                    isActive={this.props.caseWizzard.progress=== 25? true:false }
                    >
                    Choose Plan </StepTitle>
                </Col>
                <Col sm="3" md={3}>
                  <StepTitle
                    className="text-center"
                    isActive={this.props.caseWizzard.progress === 50 ? true : false}
                    >
                    Add Websites </StepTitle>
                </Col>
                <Col sm="3" md={3}>
                  <StepTitle
                    className="text-center"
                    isActive={this.props.caseWizzard.progress === 75 ? true : false}
                    >
                    Support Case </StepTitle>
                </Col>
                <Col sm="3" md={3}>
                  <StepTitle
                    className="text-center"
                    isActive={this.props.caseWizzard.progress === 100 ? true : false}
                    >
                    Payment</StepTitle>
                </Col>
            </Row>
              </ProcessTitle>
            <ProgressContainer>
              <ProgressCustom value={this.props.caseWizzard.progress} >
                <Progress style={{ "backgroundColor": "#146ea3" }}/>
              </ProgressCustom>
            </ProgressContainer>
            { this.displayCurrentStage() }

        </ModalBody>
        <ModalFooterCustome>
          <Row>
            <Col sm="3" md={6} >
              <BtnWizard disabled={this.props.caseWizzard.btnPrevStatus === 0? true: false} 
                  onClick={this.prev}> 
                  <i className="fas fa-angle-double-left"></i> Prev
              </BtnWizard>{' '}
            </Col>
            <Col sm="3" md={6} style={{ 'textAlign': 'right' }}>
                {this.isBtnFinish() }
            </Col>
          </Row>
        </ModalFooterCustome>
      </Modal>
    </div>
    
  )}
}
 
export default connect(state=>({
  websites: state.cases.caseSubmitData.websites,
  caseSubmitData: state.cases.caseSubmitData,
  caseWizzard: state.cases.caseWizzard,
  plan: getPlanSelected(state),
  isValidCaseSubmit: isValidCaseSubmit(state),
  fileUpload: state.cases.caseFileUpload

}),
  {
    actionSubmitCase,
    actionWizzardPrev,
    actionWizzardNext,
    actionToggleWizzard
  })(SubmitCase); 
