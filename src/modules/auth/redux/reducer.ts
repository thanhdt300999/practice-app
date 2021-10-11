import { navigate} from '../../../navigationRef'

interface initState {
    accessToken?: String,
    isLoading?: boolean,
    error?: String
}

const initState: initState = {
    accessToken: '',
    isLoading: false,
    error: '',
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGIN_SUCCESS':
            console.log("reducer")
            return {
                ...state,
                accessToken: action.payload.access_token,
                isLoading: false,
                error: '',
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: 'Login fail',
            };
        default:
            return state;
    }
}
export default authReducer;