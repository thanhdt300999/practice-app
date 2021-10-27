import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../sagas/signin.saga';
import {
    watchGetCitiesByRegion,
    watchGetCitiesByZipcode,
    watchGetCountries,
    watchGetRegions,
    watchPostSignup,
} from '../sagas/signup.saga';
import { watchGetUsers } from '../sagas/home.saga';
const sagas = function* () {
    yield all([
        takeLatest('HANDLE_LOGIN', loginSaga),
        watchGetCountries(),
        watchGetRegions(),
        watchGetCitiesByRegion(),
        watchGetCitiesByZipcode(),
        watchGetUsers(),
        watchPostSignup(),
    ]);
};
export default sagas;
