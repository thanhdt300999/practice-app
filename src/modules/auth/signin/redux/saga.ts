import { call, put, select } from 'redux-saga/effects';
import authService from '../../../../redux/service/signin.service';
import AsyncStorage from '@eact-native-async-storage/async-storage';
import actions from './actions';
import NavigationService from '../../../../../NavigationService';

export async function saveTokenToStore(data) {
    try {
        await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.setItem("puk", data.puk)
    } catch (error) {
        console.log(error)
    }
}

function* postLoginAction(data, email) {
    try {
        let response = yield call(authService.login, data, email); // Gọi API Login ở đây.
        yield call(saveTokenToStore, response); // Nếu API gọi thành công. Save access_token và Stor
        yield put(actions.loginSuccess(response)); // Gọi action LOGIN_SUCCESS
        yield call(NavigationService.navigate, "Home")
    } catch (err) {
        yield put(actions.loginFailure(err)); // Nếu lỗi gọi action LOGIN_FAILURE
    }
}

export default function* (action) {
    yield call(postLoginAction, action.payload.data, action.payload.email);
}
