import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import homeServices from '../service/home-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from '../actions/home-actions';

export function* watchGetUsers() {
    yield takeLatest('GET_USERS_REQUEST', handleGetUsers);
    // yield takeEvery('GET_MORE_USER_REQUEST', handleGetUsers);
}
export function* handleGetUsers() {
    yield call(getUsers);
}
export function* getUsers() {
    try {
        let response = yield call(homeServices.getUsers);
        yield put(actions.getUsersSuccess(response));
    } catch (err) {
        yield put(actions.getUsersFailure(err));
    }
}

export function* watchGetMoreUsers() {
    yield takeLatest('GET_MORE_USERS_REQUEST', handleGetMoreUsers);
}
export function* handleGetMoreUsers() {
    yield call(getMoreUsers);
}
export function* getMoreUsers() {
    try {
        let response = yield call(homeServices.getUsers);
        yield put(actions.getMoreUsersSuccess(response));
    } catch (err) {
        yield put(actions.getMoreUsersFailure(err));
    }
}
