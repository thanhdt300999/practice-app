import { fork, all, takeLatest, takeEvery, take } from 'redux-saga/effects';
import loginSaga from '../modules/auth/redux/saga';
import signUpSaga from '../modules/Home/redux/saga';
const sagas = function* () {
  yield all([
    takeLatest('HANDLE_LOGIN', loginSaga),
    takeEvery('GET_COUNTRIES_REQUEST', signUpSaga)
  ]);
};
export default sagas;