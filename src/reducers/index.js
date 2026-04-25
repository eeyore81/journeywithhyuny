import { combineReducers } from 'redux';
import articleReducer from './articlereducer';
import searchResultReducer from './searchreducer';
import authReducer from './authreducer';

const rootReducer = combineReducers({
  articleState: articleReducer,
  searchResultState: searchResultReducer,
  authState: authReducer,
});

export default rootReducer;
