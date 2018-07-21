/* eslint-disable no-constant-condition */

import {
  put, take, call,
} from 'redux-saga/effects';
import {
  LOAD_DATA, FETCH_DATA, LOAD_ERROR, LOADING,
} from '../actions';

const fetchData = () => fetch('/stub.json').then(res => res.json());

export default function* rootSaga() {
  while (true) {
    yield take(FETCH_DATA);
    try {
      yield put({ type: LOADING, isLoading: true });
      const list = yield call(fetchData);
      yield put({ type: LOAD_DATA, list });
    } catch (err) {
      yield put({ type: LOAD_ERROR, message: err.message });
    }
  }
}
