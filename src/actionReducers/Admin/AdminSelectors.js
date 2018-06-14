import { createSelector } from 'reselect'

const getCasePlans = state => state.cases.casePlan;
const getSelectedPlanId = state => state.admin.pricingPlan.selectedPlanId;

// this will get the selected plan objects
export const getPlanSelected = createSelector(
  getCasePlans,
  getSelectedPlanId,
  (casePlan, id) => casePlan.filter(plan => plan.id === id)[0]
)

