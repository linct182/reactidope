import { createSelector } from 'reselect'

const getCasePlans = state => state.cases.casePlan;
const getSelectedPlanId = state => state.cases.caseSubmitData.plan_id;
const getWebsites = state => state.cases.caseSubmitData.websites;
const getPaymentNonce = state => state.cases.caseSubmitData.nonce;
const getPaymentType = state => state.cases.caseSubmitData.type;

// this will get the selected plan objects
export const getPlanSelected = createSelector(
  getCasePlans,
  getSelectedPlanId,
  (casePlan, id) => casePlan.filter(plan => plan.id === id)[0]
)

// this is for wizzard step 2, validate if the input exceeds the maximun limit
export const getIsDisabledWebsiteInput = createSelector(
  getWebsites,
  getPlanSelected,
  (websites, plan) => websites.length === plan.max? true:false
)

// this is for wizzard step 2, validate if the input exceeds the maximun limit when the user change the plan
// Todo: use this to re-map websites everytime the user changes the plan
export const getPlanChange = createSelector(
  getWebsites,
  getPlanSelected,
  (websites, plan) => websites.length > plan.max ? websites.splice(plan.max) : websites
)

// this is to validate whether ths submit form field is complete before the buttons enables
export const isValidCaseSubmit = createSelector(
  getSelectedPlanId,
  getWebsites,
  getPaymentNonce,
  getPaymentType,
  (plan, websites, nonce, type) => {
    if(plan !== null && websites.length !== 0 &&  nonce !== null && type !== null){
      return true;
    }else{
      return false;
    }
  }
)

