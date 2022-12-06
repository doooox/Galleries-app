import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import sagas from "./sagas";
import authReducer from "./auth/slice";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
