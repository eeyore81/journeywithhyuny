import { combineReducers } from 'redux';
import articleState from './articlereducer';
import authState from './authreducer';
import searchResultState from './searchreducer';

export default combineReducers({
  articleState,
  authState,
  searchResultState,
});
