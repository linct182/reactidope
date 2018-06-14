// import { isAllowed, isServer } from './utils'

export default {
  onBeforeChange: (dispatch, getState, action) => {
    // console.log('action: ', action.type);
    // const allowed = isAllowed(action.type, getState())
    // const token = localStorage.getItem(ACCESS_TOKEN);
    // console.log("token: ", Date.parse(new Date) > token);

    // if (!allowed) {
    //   const action = redirect({ type: 'LOGIN' })
    //   dispatch(action)
    // }
  }
  // onAfterChange: (dispatch, getState) => {
  //   const { type } = getState().location

  //   if (type === 'LOGIN' && !isServer) {
  //     setTimeout(() => {
  //       alert(alertMessage)
  //     }, 1500)
  //   }
  // }
}
