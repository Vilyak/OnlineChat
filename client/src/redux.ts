import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootSaga from "./sagas";
import {ChatReducer} from "./reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(ChatReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);