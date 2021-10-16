import { call, put, select } from 'redux-saga/effects';
import authService from './service'
import AsyncStorage from '@react-native-community/async-storage';
import actions from './actions';

function* saveTokenToStore(data) {
    yield AsyncStorage.multiSet(
        [['AccessToken', data.access_token], ['puk', data.puk], ['user', data.user]],
        err => {
            console.log('ERROR saveTokenToStore: ', err);
        },
    );
}

function* postLoginAction(data, email) {
    try {
        let response = yield call(authService.login, data, email); // Gọi API Login ở đây.
        // yield call(saveTokenToStore, response); // Nếu API gọi thành công. Save access_token và Store
        yield put(actions.loginSuccess(response)); // Gọi action LOGIN_SUCCESS
    } catch (err) {
        yield put({ type: 'LOGIN_FAILURE', err }); // Nếu lỗi gọi action LOGIN_FAILURE
    }
}

export default function* (action) {
    yield call(postLoginAction, action.payload.data, action.payload.email);
}