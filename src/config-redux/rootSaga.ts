import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../modules/auth/signin/redux/saga';
import {
    watchGetCitiesByRegion,
    watchGetCitiesByZipcode,
    watchGetCountries,
    watchGetRegions,
    watchPostSignup,
} from '../modules/auth/signup/redux/saga';
import { watchGetUsers } from '../modules/Home/redux/saga';
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
