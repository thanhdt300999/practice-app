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
    console.log("action", payload)
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

export default {
    getCountries,
    getCountriesSucess,
    getCountriesFailure,
    getRegionsRequest,
    getRegionsFailure,
    getRegionsSuccess,
    getCitiesByRegionRequest,
    getCitiesByRegionSuccess,
    getCitiesByRegionFailure
};
