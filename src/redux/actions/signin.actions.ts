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

const setToken = (payload) => ({
    type: 'SET_TOKEN',
    payload,
});
const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export default {
    actionLogin,
    loginSuccess,
    loginFailure,
    setToken,
    removeToken
};
