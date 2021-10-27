
const getUsersRequest = () => {
    return {
        type: 'GET_USERS_REQUEST',
    };
};

const getUsersSuccess = (payload) => {
    return {
        type: 'GET_USERS_SUCCESS',
        payload,
    };
};

const getUsersFailure = (payload) => {
    return {
        type: 'GET_USERS_FAILURE', 
        payload,
    };
};

export default {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
};
