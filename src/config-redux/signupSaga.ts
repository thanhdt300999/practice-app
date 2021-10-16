import { call, put, select } from 'redux-saga/effects';
import authService from '../modules/auth/redux/service'
import AsyncStorage from '@react-native-community/async-storage';

function* saveTokenToStore(data) {
    yield AsyncStorage.multiSet(
        [['AccessToken', data.token], ['puk', data.puk], ['user', data.user]],
        err => {
            console.log('ERROR saveTokenToStore: ', err);
        },
    );
}

function* postLoginAction(data, email) {

    try {
        let response = yield call(authService.login, data, email); // Gọi API Login ở đây.
        yield call(saveTokenToStore, response.data); // Nếu API gọi thành công. Save access_token và Store
        yield put({ type: 'LOGIN_SUCCESS', payload: response.data }); // Gọi action LOGIN_SUCCESS
    } catch (err) {
        yield put({ type: 'LOGIN_FAILURE', err }); // Nếu lỗi gọi action LOGIN_FAILURE
    }
}

export default function* (action) {
    yield call(postLoginAction, action.payload.data, action.payload.email);
}