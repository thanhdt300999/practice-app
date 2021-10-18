import { navigate } from '../../../navigationRef';
import action from './action';

const initState = {
    isLoading: false,
    error: '',
    listCountries: [],
};
const signupReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'GET_COUNTRIES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listCountries: payload,
            };
        case 'GET_COUNTRIES_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'GET_REGIONS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listRegions: payload,
            };
        case 'GET_REGIONS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'GET_CITIES_BY_REGION_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listCities: payload,
            };
        case 'GET_CITIES_BY_REGION_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
export default signupReducer;
