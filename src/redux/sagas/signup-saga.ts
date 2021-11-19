import { call, put, select, takeEvery } from 'redux-saga/effects';
import signUpService from '../service/signup-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actions from '../actions/signup-actions';
import { saveTokenToStore } from './signin-saga';
import signinAction from '../actions/signin-actions'
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

export function* watchGetCitiesByGeo() {
    yield takeEvery('GET_CITIES_BY_GEO_REQUEST', handleGetCitiesByGeo);
}
export function* handleGetCitiesByGeo(action) {
    yield call(getCitiesByGeo, action.payload);
}
export function* getCitiesByGeo(data) {
    try {
        let response = yield call(signUpService.getCitiesByGeo, data);
        yield put(actions.getCitiesByGeoSuccess(response.listCities));
    } catch (err) {
        yield put(actions.getCitiesByGeoFailure(err));
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
        yield call(saveTokenToStore, response);
        yield put(actions.postSignupSuccess(response));
        yield put(signinAction.setToken(response.token));
    } catch (err) {
        yield put(actions.postSignupFailure(err));
    }
}