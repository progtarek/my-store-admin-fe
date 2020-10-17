import { all } from 'redux-saga/effects';
import { login, logout } from './auth.saga';

export default function* rootSaga() {
  yield all([login(), logout()]);
}
