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
const getMoreUsersRequest = () => {
    return {
        type: 'GET_MORE_USERS_REQUEST',
    };
};
const getMoreUsersSuccess = (payload) => {
    return {
        type: 'GET_MORE_USERS_SUCCESS',
        payload,
    };
};
const getMoreUsersFailure = (payload) => {
    return {
        type: 'GET_MORE_USERS_FAILURE',
        payload,
    };
};
export default {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
    getMoreUsersRequest,
    getMoreUsersSuccess,
    getMoreUsersFailure
};
