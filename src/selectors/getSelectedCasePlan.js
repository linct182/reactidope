import { createSelector } from 'reselect'

const casePlans = state => state.cases.casePlan;
const selectedPlanId = state => state.cases.caseSubmitData.plan_id;

const getPlanSelected = createSelector(
  casePlans,
  selectedPlanId,
  (casePlan, id) => casePlan.filter( plan=> plan.id === id)[0]
)

export default getPlanSelected;
