import { call, put, select } from 'redux-saga/effects';
import signUpService from './service'
import AsyncStorage from '@react-native-community/async-storage';
import actions from './action';

function* saveTokenToStore(data) {
    yield AsyncStorage.multiSet(
        [['AccessToken', data.token], ['puk', data.puk], ['user', data.user]],
        err => {
            console.log('ERROR saveTokenToStore: ', err);
        },
    );
}

function* getCountries() {

    try {
        let response = yield call(signUpService.getCountries);
        yield put(actions.getCountriesSucess(response.listCountries));
    } catch (err) {
        yield put(actions.getCountriesFailure(err));
    }
}

export default function* (action) {
    yield call(getCountries);
}