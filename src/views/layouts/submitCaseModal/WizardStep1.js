import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { actionSetPlanId, actionFetchCasesPlans } from '../../../actionReducers/Cases';

import { Row, Col } from 'reactstrap';
import { Card, CardText, CardImgOverlay } from 'reactstrap';

import Loading from '../../component/Loading';
import box1 from '../../../assets/img/plan_box1.jpg';


const Center = styled('div')({
  textAlign: 'center',
});

const Cards = styled(Card)(({ img, selected})=>({
  width: '100%',
  height: '200px',
  cursor: 'pointer',
  background: selected ? `linear-gradient(rgba(10, 157, 202, 0.35), rgba(0, 149, 255, 0.26)), url(${img})` : `url(${img})`,
  // background: `linear-gradient(rgba(10, 157, 202, 0.35), rgba(0, 149, 255, 0.26)), url(${img})` ,
  border: selected? 'solid 3px #0e8dd8': 'none'
}));

const CardTitle = styled('div')({
  fontSize: 65,
});

class WizzardStep1 extends Component {
  state = {
    selectedId: null
  };
  componentWillMount() {
    // console.log('componentWillMount plans: ', this.props.casePlanData);
    // console.log('state: ', this.state);
    this.setState({selectedId: this.props.caseSubmitData.plan_id});

    this.props.actionFetchCasesPlans();
  }

  componentDidMount() {
    // console.log('plans: ', this.props.casePlanData);
  }


  onSelectPlan = (id) =>{ 
    this.setState({ selectedId: id }); //set local selected id
    this.props.actionSetPlanId(id);//set reducers plan id
    // console.log('selected id: ', this.state.selectedId);
  }

  isSelected = (id) =>{
    // console.log((this.state.selectedId === id) ? true : false);
    return (this.state.selectedId === id)? true : false
  }

  renderCasePlan = () => {
    if (this.props.isCasePlanFetching){
      return <Loading/>
    }else{
      if (this.props.casePlanData.length !== 0) {
        return this.props.casePlanData.map(plan => {
          return (<Col sm="4" md={3} style={{ 'margin': '30px 20px' }} key={plan.id}>
            <Cards inverse img={box1}
              selected={this.isSelected(plan.id)}
              onClick={() => { this.onSelectPlan(plan.id) }}
            >
              {/* <CardImg width="100%" src={box1} alt="Card image cap" /> */}
              <CardImgOverlay>
                <Center>
                  <CardTitle>${plan.amount}</CardTitle>
                  <CardText>{plan.description}</CardText>
                </Center>
              </CardImgOverlay>
            </Cards>
          </Col>);
        });
      } else {
        return <div>No plans vailable</div>
      }

    }
  }


  render(){
    return (
      <Row>
          { this.renderCasePlan() }
      </Row>    
  )}
}
 
export default connect(state =>({
  casePlanData: state.cases.casePlan,
  caseSubmitData: state.cases.caseSubmitData,
  isCasePlanFetching: state.cases.isCasePlanFetching
}),
{ 
  actionSetPlanId,
  actionFetchCasesPlans
})(WizzardStep1); 
