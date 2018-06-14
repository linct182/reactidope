import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'react-emotion';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row, Col,
  Card, CardText, CardImgOverlay
}
from 'reactstrap';

import box1 from '../../../../assets/img/plan_box1.jpg';
import Loading from '../../../component/Loading';
import iconRemove from '../../../../assets/icons/remove.svg';

import { actionFetchCasesPlans } from '../../../../actionReducers/Cases';
import { 
  actionSetPlanID, 
  actionCreatePlan, 
  actionUpdatePlan, 
  actionDeletePlan, 
  getPlanSelected 
} from '../../../../actionReducers/Admin';

import ConfirmDialog from '../../../component/ConfirmDialog';

// import breakpoints from '../../../styles/breakpoints';

// import dpr_logo from '../../../assets/icons/dpr_logo.svg';
// import icon_profile from '../../../assets/icons/innerPage_icn_myprofile.svg';
// import icon_setting from '../../../assets/icons/innerPage_icn_settings.svg';
// import icon_logout from '../../../assets/icons/innerPage_icn_logout.svg';

const PricingPlanContainer = styled('div')({
  color: '#000',
  display: 'flex'
});

const Title = styled('h4')({
  // color: '#000',
  fontWeight: 300
});

const CustomeForm = styled(Form)({
  margin: 20,
  padding: 20,
  flexGrow: 1,
  backgroundColor: '#ffffff'

});

const CustomeInput = styled(Input)({
  fontSize: 12
});

const PricePlanList = styled('div')({
  margin: 20,
  padding: 20,
  flexGrow: 5,
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column'
});
const PlanContainer = styled('div')({
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 300px)'
});

const Center = styled('div')({
  textAlign: 'center',
});

const RemovePlan = styled('img')(({
  isVisible
})=>({
    width: 30,
    top: 0,
    right: 0,
    float: 'right',
    margin: 10,
    position: 'absolute',
    color: 'gray',
    display: isVisible? 'inline': 'none',
    ':hover': {
      backgroundColor: '#ff2c0f6e',
      borderRadius: '50'
    }
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

const Cards = styled(Card)(({
  img,
  selected,
  hovered
}) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  cursor: 'pointer',
  background: selected ? `linear-gradient(rgba(10, 157, 202, 0.35), rgba(0, 149, 255, 0.26)), url(${img})` : `url(${img})`,
  // background: `linear-gradient(rgba(10, 157, 202, 0.35), rgba(0, 149, 255, 0.26)), url(${img})` ,
  border: selected ? 'solid 3px #0e8dd8' : 'none'
}));

const CardTitle = styled('div')({
  fontSize: 60,
});

class AdminPricingPlan extends Component {
  state = {
    planData: {
      title: '',
      description: '',
      amount: '',
      min: '',
      max: ''
    },
    selectedId: null,
    hoverId: null,
    confirmDialog: {
      isOpenDialog: false,
      dialogTitle: '',
      planTitle: '',
      dialogMsg: '',
      confirmId: 0,
    },
  }

  resetPlanData = () => {
    return this.setState({
      planData: {
        title: '',
        description: '',
        amount: '',
        min: '',
        max: '',
      },
      selectedId: null
    })
  }

  componentWillMount(){
    this.props.actionFetchCasesPlans();
  }
  onSelectPlan = (id) => {
    this.props.actionSetPlanID(id); //set reducers plan id
    this.setState({
      selectedId: id
    },()=>{

      const newPlanData = this.props.getPlanSelected
      if(this.state.selectedId === id){
        this.setState({
          planData: {
            ...this.state.planData, 
            ...newPlanData
          }
        });
        console.log('selected id: ', newPlanData);
      }
    });
  }
  onHoverPlan = (id) => {
    this.setState({
      hoverId: id
    }); //set local selected id
  }
  onUnhoverPlan = (id) => {
    this.setState({
      hoverId: null
    }, () => {
      // console.log('onUnhoverPlan: ', this.state.hoverId)

    }); //set local selected id
    // this.props.actionSetPlanId(id); //set reducers plan id
    // console.log('selected id: ', this.state.selectedId);
  }

  isSelected = (id) => {
    // console.log('id: ', id);
    // console.log((this.state.selectedId === id) ? true : false);
    return (this.state.selectedId === id) ? true : false
  }
  isHovered = (id) => {
    //TODO: debug why mutiple calls
    // console.log((this.state.hoverId === id) ? true : false);
    return (this.state.hoverId === id) ? true : false
  }
  renderModeTitle = () => {
    return (this.state.selectedId !== null) ? "Edit Price Plan" : "Create Price Plan"
  }

  renderButtons = () => {
    return (
      <ButtonContainer>
         <Button onClick={ this.onSubmitPlan }> 
            {(this.state.selectedId !== null) ? 'Update' : 'Save' }
         </Button>
        {
          (this.state.selectedId !== null) ? 
            <Button onClick={() => this.resetPlanData() }> Back To Create </Button> : null
        }
      </ButtonContainer>
    )
  } 


  onSubmitPlan = () => {
    console.log('Submit PlanDate: ', this.state.planData);

    // TODO: input validation
    if(this.state.selectedId !== null){
      this.props.actionUpdatePlan(this.state.planData)
    }else{
      this.props.actionCreatePlan(this.state.planData)
    }
    this.resetPlanData();
    console.log('Reset PlanDate: ', this.state.planData);
  }

  onDeletePlan = (plan) => {
    console.log('delete: ', plan);
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        isOpenDialog: true,
        dialogTitle: 'Delete Pricing Plan',
        planTitle: plan.title,
        confirmId: plan.id,
        dialogMsg: `Are you sure you want to delete plan title`,
      }
    })
  }

  onConfirmDeletePlan = () => {
    this.props.actionDeletePlan(this.state.confirmDialog.confirmId);
    this.resetPlanData();
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        isOpenDialog: false
      }
    });
  }

  toggleDialog = () => {
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        isOpenDialog: !this.state.confirmDialog.isOpenDialog
        }
    });
  }

  renderCasePlan = () => {
    if (this.props.isCasePlanFetching || 
      this.props.isCasePlanFetching ||
      this.props.isCreatePlanPending ||
      this.props.isDeletePlanPending ||
      this.props.isUpdatePlanPending){
      return <Loading/>
    }else{
      if (this.props.casePlanData.length !== 0) {
        return this.props.casePlanData.map(plan => {
          return (<Fragment key={plan.id}> 
          <Col sm="4" md="5" style={{ 'margin': '15px' }} key={plan.id}>
            <Cards inverse img={box1}
              selected={this.isSelected(plan.id)}
              onMouseEnter = { () => this.onHoverPlan(plan.id) }
              onMouseLeave = { () => this.onUnhoverPlan(plan.id)}
            >
              {/* <CardImg width="100%" src={box1} alt="Card image cap" /> */}
              <RemovePlan   
                src={iconRemove}
                style={{ zIndex: '99'}}
                isVisible={this.isHovered(plan.id)}
                onClick={() => this.onDeletePlan(plan) }
                />
                <CardImgOverlay onClick = {() => this.onSelectPlan(plan.id)}>
                <Center>
                  <CardTitle>${plan.amount}</CardTitle>
                  <CardText>{plan.title}</CardText>
                  <CardText>{plan.description}</CardText>
                </Center>
              </CardImgOverlay>
            </Cards>
          </Col>
          </Fragment>);
        });
      } else {
        return <div>No plans vailable</div>
      }

    }
  }


  render() {
    return (
      <PricingPlanContainer>
        <ConfirmDialog
          isOpenDialog={this.state.confirmDialog.isOpenDialog}
          dialogTitle={this.state.confirmDialog.dialogTitle}
          planTitle={this.state.confirmDialog.planTitle}
          dialogMsg={this.state.confirmDialog.dialogMsg}
          toggleDialog={this.toggleDialog}
          onConfirmDialog={this.onConfirmDeletePlan}
        />
        <CustomeForm>
          <Title>{ this.renderModeTitle() }</Title>
          <FormGroup>
            <div>Title</div>
            <CustomeInput type = "title" name = "title" id = "title" 
              placeholder = "Input Title"
              value={this.state.planData.title}
              onChange = {
                (e) => this.setState({
                  ...this.state,
                  planData: {
                    ...this.state.planData,
                    title: e.target.value
                  }
                })
              }/>
          </FormGroup>
          
          <FormGroup>
            <div>Amount</div>
            <CustomeInput type="number" name="amount" id="amount" 
              placeholder="Input Amount" 
              value={this.state.planData.amount}
              onChange = {
                (e) => this.setState({
                  ...this.state,
                  planData: {
                    ...this.state.planData,
                    amount: e.target.value
                  }
                })
              } />
          </FormGroup>

          <FormGroup>
            <div>Min Number of Websites</div>
            <CustomeInput type="number" name="minWebsites" id="minWebsites" 
              placeholder="Input min Websites"
              value={this.state.planData.min}
              onChange = {
                (e) => this.setState({
                  ...this.state,
                  planData: { 
                    ...this.state.planData,
                    min: e.target.value
                  }
                })
              } />
          </FormGroup>
          
          <FormGroup>
            <div>Max Number of Websites</div>
            <CustomeInput type="number" name="maxWebsites" id="maxWebsites" 
              placeholder="Input max Websites" 
              value={this.state.planData.max}
              onChange = {
                (e) => this.setState({
                  ...this.state,
                  planData: { 
                    ...this.state.planData,
                    max: e.target.value
                  }
                })
              } />
          </FormGroup>

          <FormGroup>
            <div>Description</div>
            <CustomeInput type="text" name="description" id="description" 
              placeholder="Description"
              value={this.state.planData.description}
              onChange = {
                (e) => this.setState({
                  ...this.state,
                  planData: { 
                    ...this.state.planData,
                    description: e.target.value
                  }
                })
              } />

          </FormGroup>
          
          { this.renderButtons() }
        </CustomeForm>
        <PricePlanList>
          <Title>Price Plan List</Title>     
          <PlanContainer className="row">     
            {
              this.renderCasePlan()
            }
          </PlanContainer >
        </PricePlanList>
      </PricingPlanContainer>
    );
  }
}


export default connect(state => ({
  user: state.auth.userName,
  casePlanData: state.cases.casePlan,
  getPlanSelected: getPlanSelected(state),
  isCasePlanFetching: state.cases.isCasePlanFetching,
  isCreatePlanPending: state.admin.pricingPlan.isCreatePlanPending,
  isDeletePlanPending: state.admin.pricingPlan.isDeletePlanPending,
  isUpdatePlanPending: state.admin.pricingPlan.isUpdatePlanPending

}),{
  actionFetchCasesPlans,
  actionSetPlanID,
  actionCreatePlan,
  actionUpdatePlan,
  actionDeletePlan
})(AdminPricingPlan);