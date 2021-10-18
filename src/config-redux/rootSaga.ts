import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../modules/auth/redux/saga';
import { watchGetCitiesByRegion, watchGetCountries, watchGetRegions } from '../modules/Home/redux/saga';
const sagas = function* () {
    yield all([
        takeLatest('HANDLE_LOGIN', loginSaga),
        watchGetCountries(),
        watchGetRegions(),
        watchGetCitiesByRegion()
    ]);
};
export default sagas;
