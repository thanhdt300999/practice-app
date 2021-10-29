import { call, put, select, takeEvery } from 'redux-saga/effects';
import homeServices from '../service/home.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from '../actions/home.actions';

//country
export function* watchGetUsers() {
    yield takeEvery('GET_USERS_REQUEST', handleGetUsers);
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