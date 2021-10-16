import { signupContants } from "./contants";
export const getCountries = () => {
  return {
    type: signupContants.GET_COUNTRIES_REQUEST,
  }
}

export const getCountriesSucess = (payload) => {
  return {
    type: signupContants.GET_COUNTRIES_SUCCESS,
    payload,
  }
}

export const getCountriesFailure = payload => ({
  type: signupContants.GET_COUNTRIES_FAILURE,
  payload,
});

export default {
  getCountries,
  getCountriesSucess,
  getCountriesFailure,
};