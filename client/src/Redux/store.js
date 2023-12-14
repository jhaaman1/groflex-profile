import {  applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './Auth/Reducer';
import appReducer from './App/Reducer';


const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
