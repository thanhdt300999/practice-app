const initState = {
    isLoading: false,
    error: '',
    listUsers: [],
    isLoadingGetUsers: false
};
const homeReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'GET_USERS_REQUEST':
            return {
                ...state,
                isLoadingGetUsers: true,
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                isLoadingGetUsers: false,
                listUsers: payload.listUsers,
            };
        case 'GET_USERS_FAILURE':
            return {
                ...state,
                isLoadingGetUsers: false,
                error: payload,
            };
        case 'GET_MORE_USERS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                listUsers: [...state.listUsers, ...payload.listUsers],
            };
        case 'GET_MORE_USERS_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_MORE_USERS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case 'REMOVE_TOKEN':
            return {
                ...state,
                listUsers: [],
                isLoading: false
            };
        default:
            return state;
    }
};
export default homeReducer;
