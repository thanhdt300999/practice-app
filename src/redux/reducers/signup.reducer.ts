interface dataPostLogin {
    gender: number;
    birthday: string;
    origin: number;
    country: object;
    zipcode?: number;
    region?: number;
    city: number;
    geolocation?: object;
}
interface initState {
    isLoading: boolean;
    dataPostLogin: dataPostLogin;
    error: string;
    listCountries: object[];
    listRegions: object[];
    listCities: object[];
}
const initState: initState = {
    isLoading: false,
    dataPostLogin: {
        gender: null,
        origin: null,
        birthday: '',
        city: null,
        country: {
            id: '',
            name: '',
            zipRegex: '',
            zipFormat: '',
        },
    },
    error: '',
    listCountries: [],
    listRegions: [],
    listCities: [],
};
const signupReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'GET_COUNTRIES_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
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
        case 'GET_REGIONS_REQUEST':
            return {
                ...state,
                isLoading: true,
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
        case 'GET_CITIES_BY_REGION_REQUEST':
            return {
                ...state,
                isLoading: true,
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
        case 'GET_CITIES_BY_ZIPCODE_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_CITIES_BY_ZIPCODE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listCities: payload,
            };
        case 'GET_CITIES_BY_ZIPCODE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'POST_SIGN_UP_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'POST_SIGN_UP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                uuid: payload,
            };
        case 'POST_SIGN_UP_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'GET_CITIES_BY_GEO_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_CITIES_BY_GEO_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listCities: payload,
            };
        case 'GET_CITIES_BY_GEO_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'SET_ENTITY':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    gender: payload === 'male' ? 1 : 2,
                },
            };
        case 'SET_BIRTHDAY':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    birthday: payload,
                },
            };
        case 'SET_ORIGIN':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    origin: payload,
                },
            };
        case 'SET_COUNTRY':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    country: payload,
                },
            };
        case 'SET_ZIPCODE':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    zipcode: payload,
                },
            };
        case 'SET_CITY':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    city: payload,
                },
            };
        case 'SET_REGION':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    region: payload,
                },
            };
        case 'SET_GEOLOCATION':
            return {
                ...state,
                dataPostLogin: {
                    ...state.dataPostLogin,
                    geolocation: payload,
                },
            };
        case 'GO_BACK':
            return {
                ...state,
                error: '',
            };

        default:
            return state;
    }
};
export default signupReducer;
