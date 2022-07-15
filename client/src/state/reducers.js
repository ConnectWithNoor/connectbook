import { combineReducers } from 'redux';

import authReducer from './Auth/AuthReducer';
import postReducer from './PostShare/PostShareReducer';

const reducers = combineReducers({
  authReducer,
  postReducer,
});

export default reducers;
