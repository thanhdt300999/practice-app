import { navigate } from '../../../navigationRef'


const initState = {
    isLoading: false,
    error: '',
    listCountries: []
};
const signupReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'GET_COUNTRIES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listCountries: payload
            }
        case 'GET_COUNTRIES_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }

}
export default signupReducer;