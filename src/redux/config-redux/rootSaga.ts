import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../sagas/signin.saga';
import {
    watchGetCitiesByGeo,
    watchGetCitiesByRegion,
    watchGetCitiesByZipcode,
    watchGetCountries,
    watchGetRegions,
    watchPostSignup,
} from '../sagas/signup.saga';
import { watchGetMoreUsers, watchGetUsers } from '../sagas/home.saga';
const sagas = function* () {
    yield all([
        takeLatest('HANDLE_LOGIN', loginSaga),
        watchGetCountries(),
        watchGetRegions(),
        watchGetCitiesByRegion(),
        watchGetCitiesByZipcode(),
        watchGetCitiesByGeo(),
        watchGetUsers(),
        watchPostSignup(),
        watchGetMoreUsers()
    ]);
};
export default sagas;
