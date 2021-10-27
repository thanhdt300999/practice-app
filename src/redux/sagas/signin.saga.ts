import { call, put, select } from 'redux-saga/effects';
import authService from '../service/signin.service';
import AsyncStorage from '@react-native-community/async-storage';
import actions from '../actions/signin.actions';
import * as RootNavigation from '../../navigation/NavigationService';

export async function saveTokenToStore(data) {
    try {
        await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.setItem("puk", data.puk)
    } catch (error) {
        console.log(error)
    }
}

function* postLoginAction(data, email) {
    console.log("post login")
    try {
        let response = yield call(authService.login, data, email); // Gọi API Login ở đây.
        yield call(saveTokenToStore, response); // Nếu API gọi thành công. Save access_token và Stor
        console.log("up")
        yield put(actions.loginSuccess(response)); // Gọi action LOGIN_SUCCESS
        console.log("DOwn")
        yield call(RootNavigation.navigate, "HomeFlow", {screen: 'Discovery'})
    } catch (err) {
        console.log(err)
        yield put(actions.loginFailure(err)); // Nếu lỗi gọi action LOGIN_FAILURE
    }
}

export default function* (action) {
    yield call(postLoginAction, action.payload.data, action.payload.email);
}
