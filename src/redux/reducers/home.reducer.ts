const initState = {
    isLoading: false,
    error: '',
    listUsers: [],
};
const homeReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'GET_USERS_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listUsers: payload.listUsers,
            };
        case 'GET_USERS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
export default homeReducer;
