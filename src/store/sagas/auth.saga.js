import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants';
import { Auth } from '../../helpers/agent';
import { persistUserData } from '../../helpers';
import { push } from 'connected-react-router';

function* loginAsync(action) {
  try {
    const res = yield call(Auth.login, action.payload);
    persistUserData(res);
    yield put({ type: LOGIN_SUCCESS, payload: res });
    yield put(push('/'));
  } catch (e) {
    yield put({ type: LOGIN_FAIL, payload: e });
  }
}

function* login() {
  yield takeLatest(LOGIN_REQUEST, loginAsync);
}

export { login };
