import { authContants } from "./contants";
export const actionLogin = (payload) => {
  return {
    type: authContants.HANDLE_LOGIN,
    payload,
  }
}

export const loginSuccess = (payload) => {
  return {
    type: authContants.LOGIN_SUCCESS,
    payload,
  }
}

export const loginFailure = payload => ({
  type: authContants.LOGIN_FAILURE,
  payload,
});

export default {
  actionLogin,
  loginSuccess,
  loginFailure,
};