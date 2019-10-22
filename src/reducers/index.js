import { combineReducers } from 'redux';
import { reducers} from '../reducers';
import { reducer as formReducer } from 'redux-form';
import articleReducer from './articlereducer';
import searchResultReducer from './searchreducer';
import authReducer from './authreducer';
const rootReducer = combineReducers({
  state: (state = {}) => state, form: formReducer,
  articleState: articleReducer,
  searchResultState: searchResultReducer,
  authState: authReducer
});

export default rootReducer;
