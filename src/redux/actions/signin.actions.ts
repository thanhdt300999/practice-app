const actionLogin = (payload) => {
    return {
        type: 'HANDLE_LOGIN',
        payload,
    };
};

const loginSuccess = (payload) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload,
    };
};

const loginFailure = (payload) => ({
    type: 'LOGIN_FAILURE',
    payload,
});

export default {
    actionLogin,
    loginSuccess,
    loginFailure,
};
