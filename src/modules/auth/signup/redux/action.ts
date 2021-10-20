import { signupContants } from './contants';
export const getCountries = () => {
    return {
        type: signupContants.GET_COUNTRIES_REQUEST,
    };
};

export const getCountriesSucess = (payload) => {
    return {
        type: signupContants.GET_COUNTRIES_SUCCESS,
        payload,
    };
};

export const getCountriesFailure = (payload) => ({
    type: signupContants.GET_COUNTRIES_FAILURE,
    payload,
});

export const getRegionsRequest = (payload) => {
    return {
        type: signupContants.GET_REGIONS_REQUEST,
        payload: payload,
    };
};

export const getRegionsSuccess = (payload) => {
    return {
        type: signupContants.GET_REGIONS_SUCCESS,
        payload,
    };
};

export const getRegionsFailure = (payload) => ({
    type: signupContants.GET_REGIONS_FAILURE,
    payload,
});

export const getCitiesByRegionRequest = (payload) => {
    return {
        type: signupContants.GET_CITIES_BY_REGION_REQUEST,
        payload: payload,
    };
};

export const getCitiesByRegionSuccess = (payload) => {
    return {
        type: signupContants.GET_CITIES_BY_REGION_SUCCESS,
        payload,
    };
};

export const getCitiesByRegionFailure = (payload) => ({
    type: signupContants.GET_CITIES_BY_REGION_FAILURE,
    payload,
});

export const getCitiesByZipcodeRequest = (payload) => {
    return {
        type: signupContants.GET_CITIES_BY_ZIPCODE_REQUEST,
        payload: payload,
    };
};

export const getCitiesByZipcodeSuccess = (payload) => {
    return {
        type: signupContants.GET_CITIES_BY_ZIPCODE_SUCCESS,
        payload,
    };
};

export const getCitiesByZipcodeFailure = (payload) => ({
    type: signupContants.GET_CITIES_BY_ZIPCODE_FAILURE,
    payload,
});
//signup
export const postSignupRequest = (payload) => ({
    type: signupContants.POST_SIGN_UP_REQUEST,
    payload,
});
export const postSignupSuccess = (payload) => ({
    type: signupContants.POST_SIGN_UP_SUCCESS,
    payload,
});
export const postSignupFailure = (payload) => ({
    type: signupContants.POST_SIGN_UP_FAILURE,
    payload,
});

export default {
    getCountries,
    getCountriesSucess,
    getCountriesFailure,
    getRegionsRequest,
    getRegionsFailure,
    getRegionsSuccess,
    getCitiesByRegionRequest,
    getCitiesByRegionSuccess,
    getCitiesByRegionFailure,
    getCitiesByZipcodeRequest,
    getCitiesByZipcodeSuccess,
    getCitiesByZipcodeFailure,
    postSignupRequest,
    postSignupSuccess,
    postSignupFailure,
};
