import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


import reducer from "./reducers";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
  
sagaMiddleware.run(mySaga);

