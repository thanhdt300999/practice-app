const getCountries = () => {
    return {
        type: 'GET_COUNTRIES_REQUEST',
    };
};

const getCountriesSucess = (payload) => {
    return {
        type: 'GET_COUNTRIES_SUCCESS',
        payload,
    };
};

const getCountriesFailure = (payload) => ({
    type: 'GET_COUNTRIES_FAILURE',
    payload,
});

const getRegionsRequest = (payload) => {
    return {
        type: 'GET_REGIONS_REQUEST',
        payload: payload,
    };
};

const getRegionsSuccess = (payload) => {
    return {
        type: 'GET_REGIONS_SUCCESS',
        payload,
    };
};

const getRegionsFailure = (payload) => ({
    type: 'GET_REGIONS_FAILURE',
    payload,
});


//region
const getCitiesByRegionRequest = (payload) => {
    return {
        type: 'GET_CITIES_BY_REGION_REQUEST',
        payload: payload,
    };
};
const getCitiesByRegionSuccess = (payload) => {
    return {
        type: 'GET_CITIES_BY_REGION_SUCCESS',
        payload,
    };
};
const getCitiesByRegionFailure = (payload) => ({
    type: 'GET_CITIES_BY_REGION_FAILURE',
    payload,
});

//zipcode
const getCitiesByZipcodeRequest = (payload) => {
    return {
        type: 'GET_CITIES_BY_ZIPCODE_REQUEST',
        payload: payload,
    };
};
const getCitiesByZipcodeSuccess = (payload) => ({
    type: 'GET_CITIES_BY_ZIPCODE_SUCCESS',
    payload,
});
const getCitiesByZipcodeFailure = (payload) => ({
    type: 'GET_CITIES_BY_ZIPCODE_FAILURE',
    payload,
});

//geo
const getCitiesByGeoRequest = (payload) => ({
    type: 'GET_CITIES_BY_GEO_REQUEST',
    payload,
});
const getCitiesByGeoSuccess = (payload) => ({
    type: 'GET_CITIES_BY_GEO_SUCCESS',
    payload,
});
const getCitiesByGeoFailure = (payload) => ({
    type: 'GET_CITIES_BY_GEO_FAILURE',
    payload,
});

//signup
const postSignupRequest = (payload) => ({
    type: 'POST_SIGN_UP_REQUEST',
    payload,
});
const postSignupSuccess = (payload) => ({
    type: 'POST_SIGN_UP_SUCCESS',
    payload,
});
const postSignupFailure = (payload) => ({
    type: 'POST_SIGN_UP_FAILURE',
    payload,
});

const setEntity = (payload) => ({
    type: 'SET_ENTITY',
    payload: payload,
});

const setBirthday = (payload) => ({
    type: 'SET_BIRTHDAY',
    payload: payload,
});
const setOrigin = (payload) => ({
    type: 'SET_ORIGIN',
    payload: payload,
});
const setCountry = (payload) => ({
    type: 'SET_COUNTRY',
    payload: payload,
});
const setZipcode = (payload) => ({
    type: 'SET_ZIPCODE',
    payload: payload,
});
const setRegion = (payload) => ({
    type: 'SET_REGION',
    payload: payload,
});
const setCity = (payload) => ({
    type: 'SET_CITY',
    payload: payload,
});
const setGeoLocation = (payload) => ({
    type: 'SET_GEOLOCATION',
    payload: payload,
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
    getCitiesByGeoRequest,
    getCitiesByGeoSuccess,
    getCitiesByGeoFailure,
    postSignupRequest,
    postSignupSuccess,
    postSignupFailure,
    setEntity,
    setBirthday,
    setOrigin,
    setCountry,
    setZipcode,
    setRegion,
    setCity,
    setGeoLocation,

};
