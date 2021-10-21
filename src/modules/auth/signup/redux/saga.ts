import { call, put, select, takeEvery } from 'redux-saga/effects';
import signUpService from './service';
import AsyncStorage from '@react-native-community/async-storage';
import actions from './action';
function* saveTokenToStore(data) {
    yield AsyncStorage.multiSet(
        [
            ['AccessToken', data.token],
            ['puk', data.puk],
            ['user', data.user],
        ],
        (err) => {
            console.log('ERROR saveTokenToStore: ', err);
        }
    );
}
//country
export function* watchGetCountries() {
    yield takeEvery('GET_COUNTRIES_REQUEST', handleGetCountries);
}
export function* handleGetCountries(action) {
    yield call(getCountries);
}
export function* getCountries() {
    try {
        let response = yield call(signUpService.getCountries);
        yield put(actions.getCountriesSucess(response.listCountries));
    } catch (err) {
        yield put(actions.getCountriesFailure(err));
    }
}
//region
export function* watchGetRegions() {
    yield takeEvery('GET_REGIONS_REQUEST', handleGetRegions);
}
export function* handleGetRegions(action) {
    yield call(getRegions, action.payload);
}
export function* getRegions(data) {
    try {
        let response = yield call(signUpService.getRegions, data);
        yield put(actions.getRegionsSuccess(response.listRegions));
    } catch (err) {
        yield put(actions.getRegionsFailure(err));
    }
}

//city
export function* watchGetCitiesByRegion() {
    yield takeEvery('GET_CITIES_BY_REGION_REQUEST', handleGetCitiesByRegion);
}
export function* handleGetCitiesByRegion(action) {
    yield call(getCitiesByRegion, action.payload);
}
export function* getCitiesByRegion(data) {
    try {
        let response = yield call(signUpService.getCitiesByRegion, data);
        yield put(actions.getCitiesByRegionSuccess(response.listCities));
    } catch (err) {
        yield put(actions.getCitiesByRegionFailure(err));
    }
}

export function* watchGetCitiesByZipcode() {
    yield takeEvery('GET_CITIES_BY_ZIPCODE_REQUEST', hanldeGetCitiesByZipcode);
}
export function* hanldeGetCitiesByZipcode(action) {
    yield call(getCitiesByZipcode, action.payload);
}
export function* getCitiesByZipcode(data) {
    try {
        let response = yield call(signUpService.getCitiesByZipcode, data);
        yield put(actions.getCitiesByZipcodeSuccess(response.listCities));
    } catch (err) {
        yield put(actions.getCitiesByZipcodeFailure(err));
    }
}

export function* watchPostSignup() {
    yield takeEvery('POST_SIGN_UP_REQUEST', handlePostSignup);
}
export function* handlePostSignup(action) {
    yield call(postSignup, action.payload);
}
export function* postSignup(data) {
    try {
        let response = yield call(signUpService.postSignup, data);
        // yield call(saveTokenToStore, response)
        yield put(actions.postSignupSuccess(response.listCities));
    } catch (err) {
        yield put(actions.postSignupFailure(err));
    }
}
