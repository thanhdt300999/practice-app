import { fork, all, takeLatest } from 'redux-saga/effects';
import loginSaga from '../modules/auth/redux/saga';

const sagas = function*() {
  yield all([takeLatest('HANDLE_LOGIN', loginSaga)]);
};
export default sagas;