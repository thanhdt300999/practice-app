import { navigate } from '../../../../navigationRef'

const initState = {
    accessToken: '',
    isLoading: false,
    error: '',
    auth: {}
};
const signinReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                isLoading: true
            }
        case 'LOGIN_SUCCESS':
           console.log("reducer")
            return {
                ...state,
                isLoading: false,
                accessToken: payload.access_token
            }
        default:
            return state;
    }

}
export default signinReducer;