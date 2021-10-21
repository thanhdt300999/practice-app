import NavigationService from "../../../../../NavigationService";

const initState = {
    accessToken: '',
    isLoading: false,
    error: '',
    auth: {},
    isLogged: false
};
const signinReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoading: false,
                accessToken: payload.access_token,
                isLogged: true,
                error: '',
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
export default signinReducer;
