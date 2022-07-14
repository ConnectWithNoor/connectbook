import { combineReducers } from 'redux';

import authReducer from './Auth/AuthReducer';

const reducers = combineReducers({
  authReducer,
});

export default reducers;
