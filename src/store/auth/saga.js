import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
import { login, setIsAuthenticated, setLoginErrorMsg } from "./slice";

function* loginHandler(action) {
  try {
    yield call(authService.login, action.payload);
    yield put(setIsAuthenticated(true));
  } catch (error) {
    console.log(error);
    yield put(setLoginErrorMsg(error.response.data.message));
  }
}
export function* watchAuth() {
  yield takeLatest(login.type, loginHandler);
}