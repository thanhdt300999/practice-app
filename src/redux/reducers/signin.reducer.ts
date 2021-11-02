const initState = {
    accessToken: null,
    isLoading: false,
    error: '',
    auth: {},
    isLogged: false,
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
                accessToken: payload.token,
                isLogged: true,
                error: '',
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                isLoading: false,
                accessToken: payload,
                isLogged: true
            };
        case 'REMOVE_TOKEN':
            return {
                ...state,
                isLoading: false,
                accessToken: null,
                isLogged: false
            };
        default:
            return state;
    }
};
export default signinReducer;
