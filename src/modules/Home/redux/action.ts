import { homeContants } from './contant';
export const getUsersRequest = () => {
    console.log("action")
    return {
        type: homeContants.GET_USERS_REQUEST,
    };
};

export const getUsersSuccess = (payload) => {
    return {
        type: homeContants.GET_USERS_SUCCESS,
        payload,
    };
};

export const getUsersFailure = (payload) => {
    return {
        type: homeContants.GET_USERS_FAILURE, 
        payload,
    };
};

export default {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
};
