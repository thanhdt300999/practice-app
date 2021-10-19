import { navigate } from '../../../navigationRef'


const initState = {
    accessToken: '',
    isLoading: false,
    error: '',
};
const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                isLoading: true
            }
        case 'LOGIN_SUCCESS':
            navigate("Home");
            return {
                ...state,
                isLoading: false,
                accessToken: payload.access_token
            }
        default:
            return state;
    }

}
export default authReducer;