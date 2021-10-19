import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../modules/auth/redux/saga';
import { watchGetCitiesByRegion, watchGetCitiesByZipcode, watchGetCountries, watchGetRegions } from '../modules/Home/redux/saga';
const sagas = function* () {
    yield all([
        takeLatest('HANDLE_LOGIN', loginSaga),
        watchGetCountries(),
        watchGetRegions(),
        watchGetCitiesByRegion(),
        watchGetCitiesByZipcode()
    ]);
};
export default sagas;
