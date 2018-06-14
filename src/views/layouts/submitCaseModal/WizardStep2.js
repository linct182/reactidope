import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { Table, Row, Col } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';

import { 
  actionSetWebsites, 
  actionDeleteWebsite,
  actionWizzardNext,
  actionWizzardToggleWebisteInput, 
  getPlanSelected, 
  getIsDisabledWebsiteInput,
  getPlanChange
} from '../../../actionReducers/Cases';

import iconRemove from '../../../assets/icons/remove.svg';
import icon_add from '../../../assets/icons/innerPage_icn_add.svg';

const BtnAddWebsites = styled('div')({
  padding: 5,
  margin: 25
})

const InputGroupAddonCustom = styled('div')({
  border: '1px solid #cfcfcf',
  backgroundColor: '#ffff',
  fontSize: 12,
  margin: '10px 0px 0px 0px',
  padding: '10px'
});
const IconAdd = styled('img')({
  width: 20,
  cursor: 'pointer'
});
const InputCustom = styled(Input)({
  borderTop: '1px solid #cfcfcf',
  borderRight: '1px solid #cfcfcf',
  borderBottom: '1px solid #cfcfcf',
  borderLeft: `1px solid #ffff`,
  backgroundColor: '#ffff',
  borderRadius: 0,
  fontSize: 12,
  width: '80%',
  margin: '10px 0px 10px 0px',
  padding: '10px',
  fontFamily: 'Raleway'
}); 

const TableContainer = styled('div')({
  margin: '0px 30px',
  backgroundColor: '#ffff',
  textAlign: 'left'
}); 

const TH = styled('th')({
  backgroundColor: '#186fa4',
  fontFamily: 'Raleway',
  fontWeight: 400,
  fontSize: 16,
  // textAlign: 'left',
  color: '#ffff',
  paddingLeft: 20
});

const IconContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  cursor: 'pointer'
});
const BtnFileRemove = styled('img')({
  textAlign: 'center',
  height: 35
});



class WizardStep2 extends Component {
  state = {
    inputWebsite: '',
    websites: [],
    isDisableInput: false
  };

  websiteLimitPlaceholder = () => {
    return (this.props.plan.min === this.props.plan.max) 
    ? `add ${this.props.plan.max} website` : 
     `add ${this.props.plan.min}-${this.props.plan.max} websites` 
  }

  removeWebsite = url => {
    this.props.actionDeleteWebsite(url);
  }

  _setProps(e){
    let inputValue = this.state.inputWebsite;

    //check if empty
    if (inputValue === ''){
      return false;
    }
    // console.log('indexof: ', this.state.websites.findIndex(website => website.url === inputValue));
    // check if duplicate input
    if (this.state.websites.findIndex(website => website.url === inputValue) !== -1){
      return false;
    }
    
    // TODO: optimize this
    this.setState({ 
      websites: [
        ...this.state.websites,
        { url: inputValue }
      ] 
    }, () => {


      // if (this.state.websites.indexOf(inputValue) > -1) {
      //   console.log('true: ', inputValue);
      // }

      if (this.props.caseWizzard.progress === 50) {
        const { min, max } = this.props.plan
        if (this.props.websites.length >= min && this.props.websites.length <= max) {
          //enable next
          const btnStatus = (this.props.caseWizzard.progress + 25 >= 100) ? 2 : 1; //0=disable, 1=enable, 2=finish
          this.props.actionWizzardNext(this.props.caseWizzard.progress, btnStatus);
        } else {
          //disable next
          this.props.actionWizzardNext(this.props.caseWizzard.progress, 0);
        }
      }
    });

    this.props.actionSetWebsites(inputValue);
    this.setState({
      inputWebsite: ''
    })
  }

  _onClick = (e) =>{
    this._setProps(e);
    //TODO: fix bug, no value in onCLick
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._setProps(e);
    }
  }
  
  _isEmpty = () =>{
    // console.log((this.props.websites.length === 0) ? true : false);
    return (this.props.websites.length === 0)? true : false;
  }

  render(){
    const TableRow = this.props.websites.map((website, i) =>
      <tr key={i}>
        <td>
          <IconContainer>
            { website.url }
            <BtnFileRemove src={iconRemove} onClick={(e) => { e.stopPropagation(); this.removeWebsite(website.url) }}></BtnFileRemove>
          </IconContainer>

        </td>
      </tr>
    )

    return (
      <Fragment>
        <Row>
          <Col sm="12" md={12} className="text-center">
            <BtnAddWebsites>
              <InputGroup>
                <InputGroupAddonCustom addonType="prepend">
                  <IconAdd src={icon_add} onClick={this._onClick} />
                </InputGroupAddonCustom>
                <InputCustom 
                  id='website'
                  autoFocus
                  value={this.state.inputWebsite}
                  onChange={(e) => this.setState({ inputWebsite: e.target.value })}
                  placeholder={ this.websiteLimitPlaceholder() } 
                  onKeyPress={this._handleKeyPress} 
                  disabled={this.props.isDisableInput}
                  />
                {/* <Tooltip placement="top" isOpen={true} target="website" >
                  Tooltip Content!
                </Tooltip> */}
              </InputGroup>
            </BtnAddWebsites>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={12} className="text-center">
            <TableContainer id="TableContainer" isEmpty={this._isEmpty()}>
              <Table responsive={true} bordered={true} striped>
                <thead>
                  <tr>
                    <TH carret>List of Website</TH>
                  </tr>
                </thead>
                <tbody>
                  {TableRow}
                </tbody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Fragment>
  )}
}
 
export default connect(state => ({
  websites: state.cases.caseSubmitData.websites,
  plan: getPlanSelected(state),
  isDisableInput: getIsDisabledWebsiteInput(state),
  getPlanChange: getPlanChange(state),
  caseWizzard: state.cases.caseWizzard

}),
{
  actionSetWebsites,
  actionDeleteWebsite,
  actionWizzardNext,
  actionWizzardToggleWebisteInput
}
)(WizardStep2); 
