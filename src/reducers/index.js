import { combineReducers } from 'redux';
import { reducers} from '../reducers';
import { reducer as formReducer } from 'redux-form'
import articleReducer from './articlereducer'
const rootReducer = combineReducers({
  state: (state = {}) => state, form: formReducer,
  articleState: articleReducer,
});

export default rootReducer;
