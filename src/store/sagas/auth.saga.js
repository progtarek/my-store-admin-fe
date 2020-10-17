import { call, put, takeLatest } from 'redux-saga/effects';
import { Auth } from '../../helpers/agent';
import { persistUserData } from '../../helpers';
import { push } from 'connected-react-router';
import { removeUserData } from '../../helpers';
import {
  LOGOUT,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../constants';

function* loginAsync(action) {
  try {
    const res = yield call(Auth.login, action.payload);
    persistUserData(res);
    yield put({ type: LOGIN_SUCCESS, payload: res });
    yield put(push('/dashboard'));
  } catch (e) {
    yield put({ type: LOGIN_FAIL, payload: e });
  }
}

function* logoutAsync() {
  removeUserData();
  yield put(push('/'));

  try {
  } catch (e) {
    yield put({ type: LOGOUT_FAIL, payload: e });
  }
}

function* login() {
  yield takeLatest(LOGIN_REQUEST, loginAsync);
}

function* logout() {
  yield takeLatest(LOGOUT, logoutAsync);
}

export { login, logout };
